<template>
  <div>
    Transaction Are being Process Please Wait...
  </div>
</template>
<script>
import _ from 'lodash'
import CheckOut from './Checkout.vue'
export default {
  name: 'TransactionDone',
  components: {
    CheckOut
  },
  data () {
    return {
      payment: this.$store.state.checkout.paymentDetails,
      mangopay_transaction_id: ''
    }
  },
  mounted () {
    if (!_.isUndefined(this.$route.query.transactionId) && !_.isNull(this.$route.query.transactionId) && !_.isEmpty(this.$route.query.transactionId)) {
      window.opener.callPlaceOrder(this.$route.query.transactionId)
      setTimeout(() => { window.close() }, 3000)
    }
  }
}
</script>
