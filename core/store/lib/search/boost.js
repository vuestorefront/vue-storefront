import store from '@vue-storefront/store'

export default function getBoosts (attribute = '') {
  let boosts = [
  ]

  if (store.state.boost) {
    boosts = store.state.config.boost
  }

  if (boosts.hasOwnProperty(attribute)) {
    return boosts[attribute]
  }

  return 1
}
