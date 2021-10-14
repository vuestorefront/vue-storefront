import { Ref, computed } from '@nuxtjs/composition-api';
import { sharedRef, configureFactoryParams, Logger } from '../utils';
import { UseStoreFactoryParams, UseStore, UseStoreErrors } from '../types';

export function useStoreFactory <STORES>(
  factoryParams: UseStoreFactoryParams<STORES>
): UseStore<STORES> {

  return function useStore () {

    /* @private */
    const _factoryParams = configureFactoryParams(factoryParams);

    /* @readonly */
    const response: Ref<STORES | null> = sharedRef(null, 'useStore-response');
    const loading: Ref<boolean> = sharedRef(false, 'useStore-loading');
    const error: Ref<UseStoreErrors> = sharedRef({ load: null, change: null }, 'useStore-error');

    /* @public */
    async function load (params): Promise<void> {
      Logger.debug('useStoreFactory.load', params);

      error.value.load = null;

      try {
        loading.value = true;
        const { customQuery } = Object(params);
        response.value = await _factoryParams.load({
          customQuery
        });
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
        const { customQuery, currentStore, store } = Object(params);
        response.value = await _factoryParams.change({
          currentStore,
          store,
          customQuery
        });
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
      response: computed(() => response.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
