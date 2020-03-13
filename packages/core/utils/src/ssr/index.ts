import { getCurrentInstance, onServerPrefetch } from '@vue/composition-api';

type ResourceFunction<T> = (params: any) => Promise<T>

const getRootState = (vm: any) => {
  if (vm.$isServer) {
    return vm.$ssrContext.nuxt.vsfState;
  }

  // @ts-ignore
  return window.__VSF_STATE__ || {};
};

const usePersistedState = (id: string) => {
  const vm = getCurrentInstance() as any;
  const isServer = vm.$isServer;

  if (isServer && !vm.$ssrContext.nuxt.vsfState) {
    vm.$ssrContext.nuxt.vsfState = {};
  }

  const persistedResource = async <T>(fn: ResourceFunction<T>, params: any): Promise<T> => new Promise((resolve) => {
    onServerPrefetch(() => fn(params).then(((result) => {
      vm.$ssrContext.nuxt.vsfState[id] = result;

      resolve(result);
    })));

    if (!isServer) {
      fn(params).then(resolve);
    }
  });

  return {
    persistedResource,
    state: getRootState(vm)[id]
  };
};

export default usePersistedState;
