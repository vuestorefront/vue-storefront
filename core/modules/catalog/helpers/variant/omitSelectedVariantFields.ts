import omit from 'lodash-es/omit'

/**
 * Omit some variant fields to prevent overriding same base product fields
 */
export default function omitSelectedVariantFields (selectedVariant): any {
  const hasImage = selectedVariant && selectedVariant.image && selectedVariant.image !== 'no_selection'
  const fieldsToOmit = ['name', 'visibility']
  if (!hasImage) fieldsToOmit.push('image')
  return omit(selectedVariant, fieldsToOmit)
}
