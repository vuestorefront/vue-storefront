import config from 'config'
import { slugify } from '@vue-storefront/core/helpers'
import { Category, ChildrenData } from '@vue-storefront/core/modules/catalog-next/types/Category'

const createSlug = (category: ChildrenData): string => {
  if (category.url_key && config.products.useMagentoUrlKeys) {
    return category.url_key
  }

  return `${slugify(category.name)}-${category.id}`
}

const slugifyCategories = (category: Category | ChildrenData): Category | ChildrenData => {
  if (category.children_data) {
    for (let subcat of category.children_data) {
      if (subcat.name && !subcat.slug) {
        slugifyCategories({ ...subcat, slug: createSlug(subcat) } as any as ChildrenData)
      }
    }
  }
  return category
}

export default slugifyCategories
