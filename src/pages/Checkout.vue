<template>
  <div id='checkout'>
    Core Checkout
  </div>
</template>

<script>
import PersonalDetails from '../components/core/blocks/Checkout/PersonalDetails.vue'
import Shipping from '../components/core/blocks/Checkout/Shipping.vue'
import Payment from '../components/core/blocks/Checkout/Payment.vue'
import OrderReview from '../components/core/blocks/Checkout/OrderReview.vue'
import Microcart from '../components/core/blocks/Microcart/Microcart.vue'

export default {
  name: 'Checkout',
  beforeMount () {
  },
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    Microcart
  }
}
</script>

<style scoped>

</style>
