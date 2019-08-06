export const getSearchOptionsFromRouteParams = (params: { [key: string]: string } = {}): Record<string, any> => {
  const filterableKeys = ['url-key', 'slug', 'id']
  let filters: { [key: string]: string } = {}

  Object.keys(params)
    .filter(key => filterableKeys.includes(key))
    .forEach(key => { filters[key] = params[key] })

  return filters
}
