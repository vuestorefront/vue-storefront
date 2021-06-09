# `useForgotPassword`

## Features

`useForgotPassword` composable can be used to:

* generate reset password token
* change user password using token

## API

- `reset` - function used to generate reset password token. When invoked, it requests data from the API and populates `token` property. This method accepts a single params object. The `params` has the following option:

  - `params: ResetPasswordParams`

  - `customQuery?: CustomQuery`

```typescript
interface ResetPasswordParams {
    email: string;
}

type CustomQuery = {
  customerCreatePasswordResetToken: string
}
```

- `change` - function used to set new user password after reset. When invoked, it requests data from the API and populates `result` property. This method accepts a single params object. The `params` has the following option:

  - `params: ChangePasswordParams`
  
  - `customQuery?: CustomQuery`

```typescript
interface ChangePasswordParams {
    tokenValue: string;
    newPassword: string;
}

type CustomQuery = {
  customerResetPassword: string
}
```

- `token: string` - reactive data string containing the created token.

- `loading: boolean` - reactive object containing information about loading state of `change` and `reset` methods.

- `error: UseForgotPasswordErrors` - reactive object containing the error message, if `change` or `reset` failed for any reason.

```ts
interface UseForgotPasswordErrors {
  result: Error;
}
```

## Getters

We do not provide getters for `useForgotPassword` composable.

## Example

Generating reset password token and changing user password.

```vue
<template>
  <!-- Generate reset password token -->
  <form @submit.prevent="reset({ email: form.value.email })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">Reset Password</button>
  </form>

  <!-- Change user password -->
  <form @submit.prevent="change({ tokenValue: token, newPassword: form.value.password })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">Save Password</button>
  </form>
  <div>{{ result }} - Boolean confirmation of successful password change</div>
</template>

<script>
import { useForgotPassword } from '@vsf-enterprise/commercetools';
import { ref } from '@vue/composition-api';

export default {
  setup(_, context) {
    const { reset, change, result, loading } = useForgotPassword();
    const form = ref({});

    const token = context.root.$route.query.token

    return {
      reset,
      change,
      result,
      token,
      loading,
      form
    };
  }
};

</script>
```
