// whole to refactor, ideally should be functional
import { productThumbnailPath } from '@vue-storefront/store/helpers'

export default {
  name: 'Product-cart',
  data () {
    return {
      qty: 0,
      isEditing: false
    }
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    thumbnail () {
      const thumbnail = productThumbnailPath(this.product)
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return this.getThumbnail(thumbnail, 310, 300) // for offline support we do need to have ProductTile version
      } else return this.getThumbnail(thumbnail, 150, 150)
    }
  },
  beforeDestroy () {
    this.$bus.$off('cart-after-itemchanged', this.onProductChanged)
  },
  beforeMount () {
    this.$bus.$on('cart-after-itemchanged', this.onProductChanged)
  },
  methods: {
    removeItem () {
      this.$store.dispatch('cart/removeItem', this.product)
    },
    onProductChanged (event) {
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    },
    updateQuantity (product, quantity) {
      this.$store.dispatch('cart/updateQuantity', { product: product, qty: quantity })
    },
    switchEdit () {
      this.isEditing ? this.updateQuantity() : this.qty = this.product.qty
      this.isEditing = !this.isEditing
    }
  }
}
