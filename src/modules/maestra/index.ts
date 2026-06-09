import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { maestraCallbacksFactory } from './helpers/maestra-callbacks.factory';

export interface ModuleConfig {
  updateEmailMutation: string,
  updatePhoneNumberMutation: string
}

export const MaestraModule: StorefrontModule = async function (
  { store, moduleConfig }: Parameters<StorefrontModule>[0] & { moduleConfig: ModuleConfig }
) {
  if (typeof window === 'undefined') {
    return;
  }

  const maestraCallbacks = maestraCallbacksFactory(
    (email) => store.commit(moduleConfig.updateEmailMutation, email),
    (phoneNumber) => store.commit(moduleConfig.updatePhoneNumberMutation, phoneNumber)
  );

  for (const callbackName of Object.keys(maestraCallbacks)) {
    (window as any)[callbackName] = maestraCallbacks[callbackName]
  }
}
