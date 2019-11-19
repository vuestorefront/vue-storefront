import rootStore from '../store'
import { loadLanguageAsync } from '@vue-storefront/i18n'
import { initializeSyncTaskStorage } from './sync/task'
import Vue from 'vue'
import queryString from 'query-string'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import VueRouter, { RouteConfig, RawLocation } from 'vue-router'
import config from 'config'
import { LocalizedRoute, StoreView } from './types'
import storeCodeFromRoute from './storeCodeFromRoute'

export function currentStoreView (): StoreView {
  // TODO: Change to getter all along our code
  return rootStore.state.storeView
}

export async function prepareStoreView (storeCode: string): Promise<StoreView> {
  let storeView = { // current, default store
    tax: Object.assign({}, config.tax),
    i18n: Object.assign({}, config.i18n),
    elasticsearch: Object.assign({}, config.elasticsearch),
    storeCode: '',
    storeId: config.defaultStoreCode && config.defaultStoreCode !== '' ? config.storeViews[config.defaultStoreCode].storeId : 1
  }
  const storeViewHasChanged = !rootStore.state.storeView || rootStore.state.storeView.storeCode !== storeCode
  if (storeCode) { // current store code
    const currentStoreView = config.storeViews[storeCode]
    if (currentStoreView) {
      storeView = Object.assign({}, currentStoreView);
      storeView.storeCode = storeCode
      rootStore.state.user.current_storecode = storeCode
    } else {
      console.warn(`Not found 'storeView' matching the given 'storeCode': ${storeCode}`)
    }
  } else {
    storeView.storeCode = config.defaultStoreCode || ''
    rootStore.state.user.current_storecode = config.defaultStoreCode || ''
  }
  if (storeViewHasChanged) {
    rootStore.state.storeView = storeView
    await loadLanguageAsync(storeView.i18n.defaultLocale)
  }
  if (storeViewHasChanged || Vue.prototype.$db.currentStoreCode !== storeCode) {
    if (typeof Vue.prototype.$db === 'undefined') {
      Vue.prototype.$db = {}
    }
    initializeSyncTaskStorage()
    Vue.prototype.$db.currentStoreCode = storeView.storeCode
  }
  return storeView
}

export function removeStoreCodeFromRoute (matchedRouteOrUrl: LocalizedRoute | string): LocalizedRoute | string {
  const storeCodeInRoute = storeCodeFromRoute(matchedRouteOrUrl)
  if (storeCodeInRoute !== '') {
    let urlPath = typeof matchedRouteOrUrl === 'object' ? matchedRouteOrUrl.path : matchedRouteOrUrl
    return urlPath.replace(storeCodeInRoute + '/', '')
  } else {
    return matchedRouteOrUrl
  }
}

export function adjustMultistoreApiUrl (url: string): string {
  const storeView = currentStoreView()
  if (storeView.storeCode) {
    const urlSep = (url.indexOf('?') > 0) ? '&' : '?'
    url += urlSep + 'storeCode=' + storeView.storeCode
  }
  return url
}

export function localizedDispatcherRoute (routeObj: LocalizedRoute | string, storeCode: string): LocalizedRoute | string {
  const { storeCode: currentStoreCode, appendStoreCode } = currentStoreView()
  if (!storeCode || !config.storeViews[storeCode]) {
    storeCode = currentStoreCode
  }
  const appendStoreCodePrefix = storeCode && appendStoreCode

  if (typeof routeObj === 'string') {
    if (routeObj[0] !== '/') routeObj = `/${routeObj}`
    return appendStoreCodePrefix ? `/${storeCode}${routeObj}` : routeObj
  }

  if (routeObj) {
    if ((routeObj as LocalizedRoute).fullPath && !(routeObj as LocalizedRoute).path) { // support both path and fullPath
      routeObj['path'] = (routeObj as LocalizedRoute).fullPath
    }

    if (routeObj.path) { // case of using dispatcher
      const routeCodePrefix = appendStoreCodePrefix ? `/${storeCode}` : ''
      const qrStr = queryString.stringify(routeObj.params);

      const normalizedPath = routeObj.path[0] !== '/' ? `/${routeObj.path}` : routeObj.path
      return `${routeCodePrefix}${normalizedPath}${qrStr ? `?${qrStr}` : ''}`
    }
  }

  return routeObj
}

export function localizedRoute (routeObj: LocalizedRoute | string | RouteConfig | RawLocation, storeCode: string): any {
  if (!storeCode) {
    storeCode = currentStoreView().storeCode
  }
  if (!routeObj) {
    return routeObj
  }

  if ((typeof routeObj === 'object') && (routeObj as LocalizedRoute)) {
    if ((routeObj as LocalizedRoute).fullPath && !(routeObj as LocalizedRoute).path) { // support both path and fullPath
      routeObj['path'] = (routeObj as LocalizedRoute).fullPath
    }
  }

  if (storeCode && routeObj && config.defaultStoreCode !== storeCode && config.storeViews[storeCode].appendStoreCode) {
    if (typeof routeObj === 'object') {
      if (routeObj.name) {
        routeObj.name = storeCode + '-' + routeObj.name
      }

      if (routeObj.path) {
        routeObj.path = '/' + storeCode + '/' + (routeObj.path.startsWith('/') ? routeObj.path.slice(1) : routeObj.path)
      }
    } else {
      return '/' + storeCode + routeObj
    }
  }

  return routeObj
}

export function setupMultistoreRoutes (config, router: VueRouter, routes: RouteConfig[]): void {
  const allStoreRoutes = [...routes]
  if (config.storeViews.mapStoreUrlsFor.length > 0 && config.storeViews.multistore === true) {
    for (const storeCode of config.storeViews.mapStoreUrlsFor) {
      if (storeCode && (config.defaultStoreCode !== storeCode)) {
        for (const route of routes) {
          const localRoute = localizedRoute(Object.assign({}, route), storeCode)
          allStoreRoutes.push(localRoute)
        }
      }
    }
  }
  RouterManager.addRoutes(allStoreRoutes, router)
}
