import config from 'config'

export default function getBoosts (attribute = '') {
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
