// Validation + property tests for Open Reader data & pagination.
// Run: node scripts/validate.mjs
import { books, getBook, linearBlockList, bookWordCount, interactiveEndings } from '../src/data/books.js'
import { paginateBlocks } from '../src/lib/paginate.js'

let failures = 0
const check = (cond, msg) => {
  if (cond) console.log(`  ✓ ${msg}`)
  else {
    failures++
    console.error(`  ✗ FAIL: ${msg}`)
  }
}

console.log('\n── Data validation ──────────────────────────────────────')
for (const book of books) {
  check(getBook(book.id) === book, `${book.title}: indexed by id`)

  if (book.type === 'linear') {
    check(book.chapters.length > 0, `${book.title}: has chapters`)
    check(
      book.chapters.every((c) => c.title && c.blocks.length > 0 && c.blocks.every((b) => typeof b === 'string' || b?.sep)),
      `${book.title}: all chapter blocks well-formed`,
    )
    const blocks = linearBlockList(book)
    check(blocks.every((b, i) => b.gi === i), `${book.title}: block indices contiguous`)
    check(
      book.chapters.every((c, ci) => blocks.some((b) => b.type === 'h' && b.chapter === ci)),
      `${book.title}: every chapter has its heading block`,
    )
    check(bookWordCount(book) > 300, `${book.title}: substantial word count (${bookWordCount(book)} words)`)
  } else {
    const scenes = book.scenes
    const ids = Object.keys(scenes)
    check(Boolean(scenes[book.start]), `${book.title}: start scene "${book.start}" exists`)

    // every choice target exists
    const dangling = []
    for (const [id, scene] of Object.entries(scenes)) {
      for (const c of scene.choices || []) if (!scenes[c.next]) dangling.push(`${id}→${c.next}`)
    }
    for (const [id, choice] of Object.entries(book.watchChoiceAt || {})) {
      if (!scenes[id]) dangling.push(`watchChoiceAt@${id}`)
      if (!scenes[choice.next]) dangling.push(`watchChoiceAt ${id}→${choice.next}`)
    }
    check(dangling.length === 0, `${book.title}: no dangling choice targets ${dangling.join(', ')}`)

    // every non-ending scene has choices
    const choiceless = ids.filter((id) => !scenes[id].ending && (!scenes[id].choices || scenes[id].choices.length === 0))
    check(choiceless.length === 0, `${book.title}: every non-ending scene has choices ${choiceless.join(', ')}`)

    // reachability from start without the item
    const reach = new Set([book.start])
    const queue = [book.start]
    while (queue.length) {
      const id = queue.shift()
      for (const c of scenes[id].choices || []) {
        if (!reach.has(c.next)) {
          reach.add(c.next)
          queue.push(c.next)
        }
      }
    }
    // scenes only enterable through item-gated injected choices are allowed to be unreachable
    const gatedScenes = new Set(Object.values(book.watchChoiceAt || {}).map((c) => c.next))
    const unreachable = ids.filter((id) => !reach.has(id) && !gatedScenes.has(id))
    check(unreachable.length === 0, `${book.title}: all scenes reachable without items ${unreachable.join(', ')}`)

    // reachability with the item: BFS over (scene, hasWatch)
    if (book.watchChoiceAt) {
      const watchScenes = ids.filter((id) => scenes[id].item)
      const seen = new Set()
      const q2 = [[book.start, false]]
      let trueEndingOk = false
      while (q2.length) {
        const [id, has] = q2.shift()
        const key = `${id}|${has}`
        if (seen.has(key)) continue
        seen.add(key)
        const nowHas = has || watchScenes.includes(id)
        const choices = [...(scenes[id].choices || [])]
        if (nowHas && book.watchChoiceAt[id]) choices.push(book.watchChoiceAt[id])
        for (const c of choices) {
          if (scenes[c.next]?.ending?.trueEnding) trueEndingOk = true
          q2.push([c.next, nowHas])
        }
      }
      check(trueEndingOk, `${book.title}: true ending reachable when carrying the item`)
      check(watchScenes.length > 0, `${book.title}: item scene exists (${watchScenes.join(', ')})`)
    }

    const endings = interactiveEndings(book)
    check(endings.length === 5, `${book.title}: expected 5 endings (got ${endings.length})`)
    check(endings.some((e) => e.trueEnding), `${book.title}: has a marked true ending`)
    const endingScenes = ids.filter((id) => scenes[id].ending)
    check(
      endingScenes.every((id) => !(scenes[id].choices || []).length),
      `${book.title}: ending scenes have no choices`,
    )
  }
}

console.log('\n── Pagination property test (mock layout) ────────────────')
// Mock DOM: "height" of content = 2 * text length + 30 per element.
const clientHeight = 400
const makeFakeEl = () => {
  const el = {
    className: '',
    textContent: '',
    children: [],
    parent: null,
    appendChild(c) {
      c.parent = this
      this.children.push(c)
    },
    remove() {
      if (this.parent) {
        const i = this.parent.children.indexOf(this)
        if (i >= 0) this.parent.children.splice(i, 1)
        this.parent = null
      }
    },
  }
  Object.defineProperty(el, 'scrollHeight', {
    get() {
      return el.children.reduce((n, c) => n + c.textContent.length * 2 + 30, 0)
    },
  })
  Object.defineProperty(el, 'clientHeight', {
    get() {
      return clientHeight
    },
  })
  return el
}
globalThis.document = { createElement: () => makeFakeEl() }

for (const book of books) {
  if (book.type !== 'linear') continue
  const blocks = linearBlockList(book)
  const host = makeFakeEl()
  const pages = paginateBlocks(blocks, host)

  check(pages.length > 0, `${book.title}: produced ${pages.length} pages`)

  // No empty pages; headings always start a page
  check(pages.every((p) => p.blocks.length > 0), `${book.title}: no empty pages`)
  const headingPages = pages.filter((p) => p.blocks[0].type === 'h').length
  check(headingPages === book.chapters.length, `${book.title}: each chapter starts its own page (${headingPages}/${book.chapters.length})`)

  // Fragment reassembly: concatenated fragments of each paragraph == original
  const reassembled = {}
  const order = []
  for (const p of pages) {
    for (const b of p.blocks) {
      if (b.type !== 'p') continue
      if (!reassembled[b.gi]) {
        reassembled[b.gi] = []
        order.push(b.gi)
      }
      reassembled[b.gi].push(b.text)
    }
  }
  const allOk = order.every((gi) => {
    const original = blocks[gi].text
    return reassembled[gi].join(' ').replace(/\s+/g, ' ') === original.replace(/\s+/g, ' ')
  })
  check(allOk, `${book.title}: split paragraphs reassemble to the original text`)
  check(
    order.length === blocks.filter((b) => b.type === 'p').length,
    `${book.title}: every paragraph appears exactly once`,
  )

  // Page gi bookkeeping
  check(
    pages.every((p) => p.first <= p.last && p.blocks[0].gi === p.first && p.blocks[p.blocks.length - 1].gi === p.last),
    `${book.title}: page first/last indices consistent`,
  )
}

console.log('\n── Helpers ───────────────────────────────────────────────')
import { dominantTag, excerpt, readingMinutes } from '../src/lib/format.js'
check(dominantTag(['a', 'b', 'a']) === 'a', 'dominantTag picks the most frequent')
check(excerpt('one two three four five six seven', 3) === 'one two three…', 'excerpt truncates with ellipsis')
check(readingMinutes(220) === 1 && readingMinutes(2200) === 10, 'readingMinutes math')

console.log(failures === 0 ? '\nALL PASSED ✅\n' : `\n${failures} FAILURE(S) ❌\n`)
process.exit(failures === 0 ? 0 : 1)
