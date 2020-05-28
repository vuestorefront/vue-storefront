import Product from '@vue-storefront/core/modules/catalog/types/Product';

export interface BundleOption {
  option_id: number,
  title: string,
  required: boolean,
  type: string,
  position: number,
  sku: string,
  product_links: BundleOptionsProductLink[]
}

export interface BundleOptionsProductLink {
  id: string | number,
  sku: string,
  option_id: number,
  qty: number,
  position: number,
  is_default: boolean,
  price?: number,
  price_type?: number,
  can_change_quantity: number,
  product?: Product
}

export interface SelectedBundleOption {
  option_id: number,
  option_qty: number,
  option_selections: number[]
}
