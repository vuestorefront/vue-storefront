# Modules

:::danger REMINDER
This document is _archived_ and _NOT_ relevant with the latest version which is `1.11` at the time of writing. Please keep in mind this document is supposed to help you maintain legacy product, not the fresh installation. 
:::

## Introduction
### Table of contents

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
  

### What are VS modules?

You can think about each module as a one, independent feature available in Vue Storefront with all its logic and dependencies inside. This *one feature* however is a common denominator that links all the features inside. For example, the common denominator for adding a product to the cart, receiving a list of items that is in the cart or applying a cart coupon is obviously a `cart` and `cart` is not a feature of anything bigger than itself (its common denominator is the shop) so it should be a module. Wishlist, Reviews or Newsletter are also good examples of the module as we intuitively think about them as standalone features. 

#### Motivation

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

### What is the purpose of VS modules?

The purpose is well described in [this discussion](https://github.com/DivanteLtd/vue-storefront/issues/1213). It can be summarized to:

- **Better extendability**: We can extend each module or replace it completely with the new one. For example, we may want to replace our Cart module with the one that allows to have multiple carts. With module approach, we can just detach the current Cart module and replace it with the new one. Another example can be using different modules for different content CMSes integration etc.
- **Better developer experience**: Along with the modules we are introducing many features focused on delivering better and easier experience for developers to hop on in a more predictable way. We changed the way you can compose components with features, added unit tests, TypeScript interfaces etc.
- **Better upgradability**: Each module is a separate NPM package therefore can be upgraded independently and since it has all the logic encapsulated, it shouldn't break any other part of the application when detached, modified or replaced.

### Module config and capabilities

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

See code [here](https://github.com/DivanteLtd/vue-storefront/blob/develop/core/modules/index.ts)

#### `key` (required)

A key is an ID of your module. It's used to identify your module and to set keys in all key-based extensions that module is associated (e.g. creating namespaced store). This key should be unique.

#### `store`

The entry point for Vuex.

- `modules` - array of Vuex modules to register under given keys
- `plugin` - you can provide your own Vuex plugin here

#### `router`

The entry point for vue-router. You can provide additional routes and [navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) here.

#### `beforeRegistration`

A function that'll be called before registering the module both on server and client side. You have access to VSF object here.

The `VSF` object is an instance of your Vue Storefront shop. It contains following properties 
````js
    Vue?: VueConstructor,
    config?: Object,
    store?: Store<RootState>,
    isServer?: boolean
````
#### `afterRegistration`

A function that'll be called after registering the module both on server and client side. You have access to VSF object here.

The `VSF` object is an instance of your Vue Storefront shop. It contains following properties 
````js
    Vue?: VueConstructor,
    config?: Object,
    store?: Store<RootState>,
    isServer?: boolean
````
### Module file structure

Below you can see recommended file structure for VS module. All of the core ones are organised in this way.
Try to have a similar file structure inside the ones that you create. If all the modules are implemented with a similar architecture, it'll be much easier to maintain and understand them. Please avoid unnecessary changes in design unless otherwise required so.

Not all of this folders and files should exist in every module. The only mandatory file is `index.ts` which is the entry point. The rest depends on your needs and module functionality.

You can take a look at [module template](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/module-template) with an example implementation of all features listed in config.

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

### Module registration

All modules including the core ones are registered in `src/modules/index.ts` file. Thanks to this approach you can easily modify any of core modules object before registration (read more [here](#extending-and-overriding-vue-storefront-modules)).

All VS modules from `registerModules` will be registered during the shop initialisation.

---

### General rules and good practices

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

Try to choose a method based on use cases. [This](https://github.com/DivanteLtd/vue-storefront/blob/develop/core/modules/mailchimp/components/Subscribe.ts#L28) is a good example of using callbacks.

5. Create pure functions that can be easily called with a different argument. Rely on `data` properties instead of arguments only if it's required (for example, they are validated as [here](https://github.com/DivanteLtd/vue-storefront/blob/develop/core/modules/mailchimp/components/Subscribe.ts#L28))
6. Make a document for exported components like as follows : [document](https://github.com/DivanteLtd/vue-storefront/blob/develop/core/modules/mailchimp/components/Subscribe.ts)
7. If your module core functionality is an integration with external service, better name it the same as this service (for example `mailchimp`)
8. Use named exports and type check.

### Adding new features as VS modules

- If you want to crete a new module, copy content from `src/module-template` and use the parts that you need.
- If you are creating a new feature, then note it's not merely extending currently existing one. If you are sure the feature you want to provide is completely new then it should be introduced as a new VS module.
- Provide unique key that should represent the feature or 3rd party system name (if the module is an integration)
- Try not to rely on data and logic from other modules if your module is not claimed to directly extend it. In doing so, it's guaranteed to remain working and easier to reuse even after extensive VS core updates.

### Extending and overriding Vue Storefront Modules

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

### Creating third party modules

If you want to create a third party module, just copy the `src/modules/module-template` raw code to your repo. Don't use any transpilation and build tools since it prevents proper tree shaking and optimization. A building process is handled by Vue Storefront build tools. A package name needs to start with `vsf-` prefix to be included into Vue Storefront build process.

### Contributions

Please introduce every new feature as a standalone, encapsulated module. We also need your help in rewriting Vue Storefront to modular approach - [here](https://github.com/DivanteLtd/vue-storefront/issues?q=is%3Aissue+is%3Aopen+label%3A%22API+Module%22) you can find tasks related to this architecture change and [here](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/refactoring-to-modules.md) is the tutorial on how to approach applying these changes.


## Cart module

This module contains all the logic, components and store related to cart operations.

### Components

#### AddToCart

This component represents a single button that when pressed adds a product to cart.

**Props**

- `product` - product that'll be added to cart

**Methods**

- `addToCart(product)` - adds passed product to the cart. By default correlates with `product` prop

#### Microcart

User cart with a products list and price summary.

**Computed**

- `productsInCart` - array of products that are currently in the cart
- `appliedCoupon` - return applied cart coupon or `false` if no coupon was applied
- `totals` - cart totals
- `isMicrocartOpen` - returns `true` if microcart is open

**Methods**

- `applyCoupon(code)` - applies cart coupon
- `removeCoupon` - removes currently applied cart coupon
- `toggleMicrocart` - open/close microcart

#### MicrocartButton

Component responsible for opening/closing Microcart

**Computed**

- `quantity` - number of products in cart

**Methods**

- `toggleMicrocart` - open/close microcart

#### Product

Component representing product in microcart. Allows to modify it's quantity or remove from cart.

**Computed**

- `thumbnail` - returns src of products thumbnail

**Methods**

- `removeFromCart` - removes current product (data property `product`) from cart
- `updateQuantity` - updates cart quantity for current product (data property `product`)

### Store

Cart Store is designed to handle all actions related the shopping cart.

#### State

```js
  state: {
    itemsAfterPlatformTotals: {},
    platformTotals: null,
    platformTotalSegments: null,
    cartIsLoaded: false,
    cartServerToken: '', // server side ID to synchronize with Backend (for example Magento)
    shipping: [],
    payment: [],
    cartItemsHash: '',
    bypassCount: 0,
    cartItems: [] // TODO: check if it's properly namespaced
  },
```

Cart state is automatically loaded from `localForage` collection after page has been loaded whenever `core/components/blocks/Microcart.vue` is included. The cart state is loaded by dispatching `cart/load` action and [stored automatically by any change to the cart state](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/index.js#L118).

The cart state data:

- `itemsAfterPlatformTotals` - helper collection, dictionary where the key is Magento cart item `item_id` that stores the totals information per item - received from Magento; it's automatically populated when `config.cart.synchronize_totals` is enabled;
- `platformTotals` - similarly to above item, here we have the full totals from Magento for the current shopping cart. These collections are populated by [`cart/syncTotals`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/actions.js#L49) and the event handler for [`servercart-after-totals`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L30)
- `cartIsLoaded` (bool) - true after dispatching `cart/load`
- `shipping` - (object) currently selected shipping method - only when NOT using `cart.synchronize_totals` (if so, the shipping and payment's data comes from Magento2),
- `payment` - (object) currently selected shipping method - only when NOT using `cart.synchronize_totals` (if so, the shipping and payment's data comes from Magento2),
- `cartItems` - collection of the cart items; the item format is the same as described in [ElasticSearch Data formats](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/ElasticSearch%20data%20formats.md) - the `product` class; the only difference is that the (int) `qty` field is added

#### Events

The following events are published from `cart` store:

- `EventBus.$emit('cart-after-itemchanged', { item: cartItem })` - executed after [`servercart-after-itemupdated`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L108) - after server cart sync, that signalize the specific shopping cart item has been changed; `Microcart/Product.vue` component is subscribed to this event to refresh the shopping cart UI
- `EventBus.$emit('cart-before-add', { product: item })` - fired after product has been added to the cart,
- `EventBus.$emit('cart-before-save', { items: state.cartItems })` - fired after the product cart has been saved,
- `EventBus.$emit('cart-before-delete', { items: state.cartItems })` - the event fired before the cart item is going to be deleted with the current cart state (before item is deleted)
- `EventBus.$emit('cart-after-delete', { items: state.cartItems })` - the event fired before the cart item has been deleted with the current cart state (after item is deleted)
- `EventBus.$emit('cart-before-itemchanged', { item: record })` - item called before the specific item properties are going to be changed; for example called when [`servercart-after-itemupdated`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L108) is going to change the `server_item_id` property
- `EventBus.$emit('cart-after-itemchanged', { item: record })` - item called after the specific item properites has been changed; for example called when [`servercart-after-itemupdated`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L108) is going to change the `server_item_id` property
- `EventBus.$emit('application-after-loaded')` - event called after `cart/load` action has been dispatched to notify that cart is being available,
- `EventBus.$emit('cart-after-updatetotals', { platformTotals: totals, platformTotalSegments: platformTotalSegments })` - event called after the totals from Magento has been synchronized with current state; it's going to be emitted only when `cart.synchronize_totals` option is enabled.

#### Actions

The cart store provides following public actions:

##### `disconnect (context)`

Helper method used to clear the current server cart id (used for cart synchronization)

##### `clear (context)`

This method is called after order has been placed to empty the `cartItems` collection and create the new server cart when the `cart.synchronize_totals` is set to true

##### `save (context)`

Method used to save the cart to the `localForage` browser collection

##### `sync (context, { forceClientState = false })`

This method is used to synchronize the current state of the cart items back and forth between server and current client state. When the `forceClientState` is set to false the communication is one-way only (client -> server). This action is called automatically on any shopping cart change when the `cart.synchronize` is set to true.

##### `syncTotals (context, { forceClientState = false })`

Method is called whenever the cart totals should have been synchronized with the server (after `serverPull`). This method overrides local shopping cart grand totals and specific item values (for example prices after discount).

##### `connect (context, { guestCart = false })`

Action is dispatched to create the server cart and store the cart id (for further synchronization)

##### `load (context)`

This method loads the cart items from `localForage` browser state management.

##### `getItem ({ commit, dispatch, state }, sku)`

This action is used for search the particular item in the shopping cart (by SKU)

##### `addItem ({ commit, dispatch, state }, { productToAdd, forceServerSilence = false })`

This action is used to add the `productToAdd` to the cart, if `config.cart.synchronize` is set to true the next action subsequently called will be `serverPull` to synchronize the cart. The event `cart-before-add` is called whenever new product lands in the shopping cart. The option `forceServerSilence` is used to bypass the server synchronization and it's used for example then the item is added during the ... sync process to avoid circular synchronization cycles.

##### `removeItem ({ commit, dispatch }, product)`

As you may imagine :) This action simply removes the product from the shopping cart and synchronizes the server cart when set. You must at least specify the `product.sku`.

##### `updateQuantity ({ commit, dispatch }, { product, qty, forceServerSilence = false })`

This method is called whenever user changes the quantity of product in the cart (called from `Microcart.vue`). The parameter `qty` is the new quantity of product and by using `forceServerSilence` you may control if the server cart synchronization is being executed or not.

##### `updateItem ({ commit }, { product })`

Updates item properties.

##### `syncPaymentMethods (context)`

Gets a list of payment methods from the backend and saves them to `cart.payment` store state.

##### `syncShippingMethods (context, address)`

Gets a list of shipping methods from the backend and saves them to `cart.shipping` store state. Country ID is passed to this method in a mandatory `address` parameter.

##### `syncTotals (context, methodsData)`

This method sends request to the backend to collect cart totals. It calls different backend endpoints depending on if payment and shipping methods information is available or not.

#### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

- `getCartToken` - get the current cart token, if empty it does mean we need to call an action `cart/connect` prior to sync with the server,
- `getLastSyncDate` - this is an integer, timestamp of the last shopping cart sync with the server
- `getLastTotalsSyncDate` - integer, timestamp of the last totals sync with the server,
- `getShippingMethod` - object, gets currently selected shipping method in the Checkout,
- `getPaymentMethod` - object, gets current payment method selected in the checkout,
- `getLastCartHash` - get the last saved hash/HMAC of the cart items + server token that let's you track the changes of the shipping cart. Hash is being saved by the server sync,
- `getCurrentCartHash` - get the current hash/HMAC of the cart items + server token. Coparing it to the `getLastCartHash` value let you know if we need a server sync or not,
- `isCartHashChanged` - comparing the `getLastCartHash` with the `getCurrentCartHash` in order to verify if we need a server sync or not,
- `isSyncRequired` - checking if the `isCartHashChanged` is true OR if this is the first sync attempt (after the SSR),
- `isTotalsSyncRequired` - same as `isSyncRequired` but for the totals (not the cart items),
- `isCartHashEmtpyOrChanged` - checks if `isCartHashChanged` or empty,
- `getCartItems` - array of products in the shopping cart,
- `isTotalsSyncEnabled` - check if the `config.cart.synchronize` is true + if we're online + if this is CSR request,
- `isCartConnected` - check if the `getCartToken` is not empty - which means the `cart/connect` action has been called and we're OK to sync with the server,
- `isCartSyncEnabled` - the same as `isTotalsSyncEnabled` but for totals (`config.cart.synchronize_totals` flag),
- `getTotals` - array with the total segments,
- `getItemsTotalQuantity` - get the sum of all the items in the shopping cart,
- `getCoupon` - get the currently applied discount code,


## User Module

This module contains all the logic, components and store related to the user account

### Components

#### AccountButton

A component to handle redirects to user account page and user logout. Usually used in header.

**Computed**

- `isLoggedIn` - represents if user is logged in;
- `user` - current user.

**Methods**

- `goToAccount` - is user is logged in, redirects user to account page. Otherwise shows sign-up modal
- `logout` - emits `user-before-logout` event and redirects user to home page

#### Login

**Methods**

- `close` - closes sign-up modal
- `callLogin` - starts authentication process with emitting `notification-progress-start`, calls `user/login` action with user's email and password.
- `switchElem` - triggers `setAuthElem` mutation with `register` parameter
- `callForgotPassword` - triggers `setAuthElem` mutation with `forgot-pass` parameter

#### Register

**Methods**

- `switchElem` - triggers `setAuthElem` mutation with `register` parameter
- `close` - closes sign-up modal
- `callRegister` - starts registration process with emitting `notification-progress-start`, calls `user/register` action with user's email, password, first name and last name.

#### UserAccount

**Methods**

- `onLoggedIn` - sets `currentUser` and `userCompany`. This method is called on `user-after-loggedin` bus event
- `edit` - sets `isEdited` flag to `true`
- `objectsEqual (a, b, excludedFields = [])` - checks if two passed objects are equal to each other
- `updateProfile` - updates user profile with new data. Calls a method `exitSection(null, updatedProfile)`
- `exitSection` - emits `myAccount-before-updateUser` bus event with updated user profile. Resets component user data to default values.
- `getUserCompany` - finds user company
- `getCountryName` - finds user country name

#### UserShippingDetails

**Methods**

- `onLoggedIn` - sets `currentUser` and `shippingDetails`. This method is called on `user-after-loggedin` bus event
- `edit` - sets `isEdited` flag to `true`
- `updateDetails` - updates shipping details with new data. Calls a method `updatedShippingDetails`
- `exitSection` - emits `myAccount-before-updateUser` bus event with updated shipping details. Resets component user data to default values
- `fillCompanyAddress` - finds shipping details
- `getCountryName` - finds country name
- `hasBillingAddres` - returns `true` if user has a billing address

### Store

User Store is designed to handle all actions related to the user account.
All user related data is stored in the original eCommerce CMS/Magento and the modifying actions are executed directly against the platform API.

#### State

```js
  state: {
    token: '',
    current: null
  },
```

The user state data:

- `token` - this is the current user token got from the [`user/login`](https://github.com/DivanteLtd/vue-storefront/blob/fabea12dd6ab4f8824b58812b0cfdabce94cde70/core/store/modules/user/actions.js#L64). It's used to authorize all subsequent calls with the current user identity. If this token is not empty it does mean that the user is authorized.
- `current` - this is the current user object received from [`user/me`](https://github.com/DivanteLtd/vue-storefront/blob/fabea12dd6ab4f8824b58812b0cfdabce94cde70/core/store/modules/user/actions.js#L105) - immediately called after the login action.

The user data format:

```json
{
  "code": 200,
  "result": {
    "id": 58,
    "group_id": 1,
    "default_billing": "62",
    "default_shipping": "48",
    "created_at": "2018-01-23 15:30:00",
    "updated_at": "2018-03-04 06:39:28",
    "created_in": "Default Store View",
    "email": "pkarwatka28@example.pl",
    "firstname": "Piotr",
    "lastname": "Karwatka",
    "store_id": 1,
    "website_id": 1,
    "addresses": [
      {
        "id": 48,
        "customer_id": 58,
        "region": {
          "region_code": null,
          "region": null,
          "region_id": 0
        },
        "region_id": 0,
        "country_id": "PL",
        "street": ["Street", "12"],
        "telephone": "",
        "postcode": "51-169",
        "city": "City",
        "firstname": "Piotr",
        "lastname": "Karwatka",
        "default_shipping": true
      },
      {
        "id": 62,
        "customer_id": 58,
        "region": {
          "region_code": null,
          "region": null,
          "region_id": 0
        },
        "region_id": 0,
        "country_id": "PL",
        "street": ["Street", "12"],
        "company": "example",
        "telephone": "",
        "postcode": "51-169",
        "city": "City",
        "firstname": "Piotr",
        "lastname": "Karwatka",
        "vat_id": "PL8951930748",
        "default_billing": true
      }
    ],
    "disable_auto_group_change": 0
  }
}
```

#### Events

The following events are published from `user` store:

- `EventBus.$emit('session-after-started')` - executed just [after the application has been loaded](https://github.com/DivanteLtd/vue-storefront/blob/fabea12dd6ab4f8824b58812b0cfdabce94cde70/core/store/modules/user/actions.js#L22) and the User UI session has started
- `EventBus.$emit('user-after-loggedin', res)` - executed after the successful [`user/me` action call](https://github.com/DivanteLtd/vue-storefront/blob/fabea12dd6ab4f8824b58812b0cfdabce94cde70/core/store/modules/user/actions.js#L123) - so the user has been authorized and the profile loaded

#### Actions

The user store provides the following public actions:

##### `startSession (context)`

Just to mark that the session is started and loading the current user token from the `localForage` - for the further usage.

##### `resetPassword (context, { email })`

Calls the `vue-storefront-api` endpoint to send the password reset link to specified `email` address

##### `login (context, { username, password })`

Called to login the user and receive the current token that can be used to authorize subsequent API calls. After user is successfully authorized the `user/me` action is dispatched to load the user profile data.

##### `register (context, { email, firstname, lastname, password })`

Registers the user account in the eCommerce platform / Magento.

##### `me (context, { refresh = true, useCache = true })`

Loads the user profile from eCommerce CMS; when `userCache` is set to true the result will be stored in the `localForage` and if it's stored before - returned from cache using the `fastest` strategy (network vs cache). If `refresh` is set to true - the user data will be pulled from the server despite the cached copy is available.

##### `update (context, userData)`

This action is used to update various user profile data. Please check the [user schema](https://github.com/DivanteLtd/vue-storefront/blob/master/core/store/modules/user/userProfile.schema.json) for the data format details.

##### `changePassword (context, passwordData)`

Tries to change the user password to `passwordData.newPassword`.

##### `logout (context)`

This is used to log out the user, close the session and clear the user token. Please notice - the current shopping cart is closed after this call.

#### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  isLoggedIn(state) {
    return state.current !== null;
  },
};
```


## Checkout Module

Checkout Module is designed to handle all logic related the checkout operations and UI.

### Components

#### CartSummary

This component displays the cart summary information

**Computed**

- `totals` - mapped getter to show the cart totals

#### OrderReview

A summary of the current order

**Props**

- `isActive` - boolean, required prop

**Methods**

- `placeOrder` - checks if current user has an account. If not, will trigger a `register` method, otherwise will emit `checkout-before-placeOrder` bus event
- `register` - dispatches a `user/register` action to register a new user

#### Payment

A component to handle payment operations

**Props**

- `isActive` - boolean, required prop

**Computed**

- `currentUser` - the current user mapped from application state
- `paymentMethods` - available payment methods mapped from `payment/paymentMethods` getter

**Methods**

- `sendDataToCheckout` - emits `checkout-after-paymentDetails` bus event and sets `isFilled` to `true`
- `edit` - checks `isFilled` and if it's `true`, emits a `checkout-before-edit` bus event
- `hasBillingData` - checks if current user exists and if it has `default_billing_ property
- `initializeBillingAddress` - checks if current user exists and if it has `default_billing` property; if so, populates the `payment` data property with current user address data
- `useShippingAddress` - populates the `payment` data property with `$store.state.checkout.shippingDetails`
- `useBillingAddress` - populates the `payment` data property with `currentUser.addressess`
- `useGenerateInvoice` - negates the `generateInvoice` value and if it becomes `false`, will reset `this.payment.company` and `this.payment.taxId`
- `getCountryName` - gets the country name for the current payment by the country code
- `getPaymentMethod` - gets the payment method title for the current payment by the payment method code
- `notInMethods` - checks if passed method is present in `paymentMethods`
- `changePaymentMethod` - resets the additional payment method component container if exists and emits `checkout-payment-method-changed` bus event

#### Personal Details

User's personal details component

**Props**

- `isActive` - boolean, required prop
- `focusedField` - a string showing which field is focused

**Computed**

- `currentUser` - the current user mapped from application state

**Methods**

- `onLoggedIn` - populates `personalDetails` with data passed as a parameter
- `sendDataToCheckout` - performs a check if an account is already created and emits `checkout-after-personalDetails` bus event
- `edit` - emits `checkout-before-edit` bus event
- `gotoAccount` - shows a sign-up modal

#### Product

The component representing a product

**Props**

- `product` - current product

**Computed**

- `thumbnail` - returns a thumbnail for product image

**Methods**

- `onProductChanged` - checks `event.item.sku` and if it's equal to `product.sku`, the force update will be triggered

#### Shipping

Component handling all the shipping logic

**Props**

- `isActive` - boolean, required prop

**Computed**

- `currentUser` - the current user mapped from application state
- `shippingMethods` - available payment methods mapped from `payment/paymentMethods` getter
- `checkoutShippingDetails` - mapped from `state.checkout.shippingDetails`
- `paymentMethod` - mapped from `state.payment.methods`

**Methods**

- `onAfterShippingSet` - populates the `shipping` data property with a passed parameter
- `onAfterPersonalDetail` - checks `isFilled` data property and if it's false, dispatches `checkout/updatePropValue` with user's first and last names
- `sendDataToCheckout` - emits `checkout-after-shippingDetails` bus event; sets `isFilled` to `true`
- `edit` - is `isFilled` is true, emits `checkout-before-edit` bus event and sets `isFilled` to `false`
- `hasShippingDetails` - checks, if `currentUser` exists and has a property `default_shipping`; if so, populates `myAddressDetails` data property with `currentUser.addresses`
- `useMyAddress` - checks `shipToMyAddress`; if `true`, populates `shipping` data property with `myAddressDetails`
- `getShippingMethod` - gets the shipping method from `shippingMethods` data property
- `getCountryName` - gets country name with country code
- `changeCountry` - emits `checkout-before-shippingMethods` bus event
- `getCurrentShippingMethod` - calculates a current shipping method with shipping method code
- `changeShippingMethod` - if `getCurrentShippingMethod` exists, emits `checkout-after-shippingMethodChanged` bus event
- `notInMethods` - checks if passed method is present in `shippingMethods`

### How to add a custom checkout step

We now show an example of how to add a new step to the checkout page of Vue Storefront.

The step is named `NewStep` and is placed just after the `PersonalDetails` step; changing the step's name and position requires small modifications to the procedure.

#### First, create the NewStep component

1. **Create the NewStep component** according to your needs. To do it quickly, make a copy of the `PersonalDetails` component, name it `NewStep` and customize it.

2. **Customize the sendDataToCheckout method** of the `NewStep` component so that it emits the event `checkout-after-newStep`; for example:
```javascript
    sendDataToCheckout () {
      this.$bus.$emit('checkout-after-newStep', this.newStep, this.$v)
    }
```

3. **Call the sendDataToCheckout method** when the button to the next section is clicked. This could be achieved in the template like this:
```vue
    <button-full
      @click.native="sendDataToCheckout"
    >
```

#### Then, modify the checkout component

1. **Insert the NewStep component in the checkout template** at the desired position. For example, you could place it between the Personal Details and Shipping steps:
```vue
  <personal-details class="line relative" :is-active="activeSection.personalDetails" :focused-field="focusedField"/>
  <new-step class="line relative" :is-active="activeSection.newStep">
  <shipping class="line relative" :is-active="activeSection.shipping" v-if="!isVirtualCart"/>
  <payment class="line relative" :is-active="activeSection.payment"/>
  <order-review class="line relative" :is-active="activeSection.orderReview"/>
```

2. **Listen for the checkout-after-newStep event** by adding the following listener to the `beforeMount()` function:
```javascript
    this.$bus.$on('checkout-after-newStep', this.onAfterNewStep)
```

3. **Specify how to jump from the previous step to NewStep**. Modify the `onAfterPersonalDetails()` method in order to activate the `newStep` section instead of the `shipping` step:
```javascript
    onAfterPersonalDetails (receivedData, validationResult) {
      this.personalDetails = receivedData
      this.validationResults.personalDetails = validationResult
      this.activateSection('newStep') // show the new step
      this.savePersonalDetails()
      this.focusedField = null
    }
```
This is assuming that the new checkout step follows the Personal Details step; if this is not the case, you will need to modify the `onAfter` metod of whatever step precedes `NewStep`.

4. **Specify how to jump from NewStep to the next step** by creating the method `onAfterNewStep`; in this example, the next step is the shipping form:
```javascript
    onAfterNewStep (receivedData, validationResult) {
      this.newStep = receivedData
      this.validationResults.newStep = validationResult
      this.activateSection('shipping') // change 'shipping' to whatever you want the next step to be
      this.saveNewStep() // include this line only if newStep has state
    }
```
Note that calling `activateSection('shipping')` is what ultimately shows the next checkout step to the user.

5. **If needed, save NewStep state** by defining a non-empty method `saveNewStep()`; for example:
```javascript
    saveNewStep () {
      this.$store.dispatch('checkout/saveNewStep', this.newStep)
    },
```
This is needed only if your new step has state, in which case you will also need to define the `checkout/saveNewStep` action in Vuex.


### Store

The Checkout Store is designed to handle the passage from user's cart to actual order; it defines actions such as saving the information given by the user during checkout, and placing the order.

#### State

```js
  state: {
    order: {},
    personalDetails: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      createAccount: false
    },
    shippingDetails: {
      firstName: '',
      lastName: '',
      country: '',
      streetAddress: '',
      apartmentNumber: '',
      city: '',
      state: '',
      region_id: 0,
      zipCode: '',
      phoneNumber: '',
      shippingMethod: ''
    },
    paymentDetails: {
      firstName: '',
      lastName: '',
      company: '',
      country: '',
      streetAddress: '',
      apartmentNumber: '',
      city: '',
      state: '',
      region_id: 0,
      zipCode: '',
      phoneNumber: '',
      taxId: '',
      paymentMethod: '',
      paymentMethodAdditional: {}
    },
    isThankYouPage: false,
    modifiedAt: 0
  }
```

The state of the Checkout module contains both the [Order object](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json) and the information given by the user during the checkout process, to be stored for further use in the `localForage`.

The state is modified by [`placeOrder`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/store/modules/checkout/actions.js#L11) action and [`load`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/store/modules/checkout/actions.js#L41) which loads the state from browser database.

The category state data:

- `order` - this is the last order to be placed, the [schema is defined](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json) in Ajv compliant format
- `shippingDetails`, `paymentDetails` - the address information provided by the user during the [Checkout](https://github.com/DivanteLtd/vue-storefront/blob/master/core/pages/Checkout.vue).

#### Actions

The cart store provides following public actions:

##### `placeOrder (context, { order })`

Action called by `Checkout.vue` to complete the order. Data object is validated against the [order schema](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json), stored within the `localForage` collection by subseqent call of [`order/placeOrder`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/store/modules/order/actions.js#L12)

##### `savePersonalDetails ({ commit }, personalDetails)`

Stores the personal Details (the format is exactly the same as this store `state.personalDetails`) for later use in the browser's storage

##### `saveShippingDetails ({ commit }, shippingDetails)`

Stores the shipping Details (the format is exactly the same as this store `state.shippingDetails`) for later use in the browser's storage

##### `savePaymentDetails ({ commit }, paymentDetails)`

Stores the payment Details (the format is exactly the same as this store `state.paymentDetails`) for later use in the browser's storage

##### `load ({ commit })`

Load the current state from the `localForage`


## Order module

This module contains all the logic, components and store related to order operations.

### Components

#### UserOrder

**Computed**

- `ordersHistory` - maps the value from `state.user.orders_history.items`
- `isHistoryEmpty` - checks if `state.user.orders_history.items` array is empty

**Methods**

- `reorder (products)` - iterates through passed 'products' array, adding each item to cart
- `skipGrouped (items)` - filters passed 'items' array returning only items without `parent_id`

#### UserSingleOrder

**Computed**

- `ordersHistory` - maps the value from `state.user.orders_history.items`
- `order` - finds the order in the `orderHistory` computed property with an id matching to route `orderId` parameter
- `paymentMethod` - returns `payment.additional_information[0]` from the `order` computed property
- `billingAddress` - returns `billing_address` from the `order` computed property
- `shippingAddress` - returns `extension_attributes.shipping_assignments[0].shipping.address` from the `order` computed property

**Methods**

- `remakeOrder (items)` - iterates through passed 'items' array, adding each item to cart as a single product
- `skipGrouped (items)` - filters passed 'items' array returning only items without `parent_id`

### Store

Order store is very simple, used just to pass the current order to the backend service.

### Actions

The order store provides following public actions:

#### `placeOrder ({ commit }, order)`

The order object is queued in the local, indexedDb `ordersCollection` to be sent to the server.
Please take a look at the [Working with data](../data/data.md) for the details about data formats and how does `localForage` is being used in this project.


## Catalog module

Catalog module is a big one combining all the logic, components and store for attribute, category, product, stock and tax operations

### Components

### Store

#### Attribute Store

Attribute Store is designed to handle all actions related to the attributes management

##### State

```js
  state: {
    list_by_code: {},
    list_by_id: {},
    labels: {}
  },
```

As we're using the attributes dictionary for the product management in a very similar way Magento does ([EAV model](http://www.xpertdeveloper.com/2010/10/what-is-eav-model-in-magento/)) we're operating on the attributes, attribute types and dictionaries.

Attributes are **explicitly** loaded by the user by calling the `attribute/list` method. For example, when you're going to work with customizable attributes of the product or to work on variants you need to prefetch the attributes metadata:

```js
this.$store.dispatch('attribute/list', {
  filterValues: [true],
  filterField: 'is_user_defined',
});
```

This is example from [product compare feature](https://github.com/DivanteLtd/vue-storefront/blob/c954b96f6633a201e10bed1d2e4c0def1aeb3071/core/pages/Compare.vue).

The attribute state data:

- `list_by_code` - this is a dictionary where you can get the specific attribute by just accessing the `list_by_code['color']` etc.
- `list_by_id` - this is a dictionary where you can get the specific attribute by just accessing the `list_by_id[123]` etc.
- `labels` - the preloaded labels of attribute values (the V in EAV)

##### Actions

The attribute store provides following public actions:

**`list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0 })`**

This method is used to load the attributes metadata. `filterValues` is an array of multiple values like: `['color', 'size']` and the `filterField` is the attribute field to compare the `filterValues` against. Usually is a `attribute_code` or `attribute_id`. The `size` and `start` are just used to limit the list.

##### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
export default {
  attributeListByCode: state => state.list_by_code,
  attributeListById: state => state.list_by_id,
};
```

#### Category Store

Category Store is designed to handle all actions related the categories data.

This module works pretty tightly with Elastic Search and operates on the [Product data format](../data/elasticsearch.md)

##### State

```js
const state = {
  list: [],
  current: {},
  filters: { color: [], size: [], price: [] },
  breadcrumbs: { routes: [] },
  current_path: [], // list of categories from root to current
};
```

Category state is generally populated by just two methods [list](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L38) and [single](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L70) and cleared to the defaults by [reset](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L28)

:::tip Note
The action `category/single` uses `localForage` cache only - no ElasticSearch data store directly; because of this optimization, please do download the categories list by dispatching `category/list` at first.
:::

The category state data:

- `breadcrumbs` - this is the list of routes used by the [Breadcrumbs component](https://github.com/DivanteLtd/vue-storefront/blob/master/core/components/Breadcrumbs.js)
- `current` - this is the current category object,
- `filters` is a current state of the category filters - dictionary of selected variant attributes; for example it contains dictionary of selected product attributes:

```json
{
  "color": 123,
  "size": 24
}
```

Please note, that we're using the Magento like EAV attributes structure - so the values here are an attribute value indexes not the values itself. Please take a look at [Data formats](../data/elasticsearch.md) for a reference

- `current_path` - this is the list of category objects: from current category to the top level root,

##### Events

The following events are published from `category` store:

- `EventBus.$emit('category-after-single', { category: mainCategory })` - from [category/single](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L70) after single category is loaded,
- `EventBus.$emit('category-after-current', { category: category })` - after current category has been changed - this is subsequent call of `category/single` action,
- `EventBus.$emit('category-after-reset', { })` - after category has been reset (for example in the process of moving from one category page to another)
- `EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })` - this event emits the current category list as it's returned by `category/list`.

##### Actions

The cart store provides following public actions:

**`list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc' })`**

This is the key method to load the category list. It returns the `Promise` that contains the product list object. This method should be used everywhere you need to get products data.

**`single (context, { key, value, setCurrentCategory = true, setCurrentCategoryPath = true })`**

This method gets the single category from `localForage`.

:::warning Important
To make this method work you should call `category/list` before. This category works only on localFotage and cannot access ElasticSearch directly
:::

:::warning Important
This method synchronizes products for offline usage by: storing the whole query results object into `localForage` and by caching each category individually (to be used on the Product page for example)
:::

This method emits category list as `EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })`

- `parent` - `category` object to load the subcategories only

- `start`, `size` - both parameters are used for paging; start is the starting index; size is a page size

- `onlyActive` - (bool) load only the categories marked as active in CMS (for example in Magento)

- `sort` - category attribute using to sort, this field must be mapped in ElasticSearch as a numeric field

- `onlyNotEmpty` - (bool) load only the categories that contain any products

##### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  current: state => state.current,
  list: state => state.list,
};
```

#### Product Store

Product Store is designed to handle all actions related the product data. It's responsible for loading the list of products or a single product as well as configuring the configurable products and managing the products attachments.

This module works pretty tightly with Elastic Search and operates on the [Product data format](../data/elasticsearch.md)

##### State

```js
const state = {
  breadcrumbs: { routes: [] },
  current: null, // shown product
  current_options: { color: [], size: [] },
  current_configuration: {},
  parent: null,
  list: [],
  original: null, // default, not configured product
  related: {},
};
```

Product state is generally populated by just two methods [list](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L395) and [single](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L428) and cleared to the defaults by [reset](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L215)

The product state data:

- `breadcrumbs` - this is the list of routes used by the [Breadcrumbs component](https://github.com/DivanteLtd/vue-storefront/blob/master/core/components/Breadcrumbs.js)
- `current` - this is the product object with selected `configurable_children` variant - so it's the base product with attributes overridden by the values from selected `configurable_children` variant; it's used on [Product.vue page](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/pages/Product.vue#L203) this is the product which is added to the cart after "Add to cart"
- `current_options` - it's a list used to populate the variant selector on the [Product.vue page](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/themes/default/pages/Product.vue#L56) it contains dictionary of attributes x possible attribute values and labels and it's populated by [setupVariants](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L344) based on the `configurable_children` property
- `current_configuration` is a current product configuration - dictionary of selected variant attributes; for example it contains dictionary of selected product attributes:

```json
{
  "color": 123,
  "size": 24
}
```

Please note, that we're using the Magento like EAV attributes structure - so the values here are an attribute value indexes not the values itself. Please take a look at [Data formats](../data/elasticsearch.md) for a reference

- `parent` - if the current product is a `type_id="single"` then in this variable the parent, `configurable` product is stored. This data is populated only on `Product.vue` by [checkConfigurableParent](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L323)
- `list` - this is an Array of products loaded by [list](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L395)
- `original` - used only for `configurable` products; this is the base product with no variant selected
- `related` - this is dictionary of related products; set outside this store (for [example here](https://github.com/DivanteLtd/vue-storefront/blob/master/src/themes/default/components/core/blocks/Product/Related.vue)) by calling and [related action](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L528)

##### Events

The following events are published from `product` store:

- `EventBus.$emit('product-after-priceupdate', product)` - from [syncProductPrice](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L33) after product price is synced with Magento;
- `EventBus.$emit('product-after-configure', { product: product, configuration: configuration, selectedVariant: selectedVariant })` from `configureProductAsync` (called by `product/configure` action after `product/single`). This event provides the information about selected product variant on the product page
- `EventBus.$emit('product-after-list', { query: query, start: start, size: size, sort: sort, entityType: entityType, result: resp })` - this event emits the current product list as it's returned by `product/list` providing the current filters etc. You can mark specific product list identifier by setting `meta` property; it's important because on single page this event can be executed multiple time for each individual block of products
- `EventBus.$emit('product-after-single', { key: key, options: options, product: cachedProduct })` - after single product has been loaded (invoked by `product/single` action)
- `EventBus.$emit('product-after-related', { key: key, items: items })` - invoked whenever the related products block is set for the current product; the key is the name of the related block and items are related products
- `EventBus.$emit('product-after-original', { original: product })` - invoked by `product/single` whenever product has been loaded
- `EventBus.$emit('product-after-parent', { parent: product })` - invoked externally by `product/checkConfigurableParent` provides the current single product configurable parent
- `EventBus.$emit('product-after-reset', { })` - after product has been reseted (for example in the process of moving from one product page to another)

##### Actions

The product store provides following public actions:

**`setupBreadcrumbs (context, { product })`**

This method is in charge of setting `state.breadcrumbs` to be used on `Product.vue` page. It's called from `Product.vue:fetchData`. The `product` parameter is a [ElasticSearch product object](../data/elasticsearch.md)

**`syncPlatformPricesOver(context, { skus })`**

When the config option `products.alwaysSyncPlatformPricesOver` is on, Vue Storefront will request the current product prices each time when `product/single` or `product/list` action is dispatched. It's called exclusively by these actions and shouldn't be called manually. This method calls `vue-storefront-api` proxy to get the current prices from Magento or any other backend CMS.

`skus` - this is an Array with product SKU's to be synchronized

**`setupAssociated (context, { product })`**

This method is called as a subsequent call of `Product.vue:fetchData` or `product/list` action. It's used to get the child products of `grouped` or `bundle` types of products.

**`checkConfigurableParent (context, {product})`**

This method is called by `Product.vue:fetchData` to check if current, simple product has got an configurable parent. If so the redirect is being made to the parent product. It's a fix for [#508](https://github.com/DivanteLtd/vue-storefront/issues/508)

**`setupVariants (context, { product })`**

This method is subsequently called by `Product.vue:fetchData` to load all configurable attributes defined in `product.configurable_options` and then to populate `state.current_configuration` and `state.current_options`. The main usage of this action is to prepare product to be configured by the user on the product page and to display the product configurator UI properly

**`list (context, { query, start = 0, size = 50, entityType = 'product', sort = '', cacheByKey = 'sku', prefetchGroupProducts = true, updateState = true, meta = {} })`**

This is the key method to load the product list. It returns the `Promise` that contains the product list object. This method should be used everywhere you need to get products data. When `config.tax.calculateServerSide=false` this method runs product taxes calculator and synchronizes prices with Magento if it's required.

This method emits product list as `EventBus.$emit('product-after-list', { query: query, start: start, size: size, sort: sort, entityType: entityType, meta: meta, result: resp })`

:::warning Important
This method synchronizes products for offline usage by: storing the whole query results object into `localForage` and by caching each product individually (to be used on the Product page for example)
:::

- `query` - this is the `bodybuilder` ElasticSearch query (please check `bodybuilder` package or for example `Home.vue` for a reference how to use it)

- `start`, `size` - both parameters are used for paging; start is the starting index; size is a page size

- `entityType` - by default it's of course set to `product` and it's mapped to ElasticSearch entity class

- `sort` - product attribute using to sort, this field must be mapped in ElasticSearch as a numeric field

- `prefetchGroupProducts` - by default it's set to true and causes `setupAssociated` action to be dispatched to get all the associated products

- `updateState` - if you set this to false, the `state.list` will not be updated - just the products will be returned

- `meta` - this is an optional attribute which is returned with `product-after-list` event; it can be used for example to mark any specific ES call.

**`single (context, { options, setCurrentProduct = true, selectDefaultVariant = true, key = 'sku' })`**

This method subsequently dispatched `product/list` action to get the products and synchronize the taxes/prices. When the product has been recently downloaded via `product/list` this method will return the cached version from `localForage` - but update the cache anyway.

**`configure (context, { product = null, configuration, selectDefaultVariant = true })`**

This action is used to configure the `configurable` product with specified attributes. It gets the `configuration` object which should have the following format: `{ attribute_code: attribute_value_id }` and finds the `product.configurable_children` item which complies to this configuration. Then it merges this specific `configurable_child` with product itself - for example setting the product.price to the configurable price, color, size etc. The method is used on: `Product.vue` page for allowing user to select color, size etc. The second usage for it is on `Category.vue` page - after user selects some filters, the resulting products are configured to display the proper images (related to selected color and size) and prices.

If `selectDefaultVariant` is set to true (default), the `state.current` will be altered with configured product.

**`setCurrent (context, productVariant)`**

Auxiliary method just to set `state.current` to productVariant

**`setOriginal (context, originalProduct)`**

Auxiliary method just to set `state.original` to originalProduct

**`related (context, { key = 'related-products', items })`**

Alters `state.related` dictionary to set specific list of related products to be displayed on `Product.vue` page (`RelatedProducts` component is used for this)

##### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  productParent: state => state.parent,
  productCurrent: state => state.current,
  currentConfiguration: state => state.current_configuration,
  productOriginal: state => state.original,
  currentOptions: state => state.current_options,
  breadcrumbs: state => state.breadcrumbs,
};
```

#### Stock Store

Stock Store is designed to handle stock quantity checks.

##### Events

The following events are published from `stock` store:

- `stock-after-check` - emitted just after the stock item has been received from eCommerce backend / Magento

##### Actions

The cart store provides following public actions:

**`check (context, { product, qty = 1 })`**

Check if the `product` can be added to the shopping cart with a given quantity.

The resulting promise is expanded to the following object:

```js
{
  qty: 100,
  status: 'ok', // another option is: 'out_of_stock'
  onlineCheckTaskId: 14241
}
```

#### Tax Store

### Helpers

#### optionLabel

Used to get the Label for specific `optionId`. For example, when the user filters products and uses the 165 attribute_value we can call `optionLabel( { attributeKey: 'color', optionId: 165 })` to get back 'Red' label.

