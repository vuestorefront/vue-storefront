import Vue from 'vue'
export function afterRegistration(Vue, config, store, isServer){
  if (!isServer) {
    store.dispatch('user/startSession')

    Vue.prototype.$bus.$on('user-before-logout', () => {
      store.dispatch('user/logout', { silent: false })
      //TODO: Move it to theme
      store.commit('ui/setSubmenu', {
        depth: 0
      })
    })

    Vue.prototype.$bus.$on('user-after-loggedin', receivedData => {
      //TODO: Make independent of checkout module
      store.dispatch('checkout/savePersonalDetails', {
        firstName: receivedData.firstname,
        lastName: receivedData.lastname,
        emailAddress: receivedData.email
      })
    })
  }
}