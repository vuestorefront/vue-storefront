import { CategorySearch, ProductSearch } from './../../types/Api'
import { locale } from './../../index'

const buildProductWhere = (search: ProductSearch) => {
  if (search && search.catIds) {
    const catIds = search.catIds.join('","')
    return `masterData(current(categories(id in ("${catIds}"))))`
  }

  if (search && search.slug) {
    return `masterData(current(slug(${locale}="${search.slug}")))`
  }

  return ''
}

const buildCategoryWhere = (search: CategorySearch) => {
  if (search && search.catId) {
    return `id="${search.catId}"`
  }

  if (search && search.slug) {
    return `slug(${locale}="${search.slug}")`
  }

  return ''
}

export { buildProductWhere, buildCategoryWhere }
