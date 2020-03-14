import { InitialResources } from './types';

/**
 * Creates RegExp based on type and provided filter/filname in config.
 * There is option to create custom regexp by not providing type.
 * @param type - type of resources
 * @param filter - part of regex that will filter files from prefetch or preload
 */
const createRegexp = (type, filter = ''): RegExp => {
  switch (type) {
    case 'script': {
      return new RegExp(`^${filter}(\\..+\\.|\\.)js`, 'gi')
    }
    case 'style': {
      return new RegExp(`^${filter}(\\..+\\.|\\.)css`, 'gi')
    }
    default: {
      return new RegExp(`${filter}`, 'gi')
    }
  }
}

/**
 * Create RegExp list based on initialResources config
 */
const createRegexpList = ({ type, filters = [] }: InitialResources): RegExp[] => filters.map(createRegexp.bind(null, type))

/**
 * Returns function that require RegExp list. Then after second call we will get boolean that determines if file match any regexp.
 * @param file - this is filename that will be checked
 */
export const createRegexpMatcher = (file: string) => (regexps: RegExp[]): boolean => regexps.some(regexp => file.match(regexp))

/**
 * Extended initialResurces config by adding to it list of RegExp.
 */
export const addRegexpListToConfig = (config): InitialResources[] => {
  const initialResourcesConfig: InitialResources[] = config.initialResources || []

  return initialResourcesConfig
    .map(resourceConfig => ({
      ...resourceConfig,
      regexps: createRegexpList(resourceConfig)
    }))
}

/**
 * Returns RegExp list from extended initialResources config.
 */
export const flatToRegexpList = (configs: InitialResources[]) => configs
  .map(pConfig => pConfig.regexps)
  .reduce((acc, val) => acc.concat(val), [])
