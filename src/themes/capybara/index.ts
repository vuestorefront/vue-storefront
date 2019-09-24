import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { CatalogModule } from '@vue-storefront/core/modules/catalog'
import { CatalogNextModule } from '@vue-storefront/core/modules/catalog-next'
import { CartModule } from '@vue-storefront/core/modules/cart'
import { CheckoutModule } from '@vue-storefront/core/modules/checkout'
import { CompareModule } from '@vue-storefront/core/modules/compare'
import { ReviewModule } from '@vue-storefront/core/modules/review'
import { MailerModule } from '@vue-storefront/core/modules/mailer'
import { WishlistModule } from '@vue-storefront/core/modules/wishlist'
import { NewsletterModule } from '@vue-storefront/core/modules/newsletter'
import { NotificationModule } from '@vue-storefront/core/modules/notification'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed'
import { UrlModule } from '@vue-storefront/core/modules/url'
import { BreadcrumbsModule } from '@vue-storefront/core/modules/breadcrumbs'
import { OrderModule } from '@vue-storefront/core/modules/order'
import { CmsModule } from '@vue-storefront/core/modules/cms'
import { UserModule } from '@vue-storefront/core/modules/user'
// import { GoogleAnalyticsModule } from './google-analytics';
// import { HotjarModule } from './hotjar';
// import { AmpRendererModule } from './amp-renderer';
import { PaymentBackendMethodsModule } from 'src/modules/payment-backend-methods';
import { PaymentCashOnDeliveryModule } from 'src/modules/payment-cash-on-delivery';
import { InstantCheckoutModule } from 'src/modules/instant-checkout'

import { registerModule } from '@vue-storefront/core/lib/modules'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from 'src/themes/capybara/App.vue'
import routes from 'src/themes/capybara/router'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { homepageStore } from 'src/themes/capybara/store/homepage'
import { uiStore } from 'src/themes/capybara/store/ui'

const themeEntry = App

function initTheme (app, router, store, config, ssrContext) {
  registerModule(UrlModule)
  registerModule(CatalogModule)
  registerModule(CheckoutModule) // To Checkout
  registerModule(CartModule)
  registerModule(ReviewModule) // To Product
  registerModule(MailerModule) // load lazily
  registerModule(WishlistModule) // Trigger on wishlist icon click
  registerModule(NewsletterModule) // Load lazily
  registerModule(NotificationModule)
  registerModule(UserModule) // Trigger on user icon click
  registerModule(CatalogNextModule)
  registerModule(CompareModule)
  registerModule(BreadcrumbsModule)
  registerModule(OrderModule)
  registerModule(CmsModule)
  registerModule(RecentlyViewedModule) // To HomePage
  // registerModule(GoogleTagManagerModule)
  // registerModule(GoogleAnalyticsModule)
  // registerModule(HotjarModule)
  registerModule(PaymentBackendMethodsModule)
  registerModule(PaymentCashOnDeliveryModule) // To checkout
  // registerModule(AmpRendererModule)
  registerModule(InstantCheckoutModule) // Load lazily from Microcart
  store.registerModule('homepage', homepageStore)
  store.registerModule('ui', uiStore)
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)
}

export {
  themeEntry,
  initTheme
}
