import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { getFeraScript } from './helpers/get-fera-script.function';

export const FeraModule: StorefrontModule = ({ app, appConfig }) => {
  const apiPublicKey = appConfig.fera.apiPublicKey;

  if (!apiPublicKey) {
    return;
  }

  app.$extendedHead.append(getFeraScript(apiPublicKey));
}
