import rootStore from './../../store'
import { loadLanguageAsync } from '@vue-storefront/i18n'
import { initializeSyncTaskStorage } from './../sync/task'
import { Logger } from '@vue-storefront/core/lib/logger'
import queryString from 'query-string'
import merge from 'lodash-es/merge'
import VueRouter, { RouteConfig, RawLocation } from 'vue-router'
import config from 'config'
import { coreHooksExecutors } from '@vue-storefront/core/hooks'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { LocalizedRoute, StoreView } from './../types'
import storeCodeFromRoute from './storeCodeFromRoute'
import cloneDeep from 'lodash-es/cloneDeep'
import get from 'lodash-es/get'
import { isServer } from '@vue-storefront/core/helpers'
import { getNormalizedPath, getPrefixFromUrl } from './helpers'
import getStoreViewByStoreCode from './getStoreViewByStoreCode'
import removeLocalization from './removeLocalization'

export {
  removeLocalization
}

export function getExtendedStoreviewConfig (storeView: StoreView): StoreView {
  if (!storeView) return storeView
  if (storeView.extend) {
    const originalParent = storeView.extend

    if (!config.storeViews[originalParent]) {
      Logger.error(`Storeview "${storeView.extend}" doesn't exist!`)()
    } else {
      storeView = merge(
        {},
        getExtendedStoreviewConfig(config.storeViews[originalParent]),
        storeView
      )
    }
  }

  return storeView
}

/**
 * Returns base storeView object that can be created without storeCode
 */
function buildBaseStoreView (): StoreView {
  return cloneDeep({
    tax: config.tax,
    i18n: config.i18n,
    elasticsearch: config.elasticsearch,
    storeCode: null,
    storeId: 1,
    seo: config.seo
  })
}

export function currentStoreView (): StoreView {
  const serverStoreView = get(global, 'process.storeView', undefined)
  const clientStoreView = get(rootStore, 'state.storeView', undefined)
  return (isServer ? serverStoreView : clientStoreView) || buildBaseStoreView()
}

export async function prepareStoreView (storeCode: string): Promise<StoreView> {
  let storeView: StoreView = buildBaseStoreView() // current, default store
  if (config.storeViews.multistore === true) {
    storeView.storeCode = storeCode || config.defaultStoreCode || ''
  } else {
    storeView.storeCode = storeCode || ''
  }

  const storeViewHasChanged = !rootStore.state.storeView || rootStore.state.storeView.storeCode !== storeCode

  if (storeView.storeCode && config.storeViews.multistore && getStoreViewByStoreCode(storeView.storeCode)) {
    storeView = merge(storeView, getExtendedStoreviewConfig(getStoreViewByStoreCode(storeView.storeCode)))
  }

  if (rootStore.state.user) {
    rootStore.state.user.current_storecode = storeView.storeCode
  }

  if (storeViewHasChanged) {
    storeView = coreHooksExecutors.beforeStoreViewChanged(storeView)
    rootStore.state.storeView = storeView

    if (global && isServer) {
      (global.process as any).storeView = storeView
    }

    await loadLanguageAsync(storeView.i18n.defaultLocale)
  }
  if (storeViewHasChanged || StorageManager.currentStoreCode !== storeCode) {
    initializeSyncTaskStorage()
    StorageManager.currentStoreCode = storeView.storeCode
  }

  coreHooksExecutors.afterStoreViewChanged(storeView)

  return storeView
}

export function removeStoreCodeFromRoute (matchedRouteOrUrl: LocalizedRoute | string): LocalizedRoute | string {
  const storeCodeInRoute = storeCodeFromRoute(matchedRouteOrUrl)
  if (storeCodeInRoute !== '') {
    const urlPath = getNormalizedPath(matchedRouteOrUrl)
    if (urlPath === `/${storeCodeInRoute}`) return ''
    return urlPath.replace(new RegExp(`^/${storeCodeInRoute}/`, 'g'), '')
  } else {
    return matchedRouteOrUrl
  }
}

export function adjustMultistoreApiUrl (url: string): string {
  const { storeCode } = currentStoreView()
  if (storeCode) {
    const parsedUrl = queryString.parseUrl(url)
    parsedUrl.query.storeCode = storeCode
    return queryString.stringifyUrl(parsedUrl)
  }
  return url
}

/**
 * Returns route path with proper language prefix
 * @param path - route path
 * @param storeCode - language prefix specified in global config
 */
export function localizedRoutePath (path: string, storeCode: string): string {
  const storeView = getStoreViewByStoreCode(storeCode)

  if (!storeView) return path

  const _path = path.startsWith('/') ? path.slice(1) : path

  if (storeView.appendStoreCode) {
    return `/${storeView.storeCode}/${_path}`
  }

  const url = storeView.url ? getPrefixFromUrl(storeView.url) : '/'

  return `${url === '/' ? '' : url}/${_path}`
}

/**
 * Returns transformed route config with language
 * @param route - route config object
 * @param storeCode - language prefix specified in global config
 * @param isChildRoute - determines if route config is for child route
 */
export function localizedRouteConfig (route: RouteConfig, storeCode: string, isChildRoute: boolean = false): RouteConfig {
  // note: we need shallow copy to prevent modifications in provided route object
  const _route = { ...route }

  if (_route.name && storeCode) {
    _route.name = `${storeCode}-${_route.name}`
  }

  if (_route.path && !isChildRoute) {
    _route.path = localizedRoutePath(_route.path, storeCode)
  }

  if (_route.children) {
    _route.children = _route.children.map(childRoute => localizedRouteConfig(childRoute, storeCode, true))
  }

  return _route
}

export function localizedRoute (routeObj: LocalizedRoute | string | RouteConfig | RawLocation, forcedStoreCode?: string): any {
  // return falsy value
  if (!routeObj) return routeObj
  // prep route object
  if ((typeof routeObj === 'object')) {
    if ((routeObj as LocalizedRoute).fullPath && !(routeObj as LocalizedRoute).path) { // support both path and fullPath
      routeObj['path'] = (routeObj as LocalizedRoute).fullPath
    }
  }
  // do not make localization when multistore is off
  if (!config.storeViews.multistore) return routeObj

  const storeCode = (forcedStoreCode && getStoreViewByStoreCode(forcedStoreCode))
    ? forcedStoreCode
    : currentStoreView().storeCode

  if (storeCode) {
    if (typeof routeObj !== 'object') {
      return localizedRoutePath(routeObj, storeCode)
    }
    return localizedRouteConfig(routeObj as RouteConfig, storeCode)
  }

  return routeObj
}

export function localizedDispatcherRoute (routeObj: LocalizedRoute | string, storeCode?: string): LocalizedRoute | string {
  const localizedRouteObject = localizedRoute(routeObj, storeCode)

  if (typeof localizedRouteObject === 'string') {
    return localizedRouteObject
  }

  const qrStr = queryString.stringify((routeObj as LocalizedRoute).params);
  return `${getNormalizedPath(localizedRouteObject.path)}${qrStr ? `?${qrStr}` : ''}`
}

export function localizedDispatcherRouteName (routeName: string, storeCode: string, appendStoreCode?: boolean): string {
  if (config.defaultStoreCode !== storeCode) {
    return `${storeCode}-${routeName}`
  }
  return routeName
}

export function setupMultistoreRoutes (config, router: VueRouter, routes: RouteConfig[], priority: number = 0): void {
  const allRoutes: RouteConfig[] = []
  const { storeCode } = currentStoreView()
  if (config.defaultStoreCode !== storeCode && config.storeViews.multistore) {
    allRoutes.push(...routes.map(route => localizedRouteConfig(route, storeCode)))
  } else {
    allRoutes.push(...routes)
    if (storeCode) {
      allRoutes.push(...routes.map(route => localizedRouteConfig(route, storeCode)))
    }
  }
  router.addRoutes(allRoutes, true, priority)
}
