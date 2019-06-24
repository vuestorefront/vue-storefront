import { parseCategoryPath } from '@vue-storefront/core/modules/breadcrumbs/helpers'
import { Category, ChildrenData } from '../types/Category';

export const compareByLabel = (a, b) => {
  if (a.label < b.label) {
    return -1
  }
  if (a.label > b.label) {
    return 1
  }
  return 0
}

export const calculateBreadcrumbs = (categories, id, list = []) => {
  const category = categories.find(category => category.id === id)
  if (!category) return parseCategoryPath(list).reverse()
  const result = [...list, category]

  if (category.level > 1 && category.parent_id) {
    return calculateBreadcrumbs(categories, category.parent_id, result)
  }
  return parseCategoryPath(result).reverse()
}

export const _prepareCategoryMaps = (category: Category|ChildrenData) => {
  let categoriesMaps = []
  if (category) {
    let categoryLevelMap = [category.id]
    categoriesMaps.push(categoryLevelMap)
    if (category.children_data) {
      category.children_data.forEach((childrenData: ChildrenData) => {
        let childrenDataLevelMap = [...categoryLevelMap]
        const childrenDataChildrenMaps = _prepareCategoryMaps(childrenData)
        childrenDataChildrenMaps.forEach(childrenDataChildrenMap => {
          let childLevel = [...childrenDataLevelMap, ...childrenDataChildrenMap]
          categoriesMaps.push(childLevel)
        })
      })
    }
  }
  return categoriesMaps
}
