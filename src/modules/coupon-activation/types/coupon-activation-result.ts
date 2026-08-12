export type CouponActivationStatus =
  | 'applied'
  | 'saved'
  | 'already-applied'
  | 'conflict'
  | 'rejected'

export interface CouponActivationResult {
  status: CouponActivationStatus
}
