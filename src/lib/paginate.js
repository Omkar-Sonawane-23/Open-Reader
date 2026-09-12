// ─────────────────────────────────────────────────────────────────────────────
// paginate.js — turns a list of blocks (headings / paragraphs / separators)
// into fixed-size pages that fit a given container, by measuring real DOM.
//
// The host element must already be styled exactly like the visible page
// (same width, height, padding, font, line-height) and must be in the DOM.
// ─────────────────────────────────────────────────────────────────────────────

// Classes mirror the visible rendering (src/readers/LinearReader.jsx renderBlock)
// so measurement accounts for indents, drop caps, and margins.
function makeElement(block) {
  if (block.type === 'h') {
    const el = document.createElement('h2')
    el.className = 'chapter-title'
    el.textContent = block.text
    return el
  }
  if (block.type === 'sep') {
    const el = document.createElement('div')
    el.className = 'sep'
    el.textContent = '❧'
    return el
  }
  const el = document.createElement('p')
  el.className = `para ${block.continued ? 'cont' : block.opener ? 'opener' : ''}`.trim()
  el.textContent = block.text
  return el
}

// Split a paragraph into sentence-ish chunks (falls back to words per chunk).
function splitSentences(text) {
  const sentences = text.match(/[^.!?…]+[.!?…]+["’”)\]]*\s*|[^.!?…]+$/g) || [text]
  return sentences.map((s) => s.trim()).filter(Boolean)
}

function splitWords(text) {
  return text.split(/\s+/).filter(Boolean)
}

/**
 * @param {Array} blocks  global block list (must be one chapter-run; headings
 *                        force a new page)
 * @param {HTMLElement} host hidden measuring container, styled like the page
 * @returns {Array<{blocks: Array, chapter: number, first: number, last: number}>}
 */
export function paginateBlocks(blocks, host) {
  const pages = []
  let page = []
  let hostBlocks = [] // elements currently in host, mirrors page

  const overflows = () => host.scrollHeight > host.clientHeight + 1

  const flush = () => {
    if (page.length) {
      pages.push({
        blocks: page,
        chapter: page[page.length - 1].chapter,
        first: page[0].gi,
        last: page[page.length - 1].gi,
      })
    }
    page = []
    hostBlocks.forEach((el) => el.remove())
    hostBlocks = []
  }

  const place = (el, block) => {
    host.appendChild(el)
    hostBlocks.push(el)
    page.push(block)
  }

  const fitsAlone = (el) => {
    host.appendChild(el)
    const ok = !overflows()
    el.remove()
    return ok
  }

  for (const block of blocks) {
    // Headings (chapter titles) always start a fresh page.
    if (block.type === 'h') {
      flush()
      const el = makeElement(block)
      place(el, block)
      continue
    }

    const el = makeElement(block)
    host.appendChild(el)

    if (!overflows()) {
      hostBlocks.push(el)
      page.push(block)
      continue
    }

    el.remove()

    if (page.length > 0) {
      // Try the block on a fresh page.
      flush()
      host.appendChild(el)
      if (!overflows()) {
        hostBlocks.push(el)
        page.push(block)
        continue
      }
      el.remove()
    }

    if (block.type === 'sep') {
      // A separator that can't fit a page alone is decorative; drop it.
      continue
    }

    // Paragraph doesn't fit even alone: split by sentences, then words.
    const sentences = splitSentences(block.text)
    let buffer = []
    let wordBuffer = []

    const emitPartial = (text) => {
      page.push({ ...block, text, continued: true })
    }

    for (const sentence of sentences) {
      el.textContent = [...buffer, sentence].join(' ')
      host.appendChild(el)

      if (!overflows()) {
        buffer.push(sentence)
        continue
      }
      el.remove()

      if (buffer.length > 0) {
        // Finish this page with what we have.
        emitPartial(buffer.join(' '))
        host.appendChild(el) // element still represents the running paragraph
        buffer = []
        flush()
        // Remove the leftover paragraph element: the next page starts fresh.
        el.remove()
        el.textContent = sentence
        host.appendChild(el)
        if (!overflows()) {
          buffer.push(sentence)
          continue
        }
        el.remove()
      }

      // A single sentence overflows a whole page: split into words.
      wordBuffer = []
      const words = splitWords(sentence)
      for (const word of words) {
        el.textContent = [...buffer, ...wordBuffer, word].join(' ')
        host.appendChild(el)
        if (!overflows()) {
          wordBuffer.push(word)
          continue
        }
        el.remove()
        if (buffer.length + wordBuffer.length > 0) {
          emitPartial([...buffer, ...wordBuffer].join(' '))
          flush()
        }
        buffer = []
        wordBuffer = [word]
        el.textContent = word
        host.appendChild(el)
      }
      buffer = [...buffer, ...wordBuffer]
      wordBuffer = []
    }

    if (buffer.length > 0) {
      emitPartial(buffer.join(' '))
      // keep the element in the host so following blocks measure correctly
      host.appendChild(el)
      hostBlocks.push(el)
    }
  }

  flush()
  return pages
}
