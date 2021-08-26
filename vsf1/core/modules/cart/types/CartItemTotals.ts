
import CartItemOption from './CartItemOption'

export default interface CartItemTotals {
  base_discount_amount: number,
  base_price: number,
  base_price_incl_tax: number,
  base_row_total: number,
  base_row_total_incl_tax: number,
  base_tax_amount: number,
  discount_amount: number,
  discount_percent: number,
  item_id: number | string,
  name: string,
  options: CartItemOption[],
  price: number,
  price_incl_tax: number,
  qty: number,
  row_total: number,
  row_total_incl_tax: number,
  row_total_with_discount: number,
  tax_amount: number,
  tax_percent: number
}
