import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { isServer } from '@vue-storefront/core/helpers';
import { Logger } from '@vue-storefront/core/lib/logger';
import { freshRelevanceStore } from './store';
import { loadScript } from './loader';
import { attachHooks, initialCapture } from './hooks';

export const FreshrelevanceModule: StorefrontModule = function ({
  store,
  appConfig
}) {
  store.registerModule('freshrelevance', freshRelevanceStore);

  if (!isServer && appConfig.freshrelevance && appConfig.freshrelevance.id) {
    loadScript(appConfig.freshrelevance.id)
      .then(() => attachHooks(store))
      .then(() => initialCapture(store))
      .catch((e) => Logger.error(e.message, 'FR')());
  }
};
