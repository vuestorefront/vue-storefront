import { Route } from 'vue-router'
import rootStore from '@vue-storefront/store'
import i18n from '@vue-storefront/i18n'

export function beforeEach(to: Route, from: Route, next) {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)

  if (requiresAuth) {
    if (!rootStore.getters['user/isLoggedIn']) {
      next('/')
      rootStore.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('You need to be logged in to see this page'),
        action1: { label: i18n.t('OK') }
      })
    } else {
      next()
    }
  } else {
    next()
  }
}
