import config from 'config'

export default function getBoosts (attribute = '') {
  let boosts = [
  ]

  if (config.boost) {
    boosts = config.boost
  }

  if (boosts.hasOwnProperty(attribute)) {
    return boosts[attribute]
  }

  return 1
}
