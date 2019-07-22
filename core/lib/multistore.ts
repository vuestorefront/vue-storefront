import rootStore from '../store'
import { loadLanguageAsync } from '@vue-storefront/i18n'
import { initializeSyncTaskStorage } from './sync/task'
import { Logger } from '@vue-storefront/core/lib/logger'
import Vue from 'vue'
import queryString from 'query-string'
import merge from 'lodash-es/merge'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import VueRouter, { RouteConfig, RawLocation } from 'vue-router'
import config from 'config'
import { coreHooksExecutors } from '@vue-storefront/core/hooks'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export interface LocalizedRoute {
  path?: string,
  name?: string,
  hash?: string,
  params?: { [key: string]: unknown },
  fullPath?: string,
  host?: string
}

export interface StoreView {
  storeCode: string,
  extend?: string,
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
    calculateServerSide: boolean,
    userGroupId?: number,
    useOnlyDefaultUserGroupId: boolean
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

function getExtendedStoreviewConfig (storeView: StoreView): StoreView {
  if (storeView.extend) {
    const originalParent = storeView.extend

    if (!config.storeViews[originalParent]) {
      Logger.error(`Storeview "${storeView.extend}" doesn't exist!`)()
    } else {
      delete storeView.extend

      storeView = merge(
        {},
        getExtendedStoreviewConfig(config.storeViews[originalParent]),
        storeView
      )
      storeView.extend = originalParent
    }
  }

  return storeView
}

export function currentStoreView (): StoreView {
  // TODO: Change to getter all along our code
  return rootStore.state.storeView
}

export function prepareStoreView (storeCode: string): StoreView {
  let storeView: StoreView = { // current, default store
    tax: config.tax,
    i18n: config.i18n,
    elasticsearch: config.elasticsearch,
    storeCode: '',
    storeId: config.defaultStoreCode && config.defaultStoreCode !== '' ? config.storeViews[config.defaultStoreCode].storeId : 1
  }
  const storeViewHasChanged = !rootStore.state.storeView || rootStore.state.storeView.storeCode !== storeCode

  if (storeCode) { // current store code
    if ((config.storeViews[storeCode])) {
      rootStore.state.user.current_storecode = storeCode
      storeView = merge(storeView, getExtendedStoreviewConfig(config.storeViews[storeCode]))
    }
  } else {
    storeView.storeCode = config.defaultStoreCode || ''
    rootStore.state.user.current_storecode = config.defaultStoreCode || ''
  }

  loadLanguageAsync(storeView.i18n.defaultLocale)

  if (storeViewHasChanged) {
    storeView = coreHooksExecutors.beforeStoreViewChange(storeView)
    rootStore.state.storeView = storeView
  }
  if (storeViewHasChanged || StorageManager.currentStoreCode !== storeCode) {
    initializeSyncTaskStorage()
    StorageManager.currentStoreCode = storeView.storeCode
  }
  coreHooksExecutors.afterStoreViewChange(storeView)
  return storeView
}

export function storeCodeFromRoute (matchedRouteOrUrl: LocalizedRoute | RawLocation | string): string {
  if (matchedRouteOrUrl) {
    for (let storeCode of config.storeViews.mapStoreUrlsFor) {
      const store = config.storeViews[storeCode]

      // handle resolving by path
      const matchingPath = typeof matchedRouteOrUrl === 'object' ? matchedRouteOrUrl.path : matchedRouteOrUrl
      let normalizedPath = matchingPath // assume that matching string is a path
      if (matchingPath.length > 0 && matchingPath[0] !== '/') {
        normalizedPath = '/' + matchingPath
      }

      if (normalizedPath.startsWith(`${store.url}/`) || normalizedPath === store.url) {
        return storeCode
      }

      // handle resolving by domain+path
      let url = ''

      if (typeof matchedRouteOrUrl === 'object') {
        if (matchedRouteOrUrl['host']) {
          url = matchedRouteOrUrl['host'] + normalizedPath
        } else {
          return '' // this route does not have url so there is nothing to do here
        }
      } else {
        url = matchedRouteOrUrl as string
      }

      if (url.startsWith(`${store.url}/`) || url === store.url) {
        return storeCode
      }
    }

    return ''
  } else {
    return ''
  }
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
  const appendStoreCodePrefix = config.storeViews[storeCode] ? config.storeViews[storeCode].appendStoreCode : false

  if (typeof routeObj === 'string') {
    return appendStoreCodePrefix ? '/' + storeCode + routeObj : routeObj
  }

  if (routeObj && routeObj.fullPath) { // case of using dispatcher
    const routeCodePrefix = config.defaultStoreCode !== storeCode && appendStoreCodePrefix ? `/${storeCode}` : ''
    const qrStr = queryString.stringify(routeObj.params);

    return `${routeCodePrefix}/${routeObj.fullPath}${qrStr ? `?${qrStr}` : ''}`
  }

  return routeObj
}

export function localizedRoute (routeObj: LocalizedRoute | string | RouteConfig | RawLocation, storeCode: string): any {
  if (routeObj && (routeObj as LocalizedRoute).fullPath && config.seo.useUrlDispatcher) {
    return localizedDispatcherRoute(Object.assign({}, routeObj) as LocalizedRoute, storeCode)
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
