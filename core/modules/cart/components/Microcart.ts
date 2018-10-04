import AppliedCoupon from '@vue-storefront/store/types/cart/AppliedCoupon'
import Product from '@vue-storefront/store/types/product/Product'
import CartTotalSegments from '@vue-storefront/store/types/cart/CartTotalSegments'

export const Microcart = {
  name: 'Microcart',
  computed: {
    productsInCart () : Product[] {
      return this.$store.state.cart.cartItems
    },
    appliedCoupon () : AppliedCoupon | false {
      return this.$store.getters['cart/coupon']
    },
    totals () : CartTotalSegments {
      return this.$store.getters['cart/totals']
    },
    isMicrocartOpen () : boolean {
      return this.$store.state.ui.microcart
    }
  },
  methods: {
    applyCoupon (code: String) : Promise<boolean> {
      return this.$store.dispatch('cart/applyCoupon', code)
    },
    removeCoupon () : Promise<boolean> {
      return this.$store.dispatch('cart/removeCoupon')
    },
    toggleMicrocart () : void {
      this.$store.dispatch('ui/toggleMicrocart')
    }
  }
}
