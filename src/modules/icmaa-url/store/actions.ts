import { ActionTree } from 'vuex';
import { UrlState } from '@vue-storefront/core/modules/url/types/UrlState'
import { PageStateItem } from 'icmaa-cms/types/PageState'
import { GenericStateItem } from 'icmaa-cms/types/GenericState'
import { Competition as CompetitionStateItem } from 'icmaa-competitions/types/CompetitionsState'
import { removeStoreCodeFromRoute, currentStoreView, localizedDispatcherRouteName } from '@vue-storefront/core/lib/multistore'
import { removeHashFromRoute } from '../helpers'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'

interface UrlMapperOptions {
  urlPath: string,
  params: Record<string, any>
}

const getUrlPathFromUrl = (url): string => {
  let path = removeStoreCodeFromRoute(url.startsWith('/') ? url.slice(1) : url) as string
  return removeHashFromRoute(path) as string
}

const getLocalizedDispatcherRouteName = (name) => {
  const { storeCode, appendStoreCode } = currentStoreView()
  return localizedDispatcherRouteName(name, storeCode, appendStoreCode)
}

/**
 * This is our custom url fallback mapper for custom urls
 */
const forCustomUrls = async ({ dispatch }, { urlPath }: UrlMapperOptions) => {
  if (config.hasOwnProperty('icmaa_url')) {
    const urlFromConfig = config.icmaa_url.find((item) => item.request_path === urlPath);
    if (urlFromConfig) {
      return {
        name: urlFromConfig.name,
        params: urlFromConfig.params
      }
    }
  }

  return undefined
}

/**
 * This is our cms page url fallback mapper
 */
const forCmsPageUrls = async ({ dispatch }, { urlPath }: UrlMapperOptions) => {
  return dispatch('icmaaCmsPage/single', { value: urlPath }, { root: true })
    .then((page: PageStateItem) => {
      if (page !== null && (page.content || page.rte)) {
        return {
          name: getLocalizedDispatcherRouteName(page.routeName || 'icmaa-cms-page'),
          params: {
            identifier: page.identifier
          }
        }
      }

      return undefined
    })
    .catch(() => undefined)
}

/**
 * This is our cms landing page url fallback mapper
 */
const forCmsLandingPageUrls = async ({ dispatch }, { urlPath }: UrlMapperOptions) => {
  return dispatch('icmaaCmsLangingPages/single', { value: urlPath }, { root: true })
    .then((page: GenericStateItem) => {
      if (page !== null) {
        return {
          name: getLocalizedDispatcherRouteName('icmaa-cms-landing-page'),
          params: {
            identifier: page.identifier
          }
        }
      }

      return undefined
    })
    .catch(() => undefined)
}

/**
 * This is our competitions url fallback mapper
 */
const forCmsCompetitionsUrls = async ({ dispatch }, { urlPath }: UrlMapperOptions) => {
  return dispatch('icmaaCompetitions/single', { value: urlPath }, { root: true })
    .then((competition: CompetitionStateItem) => {
      if (competition !== null && competition.enabled === true) {
        return {
          name: 'icmaa-competition',
          params: {
            identifier: competition.identifier
          }
        }
      }

      return undefined
    })
    .catch(() => undefined)
}

export const actions: ActionTree<UrlState, any> = {
  async mapFallbackUrl ({ dispatch }, { url, params }: { url: string, params: any}) {
    const urlPath = getUrlPathFromUrl(url)
    const paramsObj = { urlPath, params }

    const customUrl = await forCustomUrls({ dispatch }, paramsObj)
    if (customUrl) {
      return customUrl
    }

    // This is the code of VSF
    const fallbackData = await dispatch('getFallbackByUrl', { url: urlPath })
    if (fallbackData) {
      const [result] = await Promise.all([
        dispatch('transformFallback', { ...fallbackData, params }),
        dispatch('saveFallbackData', fallbackData)
      ])
      return result
    }

    const cmsPageUrl = await forCmsPageUrls({ dispatch }, paramsObj)
    if (cmsPageUrl) {
      return cmsPageUrl
    }

    const cmsLandingPageUrl = await forCmsLandingPageUrls({ dispatch }, paramsObj)
    if (cmsLandingPageUrl) {
      return cmsLandingPageUrl
    }

    const cmsCompetitionsUrl = await forCmsCompetitionsUrls({ dispatch }, paramsObj)
    if (cmsCompetitionsUrl) {
      return cmsCompetitionsUrl
    }

    Logger.error('No route found for:', 'icmaa-url', url)()

    return {
      name: 'page-not-found',
      params: {
        slug: 'page-not-found'
      }
    }
  }
}
