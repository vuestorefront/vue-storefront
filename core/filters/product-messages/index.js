/**
 * Format message string for product validation messages object
 */
export function formatProductMessages (messages) {
  return Object.values(messages).join(', ')
}
