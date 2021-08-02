# Migration guide 2.4.0 for commercetools

## Introduction

In 2.4.0 release, we introduce Forgot Password functionality and basic support for Stores and Channels in commercetools - you can now select a specifc store and its corresponding channel, e.g. to display prices for selected channel. We also fix some bugs related to Checkout forms and add new getters.

## Changes

- Added `useStore` composable and plugin for creating locale, currency and country cookies
- Added `forgotPasswordGetters`
- Added `storeGetters`
- Added `getProductSku` getter to `productGetters`
- Fixed bug with input characters limits on Checkout forms preventing submitting form with street name less than 5 characters long and apartment number with less than 2 characters long
- Added e2e tests for Checkout

We also made changes to the following files:
- updated `components/MyAccount/BillingAddressForm.vue`
- updated `components/MyAccount/ShippingAddressForm.vue`
- updated `pages/Checkout/Billing.vue`
- updated `pages/Checkout/Payment.vue`
- updated `pages/Checkout/Shipping.vue`
- added `pages/MyAccount/MyProfile.vue`
