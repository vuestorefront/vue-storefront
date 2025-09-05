import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { getFeraScript } from './helpers/get-fera-script.function';

export const FeraModule: StorefrontModule = ({ app, appConfig }) => {
  const feraApiKey = appConfig.fera.apiKey;

  if (!feraApiKey) {
    return;
  }

  app.$extendedHead.append(getFeraScript(feraApiKey));
}
