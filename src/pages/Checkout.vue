<template>
  <div id='checkout'>
    Core Checkout
  </div>
</template>

<script>
import PersonalDetails from 'core/components/blocks/Checkout/PersonalDetails.vue'
import Shipping from 'core/components/blocks/Checkout/Shipping.vue'
import Payment from 'core/components/blocks/Checkout/Payment.vue'
import OrderReview from 'core/components/blocks/Checkout/OrderReview.vue'
import CartSummary from 'core/components/blocks/Checkout/CartSummary.vue'

export default {
  name: 'Checkout',
  beforeMount () {
  },
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary
  }
}
</script>

<style scoped>

</style>
