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
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

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
  appendStoreCode?: boolean,
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
  },
  seo: {
    defaultTitle: string
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
    storeCode: null,
    storeId: config.defaultStoreCode && config.defaultStoreCode !== '' ? config.storeViews[config.defaultStoreCode].storeId : 1,
    seo: config.seo || {}
  }

  if (config.storeViews.multistore === true) {
    storeView.storeCode = storeCode || config.defaultStoreCode || ''
  } else {
    storeView.storeCode = storeCode || ''
  }

  const storeViewHasChanged = !rootStore.state.storeView || rootStore.state.storeView.storeCode !== storeCode

  if (storeView.storeCode && config.storeViews.multistore === true && config.storeViews[storeView.storeCode]) {
    storeView = merge(storeView, getExtendedStoreviewConfig(config.storeViews[storeView.storeCode]))
  }
  rootStore.state.user.current_storecode = storeView.storeCode

  if (storeViewHasChanged) {
    storeView = coreHooksExecutors.beforeStoreViewChanged(storeView)
    rootStore.state.storeView = storeView
    loadLanguageAsync(storeView.i18n.defaultLocale)
  }
  if (storeViewHasChanged || StorageManager.currentStoreCode !== storeCode) {
    initializeSyncTaskStorage()
    StorageManager.currentStoreCode = storeView.storeCode
  }
  coreHooksExecutors.afterStoreViewChanged(storeView)
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
  }
  return ''
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

function removeURLQueryParameter (url, parameter) {
  // prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    // reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      // idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
}

export function adjustMultistoreApiUrl (url: string): string {
  const { storeCode } = currentStoreView()
  if (storeCode) {
    url = removeURLQueryParameter(url, 'storeCode')
    const urlSep = (url.indexOf('?') > 0) ? '&' : '?'
    url += `${urlSep}storeCode=${storeCode}`
  }
  return url
}

export function localizedDispatcherRoute (routeObj: LocalizedRoute | string, storeCode: string): LocalizedRoute | string {
  if (!storeCode) {
    storeCode = currentStoreView().storeCode
  }
  const appendStoreCodePrefix = config.storeViews[storeCode] ? config.storeViews[storeCode].appendStoreCode : false

  if (typeof routeObj === 'string') {
    if (routeObj[0] !== '/') routeObj = `/${routeObj}`
    return appendStoreCodePrefix ? `/${storeCode}${routeObj}` : routeObj
  }

  if (routeObj) {
    if ((routeObj as LocalizedRoute).fullPath && !(routeObj as LocalizedRoute).path) { // support both path and fullPath
      routeObj['path'] = (routeObj as LocalizedRoute).fullPath
    }

    if (routeObj.path) { // case of using dispatcher
      const routeCodePrefix = config.defaultStoreCode !== storeCode && appendStoreCodePrefix ? `/${storeCode}` : ''
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

  if (storeCode && config.defaultStoreCode !== storeCode && config.storeViews[storeCode] && config.storeViews[storeCode].appendStoreCode) {
    if (typeof routeObj !== 'object') {
      return localizedRoutePath(routeObj, storeCode)
    }
    return localizedRouteConfig(routeObj as RouteConfig, storeCode)
  }

  return routeObj
}

export function setupMultistoreRoutes (config, router: VueRouter, routes: RouteConfig[], priority: number = 0): void {
  const allRoutes = []
  const { storeCode, appendStoreCode } = currentStoreView()
  if (storeCode && (appendStoreCode !== false)) {
    allRoutes.push(...routes.map(route => localizedRouteConfig(route, storeCode)))
  } else {
    allRoutes.push(...routes)
  }
  RouterManager.addRoutes(allRoutes, router, true, priority)
}

/**
 * Returns transformed route config with language
 * @param route - route config object
 * @param storeCode - language prefix specified in global config
 * @param isChildRoute - determines if route config is for child route
 */
export function localizedRouteConfig (route: RouteConfig, storeCode: string, isChildRoute: boolean = false): RouteConfig {
  // note: we need shallow copy to prevent modifications in provided route object
  const _route = {...route}

  // TODO - need route name prefix?
  // if (_route.name) {
  //   _route.name = `${storeCode}-${_route.name}`
  // }

  if (_route.path && !isChildRoute) {
    _route.path = localizedRoutePath(_route.path, storeCode)
  }

  if (_route.children) {
    _route.children = _route.children.map(childRoute => localizedRouteConfig(childRoute, storeCode, true))
  }

  return _route
}

/**
 * Returns route path with proper language prefix
 * @param path - route path
 * @param storeCode - language prefix specified in global config
 */
export function localizedRoutePath (path: string, storeCode: string): string {
  const _path = path.startsWith('/') ? path.slice(1) : path

  return `/${storeCode}/${_path}`
}
