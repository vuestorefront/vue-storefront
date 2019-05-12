import { ConfigManager } from '@vue-storefront/core/lib/config-manager'
export default function getMapping (attribute, entityType = 'products') {
  let mapping = [
  ]

  if (ConfigManager.getConfig().hasOwnProperty(entityType) && ConfigManager.getConfig()[entityType].hasOwnProperty('filterFieldMapping')) {
    mapping = ConfigManager.getConfig()[entityType].filterFieldMapping
  }

  if (mapping.hasOwnProperty(attribute)) {
    return mapping[attribute]
  }

  return attribute
}
