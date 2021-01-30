# User profile

<!-- TODO: Add links to 'Composition API' and 'Composables' pages when they are ready -->

> This page assumes you're familiar with Composition API and Composables. Read them first if you are new to these concepts.

[[toc]]

## Checking if the user is logged in

Many interactions in the application are only available or look different if the customer is logged in. To check that, we will use [useUser](../composables/use-user.md), which is one of (if not the most) widely used composable in Vue Storefront.

Like with all other composables, it's important to remember to call `load` before accessing any other property or function of `useUser`. Otherwise, `isAuthenticated` will always return `false`.

```js{8,18}
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

When you confirmed that the user is logged in, you may safely access its data.

```js{8,18}
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

As with all composables, it's important to remember to not directly access `user` properties, but use `userGetters`. This will ensure that your code is integration-agnostic and proof to (some) future changes.

```js{1,3,17,22}
import { useUser, userGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

export default {
  setup () {
    const {
      load,
      user
    } = useUser();

    onSSR(async () => {
      await load();
    });

    const firstName = computed(() => userGetters.getFirstName(user.value));

    return {
      load,
      user,
      firstName
    }
  }
}
```

## Modifying user

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

Managing billing and shipping addresses is done using dedicated [useUserBilling](../composables/use-user-billing.md) and [useUserShipping](../composables/use-user-shipping.md) composables.

For more information, please refer to their documentation.

## Listing user orders

Listing user orders is done using dedicated [useUserOrders](../composables/use-user-orders.md) composable.

For more information, please refer to its documentation.

## Customizing addresses and forms in the user profile

In default theme, components used to display addresses and containing forms for updating user information are blank. This is due to the fact that each integration might use different data formats and properties.

If you are using already made integration, you don't have to worry about this, because it already should be provided for you.

If you are making an integration however, you will need to create couple of Vue components:

| Component                                    | Props                               | Emits event |
|----------------------------------------------|-------------------------------------|-------------|
| components/UserBillingAddress.vue            | { address: Object }                 |             |
| components/UserShippingAddress.vue           | { address: Object }                 |             |
| components/MyAccount/BillingAddressForm.vue  | { address: Object, isNew: Boolean } | ✔           |
| components/MyAccount/ShippingAddressForm.vue | { address: Object, isNew: Boolean } | ✔           |
| components/MyAccount/PasswordResetForm.vue   |                                     | ✔           |
| components/MyAccount/ProfileUpdateForm.vue   |                                     | ✔           |

Components that emit events are forms. Event should be in the following format:

```js
emit('submit', {
  form: Object,
  onComplete: (data: any) => {},
  onError: (error: Error) => {}
})
```

When such event is sent, application will handle communication with the API. If request is succesful, `onComplete` callback will be called with response from the API. Otherwise `onError` will be called with error caught.

## Protecting user profile routes

If you are using already made integration and there is a page that should be accessible only to logged-in users, such as user profile, you can use `authenticated` middleware in page component:

```js
export default {
  middleware: [
    'authenticated'
  ]
}
```

If you are making an integration however, you will need to create middleware `middleware/authenticated.js`. Please refer to [Nuxt.js middleware documentation](https://nuxtjs.org/docs/2.x/directory-structure/middleware/) for more information.
