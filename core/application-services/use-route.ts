import { injectRequired } from './inject-required';
import { routeInjectionKey } from './injection-keys';
import { RouteView } from './types';

export function useRoute (): RouteView {
  return injectRequired(routeInjectionKey, 'route');
}
