import { isServer } from '@vue-storefront/core/helpers'
import { htmlDecode } from '@vue-storefront/core/filters'
import debounce from 'lodash-es/debounce'
import store from '@vue-storefront/core/store'

export const GTMSearchPanel = {
  watch: {
    products () {
      if (!isServer && this.showPanel) {
        this.sendSearchListToGTM(this.products, this.search)
      }
    }
  },
  methods: {
    sendSearchListToGTM: debounce((products, search) => {
      store.commit('google-tag-manager/SET_PRODUCT_LIST', {
        products: products,
        list: 'Search',
        label: 'Search: ' + htmlDecode(search)
      })
    }, 500)
  }
}
