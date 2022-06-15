# Migrating projects to 2.5.0

## Introduction

In this release, besides usual bugfixes and UI improvements, we focused on:

* updating Storefront UI,
* upgrading Composition API,
* allowing caching by not creating cookies during Server-Side Rendering.

This release includes some breaking changes. However, adjusting your projects shouldn't take too long and only requires a few minor changes.

## Upgrade of the Composition API

We upgraded the `@nuxtjs/composition-api` and `@vue/composition-api` packages to the latest versions (`0.29.3` and `1.2.4` respectively). Follow the steps below to upgrade your project to make use of it. While some of them are optional, we highly recommend applying them to your projects. These changes will make it easier to upgrade to Vue.js 3 and Nuxt.js 3 in the future.

### Add Composition API build module

Add `'@nuxtjs/composition-api/module'` at the very top of `buildModules` in the `nuxt.config.js` file.

```javascript
//nuxt.config.js
export default {
  buildModules: [
    '@nuxtjs/composition-api/module', // Add at the very top of `buildModules`
  ]
};
```

### Update imports

**This step is not required but highly recommended:** Update all files that import the Composition API functions to use `@nuxtjs/composition-api` instead of `@vue/composition-api`.

Before:
```javascript
import { ref, computed } from '@vue/composition-api';
```

After:
```javascript
import { ref, computed } from '@nuxtjs/composition-api';
```

### Use `useRoute` and `useRouter`

**This step is not required but highly recommended:** Update components and functions that use `route` information and `router`. Instead of using the `context.root` property which is deprecated in Vue.js 3, use the [`useRoute` and `useRouter`](https://composition-api.nuxtjs.org/packages/routes) composables from the `@nuxtjs/composition-api` package.

:::warning `useRoute` is a computed object
Note that `useRoute` is a computed object, and you have to call `.value` property to access its value inside the `setup` function, like in the example below.
:::

Before:

```vue{9,13,18}
<script>
import { useProduct } from '{INTEGRATION}';

export default {
  setup(props, context) {
    const { search } = useProduct();

    // Get ID from URL query params
    const { id } = context.root.$route.params;

    onSSR(async () => {
      // Search for a product with a given ID
      await search({ id });
    });

    function redirectToHome() {
      // Redirect user to the home page
      return context.root.$router.push('/');
    }
  }
}
</script>
```

After:

```vue{3,10-11,15,20}
<script>
import { useProduct } from '{INTEGRATION}';
import { useRoute, useRouter } from '@nuxtjs/composition-api';

export default {
  setup(props, context) {
    const { search } = useProduct();

    // Get current route and router
    const route = useRoute();
    const router = useRouter();

    onSSR(async () => {
      // Search for a product with a given ID
      await search({ id: route.value.params.id });
    });

    function redirectToHome() {
      // Redirect user to the home page
      return router.push('/');
    }
  }
}
</script>
```

## Prevent generating cookies during Server-Side Rendering

We changed the internationalization to prevent the generation of currency, locale, and country cookies during Server-Side Rendering. These changes will allow for better caching of the responses. Internationalization cookies are now generated only in the browser.

Follow the steps below to upgrade your existing projects:

1. Disable automatic detection of the browser language in the `i18n` configuration.

    ```javascript
    //nuxt.config.js
    export default {
      i18n: {
        detectBrowserLanguage: false
      }
    };
    ```
2. Change the order of `buildModules` so that the integration-specific module is before the `@vue-storefront/nuxt` module:

    ```javascript
    //nuxt.config.js
    export default {
      buildModules: [
        // Integration-specific module must be above the `@vue-storefront/nuxt` module
        ['@vue-storefront/__INTEGRATION__/nuxt', {
          // Options
        }],
        ['@vue-storefront/nuxt', {
          // Options
        }],
      ]
    };
    ```

3. Update the Vue components used to switch locales to use the `nuxt-link` component instead of the `a` tag. One such example is the `components/StoreLocaleSelector.vue` file.

    ```html
    <nuxt-link :to="switchLocalePath(lang.code)">
    ```

## Other changes

Below is the list of the template files that we updated since the last release. You can generate a new project using our CLI and compare the files listed below with your existing project to see if they need updating.

- `components/AppHeader.vue`,
- `components/BottomNavigation.vue`,
- `components/CartSidebar.vue`,
- `components/CategoryPageHeader.vue`,
- `components/FiltersSidebar.vue`,
- `components/LocaleSelector.vue`,
- `components/LoginModal.vue`,
- `components/RelatedProducts.vue`,
- `components/SearchResults.vue`,
- `components/WishlistSidebar.vue`,
- `composables/useUiState.ts`,
- `lang/de.js`,
- `lang/en.js`,
- `layouts/blank.vue`,
- `layouts/default.vue`,
- `layouts/error.vue`,
- `pages/Category.vue`,
- `pages/Checkout.vue`,
- `pages/Checkout/Billing.vue`,
- `pages/Checkout/Payment.vue`,
- `pages/Checkout/Shipping.vue`,
- `pages/Home.vue`,
- `pages/MyAccount.vue`,
- `pages/MyAccount/LoyaltyCard.vue` (deleted),
- `pages/MyAccount/MyReviews.vue` (deleted),
- `pages/Product.vue`,
- `pages/ResetPassword.vue`.
