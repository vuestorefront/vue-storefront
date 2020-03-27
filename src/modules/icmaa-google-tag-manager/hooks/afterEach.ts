import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export interface AfterEachHookOptions {
  store: any,
  to: any,
  from: any
}

export default ({ store, to, from }: AfterEachHookOptions): void => {
  let dataLayer = (window['dataLayer'] = window['dataLayer'] || [])
  const { storeCode } = currentStoreView()

  dataLayer.push({
    'event': 'icmaa-content-view',
    'content-name': to.fullPath,
    'content-view-name': to.meta.gtm || to.name,
    'store_code': storeCode,
    'customerLoggedIn': store.getters['user/isLoggedIn'],
    'customerEmail': store.getters['user/getUserEmail']
  })
}
