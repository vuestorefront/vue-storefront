import Vue from 'vue'

export default Vue.component('MyOrder', {
  data () {
    return {
      ordersHistory: [],
      order: {},
      paymentMethod: '',
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
      stateOrdersHistory: Object.assign({}, this.$store.state.user.orders_history)
    }
  },
  created () {
    this.$bus.$on('user-after-loaded-orders', this.onOrdersLoaded)
  },
  destroyed () {
    this.$bus.$off('user-after-loaded-orders', this.onOrdersLoaded)
  },
  mounted () {
    this.ordersHistory = this.getOrdersHistory()
    this.order = this.getOrder()
    this.paymentMethod = this.getPaymentMethod()
    this.billingAddress = this.getAddress(this.order.billing_address)
    this.shippingAddress = this.getAddress(this.order.extension_attributes.shipping_assignments[0].shipping.address)
  },
  methods: {
    onOrdersLoaded () {
      this.stateOrdersHistory = Object.assign({}, this.$store.state.user.orders_history)
      this.ordersHistory = this.getOrdersHistory()
      this.order = this.getOrder()
      this.paymentMethod = this.getPaymentMethod()
      this.billingAddress = this.getAddress(this.order.billing_address)
      this.shippingAddress = this.getAddress(this.order.extension_attributes.shipping_assignments[0].shipping.address)
    },
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
          this.$store.dispatch('cart/addItem', { productToAdd: product }).then(() => { })
        })
      })
    },
    getOrder () {
      return this.ordersHistory.find(order => {
        return parseInt(order.entity_id) === parseInt(this.$route.params.orderId)
      }, (this))
    },
    getPaymentMethod () {
      return this.order.payment.additional_information[0]
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
    }
  }
})
