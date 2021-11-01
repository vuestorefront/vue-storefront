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
  giftcard_options: {
    product: number,
    related_product: string, // empty
    price_amount: number,
    giftcard_template_id: number,
    amount: number,
    send_friend: 0 | 1, // 0
    customer_name: string,
    recipient_name: string,
    recipient_email: string, // - should be empty if recipient_ship
    recipient_ship: 'yes' | 'no',
    recipient_address: string, // - always empty
    message: string, // - max 240 chars
    notify_success: 0,
    qty: number
  }
}
