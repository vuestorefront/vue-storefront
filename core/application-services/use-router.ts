import VueRouter from 'vue-router';

import { injectRequired } from './inject-required';
import { routerInjectionKey } from './injection-keys';

export function useRouter (): VueRouter {
  return injectRequired(routerInjectionKey, 'router');
}
