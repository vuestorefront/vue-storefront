import Product from '@vue-storefront/core/modules/catalog/types/Product'

export const AddToWishlist = {
  name: 'AddToCart',
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  methods: {
    addToWishlist (product: Product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/addItem', product) : false
    }
  }
}
