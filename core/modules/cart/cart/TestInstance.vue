<template>
  <!-- Examples of usage -->
  <div>
    <button id="add-to-cart" @click="addToCart(product)">addproduct to cart</button>
    <button id="remove-from-cart" @click="removeFromCart(product)">Remove product from cart</button>
    <button id="close-microcart" @click="closeMicrocart">close microcart</button>
    <button id="open-microcart" @click="openMicrocart">Open microcart</button>
    <button id="apply-coupon" @click="applyCoupon(couponCode)">Apply coupon</button>
    <button id="remove-coupon" @click="removeCoupon">Remove coupon</button>
  </div>
</template>

<script>
import microcart from '@vue-storefront/core/components/blocks/Microcart/Microcart'
// Just import the features that you need in the view grouped in modules

export default {
  data () {
    return {
      product: 'productObjectMock',
      couponCode: 'ARMANI'
    }
  },
  // And register them as a mixins
  mixins: [
    microcart
  ]
}
</script>
