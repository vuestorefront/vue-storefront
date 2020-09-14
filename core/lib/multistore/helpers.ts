export const getNormalizedPath = (matchedRouteOrUrl): string => {
  const matchingPath = matchedRouteOrUrl && (matchedRouteOrUrl.path || matchedRouteOrUrl)

  return matchingPath && (matchingPath.length > 0 && matchingPath[0] !== '/') ? `/${matchingPath}` : matchingPath
}
