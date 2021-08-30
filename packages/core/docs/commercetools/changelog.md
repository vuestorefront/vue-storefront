# Changelog

## 1.3.1

-  Revert changes to Webpack configuration and Google font loading ([#6203](https://github.com/vuestorefront/vue-storefront/pull/6203)) - [Filip Sobol](https://github.com/filipsobol)


## 1.3.0

- [BREAKING] Enable the purchase of item with selected supply channel and distribution channel ([#6161](https://github.com/vuestorefront/vue-storefront/pull/6161)) - [Alef Barbeli](https://github.com/alefbarbeli)

| Before | After | Comment | Module
| ------ | ----- | ------ | ------
the addToCart method has the signature addToCart ({ id, version }: CartDetails, product: ProductVariant, quantity: number): Promise<CartResponse>; | now the addToCart method was change to enable the supply and distribution channels with the signature addToCart ({ id, version }: CartDetails, params: { product: ProductVariant; quantity: number; supplyChannel?: string; distributionChannel?: string;}): Promise<CartResponse>; | The composable was changed to match this signature. The changes from Click & Collect / MultiStore are required to use this feature on Product.vue | api-client,
-  Added missing mobile menu to CT ([#6184](https://github.com/vuestorefront/vue-storefront/pull/6184)) - [Łukasz Jędrasik](https://github.com/lukaszjedrasik)
   ,
-  Added customQuery support for useUser factory params ([#5883](https://github.com/vuestorefront/vue-storefront/pull/5823)) - [vn-vlad](https://github.com/vn-vlad)
,
-  Fix locale links in core and commercetools integration ([#5886](https://github.com/vuestorefront/vue-storefront/issues/5886)) - [Baroshem](https://github.com/Baroshem)
,
-  Remove SSR from personalized elements ([#5925](https://github.com/vuestorefront/vue-storefront/pull/5925)) - [vn-vlad](https://github.com/vn-vlad)
,
-  Add "useStore" implementation and plugin for creating locale, currency and country cookies ([#5945](https://github.com/vuestorefront/vue-storefront/pull/5945)) - [vn-vlad](https://github.com/vn-vlad)
,
-  Add forgot password functionality ([#5968](https://github.com/vuestorefront/vue-storefront/issues/5968)) - [Baroshem](https://github.com/Baroshem)
,
-  Click "Add New Address" button on the Checkout does not submit the form ([#5994](https://github.com/vuestorefront/vue-storefront/pull/6034)) - [lukaszjedrasik](https://github.com/lukaszjedrasik)
,
-  Remove `generate` command from `package.json` ([#6035](https://github.com/vuestorefront/vue-storefront/pull/6035)) - [lukaszjedrasik](https://github.com/lukaszjedrasik)
,
-  Refactor updateCart, fix retry logic in case of mismatch of cart ([#6050](https://github.com/vuestorefront/vue-storefront/pull/6054)) - [git-antonyuk](https://github.com/git-antonyuk)
,
- [BREAKING] refactor(commercetools): fix the frontend client bundling the commercetools-sdk and apollo client ([#6066](https://github.com/vuestorefront/vue-storefront/pull/6066)) - [bloodf](https://github.com/bloodf)

| Before | After | Comment | Module 
| ------ | ----- | ------ | ------
the "createCommerceToolsConnection" were being exported by the api-client | the "createCommerceToolsConnection" is not being exported anymore | to use the current connection, you will need to access the context to call the API | api-client,
-  Linked banner grids buttons on homepage ([#6070](https://github.com/vuestorefront/vue-storefront/pull/6070)) - [Justyna Gieracka](https://github.com/justyna-13)
,
-  Replace mocked email address in MyProfile password change tab to active user email ([#6079](https://github.com/vuestorefront/vue-storefront/pull/6079)) - [Adam Pawliński](https://github.com/AdamPawlinski)
,
-  Removed hardcoded link to category in SearchResults.vue ([#6081](https://github.com/vuestorefront/vue-storefront/pull/6081)) - [Justyna Gieracka](https://github.com/justyna-13)
,
-  Added new product getter `getProductSku` ([#6107](https://github.com/vuestorefront/vue-storefront/pull/6107)) - [Justyna Gieracka](https://github.com/justyna-13)
,
-  Smartphone only promo code input added ([#6112](https://github.com/vuestorefront/vue-storefront/pull/6112)) - [vn-vlad](https://github.com/vn-vlad)
,
-  Updates form validation scheme for street, number and city in the checkout and profile editing pages ([#6122](https://github.com/vuestorefront/vue-storefront/pull/6122)) - [Heitor Ramon Ribeiro](https://github.com/bloodf)
,
- [BREAKING] updated the removeCoupon interface to match the applyCoupon ([#6126](https://github.com/vuestorefront/vue-storefront/pull/6126)) - [Heitor Ramon Ribeiro](https://github.com/bloodf)

| Before | After | Comment | Module 
| ------ | ----- | ------ | ------
the useCart composable method removeCoupon was using this call signature: ({ coupon: COUPON, customQuery?: CustomQuery })   | the method signature was changed to: ({ couponCode: string, customQuery?: CustomQuery })   | on each removeCoupon composable usage need to change the "coupon" to "couponCode" | composables,
-  Add new getter for orders total and change return value of searchOrders ([#6132](https://github.com/vuestorefront/vue-storefront/issues/5968)) - [Baroshem](https://github.com/Baroshem)

- Phone number validation via awesome-phonenumber ([#5951](https://github.com/vuestorefront/vue-storefront/issues/5951)) - [Fifciu](https://github.com/Fifciu)

## 1.2.3

-  Use cookies to read information about i18n ([#5919](https://github.com/vuestorefront/vue-storefront/pull/5919)) - [andrzejewsky](https://github.com/andrzejewsky)
,
-  Resetting commercetools token when clearing user session ([#5920](https://github.com/vuestorefront/vue-storefront/pull/5920)) - [andrzejewsky](https://github.com/andrzejewsky)
,
-  Fix calculation of cart totals ([#5932](https://github.com/vuestorefront/vue-storefront/pull/5932)) - [Filip Sobol](https://github.com/filipsobol)


## 1.2.2

-  Allow searching by orderNumber ([#5858](https://github.com/vuestorefront/vue-storefront/pull/5858)) - [samriley](https://github.com/samriley)


## 1.2.1

-  Add args parameter to custom queries ([#5854](https://github.com/vuestorefront/vue-storefront/issues/5854)) - [andrzejewsky](https://github.com/andrzejewsky)
,
-  Export factory params for all composables to allow overriding ([#5862](https://github.com/vuestorefront/vue-storefront/pull/5862)) - [Filip Sobol](https://github.com/filipsobol)
,
-  Export helper Apollo Link functions for easier overriding ([#5873](https://github.com/vuestorefront/vue-storefront/pull/5873)) - [Filip Sobol](https://github.com/filipsobol)


## 1.2.0

-  Set 'vsf-commercetools-token' cookie expiration time to match token expiration time. ([#5774](https://github.com/vuestorefront/vue-storefront/pull/5774)) - [Filip Sobol](https://github.com/filipsobol)
,
-  Reduce payload size for cart methods ([#5836](https://github.com/vuestorefront/vue-storefront/pull/5836)) - [Filip Sobol](https://github.com/filipsobol)


## 1.2.0-rc.3

-  Fix getters in `cartGetters` to not throw errors when some properties don't exist ([#5699](https://github.com/vuestorefront/vue-storefront/pull/5699)) - [Filip Sobol](https://github.com/filipsobol)
,
-  Fixed mapping for product attributes with type `set` ([#5708](https://github.com/vuestorefront/vue-storefront/pull/5708)) - [Filip Sobol](https://github.com/filipsobol)
,
-  Fixed CT wishlist throwing CAPI error ([#5716](https://github.com/vuestorefront/vue-storefront/pull/5716)) - [Filip Sobol](https://github.com/filipsobol)


## 1.2.0-rc.2

-  Adjust Checkout UI ([#5343](https://github.com/vuestorefront/vue-storefront/issues/5343)) - [Justyna Gieracka](https://github.com/justyna-13)
,
- [BREAKING] Usage of api middleware ([#5361](https://github.com/vuestorefront/vue-storefront/pull/5361)) - [Patryk Andrzejewski](https://github.com/andrzejewsky)

| Before | After | Comment | Module 
| ------ | ----- | ------ | ------
one entrypoint | multiple entrypoints | We expose multiple entrypoints for server and client side interaction | commercetools,
-  New part of checkout - shipping details, inside core and commercetools ([#5419](https://github.com/vuestorefront/vue-storefront/pull/5552)) - [Fifciu](https://github.com/Fifciu)
,
-  Added `is-authenticated` middleware to protect user profile routes from guest access ([#5442](https://github.com/vuestorefront/vue-storefront/pull/5442)) - [Filip Sobol](https://github.com/filipsobol)
,
-  Improvements for api middleware ([#5500](https://github.com/vuestorefront/vue-storefront/pull/5500)) - [Patryk Andrzejewski](https://github.com/andrzejewsky)
,
- [BREAKING] New part of checkout - Billing details, inside core and commercetools ([#5552](https://github.com/vuestorefront/vue-storefront/pull/5552)) - [Fifciu](https://github.com/Fifciu)

| Before | After | Comment | Module 
| ------ | ----- | ------ | ------
UserBillingAddress works properly | New API inside Checkout/UserBillingAddress.vue | Customized components to work with new checkout | commercetools-theme,
- [BREAKING] Quick search ([#5566](https://github.com/vuestorefront/vue-storefront/issues/5566)) - [Justyna Gieracka](https://github.com/justyna-13)

| Before | After | Comment | Module 
| ------ | ----- | ------ | ------
{ changeSearchTerm } = useUiHelpers() | { setTermForUrl } = useUiHelpers(); | Changed changeSearchTerm name to setTermForUrl | useUiHelpers/index.ts,
 | { getSearchTermFromUrl } = useUiHelpers(); | Created new function | useUiHelpers/index.ts,
- [BREAKING] Implementation of api middleware ([#5577](https://github.com/vuestorefront/vue-storefront/pull/5577)) - [Patryk Andrzejewski](https://github.com/andrzejewsky)

| Before | After | Comment | Module 
| ------ | ----- | ------ | ------
customQuery was used as a function | customQuery is a key-value object | The key is a query name, value is the name of a new query function, defined in the middleware config | commercetools,
- [BREAKING] New Payment API for Checkout ([#5587](https://github.com/vuestorefront/vue-storefront/pull/5587)) - [Fifciu](https://github.com/Fifciu)

| Before | After | Comment | Module 
| ------ | ----- | ------ | ------
Dedicated composable for whole checkout | Dedicated composable for Shipping, Billing and Provider components | undefined | commercetools,
-  State as a select field at both Checkout and MyAccount (shipping & billing). Support for freeAbove in shipping methods ([#5628](https://github.com/vuestorefront/vue-storefront/pull/5628)) - [Fifciu](https://github.com/Fifciu)


# 1.1.7
- fixed error with login to the account ([#5613](https://github.com/vuestorefront/vue-storefront/issues/5613))

# 1.1.6
- fix register function from CT useUser composable allows user to log in [#5613](https://github.com/vuestorefront/vue-storefront/issues/5613)

# 1.1.5
- remove deprecated field `description` from shipping methods query [#5614](https://github.com/vuestorefront/vue-storefront/issues/5614)

# 1.1.6
- fix register function from CT useUser composable allows user to log in [#5613](https://github.com/vuestorefront/vue-storefront/issues/5613)

# 1.1.5
- remove deprecated field `description` from shipping methods query [#5614](https://github.com/vuestorefront/vue-storefront/issues/5614)

# 1.1.3
- cover errors in re-try apollo-link that are not comming from graphql ([#5548](https://github.com/vuestorefront/vue-storefront/pull/5548))

# 1.1.2
- moved from using `attributesList` to `attributesRaw`
- add 'once' to prevent font reload on each reactivity event ([#5513](https://github.com/DivanteLtd/vue-storefront/issues/5534))

## 1.1.1
- fixed `vue-lazy-hydration` dependency in `nuxt-theme-module` ([#5406](https://github.com/DivanteLtd/vue-storefront/issues/5406))

## 1.1.0
- fix getOrders api ([#5328](https://github.com/DivanteLtd/vue-storefront/issues/5328))
- added bottom margin to fix visibility of last footer category ([#5253](https://github.com/DivanteLtd/vue-storefront/issues/5253))
- [BREAKING] refactored names of many factory methods and composable methods, details in linked PR ([#5299](https://github.com/DivanteLtd/vue-storefront/pull/5299))
- [BREAKING] changed signatures of factory methods to always 2 arguments, details in linked PR ([#5299](https://github.com/DivanteLtd/vue-storefront/pull/5299))
- [BREAKING] removed `totalOrders` and `totalProducts` ([#5330](https://github.com/vuestorefront/vue-storefront/pull/5330))
- removed `formatPrice` from `useUiHelpers`, replaced by vue18n `$n` function ([#5339](https://github.com/vuestorefront/vue-storefront/pull/5339))
- added missing `i18n` tags ([#5337](https://github.com/vuestorefront/vue-storefront/issues/5337))
- use updated factories `useUserBillingFactory`, `useUserShippingFactory` and `useWishlistFactory` ([5350](https://github.com/vuestorefront/vue-storefront/pull/5350))
- use updated factories `useUserBillingFactory`, `useUserShippingFactory` and `useWishlistFactory` ([5350](https://github.com/vuestorefront/vue-storefront/pull/5350))
- fix selecting country on checkout payment and shipping ([5386](https://github.com/vuestorefront/vue-storefront/pull/5386))
- `createMyShoppingList` as a restricted anonymous operation

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
