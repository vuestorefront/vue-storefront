import { ActionTree } from 'vuex';
import { UrlState } from '@vue-storefront/core/modules/url/types/UrlState'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import { removeHashFromRoute } from '../helpers'
import config from 'config'
import { Logger } from '@vue-storefront/core/lib/logger';

/**
 * This is copy of the product mapping part from @vue-storefront/core/modules/url/store/actions.ts
 */
const forProduct = async ({ dispatch }, { url, params }) => {
  url = removeStoreCodeFromRoute(url) as string
  const productQuery = new SearchQuery()
  const productSlug = url.split('/').reverse()[0]
  productQuery.applyFilter({key: 'url_path', value: {'eq': productSlug}})
  const products = await dispatch('product/list', { query: productQuery }, { root: true })
  if (products && products.items && products.items.length) {
    const product = products.items[0]
    return {
      name: product.type_id + '-product',
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
const forCategory = async ({ dispatch }, { url, params }) => {
  url = removeStoreCodeFromRoute(url) as string
  try {
    const category = await dispatch('category/single', { key: 'url_path', value: url }, { root: true })
    if (category !== null) {
      return {
        name: 'category',
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
const forCustomUrls = async ({ dispatch }, { url, params }) => {
  url = removeStoreCodeFromRoute(url) as string
  url = removeHashFromRoute(url) as string
  Logger.error('URL:', 'DEBUG', url)()
  if (config.hasOwnProperty('icmaa_url')) {
    const urlFromConfig = config.icmaa_url.find((item) => item.request_path === url);
    if (urlFromConfig) {
      return {
        name: urlFromConfig.name,
        params: urlFromConfig.params
      }
    }
  }

  return undefined
}

export const actions: ActionTree<UrlState, any> = {
  async mappingFallback ({ dispatch }, { url, params }: { url: string, params: any}) {
    const product = await forProduct({ dispatch }, { url, params })
    if (product) {
      return product
    }

    const category = await forCategory({ dispatch }, { url, params })
    if (category) {
      return category
    }

    const customUrl = await forCustomUrls({ dispatch }, { url, params })
    if (customUrl) {
      return customUrl
    }

    throw new Error('No route found for:' + url)
  }
}
