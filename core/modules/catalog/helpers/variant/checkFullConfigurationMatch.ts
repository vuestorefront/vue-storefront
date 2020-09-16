import toString from 'lodash/toString'
import omit from 'lodash/omit'

/**
 * Checks if full coniguration matches for specific variant
 */
export default function checkFullConfigurationMatch (configuration, variant): boolean {
  if (!variant || !configuration) return false
  const configProperties = Object.keys(omit(configuration, ['price']))
  const countMatchedConfigProperties = configProperties
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

  return configProperties.length === countMatchedConfigProperties
}
