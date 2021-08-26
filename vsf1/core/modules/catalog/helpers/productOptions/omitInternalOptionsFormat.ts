import omit from 'lodash-es/omit'

/**
 * Omit props that is not needed for product_option
 */
export default function omitInternalOptionsFormat (productOption) {
  productOption.extension_attributes.configurable_item_options = productOption.extension_attributes.configurable_item_options
    .map((option) => omit(option, ['label', 'value']))
}
