import config from 'config'
import { slugify } from '@vue-storefront/core/helpers'
import { Category, ChildrenData } from '@vue-storefront/core/modules/catalog-next/types/Category'

const createSlug = (category: ChildrenData): string => {
  if (category.slug) {
    return category.slug
  }

  if (category.url_key && config.products.useMagentoUrlKeys) {
    return category.url_key
  }

  if (category.name) {
    return `${slugify(category.name)}-${category.id}`
  }

  return ''
}

const slugifyCategories = (category: Category | ChildrenData): Category | ChildrenData => {
  if (category.children_data) {
    category.children_data.forEach((subCat: ChildrenData): void => {
      if (subCat.name) {
        subCat.slug = createSlug(subCat)
      }

      slugifyCategories(subCat)
    })
  }

  return category
}

export default slugifyCategories
