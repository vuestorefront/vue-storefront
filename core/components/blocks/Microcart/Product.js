import { productThumbnailPath } from '@vue-storefront/store/helpers'

export default {
  name: 'Product',
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
      this.$store.dispatch('cart/removeItem', { product: this.product })
    },
    onProductChanged (event) {
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    },
    updateQuantity () {
      this.qty = parseInt(this.qty)
      if (this.qty <= 0) {
        this.qty = this.product.qty
      }
      this.$store.dispatch('cart/updateQuantity', { product: this.product, qty: this.qty })
      this.isEditing = !this.isEditing
    },
    switchEdit () {
      this.isEditing ? this.updateQuantity() : this.qty = this.product.qty
      this.isEditing = !this.isEditing
    }
  }
}
