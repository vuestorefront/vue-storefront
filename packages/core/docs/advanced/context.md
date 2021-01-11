# Context API

The application context is essential when it comes to sharing something across the app. A runtime config, current connection to the API, API tokens, user session, and everything else that's related to the current request should be stored within the context.

The common solution that may come to your mind in such a case is using one global object to store everything you need in the app. However, by doing this you would be sharing data not only over the app but also across all of the incoming requests. That would cause lots of issues and your app won't be able to handle ordinary traffic.

## Context data structure

In Vue Storefront, each integration has a common structure of the context object. A root of the context starts with the `$vsf` key. Everything that's under this key is the integration keys which are storing the data for corresponding integration using the specific, predefined format.

```js
$vsf {
  $ct: {
    api: {},
    client: {},
    config: {}
  }
  ...
}
```

- `$vsf` - general key that keeps vue storefront context
- `$ct` - integration key
- `api` - field that always keeps API functions for a given integration
- `client` - field that always keep api client/connection for given integration
- `config` - field that always keep configuration for given integration
- others - depending on the needs you can put into the context any field you want (under the corresponding key)


## Context composable

To use context or access your integration API, you can use dedicated composable `useVSFContext`. It returns a integration keys of all of the integrations you have registered in the Vue Storefront (prefixed by `$` sign).

```js
const { $ct, $other } = useVSFContext();

$ct.api.getProduct({ id: 1 })
$other.client.get('/othet-integration')
```

## Context plugin

If for some reason you don't want to use integration nuxt modules, you have to configure the integration by yourself. For that purpose, each integration expose a integration plugin where you can configure everything you want.

```js
// plugins/integration.js
import { integrationPlugin } from '@vue-storefront/commercetools'

export default integrationPlugin(({ app, integration }) => {
  const settings = { api: '/graphql', user: 'root' }

  integration.configure({ ...settings })
});
```

Of course each integration has predefined set of API functions, that sometimes you may want to override. A `configure` function gives you that ability as well. When you pass your new API function, or use a name of existing one, the Vue Storefront will automatically apply it to the app.


```js
// plugins/integration.js
import { integrationPlugin } from '@vue-storefront/commercetools'
import { getMe } from '@vue-storefeont/your-integration';

export default integrationPlugin(({ app, integration }) => {
  const settings = { api: '/graphql', user: 'root' }

  integration.configure({ ...settings }, { getMe })
});
```
