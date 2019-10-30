import { Ref } from '@vue/composition-api'
import { ProductResponse, ProductSelectedOptions } from '@vue-storefront/api-client/lib/types/Product'

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
  qty: number,
  items: ProductConfigurationItem[]
}

export interface ProductMetadata {
  product_options: ProductSelectedOptions
}

export interface ProductVariant {
  parentSku: string,
  configuration: ProductConfiguration,
  product: any,
  meta: ProductMetadata,
}

export interface UseConfiguration {
  configure: (sku: string, configuration: ProductConfiguration) => void,
  variants: Ref<{ [sku: string]: ProductVariant }>
}

export interface UseSearch {
  search: (skus: string[]) => void,
  products: Ref<ProductResponse[]>,
  loading: Ref<boolean>,
}
