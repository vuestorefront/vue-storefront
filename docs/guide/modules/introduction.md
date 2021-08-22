# Introduction
## Table of contents

**Introduction and motivation**
- [What are VS Modules](#what-are-vs-modules)
- [Motivation](#motivation)
- [What is the purpose of VS modules?](#what-is-the-purpose-of-vs-modules)

**Technical part**
- [Module config and its capabilities](#module-config-and-capabilities)
- [Module file structure](#module-file-structure)
- [Module registration](#module-registration)

**Patterns and good practices for common use cases**
- [General rules and good practices](#general-rules-and-good-practices)
- [Adding new features as VS modules](#adding-new-features-as-vs-modules)
- [Extending and overriding Vue Storefront modules](#extending-and-overriding-vue-storefront-modules)
- [Creating third party modules](#Creating-3rd-party-modules)
  

## What are VS modules?

You can think about each module as a one, independent feature available in Vue Storefront with all its logic and dependencies inside. This *one feature* however is a common denominator that links all the features inside. For example, the common denominator for adding a product to the cart, receiving a list of items that is in the cart or applying a cart coupon is obviously a `cart` and `cart` is not a feature of anything bigger than itself (its common denominator is the shop) so it should be a module. Wishlist, Reviews or Newsletter are also good examples of the module as we intuitively think about them as standalone features. 

## Motivation

I believe that an obvious metaphor can clearly describe the problem, at the same time, the solution.

To better illustrate the whole concept I'll try to explain it with lego bricks.

Let's say we have a box with 90 lego bricks that we can use to build some fancy things like Towers, Castles, or Helicopters. Unfortunately due to some stupid EU regulations we can only have 3 different colors of bricks in our box. As we all know, not every color is accurate for every structure that can be built so we need to swap one color with another in a shop from time to time in order to have bricks in colors that are best-suited for our next lego project.

Cool, but there is one problem - since we have all our bricks in one box they look more or less as follows :

![lego](../images/pile_of_legos.png)

When we want to replace the green bricks with, let's say, the black ones we need to look for each green brick separately among all the others which can take a lot of time... and there is still a chance that we will miss some of them! Not to mention that finding the particular green brick that we need to finish the palm tree we are building (<img alt="this one!" src="../images/lego_palm.jpeg" style="width: 150px; height:120px;vertical-align: middle">) will require looking for it among all the other bricks which can make this task extremely difficult and time-consuming.

This is obviously not a situation that we want to end up in with our small lego empire. Neither do we want it with Vue Storefront since it's meant to be easily extendable so you can replace your green bricks (or current user cart feature/cms provider/cms content provider) with the black ones (different cart feature with multiple carts, WordPress instead of Prismic for content etc) without hustles and bustles looking for each of them among all the bricks and without worries that you will miss some of them or EU will confiscate all the bricks that you have! We also want to make it easier to find the correct brick that we want right now to finish this damn palm tree!

So how do we make this horrible situation better?

Introducing... (drums build up in the background) **_bricks grouped by colors_**! (wows in the background)

![lego2](../images/organized_lego_bricks.jpeg)

When we have our bricks grouped by their colors (and in separate boxes - modules) it's much easier to find this green brick that we needed for a palm tree since we only need to search in a small subset of all bricks. Moreover when we want to replace green bricks with the black ones, then instead of looking for all the green representatives one by one we are just replacing their box with the one containing black bricks. We also don't need to worry if something was left behind since we know that all the green bricks were in the box.

This is the modularity and extendability we are looking for in Vue Storefront and the architecture we are currently rewriting it into.

## What is the purpose of VS modules?

The purpose is well described in [this discussion](https://github.com/vuestorefront/vue-storefront/issues/1213). It can be summarized to:

- **Better extendability**: We can extend each module or replace it completely with the new one. For example, we may want to replace our Cart module with the one that allows to have multiple carts. With module approach, we can just detach the current Cart module and replace it with the new one. Another example can be using different modules for different content CMSes integration etc.
- **Better developer experience**: Along with the modules we are introducing many features focused on delivering better and easier experience for developers to hop on in a more predictable way. We changed the way you can compose components with features, added unit tests, TypeScript interfaces etc.
- **Better upgradability**: Each module is a separate NPM package therefore can be upgraded independently and since it has all the logic encapsulated, it shouldn't break any other part of the application when detached, modified or replaced.

## Module config and capabilities

Module config is the object that is required to instantiate VS module. The config object you provide is later used to extend and hook into different parts of the application (e.g. router, Vuex etc).
Please use this object as the only part that is responsible for extending Vue Storefront. Otherwise it may stop working after some breaking core updates.

Vue Storefront module object with provided config should be exported to `index.ts` entry point. Ideally it should be an *export* named the same as modules key.

This is how the signature of Vue Storefront Module looks like:

```js
interface VueStorefrontModuleConfig {
  key: string;
  store?: {
    modules?: { key: string, module: Module<any, any> }[],
    plugin?: Function,
  };
  router?: {
    routes?: RouteConfig[],
    beforeEach?: NavigationGuard,
    afterEach?: NavigationGuard,
  };
  beforeRegistration?: (VSF) => void;
  afterRegistration?: (VSF) => void;
}
```

See code [here](https://github.com/vuestorefront/vue-storefront/blob/develop/core/modules/index.ts)

### `key` (required)

A key is an ID of your module. It's used to identify your module and to set keys in all key-based extensions that module is associated (e.g. creating namespaced store). This key should be unique.

### `store`

The entry point for Vuex.

- `modules` - array of Vuex modules to register under given keys
- `plugin` - you can provide your own Vuex plugin here

### `router`

The entry point for vue-router. You can provide additional routes and [navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) here.

### `beforeRegistration`

A function that'll be called before registering the module both on server and client side. You have access to VSF object here.

The `VSF` object is an instance of your Vue Storefront shop. It contains following properties 
````js
    Vue?: VueConstructor,
    config?: Object,
    store?: Store<RootState>,
    isServer?: boolean
````
### `afterRegistration`

A function that'll be called after registering the module both on server and client side. You have access to VSF object here.

The `VSF` object is an instance of your Vue Storefront shop. It contains following properties 
````js
    Vue?: VueConstructor,
    config?: Object,
    store?: Store<RootState>,
    isServer?: boolean
````
## Module file structure

Below you can see recommended file structure for VS module. All of the core ones are organised in this way.
Try to have a similar file structure inside the ones that you create. If all the modules are implemented with a similar architecture, it'll be much easier to maintain and understand them. Please avoid unnecessary changes in design unless otherwise required so.

Not all of this folders and files should exist in every module. The only mandatory file is `index.ts` which is the entry point. The rest depends on your needs and module functionality.

You can take a look at [module template](https://github.com/vuestorefront/vue-storefront/tree/master/core/modules/module-template) with an example implementation of all features listed in config.

- `components` - Components logic related to this module (eg. Microcart for Cart module). Normally it contains `.ts` files but you can also create `.vue` files and provide some baseline markup if it is required for the component to work out of the box.
- `pages` - If you want to provide full pages with your module, place them here. It's also a good practice to extend router configuration for these pages
- `store` - Vuex Module associated to this module. You can also place Vuex modules extensions in here
  - `index.ts` - Entry point and main export of your Vuex Module. Actions/getters/mutations can be split into different files if the logic is too complex to keep it in one file. Should be used in `store` config property.
  - `mutation-types.ts` - Mutation strings represented by variables to use instead of plain strings
  - `plugins.ts` - Good place to put vuex plugin. Should be used in `store.plugins` config object
- `types` - TypeScript types associated with the module
- `test` - Folder with unit tests which is _required_ for every new or rewritten module.
- `hooks` - before/after hooks that are called before and after registration of the module.
  - `beforeRegistration.ts` - Should be used in `beforeRegistration` config property.
  - `afterRegistration.ts` - Should be used in `afterRegistration` config property.
- `router` - routes and navigation guards associated to this module
  - `routes.ts`- array of route objects that will be added to the current router configuration. Should be used in `router.routes` config property.
  - `beforeEach.ts` - beforeEach navigation guard. Should be used in `router.beforeEach` config property.
  - `afterEach.ts`- afterEach navigation guard. Should be used in `router.afterEach` config property.
- `queries` - GraphQL queries
- `helpers` - everything else that is meant to support modules behavior
- `index.js` - entry point for the module. Should export VueStorefrontModule. It's also a good place to instantiate cache storage.

## Module registration

All modules including the core ones are registered in `src/modules/index.ts` file. Thanks to this approach you can easily modify any of core modules object before registration (read more [here](#extending-and-overriding-vue-storefront-modules)).

All VS modules from `registerModules` will be registered during the shop initialisation.

---

## General rules and good practices

First off, take a look at module template. It contains great examples, good practices and explanations for everything that can be put in a module.

0. **THE MOST IMPORTANT RULE** Try to isolate all the logic required for a module to work properly and put them inside the module. You can import it from other parts of the app but the logic itself should exist in the module
1. **Try not to rely on any other module. Keep everything encapsulated and only rely on core helpers and libs**. Use other stores only if it's the only way to achieve the functionality and import `rootStore` for this purpose. Modules should work standalone and rely only on themselves. Try to think about each module as a standalone npm package.
1. Place all reusable features as Vuex actions (e.g. `addToCart(product)`, `subscribeNewsletter()` etc) instead of placing them in components. try to use getters for modified or filtered values from state. We are trying to place most of the logic in Vuex stores to allow easier core updates. Here is a good example of such externalisation.

```js
export const Microcart = {
  name: 'Microcart',
  computed: {
    productsInCart(): Product[] {
      return this.$store.state.cart.cartItems;
    },
    appliedCoupon(): AppliedCoupon | false {
      return this.$store.getters['cart/coupon'];
    },
    totals(): CartTotalSegments {
      return this.$store.getters['cart/totals'];
    },
    isMicrocartOpen(): boolean {
      return this.$store.state.ui.microcart;
    },
  },
  methods: {
    applyCoupon(code: String): Promise<boolean> {
      return this.$store.dispatch('cart/applyCoupon', code);
    },
    removeCoupon(): Promise<boolean> {
      return this.$store.dispatch('cart/removeCoupon');
    },
    toggleMicrocart(): void {
      this.$store.dispatch('ui/toggleMicrocart');
    },
  },
};
```

3. If you want to inform of success/failure of core component's method you can either use a callback or scoped event. Omit Promises if you think that function can be called from the template and you'll need the resolved value. This is a good example of method that you can call either on `template` or `script` section:

```js
addToCart(product, success, failure) {
  this.$store.dispatch('cart/addToCart').then(res =>
    success(res)
  ).catch(err =>
    failure(err)
  )
}
```

Try to choose a method based on use cases. [This](https://github.com/vuestorefront/vue-storefront/blob/develop/core/modules/mailchimp/components/Subscribe.ts#L28) is a good example of using callbacks.

5. Create pure functions that can be easily called with a different argument. Rely on `data` properties instead of arguments only if it's required (for example, they are validated as [here](https://github.com/vuestorefront/vue-storefront/blob/develop/core/modules/mailchimp/components/Subscribe.ts#L28))
6. Make a document for exported components like as follows : [document](https://github.com/vuestorefront/vue-storefront/blob/develop/core/modules/mailchimp/components/Subscribe.ts)
7. If your module core functionality is an integration with external service, better name it the same as this service (for example `mailchimp`)
8. Use named exports and type check.

## Adding new features as VS modules

- If you want to crete a new module, copy content from `src/module-template` and use the parts that you need.
- If you are creating a new feature, then note it's not merely extending currently existing one. If you are sure the feature you want to provide is completely new then it should be introduced as a new VS module.
- Provide unique key that should represent the feature or 3rd party system name (if the module is an integration)
- Try not to rely on data and logic from other modules if your module is not claimed to directly extend it. In doing so, it's guaranteed to remain working and easier to reuse even after extensive VS core updates.

## Extending and overriding Vue Storefront Modules

You can extend and modify all parts of any of Vue Storefront module before its registration by providing a`VueStorefrontModuleConfig` object **with the same key** to `extendModule()` function. This config will be deep merged with the module of the same key, which means:
- All Vuex stores with the same keys will be merged (conflicting actions/mutations will be overwritten, others will be added)
- Leafs like before/after hooks, store plugins or router object properties will be overwritten by the new ones if provided.



Let's see an example and assume we want to extend module `cart` by overriding its `beforeRegistration` hook and `load` Vuex action.
1. First we need to prepare a `VueStorefrontModuleConfig` that we will use to extend `cart` module. It must have the same `key` value as the module we want to extend.
2. Next we need to pass this object to `extendModule` function
3. That's all! Now when you register `cart` module it will be extended with provided config.


```js
import { Cart } from '@vue-storefront/core/modules/cart'

// 1. Preparation of new VSMConfig
const extendCartVuex = {
 actions: {
   load () {
     console.info('hey')
   }
 }
}

const extendCartAfterRegistration = function (VSF) {
   console.info('Hello, im extended now!')
 }

const cartExtend = {
 key: 'cart',
 afterRegistration: extendCartAfterRegistration,
 store: { modules: [{ key: 'cart', module: extendCartVuex }] },
}

// 2. After passing the object to extendModule function it will be merged with Cart module during registration
extendModule(cartExtend)

export const registerModules: VueStorefrontModule[] = [Cart]
```

If you want to make complex changes with your own app-specific VS module (which is not an npm package), it's a good practice to keep this module inside `src/modules/{module-name}`. To extend a module with another module just pass its config to `extendModule` function

```js
import { Cart } from '@vue-storefront/core/modules/cart'
import { ExtendCartModule } from 'extend-cart';


extendModule(ExtendCartModule.config)

export const registerModules: VueStorefrontModule[] = [Cart]
```

## Creating third party modules

If you want to create a third party module, just copy the `src/modules/module-template` raw code to your repo. Don't use any transpilation and build tools since it prevents proper tree shaking and optimization. A building process is handled by Vue Storefront build tools. A package name needs to start with `vsf-` prefix to be included into Vue Storefront build process.

## Contributions

Please introduce every new feature as a standalone, encapsulated module. We also need your help in rewriting Vue Storefront to modular approach - [here](https://github.com/vuestorefront/vue-storefront/issues?q=is%3Aissue+is%3Aopen+label%3A%22API+Module%22) you can find tasks related to this architecture change and [here](https://github.com/vuestorefront/vue-storefront/blob/master/doc/api-modules/refactoring-to-modules.md) is the tutorial on how to approach applying these changes.
