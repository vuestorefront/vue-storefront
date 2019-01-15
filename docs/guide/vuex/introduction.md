# Introduction

All data processing and remote requests should be managed by Vuex data stores. Core module contains more than [10 default data stores](https://github.com/DivanteLtd/vue-storefront/tree/master/core/store/modules) and can be easily extended by [store extensions](../extensions/extensions.md).
You can modify the existing store actions by responding to events. Events are specified in the docs below and could be found in the [core module](https://github.com/DivanteLtd/vue-storefront/tree/master/core), where `EventBus.$emit` has been mostly used for Vuex Actions.

**You should put all the REST calls, Elasticsearch data queries inside the Vuex Actions**. This is our default design pattern for managing the data.

## Vuex modules

- [Product](Product%20Store.md)
- [Category](Category%20Store.md)
- [Cart](Cart%20Store.md)
- [Checkout](Checkout%20Store.md)
- [Order](Order%20Store.md)
- [Stock](Stock%20Store.md)
- [Sync](Sync%20Store.md)
- [User](User%20Store.md)
- [Attribute](Attribute%20Store.md)
- [UI Store](<https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20UI%20Store%20(interface%20state).md>)

## Override existing core modules

Existing core modules can be overridden in themes store. Just import any core store modules and override it using `extendStore()` utility method like the example given below in `themes/default/store/ui-store.js`.

```
import coreStore from '@vue-storefront/store/modules/ui-store'
import { extendStore } from '@vue-storefront/core/lib/themes'

const state = {
  // override state of core ui module...
}

const mutations = {
  // override mutations of core ui module...
}

const actions = {
  // override actions of core ui module...
}

export default extendStore(coreStore, {
  state,
  mutations,
  actions
})
```

And then import it in `themes/default/store/index.js`

```
import ui from './ui-store'

export default {
  ui
}
```

## Related

[Working with data](data.md)
