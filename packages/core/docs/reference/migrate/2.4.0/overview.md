# Migrating projects to 2.4.0

## Introduction

This version introduces many renaming or changes related to the function declarations among the core.
We had to proceed with this in order to keep the convention and unify the naming across whole VSF.

We changed the composables and our factories according to the following rules:
- each composable always return one field with the response from the api
- each composable function takes one argument which is an object of given parameters
- each factory param function takes two arguments, first one is context (as it was before) and second one contains a function parameters along with other options (such as customQuery)

## Changes in `useCart` composable

We introduced a breaking change in a signature of the `removeCoupon` function in the `useCart` composable. The intention is to make is consistent with the `applyCoupon` function in the same composable.

| Composable | Method | Old signature | New signature |
|------------|--------|---------------|---------------|
| useCart | removeCoupon | ({ coupon: COUPON, customQuery?: CustomQuery }) | ({ couponCode: string, customQuery?: CustomQuery })
## Other changes

- Added `useForgotPasswordFactory`.
- Added `useSearchFactory`.
- Added `useStoreFactory`.
- Added Cache-Control headers for Home, Category, and Product pages.
- Implemented mobile menu.
- Updated form validation scheme for street, number, and city in the checkout and profile editing pages.
- Changed the core logger to match the CLI outputs.

We also made changes to the following files:
- Added `components/HeaderNavigation.vue`.
- Added `pages/ResetPassword.vue`.
- Added `layouts/blank.vue`.
- Updated `components/AppHeader.vue`.
- Updated `components/BottomNavigation.vue`.
- Updated `components/CartSidebar.vue`.
- Updated `components/Checkout/CartPreview.vue`.
- Updated `components/Checkout/VsfPaymentProvider.vue`.
- Updated `components/Checkout/VsfShippingProvider.vue`.
- Updated `components/LoginModal.vue`.
- Updated `components/MyAccount/BillingAddressForm.vue`.
- Updated `components/MyAccount/PasswordResetForm.vue`.
- Updated `components/MyAccount/ProfileUpdateForm.vue`.
- Updated `components/ShippingAddressForm.vue`.
- Updated `components/SearchResults.vue`.
- Updated `components/UserBillingAddress.vue`.
- Updated `components/UserShippingAddress.vue`.
- Updated `components/WishlistSiderbar.vue`.
- Updated `pages/Category.vue`.
- Updated `pages/Checkout/Billing.vue`.
- Updated `pages/Checkout/Payment.vue`.
- Updated `pages/Checkout/Shipping.vue`.
- Updated `pages/Home.vue`.
- Updated `pages/Product.vue`.
