export const UserOrders = {
  name: 'userOrders',
  computed: {
    ordersHistory () {
      return this.$store.state.user.orders_history.items
    },
    isHistoryEmpty () {
      return this.$store.state.user.orders_history.items.length < 1
    }
  },
  methods: {
    reorder (products) {
      products.forEach(item => {
        this.$store.dispatch('product/single', { options: { sku: item.sku }, setCurrentProduct: false, selectDefaultVariant: false }).then((product) => {
          product.qty = item.qty_ordered
          this.$store.dispatch('cart/addItem', { productToAdd: product }).then(() => { })
        })
      })
    },
    skipGrouped (items) {
      return items.filter((item) => {
        return !item.parent_item_id
      })
    }
  }
}
