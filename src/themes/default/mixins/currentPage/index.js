import { isServer } from '@vue-storefront/core/helpers'

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
  computed: {
    canGoBack () {
      return !this.isHistoryEmpty() && this.isProductPage
    }
  },
  created () {
    this.setCurrentPage()
  },
  methods: {
    setCurrentPage () {
      this.isProductPage = !!this.$route.params.parentSku
      this.isCheckoutPage = this.$route.name === 'checkout'
    },
    // Check if history is empty
    isHistoryEmpty () {
      if (!isServer) {
        return window.history.length <= 1
      }

      return false
    }
  }
}
