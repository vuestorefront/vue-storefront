import messages from 'res/messages.json'

/**
 * Return Object with the notifications of each section
 * @param {String} Section
 */
export function getNotifications (section) {
  return messages[section]
}
