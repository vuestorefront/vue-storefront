import Product from '@vue-storefront/store/types/product/Product'

export const addToWishlist = {
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
