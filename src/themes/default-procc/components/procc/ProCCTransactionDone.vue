<template>
  <div style="padding: 3rem;text-align: center; font-family: Helvetica;font-size: larger;opacity: 0.7;color: rgba(0,0,0,0.68);">
    <p>Transaction is being processed</p>
    <p>Please Wait...</p>
  </div>
</template>
<script>
// TODO: i18n the strings
import _ from 'lodash'
import CheckOut from '../../pages/Checkout.vue'
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
