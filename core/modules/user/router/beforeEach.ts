import { Route } from 'vue-router'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import { isServer } from '@vue-storefront/core/helpers'

export async function beforeEach (to: Route, from: Route, next) {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  if (requiresAuth) {
    if (isServer) {
      next()
    } else {
      await rootStore.dispatch('user/startSession')
      if (!rootStore.getters['user/isLoggedIn']) {
        next('/')
        localStorage.setItem('redirect', from.path)
      } else {
        next()
      }
    }
  } else {
    next()
  }
}
