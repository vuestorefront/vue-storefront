# Changelog

## 2.0.9

- added `getTotalReviews` and `getAverageRating` to `productGetters` ([#4958](https://github.com/DivanteLtd/vue-storefront/issues/4958))
- fix ssr transitions
- updated UseUserShipping & UserShippingGetters interfaces, implemented them in useUserShippingFactory, written & updated tests ([#4841](https://github.com/DivanteLtd/vue-storefront/issues/4841))

## 2.0.8

- renamed `refreshUser` to `load` in `useUser`, user shouldn't be automatically loaded now (#4917)
- implementing logger feature (#4911)
- fix cart hydration issues (#4942)

## 2.0.6

- renamed useReviews factory to useReview (#4800)
- added useUserBillingFactory and useUserShippingFactory factory (#4809)

## 2.0.5

- added useReviews factory (#4775)
- refactored apiClientFactory (#4777)
- removed useLocale types (#4777)
- created useFacet factory and types (#4853)
