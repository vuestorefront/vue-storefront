import rootStore from '@vue-storefront/core/store'
import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { isServer } from '@vue-storefront/core/helpers'

export const getExternalCheckoutUrl = (): string => {
  const cartToken: string = rootStore.state.cart.cartServerToken
  const userToken: string = rootStore.state.user.token
  let shopUrl: string = config.externalCheckout.shopUrl

  if (config.storeViews.multistore) {
    const store = currentStoreView()
    shopUrl = shopUrl.endsWith('/') ? shopUrl.slice(-1) : shopUrl
    shopUrl = store.url.startsWith('/') ? shopUrl + store.url : store.url
  }

  return shopUrl + '/vue/cart/sync/token/' + userToken + '/cart/' + cartToken
}

export function getRedirectToExternalCheckoutUrl (routeName: string): string|boolean {
  const storeCode = currentStoreView().storeCode
  const multistoreEnabled: boolean = config.storeViews.multistore

  if (routeName === 'checkout' || (multistoreEnabled && routeName === storeCode + '-checkout')) {
    return !isServer ? getExternalCheckoutUrl() : false
  }

  return false
}
