import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { coreHooks } from '@vue-storefront/core/hooks';

import { module } from './store';
import { SN_BACKEND_SETTINGS } from './types/StoreMutations';

export const BackendSettings: StorefrontModule = function ({ store, app }) {
  store.registerModule(SN_BACKEND_SETTINGS, module);

  coreHooks.afterAppInit(() => {
    if (app.$isServer) {
      store.dispatch(`${SN_BACKEND_SETTINGS}/synchronize`);
    }
  });
}
