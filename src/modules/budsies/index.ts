import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { budsiesStore } from './store'

export const BudsiesModule: StorefrontModule = async function ({ store }) {
  store.registerModule('budsies', budsiesStore);
}
