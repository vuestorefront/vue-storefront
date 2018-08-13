***Important*** Modules are under heavy development. Only a few parts of Vue Storefront are rewritten to modular architecture but we are aiming to rewrite everything soon along with adding TypeScript support and Unit tests to each of them. Some concepts may change over time before we introduce the final version of VS Modules.

# What are VS modules?

You can think about each module as one feature available in Vue Storefront with all it's logic and dependencys encapsulated inside. Cart, WIshlist or Content (cms integration) are good examples of modules.

# What is the purpose of VS modules?

The purpose is well described in [this discussion](https://github.com/DivanteLtd/vue-storefront/issues/1213). It can be sumamrized to:
- **Better extensibility**: We can extend each module or replace it completely with the new one. For example we may want to replace our Cart module with the one that allows to have multiple carts. With modules we can just detach current Cart module and repalce it with our new one. Another example can be using different modules for different content CMSes integration etc. 
- **Better developer experience**: Along with the modules we are introducing many features focused on delivering better, easier to jump in and more predictable developer experience. We changed the way you can compose components with features, added unit tests, TypeScript interfaces etc.
- **Better upgradability**: Each module is a separate NPM pacage therefore can be upgraded independently and since it have all the logic encapsulated it shouldn't break any other parts of the application when detached, modified or replaced.

# How module should look like

Module by it's definition should encapsulate all logic required for the feature it represents. You can think about each module as a micro application that exposes it's parts to the outside world (Vue Storefront).

Normally module can (but not must) contain following folders:

- `components` - components related to this module (eg. Microcart for Cart module)
- `features` - atomic features that can be used to build your components (eg. AddToCart, ProductsInCart, RemoveFromCart etc for Cart module)
- `store` - Vuex store associated to module
- `helpers` - everything else that is meant to support modules behavior
- `types` - TypeScript types associated with module
- `test` - folder with unit tests which is *required* for every new or rewritten module. This folder can be placed outside of the module in 'tests' folder.
- `submodules` - Submodules related to this module. SUbmodules are a groups of features that are not a core functionalities of this module but rather kind of it's extensions or features available only under certain circumstances. For example if we have `order` module we can have all logic related to orders in this module but reordering something or seeing the list of your orders requires user account. In this case we might want to create `account` submodule with this functionalities.

[under construction]


# Contributions

Please introduce every new feature with new architecture as a module. We also need your help in rewriting Vue Storefront to modular approach - [here](https://github.com/DivanteLtd/vue-storefront/issues?q=is%3Aissue+is%3Aopen+label%3A%22API+Module%22) you can find tasks related to this architectural change.
