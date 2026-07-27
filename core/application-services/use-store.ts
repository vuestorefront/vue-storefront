import RootState from '@vue-storefront/core/types/RootState';
import { Store } from 'vuex';

import { injectRequired } from './inject-required';
import { storeInjectionKey } from './injection-keys';

export function useStore (): Store<RootState> {
  return injectRequired(storeInjectionKey, 'store');
}
