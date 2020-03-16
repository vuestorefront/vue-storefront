<AuthMiddleware />

::: slot auth-middleware-example
```js
import auth from '../middleware/auth';

export default {
  name: 'MyAccount',
  middleware: auth,
  ...
}
```
:::