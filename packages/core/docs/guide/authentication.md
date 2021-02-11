# What's authentication?
Authentication is the operation of recognizing the user's identify. It allows us to associate incoming requests with an account or a person. To do that, provided credentials are compared with ones in the database.

The whole logic related to this process can be handled with methods shared by `useUser` [composable](https://v3.vuejs.org/guide/composition-api-introduction.html#basics-of-composition-api).

## Registering a new user
Creating a user can be done using `register` method.  
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

## What auth strategies do we follow?
Based on integration we might use different auth strategies, for example:
- [JWT Token](https://jwt.io/introduction)
- [Basic HTTP Token](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [OAuth 2 Bearer](https://oauth.net/2/bearer-tokens/)

We prefer to store token inside the cookie as we might want to use it both client and server side.

## Detailed strategies per integration
- **Commercetools** - We are following [HTTP Authorization guide](https://docs.commercetools.com/api/authorization) from Commercetools documentation, using their library - [TokenProvider](https://commercetools.github.io/nodejs/sdk/api/sdkAuth.html)
