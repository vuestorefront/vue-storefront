# Creating custom composables

You can create your own composable if our implementation and interfaces don't cover your use case. However, there are few things you need to consider and handle, like context and reactivity.

Before implementing, we recommend getting familiar with our [composables factories](https://github.com/vuestorefront/vue-storefront/tree/next/packages/core/core/src/factories). This will help you understand how they work internally.

## Naming convention

While not mandatory, we recommend that you follow the industry convention of naming composables using camelCase and prefixing them with the `use` keyword.

## Structure

We recommend following our convention of returning raw data object (`result` in the example below) as well as `loading` and `error` properties:

- Raw data object should contain a response from the API later passed to getters to extract data.

- `loading` property should indicate if any of the composable methods is waiting for the data from the API.

- `error` property should be an object with keys matching the names of the composable methods. Its values indicate if any of the composable methods threw an error.

:::tip Why `loading` and `error` are `computed` properties?
You might have noticed that `loading` and `error` are wrapped in the `computed` function in the composable factories.
This prevents external modifications that could result in a state mismatch and hard-to-track errors.
:::

## Shared composable

In most cases, your composable is bound to a specific entity and isn't reusable across the components or pages.
For example, you might have a product with a given ID. If you load it using `useProduct`, this instance won't be helpful if you open a page with a different product.

However, some composables are reusable and shared. Two such examples are `useUser` and `useCart`, which will load the same data, regardless of the component or page they are called from.

**Composables specific to a single entity should accept an `id` parameter and use it in names passed to `sharedRef`.**

## Example

The example below shows how to implement composable bound to a single entity. If your composable is shared, you can remove the `id` parameter and its uses.

:::warning Only call `sharedRef` inside composable
Be sure to create variables using `sharedRef` **inside** a wrapper function. Otherwise, you might have issues with reactivity or even leak state between the requests.
:::

```typescript
import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

export const useCustom = (id: string) => {
  // Loads context used to call API endpoint
  const context = useVSFContext();

  // Shared ref holding the response from the API
  const result = sharedRef(null, `useCustom-${id}`);

  // Shared ref indicating whether any method is waiting for the data from the API
  const loading = sharedRef(false, `useCustom-loading-${id}`);

  // Shared ref holding errors from the methods
  const error = sharedRef({
    search: null
  }, `useCustom-error-${id}`);

  // Method to call an API endpoint and update `result`, `loading` and `error` properties
  const search = async (params) => {
    Logger.debug(`useCustom/${id}/search`, params);

    try {
      loading.value = true;
      // Change "yourIntegration" to the name of the integration
      result.value = await context.$yourIntegration.api.searchCustom(params);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error(`useCustom/${id}/search`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
```
