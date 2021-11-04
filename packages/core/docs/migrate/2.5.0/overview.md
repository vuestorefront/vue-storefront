# Migrating projects to 2.5.0

## Introduction

In this release, besides usual bugfixes and UI improvements we focused on:

* updating Storefront UI,
* upgrading Composition API,
* improved caching by preventing cookie creation during Server-Side Rendering.

Unfortunately, both of these are breaking changes. However, adjusting your projects shouldn't take too long and only requires few minor changes.

## Upgrade of the Composition API

We upgraded the `@nuxtjs/composition-api` and `@vue/composition-api` packages to the latest versions (`0.29.3` and `1.2.4` respectively). Follow the steps below to upgrade your project to make use of it. While some steps are optional, they are highly recomended. Implementing them will make it easier to upgrade to Vue.js 3 and Nuxt.js 3 in the future.

### Add Composition API build module

Add `'@nuxtjs/composition-api/module'` to the very top of `buildModules` in the `nuxt.config.js` file.

### Update imports

**This step is not required but highly recommended:** Change all imports of the Composition API functions from `@vue/composition-api` to `@nuxtjs/composition-api'`.

Before:
```javascript
import { ref, computed } from '@vue/composition-api';
```

After:
```javascript
import { ref, computed } from '@nuxtjs/composition-api';
```

### Use `useRoute` and `useRouter`

**This step is not required but highly recommended:** Update components and function that use `route` information and `router`. Instead of using the `context.root` property (which is deprecated in Vue.js 3), use the [`useRoute` and `useRouter`](https://composition-api.nuxtjs.org/packages/routes) composables from the `@nuxtjs/composition-api'` package.

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

:::warning `useRoute` is a computed object
Note that `useRoute` is a computed object, and you have to use `.value` to access its properties inside a `setup` function, like in the example above.
:::

## Prevent generating cookies during Server-Side Rendering

We made changes to the internationalization that prevent generation of the currency, locale, and country cookies during Server-Side Rendering. This will allow better caching of the responses. Internationalization cookies are now generated only in the browser.

Follow the steps below to upgrade your existing projects:

1. Disable automatic detection of the browser language in the `i18n` configuration.

    ```javascript
    // nuxt.config.js
    i18n: {
      detectBrowserLanguage: false
    }
    ```
2. Change the order of `buildModules`. Make sure that the integration-specific module is before the `@vue-storefront/nuxt` module:

    ```javascript
    buildModules: [
      ['@vue-storefront/__INTEGRATION__/nuxt', {
        // OPTIONS
      }],
      ['@vue-storefront/nuxt', {
        // OPTIONS
      }],
    ]
    ```

3. Update the Vue components used to switch locales to use the `nuxt-link` component instead of the `a` tag. By default it\'s located in the `StoreLocaleSelector.vue` file.

    ```vue
    <nuxt-link :to="switchLocalePath(lang.code)">
    ```

## Other changes

- packages/core/nuxt-theme-module/theme/components/AppHeader.vue
- packages/core/nuxt-theme-module/theme/components/BottomNavigation.vue
- packages/core/nuxt-theme-module/theme/components/CartSidebar.vue
- packages/core/nuxt-theme-module/theme/components/CategoryPageHeader.vue
- packages/core/nuxt-theme-module/theme/components/FiltersSidebar.vue
- packages/core/nuxt-theme-module/theme/components/LocaleSelector.vue
- packages/core/nuxt-theme-module/theme/components/LoginModal.vue
- packages/core/nuxt-theme-module/theme/components/RelatedProducts.vue
- packages/core/nuxt-theme-module/theme/components/SearchResults.vue
- packages/core/nuxt-theme-module/theme/components/WishlistSidebar.vue
- packages/core/nuxt-theme-module/theme/composables/useUiState.ts
- packages/core/nuxt-theme-module/theme/lang/de.js
- packages/core/nuxt-theme-module/theme/lang/en.js
- packages/core/nuxt-theme-module/theme/layouts/blank.vue
- packages/core/nuxt-theme-module/theme/layouts/default.vue
- packages/core/nuxt-theme-module/theme/layouts/error.vue
- packages/core/nuxt-theme-module/theme/pages/Category.vue
- packages/core/nuxt-theme-module/theme/pages/Checkout.vue
- packages/core/nuxt-theme-module/theme/pages/Checkout/Billing.vue
- packages/core/nuxt-theme-module/theme/pages/Checkout/Payment.vue
- packages/core/nuxt-theme-module/theme/pages/Checkout/Shipping.vue
- packages/core/nuxt-theme-module/theme/pages/Home.vue
- packages/core/nuxt-theme-module/theme/pages/MyAccount.vue
- (deleted) packages/core/nuxt-theme-module/theme/pages/MyAccount/LoyaltyCard.vue
- (deleted) packages/core/nuxt-theme-module/theme/pages/MyAccount/MyReviews.vue
- packages/core/nuxt-theme-module/theme/pages/Product.vue
- packages/core/nuxt-theme-module/theme/pages/ResetPassword.vue
- 