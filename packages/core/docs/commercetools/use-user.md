# `useUser`

## Features

`useUser` composable can be used to:

- manage user authentication
- manage authentication data like email address, login or password.

If you want to fetch/save other user data you should use the following composables:
- [`useUserBilling`](./use-user-billing.md)
- [`useUserShipping`](./use-user-shipping.md)
- [`useUserOrders`](./use-user-orders.md)

## API

- `user` - reactive object containing information about current user.

```ts
type Customer = {
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
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
  customFieldList?: Maybe<Array<CustomField>>;
}
```

- `updateUser` - function for updating user data. When invoked, it submits data to the API and populates user property with updated information.  This method accepts a single `params` object. The `params` has the following option:

    - `user: UPDATE_USER_PARAMS`

```ts
interface UPDATE_USER_PARAMS {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
```

- `register: UseUserRegisterParams` - function for creating a new user. When invoked, it submits new user data to the API and saves them. This method accepts a single `params` object. The `params` has the following option:

  - `user: UseUserRegisterParams`

```ts
interface UseUserRegisterParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
```

- `login: UseUserLoginParams` - function for log in a user based on a username and password. This method accepts a single `params` object. The `params` has the following option:

  - `user: UseUserLoginParams`

```ts
interface UseUserLoginParams {
  username: string;
  password: string;
}
```

- `logout` - function for logout a user.

- `changePassword` - function for changing user password. This method accepts a single `params` object. The `params` has the following options:

    - `currentPassword: string`
      
    - `newPassword: string`

- `loading: boolean` - reactive object containing information about loading state of `user`.

- `isAuthenticated: boolean` - checks if user is authenticated or not.

- `error: UseUserErrors` - reactive object containing the error message, if some properties failed for any reason.

```ts
interface UseUserErrors {
  updateUser?: Error;
  register?: Error;
  login?: Error;
  logout?: Error;
  changePassword?: Error;
  load?: Error;
}
```

## Getters

- `getFirstName` - returns user first name.

- `getLastName` - returns user last name.

- `getFullName` - returns full user name.

- `getEmailAddress` - returns user email address.

```ts
interface UserGetters {
  getFirstName: (user: Customer) => string;
  getLastName: (user: Customer) => string;
  getFullName: (user: Customer) => string;
  getEmailAddress: (user: Customer) => string;
}
```

## Example

```js
import { useUser } from '@vue-storefront/commercetools';

export default {
  setup () {
    const { user, register, login, loading } = useUser();

    return {
      register,
      login,
      loading,
      firstName: userGetters.getFirstName(user.value),
      email: userGetters.getEmailAddress(user.value)
    }
  }
}
```
