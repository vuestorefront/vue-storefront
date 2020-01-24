# Introduction

All data processing and remote requests should be managed by Vuex data stores. The core module contains more than [10 default data stores](https://github.com/DivanteLtd/vue-storefront/tree/master/core/store/modules) and can be easily extended by [store extensions](../extensions/extensions.md).
You can modify the existing store actions by responding to events. Events are specified in the docs below and can be found in the [core module](https://github.com/DivanteLtd/vue-storefront/tree/master/core), where `EventBus.$emit` has been mostly used for Vuex Actions.

**You should put all the REST calls, Elasticsearch data queries inside the Vuex Actions.** This is our default design pattern for managing the data.

## Vuex conventions

Before you start working with Vuex, it's recommended to get familiar with our [vuex conventions](./vuex-conventions.md)

## Vuex modules

- [Product](product-store.md)
- [Category](category-store.md)
- [Cart](Cart%20Store.md)
- [Checkout](Checkout%20Store.md)
- [Order](Order%20Store.md)
- [Stock](stock-store.md)
- [Sync](sync-store.md)
- [User](User%20Store.md)
- [Attribute](attribute-store.md)
- [UI Store](<https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20UI%20Store%20(interface%20state).md>)

## Override existing core modules

Existing core modules can be overridden in the themes store. Just import any core store modules and override them using the `extendStore()` utility method like the example given below in `src/modules/ui-store/index.ts`.

```
import coreStore from '@vue-storefront/core/store/modules/ui-store'
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

And then import it in `src/modules/index.ts`

```
import ui from './ui-store'

export default {
  ui
}
```

## Related

[Working with data](data.md)
