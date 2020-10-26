import { RawLocation } from 'vue-router'
import { storeViews } from 'config'
import { LocalizedRoute, StoreView } from './../types'
import { getNormalizedPath, getUrl } from './helpers'
import { getExtendedStoreviewConfig } from '.'
import cloneDeep from 'lodash-es/cloneDeep'

const isMatchingByPath = (matchedRouteOrUrl: LocalizedRoute | string, store: StoreView): boolean => {
  const normalizedPath = getNormalizedPath(matchedRouteOrUrl)
  return normalizedPath.startsWith(`${store.url}/`) || normalizedPath === store.url
}

const isMatchingByDomain = (matchedRouteOrUrl: LocalizedRoute | string, store: StoreView): boolean => {
  const url = getUrl(matchedRouteOrUrl)
  return url.startsWith(`${store.url}/`) || url === store.url
}

const isMatchingWithAppendStoreCode = (matchedRouteOrUrl: LocalizedRoute | string, store: StoreView): boolean => {
  const clonedStoreView = cloneDeep(store)
  clonedStoreView.url = `/${store.storeCode}`
  return isMatchingByPath(matchedRouteOrUrl, clonedStoreView) || isMatchingByDomain(matchedRouteOrUrl, clonedStoreView)
}

const storeCodeFromRoute = (matchedRouteOrUrl: LocalizedRoute | RawLocation | string): string => {
  const { multistore, mapStoreUrlsFor = [] } = storeViews
  if (!matchedRouteOrUrl || !multistore) return ''

  for (let storeViewProp of mapStoreUrlsFor) {
    const storeView = getExtendedStoreviewConfig(storeViews[storeViewProp])

    if (!storeView) continue

    if (storeView.appendStoreCode) {
      // legacy
      if (isMatchingWithAppendStoreCode(matchedRouteOrUrl, storeView)) {
        return storeView.storeCode || ''
      }
    } else {
      if (isMatchingByPath(matchedRouteOrUrl, storeView) || isMatchingByDomain(matchedRouteOrUrl, storeView)) {
        return storeView.storeCode || ''
      }
    }
  }

  return ''
}

export default storeCodeFromRoute
