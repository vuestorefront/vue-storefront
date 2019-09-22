/**
 * Component responsible for displaying single user order. Requires User module.
 */
export const UserSingleOrder = {
  name: 'UserSingleOrder',
  computed: {
    ordersHistory () {
      return this.$store.state.user.orders_history.items
    },
    order () {
      return this.ordersHistory.find(order => {
        return parseInt(order.entity_id) === parseInt(this.$route.params.orderId)
      }, (this))
    },
    paymentMethod () {
      return this.order.payment.additional_information[0]
    },
    billingAddress () {
      return this.order.billing_address
    },
    shippingAddress () {
      return this.order.extension_attributes.shipping_assignments[0].shipping.address
    }
  },
  methods: {
    async remakeOrder (products) {
      this.$bus.$emit('notification-progress-start', this.$t('Please wait ...'))
      const productsToAdd = []
      for (const item of products) {
        const product = await this.$store.dispatch('product/single', { options: { sku: item.sku }, setCurrentProduct: false, selectDefaultVariant: false })
        product.qty = item.qty_ordered
        productsToAdd.push(product)
      }
      await this.$store.dispatch('cart/addItems', { productsToAdd })
      this.$bus.$emit('notification-progress-stop', {})
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
