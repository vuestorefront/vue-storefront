# Migrating projects to 2.5.0

## Introduction

<!-- TBD -->

## Upgrade of the Composition API

We upgraded the `@nuxtjs/composition-api` and `@vue/composition-api` packages to the latest versions (`0.29.3` and `1.2.4` respectively). While this introduced some breaking changes, adjusting your projects shouldn't take too long.

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

**This step is not required but highly recommended:** Change components and function that use `route` information and `router` to use [`useRoute` and `useRouter`](https://composition-api.nuxtjs.org/packages/routes) from `@nuxtjs/composition-api'` instead of from `context.root` property in components. This will make it easier to upgrade to Nuxt.js 3 in the future.

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

## Prevent generating cookies during SSR

Prevented generating cookies for currency, locale, and country during SSR (server-side rendering) to enable caching. Now the cookies are generated only client-side (in the browser).

Configuration changes are required in the existing projects:

1. Disable automatic detection of the browser language in the `i18n` configuration.

    ```javascript
    // nuxt.config.js
    i18n: {
      detectBrowserLanguage: false
    }
    ```
2. Change the order of `buildModules`. Make sure that the integration-specific module is before the core nuxt module:

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
