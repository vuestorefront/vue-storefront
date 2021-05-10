# Auth Middleware

The Auth Middleware provides a straightforward way to limit access to certain pages to logged users only.
This middleware relies on integration-specific `useUser` composable that exposes `isAuthenticated` property.

## Usage

The only thing you need to do to use the Auth Middleware is importing it in the page `vue` and using as a middleware for that page, like in the example below:

```js
import auth from '../middleware/auth';

export default {
  name: 'MyAccount',
  middleware: auth,
  ...
}
```
