import store from '../'
import EventBus from './event-bus'

export function currentStoreView () {
  return global.$VS.storeView
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
  }
  if (!global.$VS.storeView || global.$VS.storeView.storeCode !== storeCode) {
    global.$VS.storeView = storeView
    global.$VS.i18n.locale = storeView.i18n.defaultLocale
    store.init(config, i18n || global.$VS.i18n, eventBus || EventBus)
  }
  return storeView
}

export function storeCodeFromRoute (matchedRoute) {
  if (matchedRoute && matchedRoute.props && matchedRoute.props.default) {
    return matchedRoute.props.default.storeCode
  } else {
    return ''
  }
}

export function localizedRoute (routeObj, storeCode) {
  if (storeCode && routeObj) {
    if (typeof routeObj === 'object') {
      if (routeObj.name) {
        routeObj.name = storeCode + '-' + routeObj.name
      }
      if (routeObj.path) {
        routeObj.path = '/' + storeCode + '/' + routeObj.path.slice(1)
      }
      if (!routeObj.props) routeObj.props = {}
      routeObj.props.storeCode = storeCode
    } else {
      return '/' + storeCode + routeObj
    }
  }
  return routeObj
}

export function setupMultistoreRoutes (config, router, routes) {
  if (config.storeViews.mapStoreUrlsFor.length > 0) {
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
