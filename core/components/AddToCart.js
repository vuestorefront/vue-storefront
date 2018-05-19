import Vue from 'vue'

export default Vue.component('AddToCart', {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart (product) {
      this.$store.dispatch('cart/addItem', { productToAdd: product })
    }
  }
})
