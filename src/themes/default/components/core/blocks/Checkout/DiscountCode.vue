<template>
  <div class="row p25 between-xs">
    <discounts v-for="discount in discounts" :key="discount.id" :discount="discount"/>

    <div>
      <input
        type="text"
        name="discount-code"
        :placeholder="$t('Discount code')"
      >

      <button @click="addDiscoutnCode(code)" class="">
        {{ $t('Apply discount code') }}
      </button>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import Discounts from './Discounts'

export default {
  name: 'DiscountCode',
  mixins: [coreComponent('blocks/Checkout/CartSummary')],
  methods: {
    addDiscoutnCode (code) {
      this.$store.dispatch('cart/apply-coupon', { couponCode: code })
    }
  },
  components: {
    Discounts
  }
}
</script>
