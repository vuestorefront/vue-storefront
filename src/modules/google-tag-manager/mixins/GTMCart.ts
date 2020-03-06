import { isServer } from '@vue-storefront/core/helpers'

export const GTMCart = {
  watch: {
    componentLoaded () {
      if (!isServer && this.componentLoaded && this.productsInCart.length > 0) {
        this.$store.commit('google-tag-manager/SET_CART', {
          products: this.productsInCart
        })
      }
    }
  }
}
