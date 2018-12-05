import Product from '@vue-storefront/core/modules/catalog/types/Product'

export const WishlistProduct = {
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
    removeFromWishlist (product: Product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/removeItem', product) : false
    }
  }
}
