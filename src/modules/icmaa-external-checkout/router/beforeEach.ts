import { Route } from 'vue-router'
import { getRedirectToExternalCheckoutUrl } from '../helper'

export function beforeEachGuard (to: Route, from: Route, next) {
  const getCheckoutUrl = getRedirectToExternalCheckoutUrl(to.name)
  if (!getCheckoutUrl) {
    return next()
  }

  location.href = getCheckoutUrl as string
}
