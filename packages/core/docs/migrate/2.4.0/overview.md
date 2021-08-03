# Migration guide 2.4.0

## Introduction

This release focused on introducing new features, mainly related to commercetools functionality, such as Forgot Password and Multi Stores.
We also prioritized bug fixing, code refactoring and made few changes to UI/main theme.

## Changes

- Added `useForgotPasswordFactory`
- Added `useSearchFactory`
- Added `useStoreFactory`
- Added Cache-Control headers for Home, Category, and Product pages
- Implemented mobile menu
- Updated form validation scheme for street, number, and city in the checkout and profile editing pages
- Changed the core logger to match the CLI outputs

We also made changes to the following files:
- updated `components/AppHeader.vue`
- updated `components/BottomNavigation.vue`
- updated `components/CartSidebar.vue`
- updated `components/Checkout/CartPreview.vue`
- updated `components/Checkout/VsfPaymentProvider.vue`
- updated `components/Checkout/VsfShippingProvider.vue`
- updated `components/LoginModal.vue`
- updated `components/MyAccount/BillingAddressForm.vue`
- updated `components/MyAccount/PasswordResetForm.vue`
- updated `components/MyAccount/ProfileUpdateForm.vue`
- updated `components/ShippingAddressForm.vue`
- updated `components/SearchResults.vue`
- updated `components/UserBillingAddress.vue`
- updated `components/UserShippingAddress.vue`
- updated `components/WishlistSiderbar.vue`
- updated `pages/Category.vue`
- updated `pages/Checkout/Billing.vue`
- updated `pages/Checkout/Payment.vue`
- updated `pages/Checkout/Shipping.vue`
- updated `pages/Home.vue`
- updated `pages/Product.vue`
- added `components/HeaderNavigation.vue`
- added `pages/ResetPassword.vue`
- added `layouts/blank.vue`