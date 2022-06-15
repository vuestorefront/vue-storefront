# Error handling

## Prerequisites

This guide assumes prior knowledge of composables. If you don't know what they are or how to use them, see the [Composables](./composables.html) guide.

## Errors flow

Most methods in composables don't directly throw errors when they fail. That's why you can't use the `try...catch` block to catch errors.

```vue{7,10-15}
<script>
import { useUser } from '{INTEGRATION}';
import { useFetch } from '@nuxtjs/composition-api';

export default {
  setup() {
    const { load } = useUser();

    useFetch(async () => {
      // ❌ This try...catch block will never catch any errors
      try {
        await load();
      } catch(error) {
        //
      }
    });
  }
};
</script>
```

Instead, composables catch these errors internally and expose them in a computed property called `errors`.

## Anatomy of the `errors` objects in composables

The `errors` object in composables stores the last error thrown in each composable method. Its keys match the names of the methods, and values contain an error or `null` if no errors were thrown.

Let's take a closer look at how it might look like using the [useUser](/reference/api/core.useuser.html) composable as an example:

<img
  src="../images/errors-object-anatomy.webp"
  alt="Anatomy of the errors object"
  style="display: block; margin: 0 auto;">

In this example, the `errors` object has the following properties:

- `load`,
- `register`,
- `login`,
- `logout`,
- `changePassword`,
- `updateUser`.

Each represents one method in `useUser` and initially is `null`. When you call one of those methods, and it fails, the value will change.

## Usage

Let's see how you can get an error from the `load` method available in the [useUser](/reference/api/core.useuser.html) composable:

```vue
<script>
import { useUser, userGetters } from '{INTEGRATION}';
import { useFetch, computed } from '@nuxtjs/composition-api';

export default {
  setup() {
    const { load, errors } = useUser();

    /**
     * Create variable which extracts the `load` property from
     * the `errors` object. Because there were no errors yet,
     * its value is `null`.
     */
    const loadError = computed(() => errors.value.load);

    /**
     * Load user data. If it fails, the `errors` object gets
     * updated, which as a result, updates the `loadError` variable.
     */
    useFetch(async () => {
      await load();
    });

    /**
     * Return the `loadError` object to make it available in the template
     */
    return {
      loadError
    };
  }
};
</script>
```

You might have noticed that above, we used the `computed` function.

That's because error properties are not reactive. To make them reactive, you need to wrap them in `computed` functions.

```javascript
/**
 * ❌
 * Using `errors` property like this will only assign its values
 * once and never update, even when the value of the `errors` changes
 */
const nonReactive = errors.value.load;

/**
 * ✔️
 * Using the same property inside `computed` will observe
 * the changes in the `errors` object and update the variable
 */
const reactive = computed(() => errors.value.load);
```
