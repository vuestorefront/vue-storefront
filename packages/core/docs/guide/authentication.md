# What's the authentication?
Authentication is the operation of recognizing the user's identify. It allows us to associate incoming requests with an account or a person. To do that, provided credentials are compared with ones in the database.

## Registering a new user
Creating a user can be done using `register` method provided by `useUser` [composable](https://v3.vuejs.org/guide/composition-api-introduction.html#basics-of-composition-api). It requires different fields per each integration. Most common are email, password, first name, and last name.   
```vue
<template>
  <form @submit.prevent="register({ user: form })">
    <input type="text" placeholder="First name" v-model="form.firstName"/>
    <input type="text" placeholder="Last Name" v-model="form.lastName"/>
    <input type="text" placeholder="Email" v-model="form.email"/>
    <input type="password" placeholder="Password" v-model="form.password"/>
    <button type="submit" :disabled="loading">Submit</button>
  </form>
</template>

<script>
import { useUser } from '{INTEGRATION}';
import { ref } from '@vue/composition-api';

export default {
  setup () {
    const { register, loading } = useUser();
    const form = ref({
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    })

    return {
      register,
      loading,
      form
    }
  }
}
</script>
```
`register` method - takes care of whole signing up process and signs in at the end, shape of `form` object depends on integration    

## Logging in/out and sessions
Signing in and out can be done using `login` and `logout` methods provided by `useUser` [composable](https://v3.vuejs.org/guide/composition-api-introduction.html#basics-of-composition-api). `login` requires different fields per each integration. `logout` does not take any arguments.
```vue
<template>
  <form @submit.prevent="login({ user: form })" v-if="!isAuthenticated">
    <input type="text" placeholder="Email" v-model="form.username"/>
    <input type="password" placeholder="Password" v-model="form.password"/>
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
    const form = ref({
      username: '',
      password: ''
    })

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
`login` method - takes care of signing in process, shape of `form` object depends on integration   
`logout` method - takes care of logout process, it does not take any arguments   
`isAuthenticated` boolean [ref](https://v3.vuejs.org/api/refs-api.html#ref) - tells if user is signed in   
`user` User [ref](https://v3.vuejs.org/api/refs-api.html#ref) - contains object of signed in user or it equals `null`   

## What auth strategies do we follow?
Based on integration we might use different auth strategies, for example:
- [JWT Token](https://jwt.io/introduction)
- [Basic HTTP Token](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [OAuth 2 Bearer](https://oauth.net/2/bearer-tokens/)

We prefer to store token inside the cookie as we might want to use it both client and server side.

## Detailed strategies per integration
  - Commercetools - OAuth 2 Bearer - We are following [HTTP Authorization guide](https://docs.commercetools.com/api/authorization) from Commercetools documentation, using their library - [TokenProvider](https://commercetools.github.io/nodejs/sdk/api/sdkAuth.html)
