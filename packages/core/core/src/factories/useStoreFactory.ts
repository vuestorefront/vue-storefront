import { Ref, computed } from '@vue/composition-api';
import { sharedRef, configureFactoryParams, Logger } from '../utils';
import { UseStoreFactoryParams, UseStore, UseStoreErrors } from '../types';

export function useStoreFactory <STORE, CHANGE_PARAMS>(
  factoryParams: UseStoreFactoryParams<STORE, CHANGE_PARAMS>
): UseStore<STORE, CHANGE_PARAMS> {

  return function useStore () {

    /* @private */
    const _factoryParams = configureFactoryParams(factoryParams);

    /* @readonly */
    const store: Ref<STORE> = sharedRef(null, 'useStore-store');
    const loading: Ref<boolean> = sharedRef(false, 'useStore-loading');
    const error: Ref<UseStoreErrors> = sharedRef({ load: null, change: null }, 'useUser-error');

    /* @public */
    async function load (params): Promise<void> {
      Logger.debug('useStoreFactory.load', params);

      error.value.load = null;

      try {
        loading.value = true;
        const { customQuery } = Object(params);
        store.value = await _factoryParams.load({ customQuery });
      } catch (err) {
        error.value.load = err;
      } finally {
        loading.value = false;
      }
    }

    async function change (params): Promise<void> {
      Logger.debug('useStoreFactory.change', params);

      error.value.change = null;

      try {
        loading.value = true;
        const { customQuery, ...next } = Object(params);
        store.value = await _factoryParams.change({current: store.value, next, customQuery});
      } catch (err) {
        error.value.change = err;
      } finally {
        loading.value = false;
      }
    }

    /* @interface */
    return {
      load,
      change,
      store: computed(() => store.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
