import { VueStorefrontModule, extendModule } from '@vue-storefront/core/lib/module';
import { Url } from '@vue-storefront/core/modules/url'
import { module } from './store'

const extendUrl = {
  key: 'url',
  store: { modules: [{ key: 'url', module: module }] }
}

extendModule(extendUrl)

export const registerModules: VueStorefrontModule[] = [ Url ]
