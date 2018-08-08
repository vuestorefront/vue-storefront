/**
 * Capitalize first letter of provided text
 * @param {String} text
 */
export function capitalize (text) {
  if (!text) return ''
  text = text.toString()
  return text.charAt(0).toUpperCase() + text.slice(1)
}
