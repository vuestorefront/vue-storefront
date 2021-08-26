import toString from 'lodash-es/toString'
import omit from 'lodash-es/omit'

/**
 * Counts how much coniguration match for specific variant
 */
export default function getConfigurationMatchLevel (configuration, variant): number {
  if (!variant || !configuration) return 0
  const configProperties = Object.keys(omit(configuration, ['price']))
  return configProperties
    .map(configProperty => {
      const variantPropertyId = variant[configProperty]
      if (configuration[configProperty] === null) {
        return false
      }

      return [].concat(configuration[configProperty])
        .map(f => typeof f === 'object' ? toString(f.id) : f)
        .includes(toString(variantPropertyId))
    })
    .filter(Boolean)
    .length
}
