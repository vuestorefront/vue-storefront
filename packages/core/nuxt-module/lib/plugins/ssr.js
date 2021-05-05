
import { configureSSR } from '@vue-storefront/core'
import { ssrRef, useRouter, useRoute, onServerPrefetch } from '@nuxtjs/composition-api';

const hasRouteChanged = (router, current) => {
  const { from } = router.app.context;

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
        const router = useRouter();
        const route = useRoute()

        if (hasRouteChanged(router, route.value)) {
          fn();
        }
      }
    }
  });
};

export default ssrPlugin;
