import { isServer } from '@vue-storefront/core/helpers'

export const GTM = {
  props: {
    list: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    sendProductClick (position = null) {
      if (!isServer && this.product) {
        this.$store.commit('google-tag-manager/SET_PRODUCT_CLICK', {
          product: this.product,
          list: this.list ? this.list : '',
          position: position + 1
        })
      }
    },
    sendWishlistTrack () {
      if (!isServer && this.product) {
        this.$store.commit('google-tag-manager/ADD_PRODUCT_WISHLIST', {
          product: this.product
        })
      }
    },
    sendCompareTrack () {
      if (!isServer && this.product) {
        this.$store.commit('google-tag-manager/ADD_PRODUCT_COMPARE', {
          product: this.product
        })
      }
    },
    sendProductImpressions (products, list = null, label = null) {
      this.$store.commit('google-tag-manager/SET_PRODUCT_LIST', {
        products: products,
        list: list,
        label: label
      })
    },
    sendPromoClick (promo) {
      this.$store.commit('google-tag-manager/SET_PROMO_CLICK', {
        promo: {
          name: promo.name,
          id: promo.id,
          creative: promo.creative,
          position: promo.position + 1
        }
      })
    },
    sendPromoView (promo) {
      this.$store.commit('google-tag-manager/SET_PROMO_VIEW', {
        promo: {
          name: promo.name,
          id: promo.id,
          creative: promo.creative,
          position: promo.position + 1
        }
      })
    }
  }
}
