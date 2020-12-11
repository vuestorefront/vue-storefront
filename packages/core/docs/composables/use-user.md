# `useUser`

## When to use it?

Use `useUser` to:
- manage user authentication
- manage authentication data like email address, login or password.

If you want to fetch/save other user data you should use the following composables:
- [`useUserBilling`](./use-user-billing.md)
- [`useUserShipping`](./use-user-shipping.md)
- [`useUserOrders`](./use-user-orders.md)

## How to use it in your project?

```js
import { useUser } from '{INTEGRATION}'
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const {
      user,
      isAuthenticated,
      updateUser,
      register,
      login,
      logout,
      changePassword,
      load,
      loading
     } = useUser()

    onSSR(async () => {
      await load()
    })

    return {
      user,
      loading
    }
  }
}
```
