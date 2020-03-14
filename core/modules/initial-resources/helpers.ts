import { InitialResourcesElement } from './types';

const createRegexp = (type = 'script', filter = ''): RegExp => {
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

const createRegexpList = ({ type = 'script', filters = [] }: InitialResourcesElement): RegExp[] => filters.map(createRegexp.bind(null, type))

export const createRegexpMatcher = (file: string) => (regexps: RegExp[]): boolean => regexps.some(regexp => file.match(regexp))

export const getConfigWithRegex = (config): InitialResourcesElement[] => {
  const initialResourcesConfig: InitialResourcesElement[] = config.initialResources || []

  return initialResourcesConfig
    .map(resourceConfig => ({
      ...resourceConfig,
      regexps: createRegexpList(resourceConfig)
    }))
}

export const flatToRegexpList = (configs: InitialResourcesElement[]) => configs
  .map(pConfig => pConfig.regexps)
  .reduce((acc, val) => acc.concat(val), [])
