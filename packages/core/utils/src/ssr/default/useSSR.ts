import { getCurrentInstance, onServerPrefetch } from '@vue/composition-api';
import { emit, on } from './eventBus';

const getRootState = (vm: any) => {
  if (vm.$isServer) {
    return vm.$ssrContext.nuxt.vsfState;
  }

  // @ts-ignore
  return window.__VSF_STATE__ || {};
};

export const useSSR = (key: string) => {
  const vm = getCurrentInstance() as any;
  const isServer = vm.$isServer;

  if (isServer && !vm.$ssrContext.nuxt.vsfState) {
    vm.$ssrContext.nuxt.vsfState = {};
  }

  const saveToInitialState = (value) => {
    emit('set-ssr-cache', { key, value });
  };

  return {
    saveToInitialState,
    initialState: getRootState(vm)[key]
  };
};

let snapsshot = 0;

const hasWindowStateChanged = () => {
  // @ts-ignore
  const currentSnapshot = window.__VSF_STATE__ ? JSON.stringify(window.__VSF_STATE__).length : 0;

  if (snapsshot !== currentSnapshot) {
    snapsshot = currentSnapshot;

    return true;
  }

  return false;
};

export const onSSR = (func) => {
  const vm = getCurrentInstance() as any;
  const isServer = vm.$isServer;

  if (isServer && !vm.$ssrContext.nuxt.vsfState) {
    vm.$ssrContext.nuxt.vsfState = {};
  }

  onServerPrefetch(async () => {
    await func();

    on('set-ssr-cache', ({ key, value }) => {
      vm.$ssrContext.nuxt.vsfState[key] = value;
    });
  });

  if (!isServer && !hasWindowStateChanged()) {
    func();
  }
};
