# Working with plugins

If you want to register Vue plugin in Vue Storefront the right place to do this is your theme entry `{theme}/index.js`.

````js
// {theme}/index.js
import SomePlugin from 'some-plugin'

Vue.use(SomePlugin)
````

## Dealing with server side code

Vue Storefront code is actually executed two times - once on the server side to generate SSR page and then on a client side. A majority of Vue plugins is ui-specific and relies on `window` object that doesn't exist on the server side.

To make sure your plugin is registered only on client side you can use `isServer` helper.

````js
import { isServer } from '@vue-storefront/core/helpers'
import SomePlugin from 'some-plugin'

if (!isServer ) Vue.use(SomePlugin)
````
