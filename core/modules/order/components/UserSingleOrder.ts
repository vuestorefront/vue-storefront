/**
 * Component responsible for displaying single user order. Requires User module.
 */
export const UserSingleOrder = {
  name: 'UserSingleOrder',
  data () {
    return {
      shippingAddress: {
        'firstname': '',
        'lastname': '',
        'street': '',
        'postcode': '',
        'city': '',
        'country': ''
      },
      billingAddress: {
        'firstname': '',
        'lastname': '',
        'street': '',
        'postcode': '',
        'city': '',
        'country': ''
      },
    }
  },
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
    }
  },
  beforeMount () {
    this.$bus.$on('user-after-loaded-orders', this.onOrdersLoaded)
  },
  beforeDestroy () {
    this.$bus.$off('user-after-loaded-orders', this.onOrdersLoaded)
  },
  mounted () {
    this.billingAddress = this.getAddress(this.order.billing_address)
    this.shippingAddress = this.getAddress(this.order.extension_attributes.shipping_assignments[0].shipping.address)
  },
  methods: {
    onOrdersLoaded () {
      this.billingAddress = this.getAddress(this.order.billing_address)
      this.shippingAddress = this.getAddress(this.order.extension_attributes.shipping_assignments[0].shipping.address)
    },
    remakeOrder (items) {
      items.forEach(item => {
        this.$store.dispatch('product/single', { options: { sku: item.sku }, setCurrentProduct: false, selectDefaultVariant: false }).then((product) => {
          product.qty = item.qty_ordered
          this.$store.dispatch('cart/addItem', { productToAdd: product }).then(() => { })
        })
      })
    },
    getAddress (addressObject) {
      return {
        'firstname': addressObject.firstname,
        'lastname': addressObject.lastname,
        'street': addressObject.street,
        'postcode': addressObject.postcode,
        'city': addressObject.city,
        'country': addressObject.country_id
      }
    },
    skipGrouped (items) {
      return items.filter((item) => {
        return !item.parent_item_id
      })
    }
  }
}
