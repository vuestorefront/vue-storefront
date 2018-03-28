# Working with Vuex

All data processing and remote requests should be managed by Vuex data stores. Core module contains more than [10 default data stores](https://github.com/DivanteLtd/vue-storefront/tree/master/core/store/modules) and could be easily extended by [store extensions].(https://github.com/DivanteLtd/vue-storefront/blob/master/doc/extensions/Working%20with%20extensions.md)

You can modify the existing store actions by responding to events. Events are specified in the docs below and could be found in the [core module](https://github.com/DivanteLtd/vue-storefront/tree/master/core), where `EventBus.$emit` has been mostly used for Vuex Actions.

**You should put all the REST calls, Elasticsearch data queries inside the Vuex Actions**. This is our default design pattern for managing the data.

## Vuex modules
 * [Product](Product%20Store.md)
 * [Category](Category%20Store.md)
 * [Cart](Cart%20Store.md)
 * [Checkout](Checkout%20Store.md)
 * [Order](Order%20Store.md)
 * [Stock](Stock%20Store.md)
 * [Sync](Sync%20Store.md)
 * [User](User%20Store.md)
 * [Attribute](Attribute%20Store.md)
 * [UI Store](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20UI%20Store%20(interface%20state).md)
 
 ## Related

* [Working with data](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md)
