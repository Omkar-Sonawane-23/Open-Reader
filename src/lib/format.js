export function readingMinutes(words, wpm = 220) {
  return Math.max(1, Math.round(words / wpm))
}

export function plural(n, one, many) {
  return `${n.toLocaleString()} ${n === 1 ? one : many}`
}

export function excerpt(text, words = 6) {
  const parts = text.split(/\s+/).filter(Boolean).slice(0, words).join(' ')
  return parts.length < text.length ? `${parts}…` : parts
}

export function dominantTag(tags) {
  if (!tags.length) return null
  const counts = {}
  tags.forEach((t) => {
    counts[t] = (counts[t] || 0) + 1
  })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

export const tagTraits = {
  curiosity: 'You open doors. It’s the family condition.',
  heart: 'You move toward people — even impossible ones.',
  duty: 'You are a keeper of things: the shop, the hour, the promise.',
  caution: 'You measure twice, and you keep your keys safe.',
}
