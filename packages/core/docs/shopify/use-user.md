# useUser composable

`useUser` composition API function is responsible, as its name suggests, for interactions with user in your eCommerce. This function returns following values:

- `user` - a main data object that contains user structure in platform specific structure
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
    - This method accept the following parameters.
    - `email` (String) - The customer’s email.
    - `firstName` (String) - The customer’s first name.
    - `lastName`  (String) - The customer’s last name.
- `register` - function for registering a user with email, name and password.
    - This method accept the following parameters.
    - `email` (String) - The customer’s email.
    - `password` (String) - The login password used by the customer.
    - `firstName` (String) - The customer’s first name.
    - `lastName`  (String) - The customer’s last name.
- `login` - function for authenticating user with email and password and retrieve token.
    - This method accept the following parameters.
    - `username` (String) - The email associated to the customer.
    - `password` (String) - The login password to be used by the customer.
- `logout` - function for removing user's token.
- `changePassword` - function for change user's password.
    - This method accept the following parameters.
    - `currentPassword` (String) - The existing password
    - `newPassword` (String) - The login password used by the customer.
- `refreshUser` - function for retrieve user details by token.
- `loading` - a reactive object containing information about loading state of the user

## Example
Creates a customer access token. The access token used to identify the customer and is required to modify the customer object in any way.
This method accept two parameters, username and password and on success it will return a token. The token is require and mandatory to call other APIs like `updateUser`, `changePassword`, `refreshUser` and `logout`.

```vue
<template>
    <ValidationObserver v-slot="{ handleSubmit }">
        <form class="form" @submit.prevent="handleSubmit(login)">
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <SfInput
              data-cy="login-input_email"
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
              data-cy="login-input_password"
              v-model="form.password"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              name="password"
              label="Password"
              type="password"
              class="form__element"
            />
          </ValidationProvider>
          <SfButton data-cy="login-btn_submit"
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
  name: 'AuthModal',
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
