import { router } from '@vue-storefront/core/app'
import rootStore from '@vue-storefront/core/store'
import { localizedDispatcherRoute, localizedRoute, LocalizedRoute } from '@vue-storefront/core/lib/multistore'
import { RouteConfig } from 'vue-router/types/router';
import { RouterManager } from '@vue-storefront/core/lib/router-manager'

export function parametrizeRouteData (routeData: LocalizedRoute, query: { [id: string]: any } | string, storeCodeInPath: string): LocalizedRoute {
  const parametrizedRoute = Object.assign({}, routeData)
  parametrizedRoute.params = Object.assign({}, parametrizedRoute.params || {}, query)
  if (storeCodeInPath && !parametrizedRoute.name.startsWith(storeCodeInPath + '-')) {
    parametrizedRoute.name = storeCodeInPath + '-' + parametrizedRoute.name
  }
  return parametrizedRoute
}

export function processDynamicRoute(routeData: LocalizedRoute, fullPath: string, addToRoutes: boolean = true): LocalizedRoute[] {
  const userRoute = RouterManager.findByName(routeData.name)
  if (userRoute) {
    const config = rootStore.state.config
    if (addToRoutes) {
      const routes = []
      const rootDynamicRoute = Object.assign({}, userRoute, routeData, { path: '/' + fullPath, name: `urldispatcher-${fullPath}` })
      routes.push(rootDynamicRoute)
      if (config.storeViews.mapStoreUrlsFor.length > 0 && config.storeViews.multistore === true) {
        for (let storeCode of config.storeViews.mapStoreUrlsFor) {
          if (storeCode) {
            const dynamicRoute = Object.assign({}, userRoute, routeData, { path: '/' + ((rootStore.state.config.defaultStoreCode !== storeCode) ? (storeCode + '/') : '') + fullPath, name: `urldispatcher-${fullPath}-${storeCode}` })
            routes.push(dynamicRoute)
          }
        }
      }
      RouterManager.addRoutes(routes, router)
      return routes
    } else {
      const dynamicRoute = Object.assign({}, userRoute, routeData, { path: '/' + fullPath, name: `urldispatcher-${fullPath}` })
      return [dynamicRoute]
    }
  } else {
    return null
  }
}

export function findRouteByPath(fullPath: string): RouteConfig {
  return RouterManager.findByPath(fullPath)
}

export function normalizeUrlPath(url: string): string {
  if (url && url.length > 0) {
    if (url[0] === '/') url = url.slice(1)
    const queryPos = url.indexOf('?')
    if (queryPos > 0) url = url.slice(0, queryPos)
  }
  return url
}

export function formatCategoryLink(category: { url_path: string, slug: string }): string {
  return rootStore.state.config.seo.useUrlDispatcher ? ('/' + category.url_path) : ((rootStore.state.config.products.useShortCatalogUrls ? '/' : '/c/') + category.slug)
}

export function formatProductLink(
  product: {
    parentSku?: string,
    sku: string,
    url_path?: string,
    type_id: string,
    slug: string,
    configurable_children: []
  },
  storeCode
): string | LocalizedRoute {
  if (rootStore.state.config.seo.useUrlDispatcher && product.url_path) {
    let routeData: LocalizedRoute;
    if (product.configurable_children && product.configurable_children.length > 0) {
      routeData = {
        fullPath: product.url_path,
        params: { childSku: product.sku }
      }
    } else {
      routeData = { fullPath: product.url_path }
    }
    return localizedDispatcherRoute(routeData, storeCode)
  } else {
    const routeData: LocalizedRoute = {
      name: product.type_id + '-product',
      params: {
        parentSku: product.parentSku ? product.parentSku : product.sku,
        slug: product.slug,
        childSku: product.sku
      }
    }
    return localizedRoute(routeData, storeCode)
  }
}
