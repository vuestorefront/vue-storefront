# Migration guide 2.3.0-rc.1 for commercetools

## Introduction

This is a migration guide meant to help developers using our `commercetools` integration to upgrade to a new version 2.3.0-rc.1.

For more information about the new version, please refer to the [Overview](./overview.md) page.

## Changes

We also made changes to the following files:
- added new composable `useBilling`,
- added new composable `useShipping`,
- added new composable `useShippingProvider`
- added new component `VsfShippingProvider`,
- added new component `VsfPaymentProviderMock`,
- added new components `pages/Checkout/Billing.vue`,
- added new helper `helpers/Checkout/getShippingMethodPrice.ts`,
- added new middleware `middleware/is-authenticated.js`,
- added `middleware.config.js`,
- updated `components/Checkout/UserBillingAddresses.vue`,
- updated `components/Checkout/UserShippingAddresses.vue`,
- updated `composables/useUiHelpers/index.ts`:
  - renamed `changeSearchTerm` to `setTermForUrl`,
  - added `getSearchTermFromUrl`,
- updated translations in `theme/lang`,
- updated `middleware/checkout.js`,
- updated `pages/Checkout.vue`,
- updated `pages/Checkout/Payment.vue`,
- updated `pages/Checkout/Shipping.vue`,
- updated icons in `static/icons`,
- updated `nuxt.config.js`,
- updated `package.json`,
- deleted component `pages/Checkout/OrderReview.vue`,
- deleted component `pages/Checkout/PersonalDetails.vue`.