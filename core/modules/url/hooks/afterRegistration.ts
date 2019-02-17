export function afterRegistration ({ Vue, config, store, isServer }) {
  store.dispatch('url/registerDynamicRoutes', {}, { root: true })
}