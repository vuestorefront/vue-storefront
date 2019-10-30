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
  name?: string, // delete name
  id?: string | number, // color
  value: any,
  // qty: number <-- add this
}

type ProductConfiguration = ProductConfigurationItem[]


export { ProductOption, ProductConfiguration, ProductConfigurationItem }
