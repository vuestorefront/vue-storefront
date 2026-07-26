import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import config from 'config'
export const ConfirmOrders = {
  methods: {
    confirmOrders () {
      EventBus.$emit('order/PROCESS_QUEUE', { config: config })
      EventBus.$emit('sync/PROCESS_QUEUE', { config: config })
      this.$store.dispatch('cart/load')
    }
  }
}
