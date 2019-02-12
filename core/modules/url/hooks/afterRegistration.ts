import { Logger } from '@vue-storefront/core/lib/logger'

// This function will be fired both on server and client side context after registering other parts of the module
export function afterRegistration({ Vue, config, store, isServer }){
  store.dispatch('url/registerMapping', {
    url: '/fake/product/url.html',
    routeData: {
      'parentSku': 'WS01',
      'slug': 'gwyn-endurance-tee',
      'name': 'configurable-product'
    }
  }, { root: true })  
}
