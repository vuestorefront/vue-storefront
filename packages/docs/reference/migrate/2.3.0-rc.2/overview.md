# Migrating projects to 2.3.0-rc.2

## Introduction

In this release, we introduced few new APIs but also some breaking changes.

Breaking changes are related to the introduction of our new API middleware, an overhaul of the checkout, and updates to `@vue-storefront/cache` library.

If you are an integrator, please also refer to the [Integrators](./integrators.md) page.

## API middleware

If you watched the talk of our CTO at Vue.js Amsterdam you may be already aware of this change. If not, you can find his slides [here](https://slides.com/filiprakowski/vuejs-amsterdam-2021).

In short, it's meant to reduce the amount of code we send to the browser and perform as many operations on the backend as possible. This greatly improves security and frontend performance but also gives you more control of what is sent to the 3rd party providers.

Before, every request sent to the providers was made directly from the browser (besides the first visit on the page which is Server-Side Rendered), which meant that it had to have all the logic required to create and send the request and to process the response. In some cases browser had to load heavy libraries like GraphQL and have access to sensitive information, such as API keys.
This meant that Vue Storefront would not scale as well as we would like.

To fix these issues we moved most of the logic to the new API middleware. It's an Express server that lives beside Nuxt.js. It can be run in parallel on the same server and separately on a different server, for better scalability.
Now, instead of making API calls directly to the provider, the browser will request data from the API middleware.

### Changes

1. Create a new configuration files in the root of your Nuxt project named `middleware.config.js`. Content is dependant on the integration you use. As an example we will use our `commercetools` integration:

```javascript
// middleware.config.js
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: '',
          authHost: '',
          projectKey: '',
          clientId: '',
          clientSecret: '',
          scopes: []
        },
        currency: '',
        country: ''
      }
    }
  }
};

```

2. Add `'@vue-storefront/middleware/nuxt'` to the `modules` in `nuxt.config.js`.

:::warning Be careful
Make sure this package is added to the `modules` array, not `buildModules`.
:::

```javascript
// nuxt.config.js
export default {
  modules: [
    '@vue-storefront/middleware/nuxt'
  ]
};
```

3. Update custom queries.

Previously, custom queries were callbacks passed as an additional argument in most of our composable methods. Because we moved API communication to the backend, it's no longer possible to pass callbacks from UI (frontend) to `api-client` (backend).

From now on, custom queries are registered in `middleware.config.js` (with the same signature as before), and used on the frontend by providing their unique name:

```javascript{7,17}
// middleware.config.js
module.exports = {
  integrations: {
    ct: {
      // other options
      customQueries: {
        'MyCustomQuery': (query, variables) => {},
      }
    }
  }
};

// Some component
const { search } = useProduct();

onSSR(async () => {
  await search({ customQuery: { products: 'MyCustomQuery' } })
});
```

As you can in the example above, `customQuery` is now an object that accepts object with:
- key matching the name of GraphQL query to override,
- value matching the name of the handler in `middleware.config.js`.

## Checkout

One of the most important pieces missing in VSF Next was Checkout, which originally was supposed to be handled by a single `useCheckout` composable. However, we decided that this approach won't scale well because the checkout process is very different in every integration and it might not work well, if multiple providers will be used to handle different steps of the checkout process, like payment, shipping, etc.

### Changes

We split responsibilities of different steps into multiple new composables:

- `useShipping` for handling shipping information,
- `useBilling` for handling billing information,
- `useShippingProvider` for handling shipping providers,
- `useMakeOrder` for placing the final order.

We also used this opportunity to cleanup other composables:
- removed `useCheckout`,
- removed `checkoutGetters`,
- renamed `useUserOrders` to `useUserOrder` to be consistent with other composables,
- renamed `isOnCart` and `isOnWishlist` in `useCart` composable to `isInCart` and `isInWishlist`.

These changes affected multiple Vue components. Please refer to [UI section](#ui) for more information.

## Cache

We updated `@vue-storefront/cache` library which previously was only experimental. It contains some breaking changes, but mostly related to naming in the configuration.

Please refer to [SSR Cache](../../performance/ssr-cache.md) documentation for more information.

## UI

We added and updated multiple UI elements:

- renamed `components/checkout` directory in core theme to `components/Checkout` (note the capital `C`). Please update your imports.
- added new components:
  - `components/Notification.vue`,
  - `components/SearchResults.vue`,
  - `pages/Checkout/Billing.vue` with route `/checkout/billing`,
- added new integration-specific components:
  - `components/Checkout/CartPreview.vue` (previously implemented in the core theme),
  - `components/Checkout/VsfPaymentProvider.vue`,
  - `components/Checkout/VsfShippingProvider.vue`,
- updated components:
  - `components/AppFooter.vue`,
  - `components/AppHeader.vue`,
  - `components/BottomNavigation.vue`,
  - `components/Checkout/CartSidebar.vue`,
  - `components/InstagramFeed.vue`,
  - `components/LocaleSelector.vue`,
  - `components/MobileStoreBanner.vue`,
  - `components/TopBar.vue`,
  - `components/WishlistSidebar.vue`,
  - `layouts/default.vue`,
  - `layouts/error.vue`,
  - `pages/Category.vue`,
  - `pages/Checkout.vue`,
  - `pages/Checkout/Payment.vue`,
  - `pages/Checkout/Shipping.vue`,
  - `pages/Home.vue`,
  - `pages/MyAccount.vue`,
  - `pages/MyAccount/OrderHistory.vue`,
  - `pages/Product.vue`,
- deleted components:
  - `pages/Checkout/OrderReview.vue` and route `/checkout/order-review`,
  - `pages/Checkout/PersonalDetails.vue` and route `/checkout/personal-details`,
  - `components/Checkout/UserBillingAddress.vue`,
  - `components/Checkout/userShippingAddress.vue`,
- updated `composables/useUiHelpers/index.ts`:
  - renamed `changeSearchTerm` to `setTermForUrl`,
  - added `getSearchTermFromUrl`,
- updated translations in `theme/lang`,
- added new integration-specific middleware `middleware/is-authenticated.js`,
- added new composable `useUiNotification` in `composables/useUiNotification/index.ts` (exported in `composables/index.ts`),

