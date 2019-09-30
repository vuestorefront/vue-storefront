import { RawLocation } from 'vue-router'
import config from 'config'
import { LocalizedRoute } from './types'
import { storeCodeToStoreUrl } from '@vue-storefront/core/lib/multistore'

const getNormalizedPath = (matchedRouteOrUrl) => {
  const matchingPath = matchedRouteOrUrl && (matchedRouteOrUrl.path || matchedRouteOrUrl)

  return matchingPath && (matchingPath.length > 0 && matchingPath[0] !== '/') ? `/${matchingPath}` : matchingPath
}

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

const isMatchingByPath = (matchedRouteOrUrl, storeCode) => {
  const normalizedPath = getNormalizedPath(matchedRouteOrUrl)
  const storeUrl = storeCodeToStoreUrl(storeCode)
  return normalizedPath.startsWith(`${storeUrl}/`) || normalizedPath === storeUrl
}

const isMatchingByDomainAndPath = (matchedRouteOrUrl, storeCode) => {
  const url = getUrl(matchedRouteOrUrl)
  const storeUrl = storeCodeToStoreUrl(storeCode)
  return url.startsWith(`${storeUrl}/`) || url === storeUrl
}

const storeCodeFromRoute = (matchedRouteOrUrl: LocalizedRoute | RawLocation | string): string => {
  if (!matchedRouteOrUrl) return ''

  for (let storeCode of config.storeViews.mapStoreUrlsFor) {
    const store = config.storeViews[storeCode]

    if (isMatchingByPath(matchedRouteOrUrl, storeCode) || isMatchingByDomainAndPath(matchedRouteOrUrl, storeCode)) {
      return storeCode
    }
  }

  return ''
}

export default storeCodeFromRoute
