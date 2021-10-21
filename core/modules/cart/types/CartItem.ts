import Product from '@vue-storefront/core/modules/catalog/types/Product'

import CustomerImage from 'theme/components/interfaces/customer-image.interface'

import CartItemOption from './CartItemOption'
import CartItemTotals from './CartItemTotals'

export default interface CartItem extends Product {
  qty: number,
  options: CartItemOption[],
  totals: CartItemTotals,
  server_item_id: number | string,
  server_cart_id: any,
  product_type?: string,
  item_id?: number | string,
  checksum?: string,
  quoteId?: string,
  plushieId?: string,
  email?: string,
  plushieBreed?: string,
  plushieName?: string,
  plushieDescription?: string,
  bodyparts?: object,
  customFields?: object,
  uploadMethod?: string,
  customerImages?: CustomerImage[],
}
