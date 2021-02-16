# What's authentication?

Authentication is the operation of recognizing the user's identity. It allows us to associate incoming requests with an account or a person. To do that, provided credentials are compared with ones in the database.

The whole logic related to this process can be handled with methods shared by `useUser` composable

## Registering a new user

Registering a new user can be done using `register` method.  
```vue
<template>
  <form @submit.prevent="register({ user: form })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">Submit</button>
  </form>
</template>

<script>
import { useUser } from '{INTEGRATION}';
import { ref } from '@vue/composition-api';

export default {
  setup () {
    const { register, loading } = useUser();
    const form = ref(/* object for create user */);

    return {
      register,
      loading,
      form
    }
  }
}
</script>
```

## Checking if the user is logged in

Many interactions in the application are only available ( `useUserX` functions) or look different if the customer is logged in. To check that, we will use [useUser](../composables/use-user.md), which is one of (if not the most) widely used composable in Vue Storefront.

Like with all other composables, it's important to remember to call `load` before accessing any other property or function of `useUser`. Otherwise, `isAuthenticated` will always return `false`.

```js{8,16}
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
      isAuthenticated
    };
  }
}
```

## Logging in

Signing in can be done using `login` method.
```vue
<template>
  <form @submit.prevent="login({ user: form })" v-if="!isAuthenticated">
    <!-- form fields -->
    <button type="submit" :disabled="loading">Login</button>
  </form>
  <div v-else>
    Hello {{ user }}
  </div>
</template>

<script>
import { useUser } from '{INTEGRATION}';
import { ref } from '@vue/composition-api';

export default {
  setup () {
    const { login, isAuthenticated, user, loading } = useUser();
    const form = ref(/* object for login user */)

    return {
      login,
      form,
      user,
      isAuthenticated,
      loading
    }
  }
}
</script>
```  
`user` [ref](https://v3.vuejs.org/api/refs-api.html#ref) either contains an object of the signed-in user or equals `null`

## Logging out

Signing out can be done using `logout` method.
```vue
<template>
  <button 
    v-if="isAuthenticated"
    :disabled="loading"
    @click="logout"
  >
    Logout
  </button>
</template>

<script>
import { useUser } from '{INTEGRATION}';
import { ref } from '@vue/composition-api';

export default {
  setup () {
    const { logout, isAuthenticated, loading } = useUser();

    return {
      logout,
      isAuthenticated,
      loading
    }
  }
}
</script>
```  
`isAuthenticated` boolean [ref](https://v3.vuejs.org/api/refs-api.html#ref) - tells if user is signed in   
`user` [ref](https://v3.vuejs.org/api/refs-api.html#ref) either contains an object of the signed-in user or equals `null`

## How does it work in integrations?

Below you can find detailed information on how we're handling authentication in different integrations.
<CommerceIntegrationLinks 
 commercetools="/commercetools/authorization-strategy.html"
 shopify="WIP"
/>
