// import { extendModule } from '@vue-storefront/core/lib/module'
import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { Catalog } from "@vue-storefront/core/modules/catalog"
import { Cart } from '@vue-storefront/core/modules/cart'
import { Checkout } from '@vue-storefront/core/modules/checkout'
import { Compare } from '@vue-storefront/core/modules/compare'
import { Review } from '@vue-storefront/core/modules/review'
import { Mailer } from '@vue-storefront/core/modules/mailer'
import { Mailchimp } from '../modules/mailchimp'
import { Example } from './module-template'
import { Notification } from '@vue-storefront/core/modules/notification'
import { RecentlyViewed } from '@vue-storefront/core/modules/recently-viewed'
import { Homepage } from "./homepage"
import { Claims } from './claims'
import { PromotedOffers } from './promoted-offers'
import { Ui } from './ui-store'
import { GoogleAnalytics } from './google-analytics';
import { AmpRenderer } from './amp-renderer';
import { PaymentBackendMethods } from './payment-backend-methods';
import { RawOutputExample } from './raw-output-example'
import { Magento2CMS } from './magento-2-cms'

// Some modules  that still needs API refactoring are  temporary registered in core
// This is how you can adjust any module with application-specific behavior
// const extendedExample = {
//   key: 'example',
//   afterRegistration: function(isServer, config) {
//     console.info('Hello, im extended now!')
//   }
// }

// extendModule(extendedExample)

/**
 * Some of the modules are registered lazily only when components from module are appearing on current page. 
 * If you want to use this modules in pages without it's components you need to remember about registering module first
 * - Wishlist
 */
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
  Magento2CMS,
  GoogleAnalytics,
  PaymentBackendMethods,
  RawOutputExample,
  AmpRenderer,
  Example
]