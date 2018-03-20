<template>
  <div class="my-orders">
    Core My orders
  </div>
</template>

<script>
export default {
  name: 'MyOrders',
  data () {
    return {
      ordersHistory: [],
      stateOrdersHistory: Object.assign({}, this.$store.state.user.orders_history)
    }
  },
  created () {
    this.$bus.$on('user-after-loggedin', () => {
      this.stateOrdersHistory = Object.assign({}, this.$store.state.user.orders_history)
      this.ordersHistory = this.getOrdersHistory()
    })
  },
  mounted () {
    this.ordersHistory = this.getOrdersHistory()
  },
  methods: {
    getOrdersHistory () {
      if (this.stateOrdersHistory) {
        return this.stateOrdersHistory.items
      } else {
        return []
      }
    }
  }
}
</script>
