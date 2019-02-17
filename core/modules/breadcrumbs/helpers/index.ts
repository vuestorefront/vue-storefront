import rootStore from '@vue-storefront/store'
import { formatCategoryLink } from 'core/modules/url/helpers'

// Duplicate of breadCrumbRoutes, to repalce it soon. 
/** Parse category path for product/category  */
export function parseCategoryPath (categoryPath) {
  let tmpRts = []
  for (let sc of categoryPath) {
    tmpRts.push({
      name: sc.name,
      route_link: formatCategoryLink(sc)
    })
  }

  return tmpRts
}