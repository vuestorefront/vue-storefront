export default {
  data () {
    return {
      productPageRoutes: [
        'product',
        'virtual-product',
        'bundle-product',
        'simple-product',
        'downloadable-product',
        'grouped-product',
        'configurable-product'
      ],
      isProductPage: false,
      isCheckoutPage: false
    }
  },
  watch: {
    '$route.name': function () {
      this.setCurrentPage()
    }
  },
  created () {
    this.setCurrentPage()
  },
  methods: {
    setCurrentPage () {
      this.isProductPage = this.productPageRoutes.includes(this.$route.name)
      this.isCheckoutPage = this.$route.name === 'checkout'
    }
  }
}
