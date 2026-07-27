import {
  del,
  set,
  shallowReactive
} from 'vue';
import VueRouter, { Route } from 'vue-router';

import { RouteView } from './types';

function replaceRoute (
  routeView: RouteView,
  route: Route
): void {
  for (const key of Object.keys(routeView)) {
    if (!(key in route)) {
      del(routeView, key);
    }
  }

  for (const key of Object.keys(route)) {
    set(routeView, key, route[key]);
  }
}

export function createRouteView (router: VueRouter): RouteView {
  const routeView = shallowReactive({
    ...router.currentRoute
  }) as RouteView;

  router.afterEach(route => {
    replaceRoute(routeView, route);
  });

  return routeView;
}
