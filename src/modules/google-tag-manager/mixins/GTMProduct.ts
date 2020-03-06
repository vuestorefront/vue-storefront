import { isServer } from '@vue-storefront/core/helpers'
import { mapGetters } from 'vuex'
import debounce from 'lodash-es/debounce'
import store from '@vue-storefront/core/store'

export const GTMProduct = {
  watch: {
    getCurrentProduct () {
      if (!isServer && this.getCurrentProduct) {
        this.sendProductToGTM(this.getCurrentProduct, this.list, this.categoryGtm)
      }
    }
  },
  methods: {
    sendProductToGTM: debounce((product, list, category) => {
      store.commit('google-tag-manager/SET_PRODUCT_CURRENT', {
        product: product,
        list: list,
        category: category
      })
    }, 250)
  },
  computed: {
    ...mapGetters({
      getBreadcrumbs: 'breadcrumbs/getBreadcrumbsRoutes'
    }),
    list () {
      return 'Product'
    },
    categoryGtm () {
      if (this.getBreadcrumbs) {
        let routes = this.getBreadcrumbs
        routes = routes
          .map(el => {
            return el.name
          })
          .join('/')
        return routes
      }
      return ''
    }
  },
  mounted () {
    if (!isServer && this.getCurrentProduct) {
      this.sendProductToGTM(this.getCurrentProduct, this.list, this.categoryGtm)
    }
  }
}
