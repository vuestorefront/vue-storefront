# User profile

## Loading current user

To access the data of the currently logged-in user, you can use the `user` property of `useUser` composable.

```js{8,16}
import { useUser } from '@vue-storefront/commercetools';
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
      user
    };
  }
}
```

`user` property will return `null` if the user is not logged in. `userGetters` should handle such cases and return empty data like `''`, `[]` etc., depending on the expected return data type. To prevent empty elements in the template, it's a good practice to check if the user is logged in before using getters.

```vue{3-5}
<template>
  ...
    <p v-if="isAuthenticated">
      {{ userGetters.getFullName(user) }}
    </p>
  ...
</template>

<script>
import { useUser, userGetters } from '@vue-storefront/commercetools';
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
      user,
      isAuthenticated,
      userGetters
    };
  }
}
</script>
```

## Updating user credentials

Updating user data (except for the current password, which is described in the [Changing password](#changing-password) section) can be done using `updateUser` method in `useUser` composable.

```js
import { useUser } from '@vue-storefront/commercetools';

export default {
  setup () {
    const { error, updateUser } = useUser();

    const onSubmit = async (formData) => {
      await updateUser({ user: formData });
      // "error.value.updateUser" should be empty if request was successful
    };

    return {
      onSubmit
    };
  }
}
```

## Changing password

Updating user password can be done using `changePassword` method in `useUser` composable. It requires the current and new password to confirm user identity.

```js
import { useUser } from '@vue-storefront/commercetools';

export default {
  setup () {
    const { error, changePassword } = useUser();

    const onSubmit = async (formData) => {
      await changePassword({
        current: formData.currentPassword,
        new: formData.newPassword
      });
      // "error.value.changePassword" should be empty if request was successful
    };

    return {
      onSubmit
    };
  }
}
```

## Managing addresses (billing and shipping)

Managing billing and shipping addresses is done using [useUserBilling](/core/api-reference/core.useuserbilling.html) and [useUserShipping](/core/api-reference/core.useusershipping.html) composables.

Both have an almost identical signature (properties, methods, and getters), so the examples below will only show usage of `useUserBilling`.

### Displaying a list of addresses

To get a list of addresses, use `load` and `billing` or `shipping` properties and `getAddresses` method on the corresponding getter.

```vue
<template>
  ...
    <div
      v-for="address in userBillingGetters.getAddresses(billing)"
      :key="userBillingGetters.getId(address)"
    >
      {{ userBillingGetters.getPostCode(address) }}
    </div>
  ...
</template>

<script>
import { useUserBilling, userBillingGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      billing,
      load
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
      v-for="address in userBillingGetters.getAddresses(billing)"
      :key="userBillingGetters.getId(address)"
    >
      <button @click="deleteAddress({ address })">
        Delete address
      </button>
    </div>
  ...
</template>

<script>
import { useUserBilling, userBillingGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      billing,
      load,
      deleteAddress
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

For more information, please refer to documentation for [useUserBilling](/core/api-reference/core.useuserbilling.html) and [useUserShipping](/core/api-reference/core.useusershipping.html) composables.

## Displaying user orders

To get a list of orders, use `search` and `orders` properties and `getItems` method on `orderGetters`.

```vue
<template>
  ...
    <div
      v-for="order in orderGetters.getItems(orders)"
      :key="orderGetters.getId(order)"
    >
      {{ orderGetters.getStatus(order) }}
    </div>
  ...
</template>

<script>
import { useUserOrders, orderGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      orders,
      search
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

For more information, please refer to documentation for [useUserOrder](/core/api-reference/core.useuserorder.html) composable.

## Protecting user profile routes

If there is a page that should be accessible only to logged-in users, such as user profile, you can use `is-authenticated` middleware in the page-level component:

```js
export default {
  middleware: [
    'is-authenticated'
  ]
}
```
## Integration References

### `useUser`

<CommerceIntegrationLinks 
 commercetools="/commercetools/composables/use-user.html"
 shopify="/shopify/use-user.html"
/>

### `useUserBilling`

<CommerceIntegrationLinks 
 commercetools="/commercetools/composables/use-user-billing.html"
 shopify="WIP"
/>

### `useUserShipping`

<CommerceIntegrationLinks 
 commercetools="/commercetools/composables/use-user-shipping.html"
 shopify="WIP"
/>
