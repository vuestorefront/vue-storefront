import { RawLocation } from 'vue-router'
import config from 'config'
import { LocalizedRoute } from './../types'
import { getNormalizedPath } from './helpers'
import { getExtendedStoreviewConfig } from '.'

const getUrl = (matchedRouteOrUrl) => {
  const normalizedPath = getNormalizedPath(matchedRouteOrUrl)

  if (matchedRouteOrUrl && typeof matchedRouteOrUrl === 'object') {
    if (matchedRouteOrUrl['host']) {
      return matchedRouteOrUrl['host'] + normalizedPath
    }

    return ''
  }

  return matchedRouteOrUrl
}

const isMatchingByPath = (matchedRouteOrUrl, store) => {
  const normalizedPath = getNormalizedPath(matchedRouteOrUrl)
  return normalizedPath.startsWith(`${store.url}/`) || normalizedPath === store.url
}

const isMatchingByDomainAndPath = (matchedRouteOrUrl, store) => {
  const url = getUrl(matchedRouteOrUrl)
  return url.startsWith(`${store.url}/`) || url === store.url
}

const storeCodeFromRoute = (matchedRouteOrUrl: LocalizedRoute | RawLocation | string): string => {
  if (!matchedRouteOrUrl) return ''

  for (let storeViewProp of config.storeViews.mapStoreUrlsFor) {
    const storeView = getExtendedStoreviewConfig(config.storeViews[storeViewProp])

    if (isMatchingByPath(matchedRouteOrUrl, storeView) || isMatchingByDomainAndPath(matchedRouteOrUrl, storeView)) {
      return storeView.storeCode || ''
    }
  }

  return ''
}

export default storeCodeFromRoute
