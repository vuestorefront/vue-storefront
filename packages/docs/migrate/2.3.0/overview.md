# Migrating projects to 2.3.0

## Introduction

This release is the first one we officially call **Vue Storefront 2** (previously Vue Storefront Next). We hosted Vue Storefront Summit 2021, which you can learn more about [in our blog post](https://blog.vuestorefront.io/vue-storefront-summit-2021-short-summary-and-every-video/).
During the Summit, we announced many new eCommerce integrations and move from Slack to Discord server. [Join us](https://discord.vuestorefront.io/) to stay up-to-date and ask for help.

In this release, we focused on bug fixes and test coverage but also introduced few changes.

## Changes

- Added new `v-e2e` directive. It adds `data-e2e` attribute to the element in development mode or when app is ran with `NUXT_ENV_E2E` environment variable and can be used as selectors for E2E tests.
- Added E2E (cypress) tests.
- Updated Storefront UI to the latest version.
- Fix hydration bug on the Category page.
- Added support for custom queries in methods in `useUserBilling` and `useUserShipping` composables.
- **[BREAKING]** Added `changeToCategoryListView` and renamed `toggleCategoryGridView` to `changeToCategoryGridView` in `composables/useUiState.ts`.

We also made changes to the following files:
- updated `components/AppFooter.vue`,
- updated `components/AppHeader.vue`,
- updated `components/BottomNavigation.vue`,
- updated `components/CartSidebar.vue`,
- updated `components/Checkout/VsfPaymentProvider.vue`,
- updated `components/Checkout/VsfShippingProvider.vue`,
- updated `components/LocaleSelector.vue`,
- updated `components/LoginModal.vue`,
- updated `components/RelatedProducts.vue`,
- updated `components/SearchResults.vue`,
- updated `components/TopBar.vue`,
- updated `components/WishlistSidebar.vue`,
- updated `layouts/account.vue`,
- updated `layouts/default.vue`,
- updated `layouts/error.vue`,
- updated `pages/Category.vue`,
- updated `pages/Checkout/Billing.vue`,
- updated `pages/Checkout/Payment.vue`,
- updated `pages/Checkout/Shipping.vue`,
- updated `pages/Checkout/ThankYou.vue`,
- updated `pages/Home.vue`,
- updated `pages/MyAccount.vue`,
- updated `pages/MyAccount/BillingDetails.vue`,
- updated `pages/MyAccount/LoyaltyCard.vue`,
- updated `pages/MyAccount/MyNewsletter.vue`,
- updated `pages/MyAccount/MyProfile.vue`,
- updated `pages/MyAccount/MyReviews.vue`,
- updated `pages/MyAccount/OrderHistory.vue`,
- updated `pages/MyAccount/ShippingDetails.vue`,
- updated `pages/Product.vue`.
