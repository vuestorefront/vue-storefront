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
    remakeOrder (items) {
      items.forEach(item => {
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
