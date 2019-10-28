interface ProductOptionValue {
  value: number,
  label: string
}

interface ProductOption {
  id: number,
  attributeName: string,
  values: ProductOptionValue[]
}

interface ProductConfigurationItem {
  name?: string,
  id?: string | number,
  value: any
}

type ProductConfiguration = ProductConfigurationItem[]


export { ProductOption, ProductConfiguration, ProductConfigurationItem }
