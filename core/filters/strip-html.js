/**
 * Strip HTML tags
 * @param {String} html
 */
export function stripHTML (html) {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, '').trim()
}
