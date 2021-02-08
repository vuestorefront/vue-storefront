---
platform: Commercetools
---

# User

[[toc]]

## Features

`useUser` composition function can be used to:

- manage user authentication
- manage authentication data like email address, login or password.

If you want to fetch/save other user data you should use the following composables:
- [`useUserBilling`](./use-user-billing.md)
- [`useUserShipping`](./use-user-shipping.md)
- [`useUserOrders`](./use-user-orders.md)

## API

`useUser` contains following properties:

- `user` - reactive object containing information about current user.

- `updateUser` - function for updating user data. When invoked, it submits data to the API and populates user property with updated information.

- `register` - function for creating a new user. When invoked, it submits new user data to the API and saves them.

- `login` - function for log in a user based on a username and password.

- `logout` - function for logout a user.

- `changePassword` - function for changing user password.

- `loading` - reactive object containing information about loading state of `user`.

- `isAuthenticated` - checks if user is authenticated or not.

- `error` - reactive object containing the error message, if some properties failed for any reason.

## Getters

Because `user` property is a raw response, it's recommended to use `userGetters` for accessing any data from it. It includes following helper functions:

- `getFirstName` - returns user first name.

- `getLastName` - returns user last name.

- `getFullName` - returns full user name.

- `getEmailAddress` - returns user email address.

Interface for the above getter looks like this:

```ts
interface UserGetters<USER> {
  getFirstName: (customer: USER) => string;
  getLastName: (customer: USER) => string;
  getFullName: (customer: USER) => string;
  getEmailAddress: (customer: USER) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}
```

## Examples

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
