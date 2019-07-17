import rootStore from '@vue-storefront/core/store'
import { isServer } from '@vue-storefront/core/helpers'
import { Route } from 'vue-router' 

import evInitiateCheckout from '../events/InitiateCheckout'

declare const fbq

export function beforeEach (to: Route, from: Route, next) {
    const currency = rootStore.state.storeView.i18n.currencyCode
  
    // Each product's route has in name 'product' phrase!
    //console.log(to.name)
    if(!isServer && to.name) {
        if (to.name.includes('checkout')) {
            evInitiateCheckout(fbq, currency)
        }
    }
    next()
}