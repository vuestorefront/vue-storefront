export interface CartItemConfigurationProperty {
  id: string,
  value: string,
  sn: number,
  qty: string,
  price?: string,
  finalPriceValue?: number
}

export interface CartItemConfigurationGroup {
  customizationId: string,
  customizationName: string,
  isList: boolean,
  sn: number,
  properties: CartItemConfigurationProperty[]
}
