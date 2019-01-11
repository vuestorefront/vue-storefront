import Product from '@vue-storefront/core/modules/catalog/types/Product'

export const RemoveFromWishlist = {
  name: 'RemoveFromWishlist',
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  methods: {
    removeFromWishlist (product: Product) {
      this.$store.dispatch('wishlist/removeItem', product)
    }
  }
}
