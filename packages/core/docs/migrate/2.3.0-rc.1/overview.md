# Migration guide 2.3.0-rc.1

In this release, we introduced few new APIs but also some breaking changes.

Breaking changes are related to the introduction of our new API middleware, an overhaul of the Checkout page, and updates to `@vue-storefront/cache` library.

If you are an integrator, please also refer to the [Integratiors](./integrators.md) page.

## Release details

### API middleware

If you watched the talk of our CTO at Vue.js Amsterdam you may be already aware of this change. If not, you can find his slides [here](https://slides.com/filiprakowski/vuejs-amsterdam-2021).

In short, it's meant to reduce the amount of code we send to the browser and perform as many operations on the backend as possible. This greatly improves security and frontend performance, but also gives you more control of what is sent to the 3rd party providers.

Before, every request sent to the providers was made directly from the browser (beside first page visit which is Server-Side Rendered), which meant that it had to have all the logic required to create and send the request and to process the response. In some cases browser had to load heavy libraries like GraphQL and have access to sensitive information, such as API keys.
This meant that Vue Storefront would not scale as well as we would like.

To fix these issues we moved most of the logic to the new API middleware. It's an Express server which lives beside Nuxt.js. It can be be in paralel on the same server and separately on different server, for better scalability.
Now, instead of making API calls directly to the provider, the browser will request data from the API middleware.

#### Changes

1. Create two new files in the root of your Nuxt project named `middleware.config.js` and `middleware.js`. Content of the first one is dependant on the integration you use, but as an example we will use our `commercetools` integration:

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

```javascript
// middleware.js
const { createServer } = require('@vue-storefront/middleware');
const { integrations } = require('./middleware.config');

const app = createServer({ integrations });

app.listen(8181, () => {
  console.log('Middleware started');
});
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

TODO: customQuery

### Checkout

One of the most important pieces missing in VSF Next was Checkout, which originally was supposed to be handled by single `useCheckout` composable. However, we decided that this approach won't scale well because checkout process is very different in every integration and it might not work well, if we decide to use combine multiple providers for different steps of the process, like payment, shipping etc. This is why split responsibilities of different steps of the process into multiple new composables:

- `useShipping` - **new** composable for handling shipping information.
- `useBilling` - **new** composable for handling billing information.
- `useShippingProvider` - **new** composable for handling shipping providers.
- `useMakeOrder` - **new** composable for placing the final order.

Because of this we also **removed** `useCheckout` and `checkoutGetters`.

Because of this we needed for make changes in following Vue components:
- moved `components/checkout/CartPreview.vue` from core theme to `components/Checkout/CartPreview.vue` in integration theme (note the capital `C` letter in `Checkout` directory name);
- added new, integration-specific `components/Checkout/ShippingPriceInfo.vue`;
- modified integration-specific `components/Checkout/UserBillingAddresses.vue`;
- modified integration-specific `components/Checkout/UserShippingAddresses.vue `;

We also make changes to `composables/useUiHelpers/index.ts`:
- added `getSearchTermFromUrl`
- renamed `changeSearchTerm` to `setTermForUrl`

TODO:
- shipping details
- removed checkoutGetters
- CartPreview.vue
- added `useBilling`
- added components/Checkout/ShippingPriceInfo.vue
- added components/Checkout/CartPreview.vue
- unify casing in theme directories

### Cache

TODO:
- update Cache library

### UI

- new useUiNotification
- categories loader overlay in Category.vue
- fixed body scroll in `theme/layouts/default.vue`
- quick search
  - useUiHelpers
    - renamed `changeSearchTerm` to `setTermForUrl`
    - added `getSearchTermFromUrl`
  - added `SearchResults.vue`
  - modified `AppHeader.vue`
  - fix outside click handler


### Others

- added `is-authenticated` middleware
- updated default logger
- rename `useUserOrders` to `useUserOrder`
- renamed `isOnCart` and `isOnWishlist` to `isInCart` and `isInWishlist`
