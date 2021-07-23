# useUser composable

`useUser` composition API function allows loading the customer data. This function returns the following values:

- `user` - the main data object that contains user structure in the platform-specific structure
```typescript
export type Maybe<T> = T | null;

export type Customer = {
  id: Maybe<string>;
  firstName: Maybe<string>;
  lastName: Maybe<string>;
  displayName: Maybe<string>;
  email: Maybe<string>;
  phone: Maybe<string>;
}
```
- `updateUser` - function required to update user information like email, first and last name.
    - This method accepts the following parameters.
    - `email` (String) - The customer’s email.
    - `firstName` (String) - The customer’s first name.
    - `lastName`  (String) - The customer’s last name.
- `register` - function for registering a user with email, name, and password.
    - This method accepts the following parameters.
    - `email` (String) - The customer’s email.
    - `password` (String) - The login password used by the customer.
    - `firstName` (String) - The customer’s first name.
    - `lastName`  (String) - The customer’s last name.
- `login` - function for authenticating the user with email and password and retrieve the token.
    - This method accepts the following parameters.
    - `username` (String) - The email associated with the customer.
    - `password` (String) - The login password to be used by the customer.
- `logout` - function for removing user's token.
- `changePassword` - function for change user's password.
    - This method accept the following parameters.
    - `currentPassword` (String) - The existing password
    - `newPassword` (String) - The login password used by the customer.
- `refreshUser` - function for retrieve user details by the token.
- `loading` - a reactive object containing information about the loading state of the user

## Example
Create customer's access token. The access token is used to identify the customer and is required to modify the customer object in any way.
This method accepts two parameters, username, and password, and on the success, it will return a token. The token is required and mandatory to call other APIs like `updateUser`, `changePassword`, `refreshUser`, and `logout`.

```vue
<template>
    <ValidationObserver v-slot="{ handleSubmit }">
        <form class="form" @submit.prevent="handleSubmit(login)">
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <SfInput
              v-model="form.username"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              name="email"
              label="Your email"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <SfInput
              v-model="form.password"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              name="password"
              label="Password"
              type="password"
              class="form__element"
            />
          </ValidationProvider>
          <SfButton
            type="submit"
            class="sf-button--full-width form__button"
            :disabled="loading"
          >
            <SfLoader :class="{ loader: loading }" :loading="loading">
              <div>Login</div>
            </SfLoader>
          </SfButton>
        </form>
    </ValidationObserver>
</template>

<script>
import { SfInput, SfButton, SfLoader } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { useUser } from '@vue-storefront/shopify';

export default {
  name: 'LoginModal',
    components: {
      SfInput,
      SfButton,
      SfLoader,
      ValidationProvider,
      ValidationObserver
    },
  setup() {

    const { login, loading } = useUser();
  
    return {
      loading,
      login
    }
  }
}
</script>
```
