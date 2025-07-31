import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { klaviyoFormsHandlerFactory } from './helpers/klaviyo-forms-handler.factory';

export interface ModuleConfig {
  updateEmailMutation: string,
  updatePhoneNumberMutation: string
}

export const KlaviyoModule: StorefrontModule = async function (
  { store, moduleConfig }: Parameters<StorefrontModule>[0] & { moduleConfig: ModuleConfig }
) {
  if (typeof window === 'undefined') {
    return;
  }

  const klaviyoFormsHandler = klaviyoFormsHandlerFactory(
    (email) => store.commit(moduleConfig.updateEmailMutation, email),
    (phoneNumber) => store.commit(moduleConfig.updatePhoneNumberMutation, phoneNumber)
  );

  window.addEventListener('klaviyoForms', klaviyoFormsHandler);
}
