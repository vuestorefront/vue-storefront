import { optionLabel } from '@vue-storefront/core/modules/catalog/helpers';
import getAttributeCode from './getAttributeCode'
import getSelectedOption from './getSelectedOption'

/**
 * Returns configuration based on selected variant. Only applies to configurable product
 */
export default function getProductConfiguration ({ product, selectedVariant, attribute }) {
  const currentProductOption = {}
  const configurableOptions = product.configurable_options || []
  for (const option of configurableOptions) {
    const attributeCode = getAttributeCode(option, attribute)
    const selectedOption = getSelectedOption(selectedVariant, attributeCode, option)
    const label = selectedOption.label
      ? selectedOption.label
      : optionLabel(attribute, {
        attributeKey: selectedOption.attribute_code,
        searchBy: 'code',
        optionId: selectedOption.value
      })
    currentProductOption[attributeCode] = {
      attribute_code: attributeCode,
      id: String(selectedOption.value),
      label: label
    }
  }
  return currentProductOption
}
