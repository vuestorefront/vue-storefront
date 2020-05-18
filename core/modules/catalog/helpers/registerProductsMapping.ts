import { transformProductUrl } from '@vue-storefront/core/modules/url/helpers/transformUrl';
import { localizedDispatcherRoute } from '@vue-storefront/core/lib/multistore';
import { ActionContext } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'

export default async function registerProductsMapping ({ dispatch }: ActionContext<any, RootState>, products = []): Promise<void> {
  await Promise.all(products.map(product => {
    if (product.url_path) {
      const { url_path, sku, slug, type_id, parentSku } = product
      return dispatch('url/registerMapping', {
        url: localizedDispatcherRoute(url_path),
        routeData: transformProductUrl({ sku, parentSku, slug, type_id })
      }, { root: true })
    }
  }))
}
