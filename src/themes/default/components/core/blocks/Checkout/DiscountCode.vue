<template>
  <div class="row p25 between-xs">
    <discounts v-for="discount in discounts" :key="discount.id" :discount="discount"/>

    <div>
      <input
        type="text"
        name="discount-code"
        :placeholder="$t('Discount code')"
        v-model="code"
      >

      <button @click="addDiscoutnCode()">
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
  data: function () {
    return {
      code: ''
    }
  },
  methods: {
    addDiscoutnCode () {
      this.$store.dispatch('cart/manipulateCouponCode', this.code)
    }
  },
  components: {
    Discounts
  }
}
</script>
