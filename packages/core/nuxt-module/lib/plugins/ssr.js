
import { configureSSR } from '@vue-storefront/core'
import { ssrRef, getCurrentInstance, onServerPrefetch } from '@nuxtjs/composition-api';

const ssrPlugin = () => {
  let previousRoute = '';

  configureSSR({
    ssrRef,
    onSSR: (fn) => {
      onServerPrefetch(fn);
      if (typeof window !== 'undefined') {
        const vm = getCurrentInstance();
        if (previousRoute !== vm.$route.fullPath) {
          fn();
        }

        previousRoute = vm.$route.fullPath;
      }
    }
  });
};

export default ssrPlugin;
