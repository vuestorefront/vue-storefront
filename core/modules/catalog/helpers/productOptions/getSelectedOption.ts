/**
 * Returns single option for configurable product based on attribute code
 */
export default function getSelectedOption (selectedVariant, attributeCode, option) {
  let selectedOption = (selectedVariant.custom_attributes || []).find((a) => a.attribute_code === attributeCode)
  selectedOption = selectedOption || {
    attribute_code: attributeCode,
    value: selectedVariant[attributeCode]
  }
  if (option.values && option.values.length) {
    const selectedOptionMeta = option.values.find(ov => String(ov.value_index) === String(selectedOption.value))
    if (selectedOptionMeta) {
      selectedOption.label = selectedOptionMeta.label
        ? selectedOptionMeta.label
        : selectedOptionMeta.default_label
    }
  }
  return selectedOption
}
