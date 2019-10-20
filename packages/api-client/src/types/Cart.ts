import BaseRequest from './BaseRequest'

interface ConfigurableItemOptions {
  option_id: string,
  option_value: string,
}

interface BundleItemOptions {
  [indexId: string]: {
    option_id: number,
    option_qty: number,
    option_selections: number[]
  }
}

interface CustomItemOption {
  [indexId: string]: {
    option_id: number
    option_value: number | string
  }
}

interface ProductConfiguration {
  product_option: {
    extension_attributes: {
      custom_options?: CustomItemOption,
      configurable_item_options?: ConfigurableItemOptions[]
      bundle_options?: BundleItemOptions
    }
  }
}

interface CartProduct extends BaseRequest {
  sku: number,
  qty: number,
  product_option?: ProductConfiguration
}

export {
  CartProduct,
  ConfigurableItemOptions,
  BundleItemOptions,
  CustomItemOption,
  ProductConfiguration
}
