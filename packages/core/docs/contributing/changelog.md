# Changelog

## 2.0.13 - not released

 - script for changelog generation for core ([#5256](https://github.com/DivanteLtd/vue-storefront/issues/5256)) - [Justyna](https://github.com/justyna-13)

- [BREAKING] removed `availableFilters` and `availableSortingOptions` from `useProduct` ([#4856](https://github.com/DivanteLtd/vue-storefront/issues/4856))
- [IMPORTANT] removed `@import "~@storefront-ui/vue/styles";` from all components, because SFUI variables and mixins are now available globally and imports will drastically increase bundle size ([#5195](https://github.com/DivanteLtd/vue-storefront/issues/5195))
- added new performance options to `@vue-storefront/nuxt` package ([#5195](https://github.com/DivanteLtd/vue-storefront/issues/5195))
- open active category and highlight current subcategory on the Category page ([#5244](https://github.com/DivanteLtd/vue-storefront/issues/5244))

## 2.0.12

- fix ssr implementation, transition on client-side ([#5103](https://github.com/DivanteLtd/vue-storefront/pull/5103))

## 2.0.11

- fixed SSR in useWishlistFactory ([#5076](https://github.com/DivanteLtd/vue-storefront/issues/5076))
- added `components/MyAccount/BillingAddressForm.vue` and `components/UserBillingAddress.vue` components for vendor-specific address formats ([#5069](https://github.com/DivanteLtd/vue-storefront/issues/5069))

## 2.0.10

- added `useContent` and `renderContent` ([#4848](https://github.com/DivanteLtd/vue-storefront/issues/4848))
- added `useUiState` composable instead `ui-state.ts` ([#4876](https://github.com/DivanteLtd/vue-storefront/issues/4876))
- added `components/MyAccount/ShippingAddressForm.vue` and `components/UserShippingAddress.vue` components for vendor-specific address formats ([#5032](https://github.com/DivanteLtd/vue-storefront/issues/5032))
- added `getStreetNumber`, `getId`, `getApartmentNumber` and `isDefault` to `shippingGetters` ([#5032](https://github.com/DivanteLtd/vue-storefront/issues/5032))
- support for customQuery in `loadWishlist`, `removeFromWishlist` and `addToWishlist` from useWishlistFactory ([#5059](https://github.com/DivanteLtd/vue-storefront/issues/5059))

## 2.0.9

- added `getEmailAddress` getter to `userGetters` ([#4939](https://github.com/DivanteLtd/vue-storefront/pull/4939))
- added `getTotalReviews` and `getAverageRating` to `productGetters` ([#4958](https://github.com/DivanteLtd/vue-storefront/issues/4958))
- fix ssr transitions
- updated UseUserShipping & UserShippingGetters interfaces, implemented them in useUserShippingFactory, written & updated tests ([#4841](https://github.com/DivanteLtd/vue-storefront/issues/4841))
- fix `sharedRef` nullable assigning

## 2.0.8

- renamed `refreshUser` to `load` in `useUser`, user shouldn't be automatically loaded now [#4917](https://github.com/DivanteLtd/vue-storefront/pull/4917)
- implementing logger feature [#4911](https://github.com/DivanteLtd/vue-storefront/pull/4911)
- fixed cart hydration issues [#4942](https://github.com/DivanteLtd/vue-storefront/pull/4942)

## 2.0.6

- renamed useReviews factory to useReview [#4800](https://github.com/DivanteLtd/vue-storefront/pull/4800)
- added useUserBillingFactory and useUserShippingFactory factory [#4809](https://github.com/DivanteLtd/vue-storefront/pull/4809)

## 2.0.5

- added useReviews factory [#4775](https://github.com/DivanteLtd/vue-storefront/pull/4775)
- refactored apiClientFactory [#4777](https://github.com/DivanteLtd/vue-storefront/pull/4777)
- removed useLocale types [#4777](https://github.com/DivanteLtd/vue-storefront/pull/4777)
- created useFacet factory and types [#4853](https://github.com/DivanteLtd/vue-storefront/pull/4853)
