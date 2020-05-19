export interface ProductOption {
  attribute_code?: string,
  id: number | string,
  label: string,
  values?: any[]
}

export interface ProductConfiguration {
  color: ProductOption,
  size: ProductOption
}
