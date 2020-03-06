import { isServer } from '@vue-storefront/core/helpers'
import { mapGetters } from 'vuex'

export const GTMCategory = {
  data () {
    return {
      currentPosL: 0,
      currentPosR: 0
    }
  },
  computed: {
    ...mapGetters({
      getCategoryBreadcrumbs: 'category/getCategoryBreadcrumbs',
      getCurrentCategory: 'category/getCurrentCategory'
    }),
    list () {
      let routes = this.getCategoryBreadcrumbs.routes
      routes = routes.map((el) => { return el.name }).join('/')
      return routes ? routes + '/' + this.getCurrentCategory.name : this.getCurrentCategory.name
    }
  },
  watch: {
    getCategoryProducts: function () {
      if (!isServer && this.getCategoryProducts && this.getCategoryProducts.length > 0) {
        this.currentPosR = this.getCategoryProducts.length
        let products = this.getCategoryProducts.slice(this.currentPosL, this.currentPosR)
        this.$store.commit('google-tag-manager/SET_PRODUCT_LIST', {
          products: products,
          list: 'Category',
          label: 'Category: ' + this.getCurrentCategory.name,
          category: this.list
        })
        this.currentPosL = this.getCategoryProducts.length
      }
    }
  },
  mounted () {
    if (!isServer && this.getCategoryProducts && this.getCategoryProducts.length > 0) {
      this.$store.commit('google-tag-manager/SET_PRODUCT_LIST', {
        products: this.getCategoryProducts,
        list: 'Category',
        label: 'Category: ' + this.getCurrentCategory.name,
        category: this.list
      })
    }
  }
}
