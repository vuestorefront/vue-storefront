/**
 * Functionality for confirming orders placed offline
 *
 * #### Methods
 * - **`confirmOrders()`** emits event to send orders placed offline to server
 *
 * Part of [Offline order API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import EventBus from '@vue-storefront/core/plugins/event-bus'
import store from '@vue-storefront/store'

export const confirmOrders = {
  methods: {
    confirmOrders () {
      EventBus.$emit('order/PROCESS_QUEUE', { config: store.state.config })
      EventBus.$emit('sync/PROCESS_QUEUE', { config: store.state.config })
      this.$store.dispatch('cart/load')
      EventBus.$emit('modal-hide', 'modal-order-confirmation')
    }
  }
}
