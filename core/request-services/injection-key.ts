import { InjectionKey } from 'vue';

import { RequestServices } from './types';

export const requestServicesInjectionKey: InjectionKey<RequestServices> =
  Symbol('request-services');
