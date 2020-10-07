
import { configureSSR } from '@vue-storefront/core'
import { ssrRef, getCurrentInstance, onServerPrefetch } from '@nuxtjs/composition-api';

const ssrPlugin = () => {
  configureSSR({
    vsfRef: ssrRef,
    onSSR: (fn) => {
      onServerPrefetch(fn);
      if (typeof window !== 'undefined') {
        const vm = getCurrentInstance();
        const { _startLocation, current } = vm.$router.history

        if (_startLocation !== current.fullPath) {
          fn();
        }
      }
    }
  });
};

export default ssrPlugin;
