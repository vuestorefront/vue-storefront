import { injectRequired } from '@vue-storefront/core/application-services';

import { requestServicesInjectionKey } from './injection-key';
import { RequestServices } from './types';

export function useRequestServices (): RequestServices {
  return injectRequired(requestServicesInjectionKey, 'request services');
}
