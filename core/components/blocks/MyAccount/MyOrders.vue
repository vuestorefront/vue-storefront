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
    this.$bus.$on('user-after-loaded-orders', () => {
      this.stateOrdersHistory = Object.assign({}, this.$store.state.user.orders_history)
      this.ordersHistory = this.getOrdersHistory()
    })
  },
  destroyed () {
    this.$bus.$off('user-after-loaded-orders')
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
    },
    remakeOrder (items) {
      items.forEach(item => {
        this.$store.dispatch('product/single', { options: { sku: item.sku }, setCurrentProduct: false, selectDefaultVariant: false }).then((product) => {
          product.qty = item.qty_ordered
          this.$store.dispatch('cart/addItem', { productToAdd: product }).then(() => {})
        })
      })
    }
  }
}
</script>
