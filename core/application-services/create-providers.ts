import {
  i18nInjectionKey,
  routeInjectionKey,
  routerInjectionKey,
  storeInjectionKey
} from './injection-keys';
import { ApplicationServices } from './types';

export function createApplicationServiceProviders (
  services: ApplicationServices
): Record<PropertyKey, unknown> {
  return {
    [storeInjectionKey as symbol]: services.store,
    [routerInjectionKey as symbol]: services.router,
    [routeInjectionKey as symbol]: services.route,
    [i18nInjectionKey as symbol]: services.i18n
  };
}
