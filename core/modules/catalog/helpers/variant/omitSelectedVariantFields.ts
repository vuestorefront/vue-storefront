import omit from 'lodash/omit'

/**
 * Omit some variant fields to prevent overriding same base product fields
 */
export default function omitSelectedVariantFields (selectedVariant): void {
  const hasImage = selectedVariant && selectedVariant.image && selectedVariant.image !== 'no_selection'
  const fieldsToOmit = ['name', 'visibility']
  if (!hasImage) fieldsToOmit.push('image')
  selectedVariant = omit(selectedVariant, fieldsToOmit)
}
