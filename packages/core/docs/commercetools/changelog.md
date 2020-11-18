# Changelog

## 0.2.7 - not released

- [BREAKING] removed `availableFilters` and `availableSortingOptions` from `useProduct` ([#4856](https://github.com/DivanteLtd/vue-storefront/issues/4856))
- enabled "modern mode" in `yarn build` command ([#5203](https://github.com/DivanteLtd/vue-storefront/issues/5203))

## 0.2.6

- fix errors throw by some product getters ([#5089](https://github.com/DivanteLtd/vue-storefront/issues/5089))
- The address `contactInfo` field is deprecated in the CT api. We have added support for the contact information fields directly in the address and will now show a warning when deprecated field is used ([#5083](https://github.com/DivanteLtd/vue-storefront/pull/5083))
- removed `chosenShippingMethod` defaulting ([#5073](https://github.com/DivanteLtd/vue-storefront/issues/5073))
- fix `useCheckout` - set loading fields to false when api-client throws ([#5096](https://github.com/DivanteLtd/vue-storefront/pull/5096))

## 0.2.5

- `customQuery` for checkout composables ([#5025](https://github.com/DivanteLtd/vue-storefront/issues/5025))
- api-client apollo client no longer shared between requests ([#5056](https://github.com/DivanteLtd/vue-storefront/pull/5056))

## 0.2.4

- Remove defaulting for checkout shipping details ([#5026](https://github.com/DivanteLtd/vue-storefront/issues/5026))

### Changes

- added `getTotalReviews` and `getAverageRating` to `productGetters` ([#4958](https://github.com/DivanteLtd/vue-storefront/issues/4958))
- added '_rating' back to the product ([#4958](https://github.com/DivanteLtd/vue-storefront/issues/4958))
- added mock for user shipping addresses in MyShippingDetails and Checkout's Shipping ([#4841](https://github.com/DivanteLtd/vue-storefront/issues/4841))

## 0.2.3

### Changes

- adding ability to overriding `isTokenUserSession` check in api-client ([#4959](https://github.com/DivanteLtd/vue-storefront/issues/4959))

## 0.2.2

### Breaking changes

- removed '_rating' from product ([#4906](https://github.com/DivanteLtd/vue-storefront/issues/4906))

### Changes

- Fix types for CT api-client and composables packages ([#4924](https://github.com/DivanteLtd/vue-storefront/pull/4924))
- fixed updateUser on useUser composable ([#4863](https://github.com/DivanteLtd/vue-storefront/issues/4863))
- implemented useReviews on product page ([#4800](https://github.com/DivanteLtd/vue-storefront/issues/4800))
- implemented faceting using useFacet factory ([#4853](https://github.com/DivanteLtd/vue-storefront/issues/4853))
- fixed anonymous token loading ([#4917](https://github.com/DivanteLtd/vue-storefront/issues/4917))
- fixed bugs related to customQuery ([#4933](https://github.com/DivanteLtd/vue-storefront/issues/4933), [#4913](https://github.com/DivanteLtd/vue-storefront/issues/4913))

## 0.1.0

- refactored setup using apiClientFactory ([#4777](https://github.com/DivanteLtd/vue-storefront/issues/4777))
