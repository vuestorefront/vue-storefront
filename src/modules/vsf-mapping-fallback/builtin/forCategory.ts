import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import { Payload } from '../types/Payload'

export const forCategory = async ({ dispatch }, { url }: Payload) => {
  url = (removeStoreCodeFromRoute(url) as string)
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
