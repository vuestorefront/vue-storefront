import i18n from '@vue-storefront/i18n'
import config from 'config'
export const Product = {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    thumbnail () {
      return this.getThumbnail(this.product.image, 150, 150)
    }
  },
  methods: {
    onProductChanged (event) {
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    },
    updateQuantity (quantity) {
      this.$store.dispatch('cart/updateQuantity', { product: this.product, qty: quantity })
    },
    removeItem () {
      if (config.cart.askBeforeRemoveProduct) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          item: this.product,
          message: i18n.t('Are you sure you would like to remove this item from the shopping cart?'),
          action2: { label: i18n.t('OK'), action: this.removeFromCart},
          action1: { label: i18n.t('Cancel'), action: 'close' },
          hasNoTimeout: true
        })
      } else {
        this.removeFromCart()
      }
    },
    removeFromCart () {
      this.$store.dispatch('cart/removeItem', { product: this.product })
    },
  },
  beforeMount () {
    this.$bus.$on('cart-after-itemchanged', this.onProductChanged)
  },
  beforeDestroy () {
    this.$bus.$off('cart-after-itemchanged', this.onProductChanged)
  }
}
