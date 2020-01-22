import Vue from 'vue'
import VueGtm from 'vue-gtm'
import { mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { googleTagManager } from 'config'
import AbstractMixin from './abstractMixin'

export default {
  mixins: [ AbstractMixin ],
  computed: {
    ...mapGetters({
      categoryProducts: 'category-next/getCategoryProducts'
    }),
    products () {
      return this.categoryProducts
        .slice(0, googleTagManager.categoryProductCount)
        .map(p => this.getGTMProductDTO(p, googleTagManager.categoryProductAttributes))
    }
  },
  methods: {
    categoryGtm () {
      if (!this.enabled || this.products.length === 0) {
        return
      }

      const storeView = currentStoreView()
      const { currencyCode } = storeView.i18n

      const GTM: VueGtm = (Vue as any).gtm
      GTM.trackEvent({
        event: 'icmaa-category-view',
        ecommerce: {
          currencyCode,
          categoryId: this.getCurrentCategory.id,
          categoryName: this.getCurrentCategory.name,
          impressions: this.products
        }
      })
    }
  },
  watch: {
    categoryProducts (data) {
      this.categoryGtm()
    }
  },
  mounted () {
    this.categoryGtm()
  }
}
