import config from 'config'
import { LocalizedRoute } from '@vue-storefront/core/lib/types'
import { localizedDispatcherRoute, localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'

export function removeHashFromRoute (matchedRouteOrUrl: LocalizedRoute | string): LocalizedRoute | string {
  let urlPath = typeof matchedRouteOrUrl === 'object' ? matchedRouteOrUrl.path : matchedRouteOrUrl
  return urlPath.replace(/#.*$/m, '')
}

/**
 * Copy of @vue-storefront/core/modules/url/helpers/index.ts
 * but with an option to leave childSku out of URL.
 * @param product
 * @param storeCode
 */
export function formatProductLink (
  product: {
    parentSku?: string,
    sku: string,
    url_path?: string,
    type_id: string,
    slug: string,
    options?: [],
    configurable_children?: []
  },
  storeCode,
  showChildSku: boolean = false
): string | LocalizedRoute {
  if (config.seo.useUrlDispatcher && product.url_path) {
    let routeData: LocalizedRoute
    if (showChildSku && ((product.options && product.options.length > 0) || (product.configurable_children && product.configurable_children.length > 0))) {
      routeData = {
        path: product.url_path,
        params: { childSku: product.sku }
      }
    } else {
      routeData = { path: product.url_path }
    }
    return localizedDispatcherRoute(routeData, storeCode)
  } else {
    const routeData: LocalizedRoute = {
      name: product.type_id + '-product',
      params: {
        parentSku: product.parentSku ? product.parentSku : product.sku,
        slug: product.slug
      }
    }

    if (showChildSku) {
      routeData.params.childSku = product.sku
    }

    return localizedRoute(routeData, storeCode)
  }
}
