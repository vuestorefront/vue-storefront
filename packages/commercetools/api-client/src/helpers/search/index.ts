import { ProductSearch } from 'api-client/src/types/Api'

const buildProductWhere = (search: ProductSearch) => {
  if (search.catId) {
    return `masterData(current(categories(id="${search.catId}")))`
  }

  return ''
}


export { buildProductWhere }
