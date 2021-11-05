# Upgrading to 1.4.0

## Introduction

:::warning Start by updating the core packages
This guide only includes commercetools-specific changes. Follow the [Migrating projects to 2.5.0](/migrate/2.5.0/overview.html) guide to update the core before you proceed with applying changes from this guide.
:::

In this release, we focused on improving security and performance and updating GraphQL types.

This release includes some breaking changes. However, adjusting your projects shouldn't take too long and only requires a few minor changes.

### Updated GraphQL types

You might have noticed that the `@vue-storefront/commercetools-api` package exports [TypeScript types](/commercetools/api-reference/commercetools-api.html) for GraphQL data returned by commercetools. We didn't update them for quite a while and decided that it was time to do it. There are plenty of new types as well as some breaking changes to the old types. Depending on the types you use, you might need to update your project.

### Handling access tokens

We completely rewrote internals for handling authentication because of the poor performance of the old solution. Previously, the application requested a new access token several times for every user visiting the page if they didn't have the token cookie. This approach didn't make much sense, especially because [all guests share the same access token](https://docs.commercetools.com/api/authorization#create-anonymous-sessions-only-once-necessary) until their session become unique in any way, for example, by logging in or adding an item to the cart or wishlist.

From now on, the application will request one access token for server operations (introduced in the previous release) and one for all guests. The server stores these tokens and doesn't send them out to the users. It will only create session cookies only for anonymous and logged-in users.

:::tip What is an anonymous session in commercetools?
You might be wondering what an "anonymous" session is and how it's different from the "guest" session. In commercetools there are three types of sessions:

* **guest** - user that didn't log in nor perform any visitor-specific operation,
* **anonymous** - user that didn't log in but performed some visitor-specific operation, for example, added item to the cart or wishlist,
* **customer** - user that logged into the application.
:::

This change by itself doesn't require any changes in existing projects. However, we used this opportunity to improve the security of the cookies storing the user session. See the next section for more details.

### Improving security of the session cookie

The commercetools integration creates the `vsf-commercetools-token` cookie to store the user session. In the past, this cookie didn't include the `secure` and `httpOnly` attributes. The lack of these attributes meant that the cookie could be sent with unsecured HTTP and be accessed using JavaScript, which exposed the cookie to security risks.

From now on, a session cookie will always have the `httpOnly` attribute. It will also have the `secure` attribute, but only if the request was HTTPS. For this reason, you don't have to use HTTPS in your development environments.

However, because the session cookie can no longer be accessed using JavaScript, we needed a new way of checking if the user is logged in. For this reason, we introduced a new `isLoggedIn` endpoint. **You need to update the `middleware/is-authenticated.js` file**, which protects `/my-account` routes from unauthorized access and all other parts of the application that read the session cookie.

```javascript
// middleware/is-authenticated.js
import { Logger } from '@vue-storefront/core';

export default async ({ $vsf, route, redirect }) => {
  try {
    const isLoggedIn = await $vsf.$ct.api.isLoggedIn();

    if (!isLoggedIn) {
      throw new Error(`"${ route.fullPath }" route is only available to logged-in customers`);
    }
  } catch (error) {
    Logger.warn(error.toString());
    return redirect('/');
  }
};
```

In components, you can use the same approach by using the `useVSFContext` helper to access the `$ct` context.

```javascript
// Vue components
import { useVSFContext } from '@vue-storefront/core';

export default {
  setup() {
    const { $ct } = useVSFContext();

    async function isLoggedIn() {
      return await $vsf.$ct.api.isLoggedIn();
    }
  }
};
```

## Other changes

Below is the list of the template files that we updated since the last release. You can generate a new project using our CLI and compare the files listed below with your existing project to see if they need updating.

- `components/AppHeader.vue`,
- `components/CategoryPageHeader.vue`,
- `components/MyAccount/ProfileUpdateForm.vue`,
- `components/StoreLocaleSelector.vue`,
- `composables/useUiHelpers/index.ts`,
- `lang/de.js`,
- `lang/en.js`,
- `middleware/is-authenticated.js` ,
- `nuxt.config.js`,
- `package.json`,
- `pages/Checkout.vue`,
- `pages/Checkout/Billing.vue`,
- `pages/Checkout/Payment.vue`,
- `pages/Checkout/Shipping.vue`,
- `pages/Checkout/ThankYou.vue`,
- `pages/MyAccount/OrderHistory.vue`,
- `pages/Product.vue`.

If you are using E2E tests included in the projects, you might also need to update the following files.

- `tests/e2e/api/requests.ts`,
- `tests/e2e/fixtures/responses/getOrders.json`,
- `tests/e2e/fixtures/responses/getOrdersWithOffset.json`,
- `tests/e2e/fixtures/test-data/e2e-add-to-cart.json`,
- `tests/e2e/fixtures/test-data/e2e-carts-merging.json`,
- `tests/e2e/fixtures/test-data/e2e-my-account-order-history.json`,
- `tests/e2e/fixtures/test-data/e2e-product-page.json`,
- `tests/e2e/fixtures/test-data/e2e-remove-from-cart.json`,
- `tests/e2e/fixtures/test-data/e2e-update-cart.json`,
- `tests/e2e/integration/e2e-add-to-cart.spec.ts`,
- `tests/e2e/integration/e2e-carts-merging.spec.ts`,
- `tests/e2e/integration/e2e-checkout-order-summary.spec.ts`,
- `tests/e2e/integration/e2e-my-account-order-history.spec.ts`,
- `tests/e2e/integration/e2e-my-account.spec.ts`,
- `tests/e2e/integration/e2e-place-order.spec.ts`,
- `tests/e2e/integration/e2e-user-login.spec.ts`,
- `tests/e2e/integration/e2e-user-registration.spec.ts`,
- `tests/e2e/pages/category.ts`,
- `tests/e2e/pages/checkout.ts`,
- `tests/e2e/pages/components/breadcrumbs.ts`,
- `tests/e2e/pages/components/cart-sidebar.ts`,
- `tests/e2e/pages/components/header.ts`,
- `tests/e2e/pages/components/login-modal.ts`,
- `tests/e2e/pages/my-account.ts`,
- `tests/e2e/utils/network.ts`.
