import VueRouter from 'vue-router';

export function getCanonicalUrl (
  host: string,
  router: VueRouter
) {
  const routeName = router.currentRoute.name;

  if (!routeName) {
    return `https://${host}${router.currentRoute.path}`;
  }

  const resolvedRoute = router.resolve({
    name: routeName
  });

  return `https://${host}${resolvedRoute.href}`
}
