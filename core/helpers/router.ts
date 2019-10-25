import VueRouter, { RouteConfig } from 'vue-router'
import { RouterManager } from '@vue-storefront/core/lib/router-manager';

export const createRouter = (): VueRouter => {
  return new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior: (to, from, savedPosition) => {
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
      if (savedPosition) {
        return savedPosition
      } else if (to.path !== from.path) { // do not change scroll position when navigating on the same page (ex. change filters)
        return {x: 0, y: 0}
      }
    }
  })
}

export const createRouterProxy = (router: VueRouter): VueRouter => {
  const ProxyConstructor = Proxy || require('proxy-polyfill/src/proxy')

  return new ProxyConstructor(router, {
    get (target, propKey) {
      const origMethod = target[propKey];

      if (propKey === 'addRoutes') {
        return function (routes: RouteConfig[], ...args): void {
          return RouterManager.addRoutes(routes, ...args);
        };
      }

      return origMethod;
    }
  })
}
