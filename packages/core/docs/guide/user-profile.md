# User profile

<!-- TODO: Add links to 'Composition API' and 'Composables' pages when they are ready -->

> This page assumes you're familiar with Composition API and Composables. Read them first if you are new to these concepts.

[[toc]]

## Checking if the user is logged in

Many interactions in the application are only available or look different if the customer is logged in. To check that, we will use [useUser](../composables/use-user.md), which is one of (if not the most) widely used composable in Vue Storefront.

Like with all other composables, it's important to remember to call `load` before accessing any other property or function of `useUser`. Otherwise, `isAuthenticated` will always return `false`.

```js{8,17}
import { useUser } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      load,
      isAuthenticated
    } = useUser();

    onSSR(async () => {
      await load();
    });

    return {
      load,
      isAuthenticated
    }
  }
}
```

## Loading current user

To access data of currently logged-in user, we can use other property of `useUser` called simply `user`.

```js{8,17}
import { useUser } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      load,
      user
    } = useUser();

    onSSR(async () => {
      await load();
    });

    return {
      load,
      user
    }
  }
}
```

`user` property will return `null` if used is not logged-in. `userGetters` should handle such cases and return empty data like `''`, `[]` etc. depending on expected return data type. To prevent empty elements in the template, it's a good practice to check if user is logged-in before using getters.

```vue{3-5}
<template>
  ...
    <p v-if="isAuthenticated">
      {{ userGetters(user) }}
    </p>
  ...
</template>

<script>
import { useUser, userGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      load,
      user,
      isAuthenticated
    } = useUser();

    onSSR(async () => {
      await load();
    });

    return {
      load,
      isAuthenticated,
      userGetters
    }
  }
}
</script>
```

## Modifying user credentials

Updating user data (except for the current password, which is described in the [Changing password](#changing-password) section) can be done using `updateUser` method in `useUser` composable.

```js
import { useUser } from '{INTEGRATION}';

export default {
  setup () {
    const { updateUser } = useUser();

    const onSubmit = async (formData) => {
      try {
        await updateUser({ user: formData });
        // 'user' property is now updated
      } catch (error) {
        // handle update error
      }
    };

    return {
      onSubmit
    }
  }
}
```

## Changing password

Updating user password can be done using `changePassword` method in `useUser` composable. It requires the current and new password, to confirm user identity.

```js
import { useUser } from '{INTEGRATION}';

export default {
  setup () {
    const { changePassword } = useUser();

    const onSubmit = async (formData) => {
      try {
        await changePassword({
          current: formData.currentPassword,
          new: formData.newPassword
        });
      } catch (error) {
        // handle update error
      }
    };

    return {
      onSubmit
    }
  }
}
```

## Managing addresses (billing and shipping)

Managing billing and shipping addresses is done using [useUserBilling](../composables/use-user-billing.md) and [useUserShipping](../composables/use-user-shipping.md) composables.

Both have almost identical signature (properties, methods and getters), so examples below will only show usage of `useUserBilling`.

### Getting a list of addresses

To get a list of addresses, use `load` and `billing` or `shipping` properties and `getAddresses` method on corresponding getter.

```vue
<template>
  ...
    <div
      v-if="address in userBillingGetters.getAddresses(billing)"
      :key="userBillingGetters.getId(address)"
    >
      {{ userBillingGetters.getPostCode(address) }}
    </div>
  ...
</template>

<script>
import { useUserBilling, userBillingGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      billing,
      load,
    } = useUserBilling();

    onSSR(async () => {
      await load();
    });

    return {
      billing,
      userBillingGetters
    };
  }
}
</script>
```

### Adding, updating, and deleting addresses

`useUserBilling` and `useUserShipping` composables expose number of methods to manage addresses:

* `addAddress`
* `deleteAddress`
* `updateAddress`
* `setDefault`

Below is the example of using `deleteAddress` method.

```vue{7-9,23,32}
<template>
  ...
    <div
      v-if="address in userBillingGetters.getAddresses(billing)"
      :key="userBillingGetters.getId(address)"
    >
      <button @click="deleteAddress({ address })">
        Delete address
      </button>
    </div>
  ...
</template>

<script>
import { useUserBilling, userBillingGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      billing,
      load,
      deleteAddress,
    } = useUserBilling();

    onSSR(async () => {
      await load();
    });

    return {
      billing,
      deleteAddress,
      userBillingGetters
    };
  }
}
</script>
```

For more information, please refer to documentation for [useUserBilling](../composables/use-user-billing.md) and [useUserShipping](../composables/use-user-shipping.md) composables.

## Listing user orders

To get a list of orders, use `search` and `orders` properties and `getItems` method on `orderGetters`.

```vue
<template>
  ...
    <div
      v-if="order in orderGetters.getItems(orders)"
      :key="orderGetters.getId(order)"
    >
      {{ orderGetters.getOrderStatus(order) }}
    </div>
  ...
</template>

<script>
import { useUserOrders, orderGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      orders,
      search,
    } = useUserOrders();

    onSSR(async () => {
      await search();
    });

    return {
      orders,
      orderGetters
    };
  }
}
</script>
```

For more information, please refer to documentation for [useUserOrders](../composables/use-user-orders.md) composable.

## Protecting user profile routes

If there is a page that should be accessible only to logged-in users, such as user profile, you can use `is-authenticated` middleware in the page-level component:

```js
export default {
  middleware: [
    'is-authenticated'
  ]
}
```
