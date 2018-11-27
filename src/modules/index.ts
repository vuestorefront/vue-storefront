import Vue from 'vue'
import { VueStorefrontModule } from '@vue-storefront/module'
import { Catalog } from "@vue-storefront/core/modules/catalog"
import { Cart } from '@vue-storefront/core/modules/cart'
import { Checkout } from '@vue-storefront/core/modules/checkout'
import { Compare } from '@vue-storefront/core/modules/compare'
import { Review } from '@vue-storefront/core/modules/review'
import { Mailer } from '@vue-storefront/core/modules/mailer'
import { Mailchimp } from '../modules/mailchimp'
import { Example } from '@vue-storefront/core/modules/module-template'
import { Notification } from '@vue-storefront/core/modules/notification'
import { RecentlyViewed } from '@vue-storefront/core/modules/recently-viewed'
import { Homepage } from "./homepage"
import { Claims } from './claims'
import { PromotedOffers } from './promoted-offers'
import { Ui } from './ui-store'
import { GoogleAnalytics } from './google-analytics';
import { AmpRenderer } from './amp-renderer';
import { PaymentBackendMethods } from './payment-backend-methods';

// Some modules  that still needs API refactoring are  temporary registered in core
// This is how you can adjust any module with application-specific behavior
const extendedExample = new VueStorefrontModule({
  key: 'extend',
  afterRegistration: function(Vue, config) {
    console.info('Hello, im extended now!')
  }
})

Example.extend(extendedExample)

export const registerModules: VueStorefrontModule[] = [
  Checkout,
  Catalog,
  Cart,
  Compare,
  Review,
  Mailer,
  Mailchimp,
  Notification,
  Ui,
  RecentlyViewed,
  Homepage,
  Claims,
  PromotedOffers,
  GoogleAnalytics,
  PaymentBackendMethods,
  // Example
]

if (!Vue.prototype.$isServer) { // extensions that are not required in the SSR mode
  registerModules.push(AmpRenderer)
}