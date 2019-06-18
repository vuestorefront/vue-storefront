import { mapGetters } from 'vuex';

/**
 * Component responsible for displaying user orders. Requires User module.
 */
export const UserOrders = {
  name: 'UserOrders',
  computed: {
    ...mapGetters('user', ['getOrdersHistory']),
    ordersHistory () {
      return this.getOrdersHistory
    },
    isHistoryEmpty () {
      return this.getOrdersHistory.length < 1
    }
  },
  methods: {
    async remakeOrder (products) {
      const productsToAdd = []
      for (const item of products) {
        const product = await this.$store.dispatch('product/single', { options: { sku: item.sku }, setCurrentProduct: false, selectDefaultVariant: false })
        product.qty = item.qty_ordered
        productsToAdd.push(product)
      }
      await this.$store.dispatch('cart/addItems', { productsToAdd })
      // Redirect to the cart straight away.
      this.$router.push(this.localizedRoute('/checkout'))
    },
    skipGrouped (items) {
      return items.filter((item) => {
        return !item.parent_item_id
      })
    }
  }
}
