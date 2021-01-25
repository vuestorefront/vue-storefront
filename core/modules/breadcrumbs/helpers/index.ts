import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

// Duplicate of breadCrumbRoutes, to replace it soon.
/** Parse category path for product/category  */
export function parseCategoryPath (categoryPath) {
  let routesArray = []
  for (let category of categoryPath) {
    if (category.url_path === undefined || category.url_path === null) continue;
    routesArray.push({
      name: category.name,
      route_link: formatCategoryLink(category)
    })
  }

  return routesArray
}
