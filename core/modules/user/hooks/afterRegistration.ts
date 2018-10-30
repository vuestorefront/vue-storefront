export function afterRegistration(Vue, config, store) {
  if (!Vue.prototype.$isServer) {
    store.dispatch('user/startSession')
    Vue.prototype.$bus.$on('user-before-logout', () => {
      store.dispatch('user/logout', { silent: false })
      store.commit('ui/setSubmenu', {
        depth: 0
      })
    })
  }
}