import omit from 'lodash-es/omit'
import config from 'config'

/**
 * Omit some variant fields to prevent overriding same base product fields
 */
export default function omitSelectedVariantFields (selectedVariant): void {
  const hasImage = selectedVariant && selectedVariant.image && selectedVariant.image !== 'no_selection'
  const fieldsToOmit = config.products.omitVariantFields
  if (!hasImage) fieldsToOmit.push('image')
  return omit(selectedVariant, fieldsToOmit)
}
