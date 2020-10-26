import { LocalizedRoute } from './../types'

export const removeProtocool = (url: string): string => url.replace(/^https?:\/\//i, '')

export const getNormalizedPath = (matchedRouteOrUrl: LocalizedRoute | string): string => {
  let matchingPath = matchedRouteOrUrl && ((matchedRouteOrUrl as LocalizedRoute).path || matchedRouteOrUrl)
  matchingPath = matchingPath as string
  return matchingPath && (matchingPath.length > 0 && matchingPath[0] !== '/') ? `/${matchingPath}` : matchingPath
}

export const getPrefixFromUrl = (url: string): string => {
  if (url.startsWith('/')) return url

  const firstPart = removeProtocool(url).split('/')[1]

  return firstPart ? `/${firstPart}` : '/'
}

export const getUrl = (matchedRouteOrUrl: LocalizedRoute | string): string => {
  if (matchedRouteOrUrl && typeof matchedRouteOrUrl === 'object') {
    if (matchedRouteOrUrl['host']) {
      const normalizedPath = getNormalizedPath(matchedRouteOrUrl)
      return matchedRouteOrUrl['host'] + normalizedPath
    }

    return matchedRouteOrUrl.path || ''
  }

  return matchedRouteOrUrl as string
}
