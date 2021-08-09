# Migration guide 2.4.0 for commercetools

## Introduction

In 2.4.0 release, we introduce Forgot Password functionality and basic support for Stores and Channels in commercetools - you can now select a specific store and its corresponding channel, e.g., to display prices for a selected channel. We also fix some bugs related to Checkout forms and add new getters.

## Changes

- Added `storeGetters`, `useStore` composable and plugin for creating locale, currency, and country cookies
- Added `forgotPasswordGetters` and `useForgotPassword` composable
- Added `getProductSku` getter to `productGetters`
- Extended `middleware.config.js` with `inventoryMode` optional property - when added to configuration, Inventory Mode is set on cart creation
- Added smartphone only promo code input
- Removed hardcoded link to the category in `SearchResults.vue`
- Replaced mocked email address in MyProfile password change tab to active user email
- Fixed bug with input characters limits on Checkout forms preventing submitting the form with a street name less than five characters long and apartment number with less than two characters long
- Added e2e tests for Checkout

We also made changes to the following files:
- updated `components/MyAccount/BillingAddressForm.vue`
- updated `components/MyAccount/ShippingAddressForm.vue`
- updated `pages/Checkout/Billing.vue`
- updated `pages/Checkout/Payment.vue`
- updated `pages/Checkout/Shipping.vue`
- updated `lang/de.js` and `lang/en.js`
- added `pages/MyAccount/MyProfile.vue`
