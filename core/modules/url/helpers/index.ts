import userRoutes from 'theme/router'
import { router } from '@vue-storefront/core/app'
import * as entities from '@vue-storefront/store/lib/entities'
import rootStore from '@vue-storefront/store'
import { localizedDispatcherRoute, localizedRoute } from 'core/lib/multistore'
import { Route } from 'vue-router/types/router';

export function processDynamicRoute(routeData, fullPath, addToRoutes = true) {
  const userRoute = userRoutes.find(r => r.name === routeData.name)
  if (userRoute) {
    const dynamicRoute = Object.assign({}, userRoute, routeData, { path: '/' + fullPath, name: `urldispatcher-${fullPath}` })
    if (addToRoutes) router.addRoutes([dynamicRoute])
    return dynamicRoute
  } else {
    return null
  }
}

export function findRouteByPath(fullPath) {
  return userRoutes.find(r => r.fullPath === fullPath)
}

export function normalizeUrlPath(url) {
  if (url && url.length > 0) {
    if (url[0] === '/') url = url.slice(1)
    const queryPos = url.indexOf('?')
    if (queryPos > 0) url = url.slice(0, queryPos)
  }
  return url  
}

export function formatCategoryLink(category) {
  return rootStore.state.config.seo.useUrlDispatcher ? ('/' + category.url_path) : ((rootStore.state.config.products.useShortCatalogUrls ? '/' : '/c/') + category.slug)  
}

export function formatProductLink(product, storeCode) {
  if(rootStore.state.config.seo.useUrlDispatcher) {
    const routeData: Route = {
      fullPath: rootStore.state.config.seo.useUrlDispatcher ? product.url_path : null,
      params: {
        childSku: product.sku === product.parentSku ? null : product.sku
      },
      path: null,
      hash: null,
      query: null,
      matched: null
    }
    return localizedDispatcherRoute(routeData, storeCode)
  } else { 
    const routeData: Route = {
      name: product.type_id + '-product',
      params: {
        parentSku: product.parentSku ? product.parentSku : product.sku,
        slug: product.slug,
        childSku: product.sku
      },
      fullPath: null,
      path: null,
      hash: null,
      query: null,
      matched: null
    }
    return localizedRoute(routeData, storeCode)
  }
}