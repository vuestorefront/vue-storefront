import store from './store'
import { VueStorefrontModule } from '@vue-storefront/core/modules'

function beforeRegistration (Vue, config) {
  if (!Vue.prototype.$isServer) console.info(config)
}

export const mailchimp = 
  new VueStorefrontModule('mailchimp', store, null, beforeRegistration)