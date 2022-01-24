import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { urlRewriteStore } from './store'

export const UrlRewriteModule: StorefrontModule = function ({ store }) {
  store.registerModule('urlRewrite', urlRewriteStore);
}
