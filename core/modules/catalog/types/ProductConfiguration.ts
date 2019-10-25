export interface ProductOption {
  attribute_code?: string,
  id: number | string,
  label: string
}

export interface ProductConfiguration {
  color: ProductOption,
  size: ProductOption
}
