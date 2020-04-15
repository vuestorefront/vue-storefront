import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { CatalogModule } from '@vue-storefront/core/modules/catalog'
import { CatalogNextModule } from '@vue-storefront/core/modules/catalog-next'
import { CartModule } from '@vue-storefront/core/modules/cart'
import { CheckoutModule } from '@vue-storefront/core/modules/checkout'
import { CompareModule } from '@vue-storefront/core/modules/compare'
import { WishlistModule } from '@vue-storefront/core/modules/wishlist'
import { NotificationModule } from '@vue-storefront/core/modules/notification'
import { UrlModule } from '@vue-storefront/core/modules/url'
import { BreadcrumbsModule } from '@vue-storefront/core/modules/breadcrumbs'
import { UserModule } from '@vue-storefront/core/modules/user'
import { CmsModule } from '@vue-storefront/core/modules/cms'
import { PaymentBackendMethodsModule } from './payment-backend-methods'
import { PaymentCashOnDeliveryModule } from './payment-cash-on-delivery'
import { NewsletterModule } from '@vue-storefront/core/modules/newsletter'
import { InitialResourcesModule } from '@vue-storefront/core/modules/initial-resources'
// ICMAA Modules
import { IcmaaExtendedConfigModule } from 'icmaa-config'
import { IcmaaExtendedUrlModule } from 'icmaa-url'
import { IcmaaExtendedCatalogModule } from 'icmaa-catalog'
import { IcmaaExtendedUserModule } from 'icmaa-user'
import { IcmaaExtendedCartModule } from 'icmaa-cart'
import { IcmaaExtendedNewsletterModule } from 'icmaa-newsletter'
import { IcmaaExtendedReviewRoutes } from 'icmaa-review'
import { IcmaaCategoryModule } from 'icmaa-category'
import { IcmaaCategoryExtrasModule } from 'icmaa-category-extras'
import { IcmaaCdnModule } from 'icmaa-cdn'
import { IcmaaCmsModule } from 'icmaa-cms'
import { IcmaaFormsModule } from 'icmaa-forms'
import { IcmaaTeaserModule } from 'icmaa-teaser'
import { IcmaaAdviceModule } from 'icmaa-advice'
import { IcmaaMetaModule } from 'icmaa-meta'
import { IcmaaGoogleTagManagerModule } from './icmaa-google-tag-manager';
import { IcmaaRecommendationsModule } from 'icmaa-recommendations'
import { IcmaaCompetitionsModule } from 'icmaa-competitions'
import { IcmaaSpotifyModule } from 'icmaa-spotify'
import { IcmaaProductAlertModule } from 'icmaa-product-alert'
import { IcmaaGiftcertModule } from 'icmaa-giftcert'
import { IcmaaTrackingModule } from 'icmaa-tracking'
import { IcmaaExternalCheckoutModule } from 'icmaa-external-checkout'
import { IcmaaAmpRendererModule } from './icmaa-amp-renderer'

// import { DeviceModule } from './device/index';
import { registerModule } from '@vue-storefront/core/lib/modules'

// TODO:distributed across proper pages BEFORE 1.11
export function registerClientModules () {
  registerModule(UrlModule)
  registerModule(CatalogModule)
  registerModule(CheckoutModule) // To Checkout
  registerModule(CartModule)
  registerModule(PaymentBackendMethodsModule)
  registerModule(PaymentCashOnDeliveryModule)
  registerModule(WishlistModule) // Trigger on wishlist icon click
  registerModule(NotificationModule)
  registerModule(UserModule) // Trigger on user icon click
  registerModule(CatalogNextModule)
  registerModule(CompareModule)
  registerModule(BreadcrumbsModule)
  registerModule(CmsModule)
  registerModule(NewsletterModule)
  registerModule(InitialResourcesModule)
  // registerModule(DeviceModule)
  // ICMAA Modules
  registerModule(IcmaaExtendedConfigModule)
  registerModule(IcmaaExtendedUrlModule)
  registerModule(IcmaaExtendedCatalogModule)
  registerModule(IcmaaExtendedUserModule)
  registerModule(IcmaaExtendedCartModule)
  registerModule(IcmaaExtendedNewsletterModule)
  registerModule(IcmaaExtendedReviewRoutes)
  registerModule(IcmaaCategoryModule)
  registerModule(IcmaaCategoryExtrasModule)
  registerModule(IcmaaCdnModule)
  registerModule(IcmaaCmsModule)
  registerModule(IcmaaFormsModule)
  registerModule(IcmaaTeaserModule)
  registerModule(IcmaaAdviceModule)
  registerModule(IcmaaMetaModule)
  registerModule(IcmaaGoogleTagManagerModule)
  registerModule(IcmaaRecommendationsModule)
  registerModule(IcmaaCompetitionsModule)
  registerModule(IcmaaSpotifyModule)
  registerModule(IcmaaProductAlertModule)
  registerModule(IcmaaGiftcertModule)
  registerModule(IcmaaTrackingModule)
  registerModule(IcmaaExternalCheckoutModule)
  registerModule(IcmaaAmpRendererModule)
}

// Deprecated API, will be removed in 2.0
export const registerModules: VueStorefrontModule[] = [
]
