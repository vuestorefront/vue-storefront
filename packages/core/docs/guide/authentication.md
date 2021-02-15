# What's authentication?
Authentication is the operation of recognizing the user's identify. It allows us to associate incoming requests with an account or a person. To do that, provided credentials are compared with ones in the database.

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

## Logging in/out and sessions
Signing in and out can be done using `login` and `logout` methods. `logout` does not take any arguments.
```vue
<template>
  <form @submit.prevent="login({ user: form })" v-if="!isAuthenticated">
    <!-- form fields -->
    <button type="submit" :disabled="loading">Login</button>
  </form>
  <button v-else @click="logout" :disabled="loading">Logout</button>
</template>

<script>
import { useUser } from '{INTEGRATION}';
import { ref } from '@vue/composition-api';

export default {
  setup () {
    const { login, logout, isAuthenticated, user, loading } = useUser();
    const form = ref(/* object for login user */)

    return {
      login,
      logout,
      form,
      user,
      isAuthenticated,
      loading
    }
  }
}
</script>
```  
`isAuthenticated` boolean [ref](https://v3.vuejs.org/api/refs-api.html#ref) - tells if user is signed in   
`user` User [ref](https://v3.vuejs.org/api/refs-api.html#ref) - contains object of signed in user or it equals `null`   

## Authorization strategies
<CommerceIntegrationLinks 
 commercetools="/commercetools/authorization-strategy.html"
 shopify="WIP"
/>
