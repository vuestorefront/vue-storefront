/**
 * Functionality for confirming orders placed offline
 *
 * #### Methods
 * - **`confirmOrder()`** emits event to send orders placed offline to server
 *
 * Part of [Offline order API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import EventBus from '@vue-storefront/core/plugins/event-bus'
import config from 'config'

export const confirmOrder = {
  methods: {
    confirmOrder () {
      EventBus.$emit('order/PROCESS_QUEUE', { config: config })
      EventBus.$emit('sync/PROCESS_QUEUE', { config: config })
      this.$store.dispatch('cart/load')
      EventBus.$emit('modal-hide', 'modal-order-confirmation')
    }
  }
}
