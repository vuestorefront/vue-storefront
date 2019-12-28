export default function getBoosts (config, attribute = '') {
  let searchableAttributes = [
  ]

  if (config.elasticsearch.hasOwnProperty('searchableAttributes') && config.elasticsearch.searchableAttributes[attribute]) {
    searchableAttributes = config.elasticsearch.searchableAttributes[attribute]
  }

  if (searchableAttributes.hasOwnProperty('boost')) {
    return searchableAttributes['boost']
  }

  return 1
}
