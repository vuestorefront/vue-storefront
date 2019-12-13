import { ProductSearch } from './../../types/Api'

const buildProductWhere = (search: ProductSearch) => {
  if (search.catId) {
    return `masterData(current(categories(id="${search.catId}")))`
  }

  return ''
}


export { buildProductWhere }
