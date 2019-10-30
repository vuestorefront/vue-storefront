
export interface ProductSearchParams {
  skus?: string[],
  locale?: string,
  catId?: number
}

export interface ProductStock {
  item_id: number,
  product_id: number,
  stock_id: number,
  qty: number,
  is_in_stock: boolean,
  is_qty_decimal: boolean,
  show_default_notification_message: boolean,
  use_config_min_qty: boolean,
  min_qty: number,
  use_config_min_sale_qty: number,
  min_sale_qty: number,
  use_config_max_sale_qty: boolean,
  max_sale_qty: number,
  use_config_backorders: boolean,
  backorders: number,
  use_config_notify_stock_qty: boolean,
  notify_stock_qty: number,
  use_config_qty_increments: boolean,
  qty_increments: number,
  use_config_enable_qty_inc: boolean,
  enable_qty_increments: boolean,
  use_config_manage_stock: boolean,
  manage_stock: boolean,
  low_stock_date: null,
  is_decimal_divided: boolean,
  stock_status_changed_auto: number
}

export interface ProductGalleryImage {
  vid: string,
  image: string,
  pos: number,
  typ: string,
  lab: string
}

export interface ProductConfigurableChildrenItem {
  image: string,
  thumbnail: string,
  color: string,
  small_image: string,
  tax_class_id: string,
  has_options: string,
  tier_prices: any[],
  url_key: string,
  regular_price: number,
  required_options: string,
  msrp_display_actual_price_type: string,
  max_price: number,
  minimal_regular_price: number,
  size: string,
  final_price: number,
  special_price: number,
  price: number,
  minimal_price: number,
  name: string,
  id: number,
  category_ids: string[]
  sku: string,
  max_regular_price: 39.360001,
  status: number
}

export interface ProductConfigurableOptionValue {
  value_index: number,
  label: string
}

export interface ProductConfigurableOptionItem {
  attribute_id: number,
  values: ProductConfigurableOptionValue[],
  product_id: number,
  id: number,
  label: string,
  position: number,
  attribute_code: string
}

export interface ProductCategory {
  path: string,
  category_id: number,
  name: string,
  slug: string
}

export interface BundleOptionProductLink {
  can_change_quantity: number,
  id: string | number,
  is_default: boolean,
  option_id: number,
  position: number,
  price: number,
  price_type: string,
  product: ProductResponse,
  qty: number,
  sku: string,
}

export interface BundleOptionItem {
  option_id: number,
  position: number
  product_links: BundleOptionProductLink[],
  required: boolean,
  sku: string,
  title: string,
  type: string,
}

export interface ConfigurableItemOptions {
  option_id: number | string,
  option_value: string,
}

export interface BundleItemOptions {
  option_id: number | string,
  option_qty: number,
  option_selections: number[]
}

export interface CustomItemOption {
  option_id: number | string,
  option_value: number | string
}

export interface ProductSelectedOptions {
  product_options: {
    extension_attributes: {
      custom_options?: CustomItemOption[],
      configurable_item_options?: ConfigurableItemOptions[]
      bundle_options?: BundleItemOptions[]
    }
  }
}

export interface ProductResponse {
  id: number,
  sku: string,
  name: string,
  price: number,
  status: number,
  visibility: number,
  type_id: string,
  created_at: string,
  updated_at: string,
  product_links: any[],
  tier_prices: [],
  custom_attributes: any,
  final_price: number,
  max_price: number,
  max_regular_price: number,
  minimal_regular_price: number,
  special_price: number,
  minimal_price: number
  regular_price: number,
  description: string,
  image: string,
  small_image: string,
  thumbnail: string
  category_ids: string[],
  has_options: string,
  url_key: string,
  msrp_display_actual_price_type: string,
  tax_class_id: string,
  material: number[],
  erin_recommends: string,
  sale: string,
  style_general: string,
  pattern: string,
  climate: number[],
  slug: string,
  stock: ProductStock,
  media_gallery: ProductGalleryImage[],
  configurable_children?: ProductConfigurableChildrenItem[],
  configurable_options?: ProductConfigurableOptionItem[],
  bundle_options?: BundleOptionItem[],
  color_options: number[],
  size_options: number[],
  category: ProductCategory[],
  url_path: string,
  tsk: number
}
