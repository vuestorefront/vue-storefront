/**
 * Returns attribute_code for product option
 */
export default function getAttributeCode (option, attribute): string {
  const attribute_code = option.attribute_code
    ? option.attribute_code
    : option.attribute_id && (attribute.list_by_id[option.attribute_id] || {}).attribute_code
  return attribute_code || option.label.toLowerCase()
}
