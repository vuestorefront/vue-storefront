import Vue from 'vue'
import VueGtm from 'vue-gtm'
import { mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import AbstractMixin from './abstractMixin'

export default {
  mixins: [ AbstractMixin ],
  methods: {
    productGtm () {
      if (!this.enabled) {
        return
      }

      const GTM: VueGtm = (Vue as any).gtm

      const storeView = currentStoreView()
      const { currencyCode } = storeView.i18n

      GTM.trackEvent({
        event: 'icmaa-product-view',
        ecommerce: {
          currencyCode,
          detail: {
            actionField: { list: '' },
            products: [this.getGTMProductDTO(this.originalProduct)]
          }
        }
      })
    }
  },
  watch: {
    originalProduct (data) {
      this.productGtm()
    }
  },
  mounted () {
    this.productGtm()
  }
}
