export interface ProductOption {
  attribute_code?: string,
  id: number,
  label: string
}

export interface ProductConfiguration {
  color: ProductOption,
  size: ProductOption
}
