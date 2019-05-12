import { ConfigManager } from '@vue-storefront/core/lib/config-manager'
export default function getBoosts (attribute = '') {
  const config = ConfigManager.getConfig()
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
