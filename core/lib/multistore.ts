import rootStore from '../store'
import { loadLanguageAsync } from '@vue-storefront/i18n'
import { initializeSyncTaskStorage } from './sync/task'
import Vue from 'vue'
import queryString from 'query-string'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import VueRouter, { RouteConfig, RawLocation } from 'vue-router';

export interface LocalizedRoute {
  path?: string,
  name?: string,
  hash?: string,
  params?: object,
  fullPath?: string,
}

export interface StoreView {
  storeCode: string,
  disabled?: boolean,
  storeId: any,
  name?: string,
  url?: string,
  elasticsearch: {
    host: string,
    index: string
  },
  tax: {
    sourcePriceIncludesTax: boolean,
    defaultCountry: string,
    defaultRegion: null | string,
    calculateServerSide: boolean
  },
  i18n: {
    fullCountryName: string,
    fullLanguageName: string,
    defaultLanguage: string,
    defaultCountry: string,
    defaultLocale: string,
    currencyCode: string,
    currencySign: string,
    dateFormat: string
  }
}

export function currentStoreView () : StoreView {
  // TODO: Change to getter all along our code
  return rootStore.state.storeView
}

export function prepareStoreView (storeCode: string) : StoreView {
  const config = rootStore.state.config
  let storeView = { // current, default store
    tax: config.tax,
    i18n: config.i18n,
    elasticsearch: config.elasticsearch,
    storeCode: '',
    storeId: 0
  }
  const storeViewHasChanged = !rootStore.state.storeView || rootStore.state.storeView.storeCode !== storeCode
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
  if (storeViewHasChanged) {
    rootStore.state.storeView = storeView
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

export function storeCodeFromRoute (matchedRouteOrUrl: LocalizedRoute | RawLocation | string) : string {
  if (matchedRouteOrUrl) {
    for (const storeCode of rootStore.state.config.storeViews.mapStoreUrlsFor) {
      let urlPath = typeof matchedRouteOrUrl === 'object' ? matchedRouteOrUrl.path : matchedRouteOrUrl
      if (urlPath.length > 0 && urlPath[0] !== '/') urlPath = '/' + urlPath
      if (urlPath.startsWith('/' + storeCode + '/') || urlPath === '/' + storeCode) {
        return storeCode
      }
    }
    return ''
  } else {
    return ''
  }
}
export function removeStoreCodeFromRoute (matchedRouteOrUrl: LocalizedRoute | string) : LocalizedRoute | string {
  const storeCodeInRoute = storeCodeFromRoute(matchedRouteOrUrl)
  if (storeCodeInRoute !== '') {
    let urlPath = typeof matchedRouteOrUrl === 'object' ? matchedRouteOrUrl.path : matchedRouteOrUrl
    return urlPath.replace(storeCodeInRoute + '/', '')
  } else {
    return matchedRouteOrUrl
  }
}
export function adjustMultistoreApiUrl (url: string) : string {
  const storeView = currentStoreView()
  if (storeView.storeCode) {
    const urlSep = (url.indexOf('?') > 0) ? '&' : '?'
    url += urlSep + 'storeCode=' + storeView.storeCode
  }
  return url
}

export function localizedRoute (routeObj: LocalizedRoute | string | RouteConfig | RawLocation, storeCode: string): any {
  if (routeObj && (<LocalizedRoute>routeObj).fullPath && rootStore.state.config.seo.useUrlDispatcher) return localizedDispatcherRoute(<LocalizedRoute>Object.assign({}, routeObj, { params: null }), storeCode)
  if (storeCode && routeObj && rootStore.state.config.defaultStoreCode !== storeCode) {
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
export function localizedDispatcherRoute (routeObj: LocalizedRoute | string, storeCode: string): LocalizedRoute | string {
  if (typeof routeObj === 'string') {
    return '/' + storeCode + routeObj
  } 
  if (routeObj && routeObj.fullPath) { // case of using dispatcher
    const routeCodePrefix = rootStore.state.config.defaultStoreCode !== storeCode ? `/${storeCode}` : ''
    const qrStr = queryString.stringify(routeObj.params)
    return `${routeCodePrefix}/${routeObj.fullPath}${qrStr ? `?${qrStr}` : ''}`
  }
  return routeObj
}

export function setupMultistoreRoutes (config, router: VueRouter, routes: RouteConfig[]): void  {
  if (config.storeViews.mapStoreUrlsFor.length > 0 && config.storeViews.multistore === true) {
    for (let storeCode of config.storeViews.mapStoreUrlsFor) {
      if (storeCode && (config.defaultStoreCode !== storeCode)) {
        let storeRoutes = []
        for (let route of routes) {
          const localRoute = localizedRoute(Object.assign({}, route), storeCode)
          storeRoutes.push(localRoute)
        }
        RouterManager.addRoutes(storeRoutes, router)
      }
    }
  }
}
