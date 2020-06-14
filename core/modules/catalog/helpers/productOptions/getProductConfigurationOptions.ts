import getAttributeCode from './getAttributeCode'
import trim from 'lodash-es/trim'
import { optionLabel } from '@vue-storefront/core/modules/catalog/helpers';

export default function getProductConfigurationOptions ({ product, attribute }) {
  const productOptions = {}
  const configurableOptions = product.configurable_options || []
  for (let option of configurableOptions) {
    const attributeCode = getAttributeCode(option, attribute)
    const productOptionValues = option.values
      .map((optionValue) => ({
        label: optionValue.label
          ? optionValue.label
          : optionLabel(attribute, {
            attributeKey: option.attribute_id,
            searchBy: 'id',
            optionId: optionValue.value_index
          }),
        id: String(optionValue.value_index),
        attribute_code: option.attribute_code
      }))
      .filter((optionValue) => trim(optionValue.label) !== '')

    productOptions[attributeCode] = productOptionValues
  }
  return productOptions
}
