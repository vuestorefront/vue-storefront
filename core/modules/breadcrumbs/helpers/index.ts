import rootStore from '@vue-storefront/store'

// Duplicate of breadCrumbRoutes, to repalce it soon. 
/** Parse category path for product/category  */
export function parseCategoryPath (categoryPath) {
  let tmpRts = []
  for (let sc of categoryPath) {
    tmpRts.push({
      name: sc.name,
      route_link: (rootStore.state.config.products.useShortCatalogUrls ? '/' : '/c/') + sc.slug
    })
  }

  return tmpRts
}