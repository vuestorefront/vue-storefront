import { addRegexpListToConfig, createRegexpMatcher, flatToRegexpList } from './helpers';

const config = require('config')
const initialResources = addRegexpListToConfig(config)

const prefetchRegexps = flatToRegexpList(
  initialResources.filter(filterConfig => filterConfig.rel !== 'preload')
)
/**
 * vue-ssr method that filters prefetch files based on initialResources config
 */
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
/**
 * vue-ssr method that filters preload files based on initialResources config
 */
export const shouldPreload = (file: string) => {
  if (preloadRegexps.length) {
    const checkRegexpList = createRegexpMatcher(file)
    const matchFilter = checkRegexpList(preloadRegexps)

    return !matchFilter
  }
  return true
}
