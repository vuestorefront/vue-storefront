import { SearchQuery } from 'storefront-query-builder'

const createAttributesListQuery = ({
  filterValues,
  filterField,
  onlyDefinedByUser,
  onlyVisible
}: {
  filterValues: string[],
  filterField: string,
  onlyDefinedByUser: boolean,
  onlyVisible: boolean
}): SearchQuery => {
  let searchQuery = new SearchQuery()

  if (filterValues) {
    searchQuery = searchQuery.applyFilter({ key: filterField, value: { 'in': filterValues } })
  }
  if (onlyDefinedByUser) {
    searchQuery = searchQuery.applyFilter({ key: 'is_user_defined', value: { 'in': [true] } })
  }
  if (onlyVisible) {
    searchQuery = searchQuery.applyFilter({ key: 'is_visible', value: { 'in': [true] } })
  }

  return searchQuery
}

export default createAttributesListQuery
