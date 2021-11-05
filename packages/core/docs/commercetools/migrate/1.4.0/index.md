# Upgrading to 1.4.0

## Introduction

:::warning Start by updating the core packages
This guide only includes commercetools-specific changes. Follow the [Migrating projects to 2.5.0](/migrate/2.5.0/overview.html) guide to update the core before you proceed with applying changes from this guide.
:::

In this release we focused on improving security and performance and updating GraphQL types.

This release includes some breaking changes. However, adjusting your projects shouldn't take too long and only requires few minor changes.

### Updated GraphQL types

You might have noticed that the `@vue-storefront/commercetools-api` package exports [TypeScript types](/commercetools/api-reference/commercetools-api.html) for GraphQL data returned by commercetools. We didn't update them for quite a while and decided that it's time to do it. There are plenty of new types as well as some breaking changes to the old types. Depending on types you use, you might need to update your project.

### Handling access tokens

We completely rewrote internals for handling authentication because of the poor performance of the old solution. Previously, application requested new access token several times for every user visiting the page, if they didn't have the token cookie. This didn't make much sense, especially because [all guests share the same access token](https://docs.commercetools.com/api/authorization#create-anonymous-sessions-only-once-necessary) until their session become unique in any way, for example by logging in or adding item to the cart or wishlist.

Starting from this version, the application will request one access token for server operations (introduced in the previous release) and one for all guests. These tokens are stored on the server and are not send out to the users. This means that session cookies will be created only for logged-in and anonymous users.

:::tip What is an anonymous session in commercetools?
You might be wondering what an "anonymous" session is and how it's different from the "guest" session. In commercetools there are three types of sessions:

* **guest** - user that didn't login nor perform any visitor-specific operation,
* **anonymous** - user that didn't login, but performed some visitor-specific operation, for example added item to the cart or wishlist,
* **customer** - user that logged into the application.
:::

This change by itself doesn't require any changes in existing projects. However, we used this opportunity to improve the security of the cookies storing the user session. See the next section for more details.

### Improving security of the session cookie

User session is stored in the `vsf-commercetools-token` cookie. In the past, this cookie was created without the `secure` and `httpOnly` attributes. This meant that the cookie could be sent with unsecured HTTP and be accesed using JavaScript, which exposesd the cookie to the security risks.

Starting from this version, session cookie will always have `httpOnly` attribute. The `secure` attribute will be included only if the request was made using HTTPS, meaning that you don't have to use HTTPS in your development environments.

However, because the session cookie can no longer be accessed using JavaScript, we needed a new way of checking if the user is logged in. For this reason we introduced a new `isLoggedIn` endpoint. **You need to update the `middleware/is-authenticated.js` file**, which protects `/my-account` routes from unauthorized access and all other parts of the application that read the session cookie.

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

In components you can use the same approach, by using the `useVSFContext` helper to access `$ct` context.

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

Below is the list of the template files that we updated since the last release. You can generate new project using our CLI and compare the files listed below with your existing project to see if they need updating.

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

If you are using E2E tests included in the projects, you might need to update the following files as well.

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