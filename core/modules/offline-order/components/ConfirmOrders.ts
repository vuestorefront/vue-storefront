import config from 'config'
export const ConfirmOrders = {
  methods: {
    confirmOrders () {
      this.$bus.$emit('order/PROCESS_QUEUE', { config: config })
      this.$bus.$emit('sync/PROCESS_QUEUE', { config: config })
      this.$store.dispatch('cart/load')
    }
  }
}
