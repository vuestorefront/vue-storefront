import store from '../'
import i18n from './i18n'
import EventBus from './event-bus'

export function currentStoreView () {
  return global.$VS.__STOREVIEW__
}

export function prepareStoreView (storeCode, config) {
  let storeview = { // current, default store
    tax: config.tax,
    i18n: config.i18n,
    elasticsearch: config.elasticsearch,
    storeCode: '',
    storeId: 0
  }
  if (storeCode) { // current store code
    if ((storeview = config.storeviews[storeCode])) {
      storeview.storeCode = storeCode
      store.state.user.current_storecode = storeCode
    }
  }
  global.$VS.__STOREVIEW__ = storeview
  store.init(config, i18n, EventBus)
  return storeview
}

export function storeCodeFromRoute (matchedRoute) {
  if (matchedRoute && matchedRoute.props && matchedRoute.props.default) {
    return matchedRoute.props.default.storeCode
  } else {
    return ''
  }
}

export function localizedRoute (routeObj, storeCode) {
  if (storeCode) {
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
  if (config.storeviews.mapStoreUrlsFor.length > 0) {
    for (let storeCode of config.storeviews.mapStoreUrlsFor) {
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
