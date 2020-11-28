# `useUser`

## When to use it?

You should use `useUser` to manage user authentication and authentication data like email address, login or password. If you want to fetch/save other user data you should use the following composables: 
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
      updateUser,
      register,
      login,
      logout,
      isAuthenticated,
      changePassword,
      load,
      loading
     } = useUser()
    
    onSSR(async () => {
      await load() 
    })

    return {
      products,
      totalProducts,
      loading
    }
  }
}
```