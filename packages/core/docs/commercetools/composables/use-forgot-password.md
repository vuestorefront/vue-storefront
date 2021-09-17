# `useForgotPassword` <Badge text="Added in 1.3" type="info" />

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

- `setNew` - function to set new user password after `request`. When invoked, it requests data from the API and populates the `result` object. This method accepts a single `params` object with the following properties:

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

- `getResetPasswordToken` - returns generated reset password token.

- `isPasswordChanged` - returns a boolean value of a password set status.

  ```ts
  interface ForgotPasswordGetters<ForgotPasswordResult> {
    getResetPasswordToken: (result: ForgotPasswordResult) => string
    isPasswordChanged: (result: ForgotPasswordResult) => boolean
  }

  interface ForgotPasswordResult {
    resetPasswordResult: CreatePasswordResetTokenResponse;
    setNewPasswordResult: ResetPasswordResponse;
  }

  type CreatePasswordResetTokenResponse = QueryResponse<'customerCreatePasswordResetToken', CustomerPasswordToken>;

  type ResetPasswordResponse = QueryResponse<'customerResetPassword', Customer>;

  type CustomerPasswordToken = {
    customerId: Scalars["String"];
    expiresAt: Scalars["DateTime"];
    value: Scalars["String"];
    id: Scalars["String"];
    version: Scalars["Long"];
    createdAt: Scalars["DateTime"];
    lastModifiedAt: Scalars["DateTime"];
    createdBy?: Maybe<Initiator>;
    lastModifiedBy?: Maybe<Initiator>;
  }

  type Customer = Versioned & {
    __typename?: "Customer";
    customerNumber?: Maybe<Scalars["String"]>;
    email: Scalars["String"];
    password: Scalars["String"];
    addresses: Array<Address>;
    defaultShippingAddressId?: Maybe<Scalars["String"]>;
    defaultBillingAddressId?: Maybe<Scalars["String"]>;
    shippingAddressIds: Array<Scalars["String"]>;
    billingAddressIds: Array<Scalars["String"]>;
    isEmailVerified: Scalars["Boolean"];
    customerGroupRef?: Maybe<Reference>;
    externalId?: Maybe<Scalars["String"]>;
    key?: Maybe<Scalars["String"]>;
    firstName?: Maybe<Scalars["String"]>;
    lastName?: Maybe<Scalars["String"]>;
    middleName?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    locale?: Maybe<Scalars["Locale"]>;
    salutation?: Maybe<Scalars["String"]>;
    dateOfBirth?: Maybe<Scalars["Date"]>;
    companyName?: Maybe<Scalars["String"]>;
    vatId?: Maybe<Scalars["String"]>;
    customerGroup?: Maybe<CustomerGroup>;
    defaultShippingAddress?: Maybe<Address>;
    defaultBillingAddress?: Maybe<Address>;
    shippingAddresses: Array<Address>;
    billingAddresses: Array<Address>;
    storesRef: Array<KeyReference>;
    stores: Array<Store>;
    /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
    customFieldsRaw?: Maybe<Array<RawCustomField>>;
    /** This field would contain type data */
    customFields?: Maybe<Type>;
    custom?: Maybe<CustomFieldsType>;
    id: Scalars["String"];
    version: Scalars["Long"];
    createdAt: Scalars["DateTime"];
    lastModifiedAt: Scalars["DateTime"];
    createdBy?: Maybe<Initiator>;
    lastModifiedBy?: Maybe<Initiator>;
    /** Custom fields are returned as a list instead of an object structure. */
    customFieldList?: Maybe<Array<CustomField>>;
  };
  ```

## Example

Requesting reset password token and setting new user password.

```vue
<template>
  <!-- Request reset password token -->
  <form @submit.prevent="request({ email: form.value.email })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">Reset Password</button>
  </form>

  <!-- Set new user password -->
  <form @submit.prevent="setNew({ tokenValue: tokenFromUrl, newPassword: form.value.password })">
    <!-- Or you can get the token from getter by using tokenFromGetter -->
    <!-- form fields -->
    <button type="submit" :disabled="loading">Save Password</button>
  </form>
  <div>{{ isPasswordChanged }} - Boolean confirmation of successful password change</div>
</template>

<script>
import { useForgotPassword, forgotPasswordGetters } from '@vsf-enterprise/commercetools';
import { ref, computed } from '@nuxtjs/composition-api';

export default {
  setup(_, context) {
    const { request, setNew, result, loading } = useForgotPassword();
    const form = ref({});
    const isPasswordChanged = computed(() => forgotPasswordGetters.isPasswordChanged(result.value));
    const tokenFromGetter = computed(() => forgotPasswordGetters.getResetPasswordToken(result.value))

    const tokenFromUrl = context.root.$route.query.token

    return {
      request,
      setNew,
      isPasswordChanged,
      tokenFromUrl,
      tokenFromGetter,
      loading,
      form
    };
  }
};

</script>
```
