import { router } from '@vue-storefront/core/app'
import config from 'config'
import { LocalizedRoute } from '@vue-storefront/core/lib/types'
import { localizedDispatcherRoute, localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import { RouteConfig } from 'vue-router/types/router';
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { Category } from 'core/modules/catalog-next/types/Category'
import { Logger } from '@vue-storefront/core/lib/logger'

export function parametrizeRouteData (routeData: LocalizedRoute, query: { [id: string]: any } | string, storeCodeInPath: string): LocalizedRoute {
  const parametrizedRoute = Object.assign({}, routeData)
  parametrizedRoute.params = Object.assign({}, parametrizedRoute.params || {}, query)
  if (storeCodeInPath && !parametrizedRoute.name.startsWith(storeCodeInPath + '-')) {
    parametrizedRoute.name = storeCodeInPath + '-' + parametrizedRoute.name
  }
  return parametrizedRoute
}

function prepareDynamicRoute (routeData: LocalizedRoute, path: string): RouteConfig {
  const userRoute = RouterManager.findByName(routeData.name)
  if (userRoute) {
    const normalizedPath = `${path.startsWith('/') ? '' : '/'}${path}`
    const dynamicRoute = Object.assign({}, userRoute, routeData, { path: normalizedPath, name: `urldispatcher-${normalizedPath}` })
    return dynamicRoute
  } else {
    Logger.error('Route not found ' + routeData['name'], 'dispatcher')()
    return null
  }
}

export function processDynamicRoute (routeData: LocalizedRoute, path: string, addToRoutes: boolean = true): LocalizedRoute {
  const preparedRoute = prepareDynamicRoute(routeData, path)
  if (addToRoutes && preparedRoute) {
    router.addRoutes([preparedRoute], true)
  }
  return preparedRoute
}

export function preProcessDynamicRoutes (dispatcherMap: {}, addToRoutes: boolean = true): LocalizedRoute[] {
  const preparedRoutes = []
  for (const [url, routeData] of Object.entries(dispatcherMap)) {
    const preparedRoute = prepareDynamicRoute(routeData, url)
    if (preparedRoute) {
      preparedRoutes.push(preparedRoute)
    }
  }
  if (addToRoutes) {
    router.addRoutes(preparedRoutes, true)
  }
  return preparedRoutes
}

export function findRouteByPath (path: string): RouteConfig {
  return RouterManager.findByPath(path)
}

export function normalizeUrlPath (url: string): string {
  if (url && url.length > 0) {
    if (url.length > 0 && !url.startsWith('/')) url = `/${url}`
    if (url.endsWith('/')) url = url.slice(0, -1)
    const queryPos = url.indexOf('?')
    if (queryPos > 0) url = url.slice(0, queryPos)
  }
  return url
}

export function formatCategoryLink (category: Category, storeCode: string = currentStoreView().storeCode): string {
  storeCode ? storeCode += '/' : storeCode = '';

  if (currentStoreView().appendStoreCode === false) {
    storeCode = ''
  }

  if (category) {
    return config.seo.useUrlDispatcher ? ('/' + storeCode + category.url_path) : ('/' + storeCode + 'c/' + category.slug)
  }
  return '/' + storeCode;
}

export function formatProductLink (
  product: {
    parentSku?: string,
    sku: string,
    url_path?: string,
    type_id: string,
    slug: string,
    options?: [],
    configurable_children?: []
  },
  storeCode
): string | LocalizedRoute {
  if (config.seo.useUrlDispatcher && product.url_path) {
    let routeData: LocalizedRoute;
    if ((product.options && product.options.length > 0) || (product.configurable_children && product.configurable_children.length > 0)) {
      routeData = {
        path: product.url_path,
        params: { childSku: product.sku }
      }
    } else {
      routeData = { path: product.url_path }
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

export const getFallbackRouteData = ({ mappedFallback, url }) => {
  if (Array.isArray(mappedFallback)) {
    return mappedFallback
      .reverse()
      .filter(f => f.params && f.params.slug)
      .find(f => url.includes(f.params.slug))
  }

  return mappedFallback
}
