# Migration guide 2.3.0-rc.2 for commercetools

## Introduction

This migration guide helps developers using our `commercetools` integration to upgrade to version 2.3.0-rc.2.

For more information about this version, refer to the [Overview](./overview.md) page.

## Changes

We made changes to the following files:
- added new composable `useBilling`,
- added new composable `useShipping`,
- added new composable `useShippingProvider`
- added new component `components/Checkout/VsfShippingProvider`,
- added new component `components/Checkout/VsfPaymentProviderMock`,
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