interface ProductOptionValue {
  id: number,
  name: string
}

interface ProductOption {
  id: number,
  attributeName: string,
  values: ProductOptionValue[]
}

interface ProductConfigurationItem {
  [id: string]: any,
}

type ProductConfiguration = ProductConfigurationItem[]

export { ProductOption, ProductConfiguration, ProductConfigurationItem }
