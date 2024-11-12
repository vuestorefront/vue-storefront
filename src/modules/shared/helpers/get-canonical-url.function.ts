import VueRouter from 'vue-router';

import getHostFromHeaders from '@vue-storefront/core/helpers/get-host-from-headers.function';

export function getCanonicalUrl (
  ssrContext: any,
  router: VueRouter
) {
  const host = ssrContext
    ? getHostFromHeaders(ssrContext.server.request.headers)
    : window.location.host;

  const routeName = router.currentRoute.name;

  if (!routeName) {
    return `https://${host}${router.currentRoute.path}`;
  }

  const resolvedRoute = router.resolve({
    name: routeName
  });

  return `https://${host}${resolvedRoute.href}`
}
