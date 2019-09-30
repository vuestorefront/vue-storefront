import { ActionTree } from 'vuex';
import { UrlState } from '@vue-storefront/core/modules/url/types/UrlState'
import { PageStateItem } from 'icmaa-cms/types/PageState'
import { removeStoreCodeFromRoute, currentStoreView, localizedDispatcherRouteName } from '@vue-storefront/core/lib/multistore'
import { removeHashFromRoute } from '../helpers'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
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
  return !appendStoreCode ? name : localizedDispatcherRouteName(name, storeCode)
}

/**
 * This is copy of the product mapping part from @vue-storefront/core/modules/url/store/actions.ts
 */
const forProduct = async ({ dispatch }, { urlPath, params }: UrlMapperOptions) => {
  const query = new SearchQuery()
  const productSlug = urlPath.split('/').reverse()[0]
  query.applyFilter({key: 'url_path', value: {'eq': productSlug}})
  const products = await dispatch('product/list', { query }, { root: true })
  if (products && products.items && products.items.length) {
    const product = products.items[0]
    return {
      name: getLocalizedDispatcherRouteName(product.type_id + '-product'),
      params: {
        slug: product.slug,
        parentSku: product.sku,
        childSku: params['childSku'] ? params['childSku'] : product.sku
      }
    }
  }
}

/**
 * This is copy of the category mapping part from @vue-storefront/core/modules/url/store/actions.ts
 */
const forCategory = async ({ dispatch }, { urlPath }: UrlMapperOptions) => {
  try {
    const searchOptions = { filters: { 'url_path': urlPath } }
    const category = await dispatch('category-next/loadCategory', searchOptions, { root: true })
    if (category !== null) {
      return {
        name: getLocalizedDispatcherRouteName('category'),
        params: {
          slug: category.slug
        }
      }
    }
  } catch {
    return undefined
  }
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
      if (page !== null && page.content) {
        return {
          name: page.routeName || 'icmaa-cms-page',
          params: {
            identifier: page.identifier
          }
        }
      }

      return undefined
    })
    .catch(() => undefined)
}

export const actions: ActionTree<UrlState, any> = {
  async mappingFallback ({ dispatch }, { url, params }: { url: string, params: any}) {
    const urlPath = getUrlPathFromUrl(url)
    const paramsObj = { urlPath, params }

    const product = await forProduct({ dispatch }, paramsObj)
    if (product) {
      return product
    }

    const category = await forCategory({ dispatch }, paramsObj)
    if (category) {
      return category
    }

    const customUrl = await forCustomUrls({ dispatch }, paramsObj)
    if (customUrl) {
      return customUrl
    }

    const cmsPageUrl = await forCmsPageUrls({ dispatch }, paramsObj)
    if (cmsPageUrl) {
      return cmsPageUrl
    }

    throw new Error('No route found for:' + url)
  }
}
