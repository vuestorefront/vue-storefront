<template>
  <div id='checkout'>
    <personal-details></personal-details>
    <shipping></shipping>
    <payment></payment>
    <order-review></order-review>
    <cart-summary></cart-summary>
  </div>
</template>

<script>
/**
 * TODO: Regarding Figma.com design this page should have different layout than App.vue - how to apply it?
 */
import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails.vue'
import Shipping from 'theme/components/core/blocks/Checkout/Shipping.vue'
import Payment from 'theme/components/core/blocks/Checkout/Payment.vue'
import OrderReview from 'theme/components/core/blocks/Checkout/OrderReview.vue'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary.vue'
import { corePage } from 'lib/themes'

export default {
  name: 'Checkout',
  beforeMount () {
  },
  components: {
    'personal-details': PersonalDetails,
    'shipping': Shipping,
    'payment': Payment,
    'order-review': OrderReview,
    'cart-summary': CartSummary
  },
  mixins: [corePage('Checkout')]
}
</script>

<style scoped>

</style>
