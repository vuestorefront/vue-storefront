import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore';
import { urlRewriteStore } from './store'
import { UrlRewriteRoutes } from './pages/routes'

export const UrlRewriteModule: StorefrontModule = function ({ store, router, appConfig }) {
  setupMultistoreRoutes(appConfig, router, UrlRewriteRoutes);
  store.registerModule('urlRewrite', urlRewriteStore);
}
