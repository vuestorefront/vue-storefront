<template>
  <!-- Examples of usage -->
  <div>
    <button id="add-to-cart" @click="addToCart(product)">addproduct to cart</button>
    <button id="remove-from-cart" @click="removeFromCart(product)">Remove product from cart</button>
    <button id="apply-coupon" @click="applyCoupon(couponCode)">Apply coupon</button>
    <button id="remove-coupon" @click="removeCoupon">Remove coupon</button>
  </div>
</template>

<script>
import { Microcart } from '../components/Microcart.ts'
import { AddToCart } from '../components/AddToCart.ts'
import { MicrocartProduct } from '../components/Product.ts'

export default {
  data () {
    return {
      product: 'productObjectMock',
      couponCode: 'ARMANI'
    }
  },
  mixins: [
    Microcart,
    AddToCart,
    MicrocartProduct
  ]
}
</script>
