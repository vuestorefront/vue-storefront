import { ProductSelectedOptions } from './Product'

interface CartProduct {
  sku: number,
  qty: number,
  product_option?: ProductSelectedOptions
}

// TODO: Implement for DPR
interface CartResponse {

}

export {
  CartProduct,
  CartResponse
}
