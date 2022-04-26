import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { module } from './store';
import { SN_BACKEND_SETTINGS } from './types/StoreMutations';

export const BackendSettings: StorefrontModule = async function ({ store }) {
  store.registerModule(SN_BACKEND_SETTINGS, module);
}
