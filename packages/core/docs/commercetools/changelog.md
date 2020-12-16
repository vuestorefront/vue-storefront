# Changelog

## 1.0.1-rc.2 (not released)
- fix getOrders api ([#5328](https://github.com/DivanteLtd/vue-storefront/issues/5328))

## 1.0.1-rc.1
- updated version of core

## 1.0.0-rc.1
- removed `availableFilters` and `availableSortingOptions` from `useProduct` ([#4856](https://github.com/DivanteLtd/vue-storefront/issues/4856))
- removed `@import "~@storefront-ui/vue/styles";` from all components, because SFUI variables and mixins are now available globally and imports will drastically increase bundle size ([#5195](https://github.com/DivanteLtd/vue-storefront/issues/5195))
- enabled "modern mode" in `yarn build` command ([#5203](https://github.com/DivanteLtd/vue-storefront/issues/5203))
- added missing order getter to get item price ([#5231](https://github.com/DivanteLtd/vue-storefront/issues/5231))
- retry updating the cart with new version if previous request failed due to a version mismatch ([#5264](https://github.com/DivanteLtd/vue-storefront/issues/5264))
- removed logging level from nuxt.config.js to use defaults from core ([#5304](https://github.com/DivanteLtd/vue-storefront/issues/5304))
- fixed broken focus in login form ([#5273](https://github.com/DivanteLtd/vue-storefront/issues/5273))
- fixed select for changing variant on product page ([#5281](https://github.com/DivanteLtd/vue-storefront/issues/5281))
- added token re-try strategy ([#5295](https://github.com/DivanteLtd/vue-storefront/pull/5295))
- added discounts api getter ([#5154](https://github.com/DivanteLtd/vue-storefront/pull/5154))
- added context implementation ([#5218](https://github.com/DivanteLtd/vue-storefront/pull/5218))
- added context typings ([5290](https://github.com/DivanteLtd/vue-storefront/pull/5290))

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
