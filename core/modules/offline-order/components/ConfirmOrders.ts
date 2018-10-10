/**
 * Functionality for confirming orders placed offline
 *
 * #### Methods
 * - **`confirmOrders()`** emits event to send orders placed offline to server
 *
 * Part of [Offline order API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import config from 'config'

export const confirmOrders = {
  methods: {
    confirmOrders () {
      this.$bus.$emit('order/PROCESS_QUEUE', { config: config })
      this.$bus.$emit('sync/PROCESS_QUEUE', { config: config })
      this.$store.dispatch('cart/load')
      this.$bus.$emit('modal-hide', 'modal-order-confirmation')
    }
  }
}
