export interface CustomOption {
  image_size_x: number,
  image_size_y: number,
  is_require: boolean,
  max_characters: number,
  option_id: number,
  product_sku: string,
  sort_order: number,
  title: string,
  type: string,
  price?: number,
  price_type?: string,
  values?: OptionValue[]
}

export interface OptionValue {
  option_type_id: number,
  price: number,
  price_type: string,
  sort_order: number,
  title: string
}

export type InputValue = string | number | number[]

export interface SelectedCustomOption {
  option_id: number,
  option_value?: string
}
