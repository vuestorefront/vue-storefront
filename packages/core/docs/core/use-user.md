# useUser composable

`useUser` composition API function is responsible, as its name suggests for interactions with users from your e-commerce. This function returns following values:

- `login` - This request sends authentication parameters to the e-commerce platform where customers are already registered. e-commerce platform will return authentication success or fail.

<Content slot-key="login-params" />

- `register` - When customers are not registered before, they can make requests to create a new customer entity. 

<Content slot-key="register-params" />

- `changePassword` - Customers may change password using this API. Note that parameters are _NOT_ wrapped in an object.

<Content slot-key="changepw-params" />

- `refreshUser` - 
- `isAuthenticated` -
- `loading` - 