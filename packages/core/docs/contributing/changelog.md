# Changelog

## 2.3.0 (not relased)
- added useUiNotification composable ([#5363](https://github.com/vuestorefront/vue-storefront/issues/5363))

## 2.2.0
- added bottom margin to fix visibility of last footer category ([#5253](https://github.com/DivanteLtd/vue-storefront/issues/5253))
- [BREAKING] refactored names of many factory methods and composable methods, details in linked PR ([#5299](https://github.com/DivanteLtd/vue-storefront/pull/5299))
- [BREAKING] changed signatures of factory methods to always 2 arguments, details in linked PR ([#5299](https://github.com/DivanteLtd/vue-storefront/pull/5299))
- [BREAKING] composables are always returning one field for the response, removed `totalOrders` and `totalProducts`, `useCartFactory` and `useUserFactory` are returning only composables ([#5330](https://github.com/vuestorefront/vue-storefront/pull/5330))
- [BREAKING] update composables in Boilerplate to match new factories signatures ([#5389](https://github.com/DivanteLtd/vue-storefront/pull/5389))
- removed `formatPrice` from `useUiHelpers`, replaced by vue18n `$n` function ([#5339](https://github.com/vuestorefront/vue-storefront/pull/5339))
- updated integration boilerplate to work with refactored names of factories mentioned above ([#5348](https://github.com/DivanteLtd/vue-storefront/pull/5348))
- change `useUserBillingFactory`, `useUserShippingFactory` and `useWishlistFactory` to return composable, move `setWishlist` inside of composable ([5350](https://github.com/vuestorefront/vue-storefront/pull/5350))
- optimize loading of fonts and their stylesheets from Google Fonts and introduce lazy hydration to improve performance ([#5326](https://github.com/DivanteLtd/vue-storefront/pull/5326))
- added missing `i18n` tags ([#5337](https://github.com/vuestorefront/vue-storefront/issues/5337))
- fix adding to cart button on product page ([#5375](https://github.com/vuestorefront/vue-storefront/pull/5375))
- typed error ref for each core's factory ([#4956](https://github.com/vuestorefront/vue-storefront/issues/4956))
- added ID to Loggers in core factories ([#5351](https://github.com/vuestorefront/vue-storefront/issues/5351))
- script for changelog generation for core ([#5256](https://github.com/DivanteLtd/vue-storefront/issues/5256))

## 2.1.1-rc.1
- updated version of nuxt composition-api

## 2.1.0-rc.1
- removed `availableFilters` and `availableSortingOptions` from `useProduct` ([#4856](https://github.com/DivanteLtd/vue-storefront/issues/4856))
- removed `@import "~@storefront-ui/vue/styles";` from all components, because SFUI variables and mixins are now available globally and imports will drastically increase bundle size ([#5195](https://github.com/DivanteLtd/vue-storefront/issues/5195))
- added new performance options to `@vue-storefront/nuxt` package ([#5195](https://github.com/DivanteLtd/vue-storefront/issues/5195))
- open active category and highlight current subcategory on the Category page ([#5244](https://github.com/DivanteLtd/vue-storefront/issues/5244))
- added missing order getter to get item price ([#5231](https://github.com/DivanteLtd/vue-storefront/issues/5231))
- changed default logging level to 'warn' and 'error' in development and production mode respectively ([#5304](https://github.com/DivanteLtd/vue-storefront/issues/5304))
- fixed broken focus in login form ([#5273](https://github.com/DivanteLtd/vue-storefront/issues/5273))
- fixed select for changing variant on product page ([#5281](https://github.com/DivanteLtd/vue-storefront/issues/5281))
- fixed checkboxes in filters sidebar are not clickable on mobile ([#5246](https://github.com/DivanteLtd/vue-storefront/pull/5246))
- fixed no option to close a login modal ([#5243](https://github.com/DivanteLtd/vue-storefront/pull/5243))
- fixed category page for mobile ([#5238](https://github.com/DivanteLtd/vue-storefront/pull/5238))
- fixed issue with CSS waterfall ([#5229](https://github.com/DivanteLtd/vue-storefront/pull/5229))
- added support for HTTP/2 push for JS assets ([#5179](https://github.com/DivanteLtd/vue-storefront/pull/5179))
- added discounts api getter ([#5154](https://github.com/DivanteLtd/vue-storefront/pull/5154))
- added context implementation ([#5218](https://github.com/DivanteLtd/vue-storefront/pull/5218))
- added context typings ([5290](https://github.com/DivanteLtd/vue-storefront/pull/5290))

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
