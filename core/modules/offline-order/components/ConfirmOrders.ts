import { ConfigManager } from '@vue-storefront/core/lib/config-manager'
export const ConfirmOrders = {
  methods: {
    confirmOrders () {
      const config = ConfigManager.getConfig()
      this.$bus.$emit('order/PROCESS_QUEUE', { config: config })
      this.$bus.$emit('sync/PROCESS_QUEUE', { config: config })
      this.$store.dispatch('cart/load')
    }
  }
}
