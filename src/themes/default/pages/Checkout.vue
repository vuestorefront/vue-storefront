<template>
  <div id='checkout'>
    <personal-details></personal-details>
    <shipping></shipping>
    <payment></payment>
    <order-review></order-review>
    <microcart isCheckoutMode="true"></microcart>
  </div>
</template>

<script>
/**
 * TODO: Regarding Figma.com design this page should have different layout than App.vue - how to apply it?
 */
import PersonalDetails from '../components/core/blocks/Checkout/PersonalDetails.vue'
import Shipping from '../components/core/blocks/Checkout/Shipping.vue'
import Payment from '../components/core/blocks/Checkout/Payment.vue'
import OrderReview from '../components/core/blocks/Checkout/OrderReview.vue'
import Microcart from '../components/core/blocks/Microcart/Microcart.vue'
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
    'microcart': Microcart
  },
  mixins: [corePage('Checkout')]
}
</script>

<style scoped>

</style>
