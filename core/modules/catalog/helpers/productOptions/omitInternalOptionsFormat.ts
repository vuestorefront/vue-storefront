import omit from 'lodash/omit'

export default function omitInternalOptionsFormat (productOption) {
  productOption.extension_attributes.configurable_item_options = productOption.extension_attributes.configurable_item_options
    .map((option) => omit(option, ['label', 'value']))
}
