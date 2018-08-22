import SearchQuery from 'core/store/lib/search/searchQuery'

export function prepareNewProductsQuery () {
  let newProductsQuery = new SearchQuery()
  newProductsQuery = newProductsQuery
    .applyFilter({key: 'category.name', value: {'eq': 'tees'}}) // Tees category
    // .applyFilter({key: 'category.category_id', value: {'in': [16, 25, 33]}}) // IDs of Tees category
    .applyFilter({key: 'visibility', value: {'in': [2, 3, 4]}})

  return newProductsQuery
}

export function prepareCoolBagsQuery () {
  let coolBagsQuery = new SearchQuery()
  coolBagsQuery = coolBagsQuery
    .applyFilter({key: 'category.name', value: {'eq': 'women'}}) // Tees category
    // .applyFilter({key: 'category.category_id', value: {'in': [20, 30]}}) // IDs of Women category
    .applyFilter({key: 'visibility', value: {'in': [2, 3, 4]}})

  return coolBagsQuery
}
