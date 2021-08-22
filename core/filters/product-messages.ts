/**
 * Format message string for product validation messages object
 */
export function formatProductMessages (messages: Record<string, any>): string {
  const msgs = []
  for (const infoKey of Object.keys(messages)) {
    if (messages[infoKey]) {
      msgs.push(messages[infoKey])
    }
  }
  return msgs.join(', ')
}
