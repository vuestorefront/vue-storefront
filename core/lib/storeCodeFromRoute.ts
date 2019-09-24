import { RawLocation } from 'vue-router'
import config from 'config'
import { LocalizedRoute } from './types'

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

  for (let storeCode of config.storeViews.mapStoreUrlsFor) {
    const store = config.storeViews[storeCode]

    if (isMatchingByPath(matchedRouteOrUrl, store) || isMatchingByDomainAndPath(matchedRouteOrUrl, store)) {
      return storeCode
    }
  }

  return ''
}

export default storeCodeFromRoute
