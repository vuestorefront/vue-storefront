import store from '@vue-storefront/core/store'

export default function getMapping (attribute, entityType = 'products') {
  let mapping = [
  ]

  if (store.state.config.hasOwnProperty(entityType) && store.state.config[entityType].hasOwnProperty('filterFieldMapping')) {
    mapping = store.state.config[entityType].filterFieldMapping
  }

  if (mapping.hasOwnProperty(attribute)) {
    return mapping[attribute]
  }

  return attribute
}
