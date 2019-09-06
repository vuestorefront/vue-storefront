export interface ProductOption {
  attribute_code?: string,
  id: any,
  label: string
}

export interface ProductConfiguration {
  color: ProductOption,
  size: ProductOption
}
