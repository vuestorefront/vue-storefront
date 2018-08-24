import config from 'config'
import store from '../'
import EventBus from './event-bus'
import { loadLanguageAsync } from '@vue-storefront/core/lib/i18n'

export function currentStoreView () {
  return store.state.storeView
}

export function prepareStoreView (storeCode, config, i18n = null, eventBus = null) {
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
      store.state.user.current_storecode = storeCode
    }
  } else {
    storeView.storeCode = config.defaultStoreCode || ''
    store.state.user.current_storecode = config.defaultStoreCode || ''
  }
  if (!store.state.storeView || store.state.storeView.storeCode !== storeCode) {
    store.state.storeView = storeView
    loadLanguageAsync(storeView.i18n.defaultLocale)
    store.init(config, i18n || global.$VS.i18n, eventBus || EventBus)
  }
  return storeView
}

export function storeCodeFromRoute (matchedRoute) {
  if (matchedRoute) {
    for (const storeCode of config.storeViews.mapStoreUrlsFor) {
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
  if (storeCode && routeObj && config.defaultStoreCode !== storeCode) {
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
