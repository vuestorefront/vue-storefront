import { RawLocation } from 'vue-router'
import config from 'config'
import { LocalizedRoute } from './../types'
import { getNormalizedPath, getUrl } from './helpers'
import { getExtendedStoreviewConfig } from '.'
import cloneDeep from 'lodash-es/cloneDeep'

const isMatchingByPath = (matchedRouteOrUrl, store) => {
  const normalizedPath = getNormalizedPath(matchedRouteOrUrl)
  return normalizedPath.startsWith(`${store.url}/`) || normalizedPath === store.url
}

const isMatchingByDomainAndPath = (matchedRouteOrUrl, store) => {
  const url = getUrl(matchedRouteOrUrl)
  return url.startsWith(`${store.url}/`) || url === store.url
}

const isMatchingWithAppendStoreCode = (matchedRouteOrUrl, store) => {
  const clonedStoreView = cloneDeep(store)
  clonedStoreView.url = `/${store.storeCode}`
  return isMatchingByPath(matchedRouteOrUrl, clonedStoreView) || isMatchingByDomainAndPath(matchedRouteOrUrl, clonedStoreView)
}

const storeCodeFromRoute = (matchedRouteOrUrl: LocalizedRoute | RawLocation | string): string => {
  const { multistore, mapStoreUrlsFor = [] } = config.storeViews
  if (!matchedRouteOrUrl || !multistore) return ''

  for (let storeViewProp of mapStoreUrlsFor) {
    const storeView = getExtendedStoreviewConfig(config.storeViews[storeViewProp])

    if (!storeView) break

    if (storeView.appendStoreCode) {
      // legacy
      if (isMatchingWithAppendStoreCode(matchedRouteOrUrl, storeView)) {
        return storeView.storeCode || ''
      }
    } else {
      if (isMatchingByPath(matchedRouteOrUrl, storeView) || isMatchingByDomainAndPath(matchedRouteOrUrl, storeView)) {
        return storeView.storeCode || ''
      }
    }
  }

  return ''
}

export default storeCodeFromRoute
