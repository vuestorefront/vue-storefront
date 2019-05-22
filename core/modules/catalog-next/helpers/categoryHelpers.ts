import { parseCategoryPath } from '@vue-storefront/core/modules/breadcrumbs/helpers'

export const calculateBreadcrumbs = (categories, id, list = []) => {
  const category = categories.find(category => category.id === id)
  if (!category) return parseCategoryPath(list).reverse()
  const result = [...list, category]

  if(category.level > 1 && category.parent_id) {
    return calculateBreadcrumbs(categories, category.parent_id, result)
  }
  return parseCategoryPath(result).reverse()
}
