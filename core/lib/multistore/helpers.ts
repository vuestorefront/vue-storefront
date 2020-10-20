export const removeProtocool = (url) => url.replace(/^https?:\/\//i, '')

export const getNormalizedPath = (matchedRouteOrUrl): string => {
  const matchingPath = matchedRouteOrUrl && (matchedRouteOrUrl.path || matchedRouteOrUrl)

  return matchingPath && (matchingPath.length > 0 && matchingPath[0] !== '/') ? `/${matchingPath}` : matchingPath
}

export const getPrefixFromUrl = (url): string => {
  if (url.startsWith('/')) return url

  const firstPart = removeProtocool(url).split('/')[1]

  return firstPart ? `/${firstPart}` : '/'
}

export const getUrl = (matchedRouteOrUrl) => {
  const normalizedPath = getNormalizedPath(matchedRouteOrUrl)

  if (matchedRouteOrUrl && typeof matchedRouteOrUrl === 'object') {
    if (matchedRouteOrUrl['host']) {
      return matchedRouteOrUrl['host'] + normalizedPath
    }

    return matchedRouteOrUrl.path || ''
  }

  return matchedRouteOrUrl
}
