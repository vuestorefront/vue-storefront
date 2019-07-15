// import { extendModule } from '@vue-storefront/core/lib/module'
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
// import { GoogleAnalyticsModule } from './google-analytics';
// import { HotjarModule } from './hotjar';
import { GoogleTagManagerModule } from './google-tag-manager';
import { AmpRendererModule } from './amp-renderer';
import { PaymentBackendMethodsModule } from './payment-backend-methods';
import { PaymentCashOnDeliveryModule } from './payment-cash-on-delivery';
import { RawOutputExampleModule } from './raw-output-example'
import { InstantCheckoutModule } from './instant-checkout'
// import { Example } from './module-template'
import { registerModule } from '@vue-storefront/module'
// TODO:distributed across proper pages BEFORE 1.11
export function registerNewModules () {
  registerModule(CatalogModule)
  registerModule(CheckoutModule)
  registerModule(CartModule)
  registerModule(ReviewModule)
  registerModule(MailerModule)
  registerModule(WishlistModule)
  registerModule(NewsletterModule)
  registerModule(NotificationModule)
  registerModule(RecentlyViewedModule)
  registerModule(GoogleTagManagerModule)
  // registerModule(GoogleAnalyticsModule)
  // registerModule(HotjarModule)
  registerModule(PaymentBackendMethodsModule)
  registerModule(PaymentCashOnDeliveryModule)
  registerModule(RawOutputExampleModule)
  registerModule(AmpRendererModule)
  registerModule(InstantCheckoutModule)
  registerModule(UrlModule)
  registerModule(CatalogNextModule)
  registerModule(CompareModule)
}

// Deprecated API, will be removed in 2.0
export const registerModules: VueStorefrontModule[] = [
  // Example
]
