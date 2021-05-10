# Migration guide 2.3.0 for commercetools

## Introduction

This migration guide helps developers using our `commercetools` integration to upgrade to version 2.3.0.

For more information about this version, refer to the [Overview](./overview.md) page.

## Changes

- Added E2E (cypress) tests:
  - use `yarn test:e2e` to start Cypress,
  - use `test:e2e:hl` to run Cypress tests in headless mode. Useful for running the tests in CI/CD workflows,
  - use `test:e2e:generate:report` to generate Cypress report.
- **[BREAKING]** Fixed helpers used for search on the Category page to read `phrase` URL query string instead of `term`.
- Added `SfLoader` to `VsfShippingProvider` to correctly handle the loading state.
- Added expiration time to `vsf-commercetools-token` cookie matching token expiration time received from commercetools. Previously session cookies were used, which browsers delete when the current session ends. This forced users to log in more often than necessary.
- Fixed an issue in the cart where API calls would result in `HTTP 413 Payload Too Large` error code due to large payload size. Cart method calls will now only include cart `id` and `version` instead of the whole cart object.

We also made changes to the following files:
- updated `components/Checkout/CartPreview.vue`,
- updated `components/Checkout/UserBillingAddresses.vue`,
- updated `components/Checkout/UserShippingAddresses.vue`,
- updated `components/Checkout/VsfPaymentProviderMock.vue`,
- updated `components/Checkout/VsfShippingProvider.vue`,
- updated `components/MyAccount/BillingAddressForm.vue`,
- updated `components/MyAccount/PasswordResetForm.vue`,
- updated `components/MyAccount/ProfileUpdateForm.vue`,
- updated `components/MyAccount/ShippingAddressForm.vue`,
- updated `pages/Checkout/Billing.vue`,
- updated `pages/Checkout/Payment.vue`,
- updated `pages/Checkout/Shipping.vue`,
- updated `pages/Checkout/ThankYou.vue`.
