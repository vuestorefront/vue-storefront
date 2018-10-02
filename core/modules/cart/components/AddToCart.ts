import Product from '@vue-storefront/store/types/product/Product'

export const AddToCart = {
  name: 'AddToCart',
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  methods: {
    addToCart (product: Product) {
      this.$store.dispatch('cart/addItem', { productToAdd: product })
    }
  }
}
