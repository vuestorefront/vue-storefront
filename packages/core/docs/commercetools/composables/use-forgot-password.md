# `useForgotPassword`

## Features

`useForgotPassword` composable can be used to:

* generate reset password token
* set new password using token

## API

- `request` - function to generate reset password token. When invoked, it requests data from the API and populates the `token` property. This method accepts a single `params` object with the following properties:

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

- `setNew` - function to set new user password after `request`. When invoked, it requests data from the API and populates the `result` property. This method accepts a single `params` object with the following properties:

  - `params: SetNewPasswordParams`
  
  - `customQuery?: CustomQuery`

```typescript
interface SetNewPasswordParams {
    tokenValue: string;
    newPassword: string;
}

type CustomQuery = {
  customerResetPassword: string
}
```

- `token: string` - reactive data string containing the reset token.

- `loading: boolean` - reactive object containing information about loading state of `setNew` and `request` methods.

- `error: UseForgotPasswordErrors` - reactive object containing the error message, if `setNew` or `request` failed for any reason.

```ts
interface UseForgotPasswordErrors {
  request: Error;
  setNew: Error;
}
```

## Getters

There are no getters for `useForgotPassword` composable.

## Example

Generating reset password token and changing user password.

```vue
<template>
  <!-- Generate reset password token -->
  <form @submit.prevent="request({ email: form.value.email })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">Reset Password</button>
  </form>

  <!-- Change user password -->
  <form @submit.prevent="setNew({ tokenValue: token, newPassword: form.value.password })">
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
    const { request, setNew, result, loading } = useForgotPassword();
    const form = ref({});

    const token = context.root.$route.query.token

    return {
      request,
      setNew,
      result,
      token,
      loading,
      form
    };
  }
};

</script>
```
