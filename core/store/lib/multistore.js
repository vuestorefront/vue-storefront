import rootStore, { initStore } from '../'
import { loadLanguageAsync } from '@vue-storefront/core/lib/i18n'

export function currentStoreView () {
  return rootStore.state.storeView
}

export function prepareStoreView (storeCode) {
  const config = rootStore.state.config
  let storeView = { // current, default store
    tax: config.tax,
    i18n: config.i18n,
    elasticsearch: config.elasticsearch,
    storeCode: '',
    storeId: 0
  }
  if (storeCode) { // current store code
    if ((storeView = config.storeViews[storeCode])) {
      storeView.storeCode = storeCode
      rootStore.state.user.current_storecode = storeCode
    }
  } else {
    storeView.storeCode = config.defaultStoreCode || ''
    rootStore.state.user.current_storecode = config.defaultStoreCode || ''
  }
  loadLanguageAsync(storeView.i18n.defaultLocale)
  if (!rootStore.state.storeView || rootStore.state.storeView.storeCode !== storeCode) {
    rootStore.state.storeView = storeView
    initStore()
  }
  return storeView
}

export function storeCodeFromRoute (matchedRoute) {
  if (matchedRoute) {
    for (const storeCode of rootStore.state.config.storeViews.mapStoreUrlsFor) {
      if (matchedRoute.path.indexOf('/' + storeCode + '/') === 0 || matchedRoute.path === '/' + storeCode) {
        return storeCode
      }
    }
    return ''
  } else {
    return ''
  }
}

export function adjustMultistoreApiUrl (url) {
  const storeView = currentStoreView()
  if (storeView.storeCode) {
    const urlSep = (url.indexOf('?') > 0) ? '&' : '?'
    url += urlSep + 'storeCode=' + storeView.storeCode
  }
  return url
}

export function localizedRoute (routeObj, storeCode) {
  if (storeCode && routeObj && rootStore.state.config.defaultStoreCode !== storeCode) {
    if (typeof routeObj === 'object') {
      if (routeObj.name) {
        routeObj.name = storeCode + '-' + routeObj.name
      }
      if (routeObj.path) {
        routeObj.path = '/' + storeCode + '/' + routeObj.path.slice(1)
      }
    } else {
      return '/' + storeCode + routeObj
    }
  }
  return routeObj
}

export function setupMultistoreRoutes (config, router, routes) {
  if (config.storeViews.mapStoreUrlsFor.length > 0 && config.storeViews.multistore === true) {
    for (let storeCode of config.storeViews.mapStoreUrlsFor) {
      if (storeCode) {
        let storeRoutes = []
        for (let route of routes) {
          const localRoute = localizedRoute(Object.assign({}, route), storeCode)
          storeRoutes.push(localRoute)
        }
        router.addRoutes(storeRoutes)
      }
    }
  }
}
