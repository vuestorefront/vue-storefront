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

export const _prepareCategoryPathIds = (category: Category): string[] => {
  if (!category || !category.path) return []
  return category.path.split('/')
}
