/**
 * Returns internal format for product options
 */
export default function getInternalOptionsFormat (productOption) {
  return productOption.extension_attributes.configurable_item_options
    .map(({ label, value }) => ({ label, value }))
}
