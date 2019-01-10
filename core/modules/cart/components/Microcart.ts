import AppliedCoupon from '../types/AppliedCoupon'
import Product from '@vue-storefront/core/modules/catalog/types/Product'
import CartTotalSegments from '../types/CartTotalSegments'

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
    isOpen () : boolean {
      return this.$store.state.cart.isMicrocartOpen
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
