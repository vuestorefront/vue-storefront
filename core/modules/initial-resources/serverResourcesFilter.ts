import { getConfigWithRegex, createRegexpMatcher, flatToRegexpList } from './helpers';

const config = require('config')
const initialResources = getConfigWithRegex(config)

const prefetchRegexps = flatToRegexpList(
  initialResources.filter(filterConfig => filterConfig.rel !== 'preload')
)
export const shouldPrefetch = (file: string) => {
  if (prefetchRegexps.length) {
    const checkRegexpList = createRegexpMatcher(file)
    const matchFilter = checkRegexpList(prefetchRegexps)

    return !matchFilter
  }
  return true
}

const preloadRegexps = flatToRegexpList(
  initialResources.filter(filterConfig => filterConfig.rel === 'preload')
)
export const shouldPreload = (file: string) => {
  if (preloadRegexps.length) {
    const checkRegexpList = createRegexpMatcher(file)
    const matchFilter = checkRegexpList(preloadRegexps)

    return !matchFilter
  }
  return true
}
