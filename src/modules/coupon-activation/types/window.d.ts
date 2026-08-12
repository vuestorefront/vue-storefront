import type { CouponActivationResult } from './coupon-activation-result'

declare global {
  interface BudsiesGlobal {
    applyCoupon?: (couponCode: string) => Promise<CouponActivationResult>
  }
}

export {}
