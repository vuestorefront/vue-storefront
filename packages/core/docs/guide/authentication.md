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

## Logging in and session
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
`isAuthenticated` boolean [ref](https://v3.vuejs.org/api/refs-api.html#ref) - tells if user is signed in   
`user` User [ref](https://v3.vuejs.org/api/refs-api.html#ref) - contains object of signed in user or it equals `null`

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
`user` User [ref](https://v3.vuejs.org/api/refs-api.html#ref) - contains object of signed in user or it equals `null`

## How it works in integrations?
Below you can find detailed information on how we're handling authentication in different integrations.
<CommerceIntegrationLinks 
 commercetools="/commercetools/authorization-strategy.html"
 shopify="WIP"
/>
