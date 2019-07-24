import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import { Payload } from '../types/Payload'

export const forProduct = async ({ dispatch }, { url, params }: Payload) => {
  url = (removeStoreCodeFromRoute(url) as string)
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
