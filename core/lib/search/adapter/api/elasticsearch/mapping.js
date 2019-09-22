import config from 'config'
export default function getMapping (attribute, entityType = 'products') {
  let mapping = [
  ]

  if (config.hasOwnProperty(entityType) && config[entityType].hasOwnProperty('filterFieldMapping')) {
    mapping = config[entityType].filterFieldMapping
  }

  if (mapping.hasOwnProperty(attribute)) {
    return mapping[attribute]
  }

  return attribute
}
