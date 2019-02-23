import { router } from '@vue-storefront/core/app'
import rootStore from '@vue-storefront/store'
import { localizedDispatcherRoute, localizedRoute, currentStoreView, removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import { Route } from 'vue-router/types/router';
import { RouterManager } from '@vue-storefront/core/lib/router-manager'

export function processDynamicRoute(routeData, fullPath, addToRoutes = true) {
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
      const storeView = currentStoreView()
      const dynamicRoute = Object.assign({}, userRoute, routeData, { path: '/' + ((rootStore.state.config.defaultStoreCode !== storeView.storeCode) ? (storeView.storeCode + '/') : '') + fullPath, name: `urldispatcher-${fullPath}` })
      return dynamicRoute
    }
  } else {
    return null
  }
}

export function findRouteByPath(fullPath) {
  return RouterManager.findByPath(fullPath)
}

export function normalizeUrlPath(url, removeStoreCode = true) {
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