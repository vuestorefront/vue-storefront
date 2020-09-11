# Changelog
## 2.1.0 (not released)

## 2.0.6

### Breaking changes

- #4616

| Place | Before | 2.1.0 |
|---|---|---|
| useCartFactory | appliedCoupon ref exists | appliedCoupon removed |
| useCartFactory | coupon computed returned in useCart | coupon computed removed |
| useCartFactory | COUPON type in generic | COUPON type removed from generic |
| types | - | Added AgnosticCoupon type |
| types | - | `getCoupon` method added to CartGetters interface |

* **factories**: renamed useReviews factory to useReview ([#4800](https://github.com/DivanteLtd/vue-storefront/issues/4800))

### Changes

* **factories**: added useUserBillingFactory and useUserShippingFactory factory ([#4809](https://github.com/DivanteLtd/vue-storefront/issues/4809))

## 2.0.5

### Breaking changes

### Changes

* **factories**: added useReviews factory ([#4775](https://github.com/DivanteLtd/vue-storefront/issues/4775))
* **factories**: refactored apiClientFactory (#4777)
* **types**: removed useLocale types (#4777)
* **factories**: created useFacet factory and types (#4853)
