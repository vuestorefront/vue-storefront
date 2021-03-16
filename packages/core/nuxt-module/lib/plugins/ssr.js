import { configureSSR } from '@vue-storefront/core';
import { ssrRef, onServerPrefetch, useRouter } from '@nuxtjs/composition-api';

const hasRouteChanged = () => {
  const router = useRouter();
  const { from } = router.app.context;
  const { current } = router.history;

  return from && from.fullPath !== current.fullPath;
};

const ssrPlugin = () => {
  configureSSR({
    vsfRef: ssrRef,
    onSSR: (fn) => {
      onServerPrefetch(fn);
      if (typeof window !== 'undefined' && hasRouteChanged()) {
        fn();
      }
    }
  });
};

export default ssrPlugin;
