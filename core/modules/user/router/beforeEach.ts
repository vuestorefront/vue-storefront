import { Route } from 'vue-router'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import { isServer } from '@vue-storefront/core/helpers'
import { router } from '@vue-storefront/core/app'

export function beforeEach(to: Route, from: Route, next) {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  if (requiresAuth) {
    if (isServer) {
      next('/')
    } else {
      if (!rootStore.getters['user/isLoggedIn']) {
        next('/')
        rootStore.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('You need to be logged in to see this page'),
          action1: { label: i18n.t('OK') }
        })
      } else {
        if (!from.name) {
          next('/')
          setTimeout(()=> {
            router.push(to.path)
          }, 0)
        } else {
          next()          
        }
      }
    }
  } else {
    next()
  }
}
