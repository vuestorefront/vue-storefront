import { configureSSR } from '@vue-storefront/core'
import { ssrRef, getCurrentInstance, onServerPrefetch } from '@nuxtjs/composition-api';

const hasRouteChanged = (ctx) => {
  const { from } = ctx.$router.app.context;
  const { current } = ctx.$router.history

  if (!from) {
    return false
  }

  return from.fullPath !== current.fullPath
}

const ssrPlugin = () => {
  configureSSR({
    vsfRef: ssrRef,
    onSSR: (fn) => {
      onServerPrefetch(fn);
      if (typeof window !== 'undefined') {
        const vm = getCurrentInstance();

        if (hasRouteChanged(vm)) {
          fn();
        }
      }
    }
  });
};

export default ssrPlugin;
