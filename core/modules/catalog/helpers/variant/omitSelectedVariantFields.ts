import omit from 'lodash/omit'

export default function omitSelectedVariantFields (selectedVariant) {
  const hasImage = selectedVariant && selectedVariant.image && selectedVariant.image !== 'no_selection'
  const fieldsToOmit = ['name', 'visibility']
  if (!hasImage) fieldsToOmit.push('image')
  selectedVariant = omit(selectedVariant, fieldsToOmit)
}
