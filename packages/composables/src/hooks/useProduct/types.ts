import { ProductConfigurableChildrenItem, ProductSelectedOptions, ProductResponse } from '@vue-storefront/api-client/lib/types/Product'

export interface ProductOptionValue {
  value: number | string,
  label: string
}

export interface ProductOption {
  id: number,
  attributeName: string,
  values: ProductOptionValue[]
}

export interface ProductConfigurationItem {
  id?: number | string,
  value: any,
}

export interface ProductConfiguration {
  qty: string,
  items: ProductConfigurationItem[]
}

export interface ProductMetadata {
  product_options: ProductSelectedOptions
}

export type ProductVariant = ProductConfigurableChildrenItem | ProductResponse[]
