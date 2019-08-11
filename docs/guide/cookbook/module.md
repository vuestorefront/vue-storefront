# Chapter 5. Building a Module from scratch 
<style>
    img[alt*="borderline"] {
        border: 1px #000 solid;
    }
</style>

In this chapter, we are going to cover : 
[[toc]]

## 0. Introduction
Modular approach to a system is often considered an implementation of the traditional engineering concept [*High cohesion with low coupling*](https://stackoverflow.com/questions/14000762/what-does-low-in-coupling-and-high-in-cohesion-mean). By this we mean, one may ***extend*** a logic of others without breaking a flow of the original. **Vue Storefront** also employs the concept in order to secure 3rd party developers' happiness. This chapter opens up the belly of new **Vue Storefront** module structure for you as of *1.11* release. 
<br />
<br />

## 1. How to bootstrap a module
If the open source authors are serious about their offspring, one must admit it's impossible to take care of all the details to all the use cases out in the wild. So the creator should expose joint point of core parts so that 3rd party developers may inject their wild logics into the working machine when they need it. Now lo and behold, jungles conquered. 

When you want to tweak any open source for whatever reason needed to make it more fantastic, first thing you need to look for is *modules* within the code base. You may name *API*, *hooks* or *observers* for the same matter, but *module* basically represents all of them in one place in design.  

In this recipe, we are going to cover how we bootstrap a module in its bare minimum in order to inject our logic into the machine. *Tarzans, follow!*

### 1. Preparation
- You need [**Vue Storefront**](https://github.com/DivanteLtd/vue-storefront) instance [installed along with other infrastructure ](setup.html#_1-install-with-docker) on your machine to build a new module and test it working. 
- You need a development editor of your choice for your own convenience.

### 2. Recipe
1. Create a folder under `./src/modules/example-module` from your **Vue Storefront** root path. 
```bash
cd src/modules
mkdir example-module && cd example-module
```

2. Create `index.ts` file in the directory 
```bash
touch index.ts
```

3. Open that file and write down the minimum signature of a module 
```bash
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

export const ExampleModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {

}
```
We export _ExampleModule_ here implementing _StorefrontModule_ interface.

:::tip LOOK INSIDE
From `./core/lib/modules.ts`, you can check out _StorefrontModule_ signature as follows : 
```bash
export interface StorefrontModule { (
  app: any, # app instance (Vue instance)
  store: Store<any>, # Vuex store instance
  router: VueRouter, # router instance
  moduleConfig: any, # module config during registration
  appConfig: any): void # VSF config
}
```
Judging by this signature, you can access `store`, `router`, `config`s from your module. 
:::

4. _(Optional)_ Add a comment in order to figure out when it's registered later :
```bash
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

export const ExampleModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
	console.log('Hello World and VSF!'); # Any punch line allowed!
}
```

5. Go to parent directory (`./src/modules`) and open `index.ts` file as follows :
```bash
cd ..
vi index.ts # here you can use another editor for sure instead of vi
```
This file is where you can register any module you create. Now here insert registration for the module we just created as follows : 
```ts
/* ... abridged */

import { PaymentCashOnDeliveryModule } from './payment-cash-on-delivery';
import { InstantCheckoutModule } from './instant-checkout'
import { ExampleModule } from './example-module' /* Import Example module we just created */

import { registerModule } from '@vue-storefront/core/lib/modules'

export function registerNewModules () {
  registerModule(UrlModule)
  registerModule(CatalogModule)
  registerModule(CheckoutModule) 

/* ... abridged ... */

  registerModule(PaymentCashOnDeliveryModule) 
  registerModule(AmpRendererModule)
  registerModule(InstantCheckoutModule) 
  
  registerModule(ExampleModule) // Register Example module we just created
}
```

:::tip NOTE 
You are free to choose to register your module here as other modules do, or register anywhere anytime else you want it, which is possible due to _lazy loading_ or aka dynamic loading. With _lazy loading_, however, you may not be able to access some hooks such as `onAppInit` because they are not lazy. (meaning only fired during app initialization)
:::

6. Run the command at **Vue Storefront** root path to bootstrap **Vue Storefront** app
```bash 
docker-compose up 
```
or without `docker`
```bash 
yarn dev
```

Once the app is up and running, it will spit out tons of logs indicating the jobs done. Open your eyes wide and if you are lucky, you will pick lines similar to as follows from super fast scrolling : 
```bash
# ... abridged 

app_1  | [GTM] Google Tag Manager extensions is not working. Ensure Google Tag Manager container ID is defined in config null
app_1  | Hello World and VSF! # YAY! now we know it's successfully registered
app_1  | [module] VS Modules registration finished. { succesfulyRegistered: '0 / 0', registrationOrder: [] }
app_1  | Entity cache is enabled for productList null

# abridged ...
```

### 3. Peep into the kitchen (what happens internally)
We have created a module with only a few simple steps and registered it  successfully. Even though it's doing nothing practically, it was enough to grab the concept in design, and helped you transform into a module developer which is great. 

We built our `module` house in the territory of `./src/modules`. We created the door named `index.ts` where all the module parts are assembled and exported, although we skipped building module parts for the sake of brevity, which we will look inside more in detail later. Instead what we created in `index.ts` was bare minimum skeleton required to build a module and declare it's a module. 

Here `index.ts` uncovers a module is basically a function with access to certain parts of Vue app instance and allows to interact with it. Additionally achieved is a better versatility thanks to `helpers` and `hooks` along with it. 

If you take a look a little deeper, you will arrive at `./core/lib/modules.ts` where module signature and `registerModule` function along with `injectReferences` function take up seats. `registerModule` is the hard worker who works in `src/modules/index.ts` to register modules pushing individuals into `registeredModules`. (Beware the small difference in those names as in `registerModule`, `registeredModules`, `registerModules` and so on, might be confusing if you skim it, but they are correct and appropriate in its own role with matching names) 

Take one step further to `./core/app.ts`, you will also notice `injectReferences` helping your module directly work with `store`, `router` and `config` of **VueStorefront** app instance. With this approach our module development experience is much straight-forward and *Vue native API* friendly so that code becomes simpler, cleaner and maintainable. 

Now you are officially a **Vue Storefront module developer**. Congratulation!

### 4. Chef's secret (protip)
#### Secret 1. Lazy loading your module where you want it

#### Secret 2. How a module can be leveraged to build extensions or integrations with. 

#### Secret 3. On the border of modularity

<br />
<br />

## 2. Best practices for tweaking a module
Once you got the hang of building a skeleton for modules, now it's time for working a real deal with modules. There are tons of opportunities here with freedom of building new modules powered by variety of methods available being mainly in a sense with working, extending and hooking to Vue's main parts. 

In this recipe, we walk through steps to building a simple module for _Like button in product page_. This recipe browses a brief concept of each topic for the demonstration purpose. The full details for building the module continues at [Recipe 7. Building a module from A to Z](#_7-building-a-module-from-a-to-z-in-an-iteration)
### 1. Preparation
- You need a new module to play with. You would already have had one if you finished [_Recipe 1. How to bootstrap a module_](#_1-how-to-bootstrap-a-module)

### 2-1. Recipe A (Extend Vuex store from inside a module)
_Vue Storefront_ takes advantage of _Vuex_'s `module` feature. You can encapsulate your module's data from global scope so that control over your data is secured easily within your grasp. 

1. Open the `index.ts` file of `example-module` at `./src/modules/example-module`

```bash
cd src/modules/example-module
vi index.ts # of course you can open it with other editors!
```

2. Prepare a store for the module as follows : 
```ts{3-8}
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

const exampleModuleStore = {
  namespaced: true,
  state: {
    key: null
  }
}

export const ExampleModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
// abridged ...
```
`namespaced` with `true` value means this `store` is encapsulated inside a module and not registered to global store.

`state` contains data object you want to track. 

3. Register this `store` to app's `store` with `registerModule` :
```ts{11}
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

const exampleModuleStore = {
  namespaced: true,
  state: {
    key: null
  }
}

export const ExampleModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('example-module', exampleModuleStore);
}

```
`registerModule` method is a Vue native API to dynamically register a store for each module. _Vue Storefront Module_ uses this method for data store so that module data is encapsulated from global scope. [more info](https://vuex.vuejs.org/guide/modules.html#dynamic-module-registration)

Consider the `store` as a _Model_ in plain MVC model.

4. You can add Vuex `plugins` to your store. 
```ts{3-9,16}
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

const examplePlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'PRESSED_LIKE') {
      console.log('Customer pressed LIKE button on the product');
    }
  })
}

const exampleModuleStore = {
  namespaced: true,
  state: {
    key: null
  },
  plugins: ['examplePlugin']
}

export const ExampleModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('example-module', exampleModuleStore);
}
```
`plugins` are handy when you want to _plug in_ an event to `mutation` of `state`. 

`mutation` is an object that contains `type` and `payload`. By checking `mutation` type, you can listen to the certain type of state changes. [more info](https://vuex.vuejs.org/guide/plugins.html)

You can also listen not only to `mutations` but also to `actions` as follows : 
```js
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})
```
It also provides `before` and `after` decorator to when the `plugin` should be fired of the event. (available since `3.1.0`) [more info](https://vuex.vuejs.org/api/#subscribeaction)


### 2-2. Recipe B (Override Vuex store with `extendStore`)
_Vue Storefront_ people came up with the idea to ___help___ module developers easily extend the module already registered with the same name. 

1. Open the `index.ts` file of `example-module` again at `./src/modules/example-module`
```bash
cd src/modules/example-module
vi index.ts # of course you can open it with other editors!
```

2. Import `helpers` of core as follows : 
```ts{1}
import { extendStore, isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

const examplePlugin = store => {
// abridged ...
```

3. Add an additional `product` store 
```ts{5-9}
// ... abridged
  plugins: ['examplePlugin']
}

const newProductModule = {
  state: {
    liked: false
  }
}

export const ExampleModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
// abridged ...
```

4. Run `extendStore` helper method to override or add to existing store `product` as follows : 
```ts{4}
export const ExampleModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('example-module', exampleModuleStore);

  extendStore('product', newProductModule);
}
```

5. In order to confirm it's successfully extended, we use [Vue.js Chrome extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) which really comes in handy when you develop _Vue.js_ application. 

Open _Chrome DevTools_ and go to _Vue_ tab, and click _Vuex_ tab or click `ctrl` + `2`. Finally click _Register module : product_, then you will see a screen like as follows confirming `product` store has been extended successfully : 

![product_liked_borderline](../images/product_like_state.png)

:::tip TIP
You may use _Firefox Vuejs extension_ if you like it. 
Install [Firefox Vuejs extension](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

:::


### 2-3. Recipe C (Extend router instance)

### 2-4. Recipe D (Use hooks)

### 2-5. Recipe E (Manage module-level `config`)

### 2-6. Recipe F (Manage app-level `config`)

### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 3. Hooking into hooks

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 4. On configuration

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />


## 5. Packaging a module

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 6. Anti-patterns & Common pitfalls

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />


## Sidedish - Ideation

When you have an idea to build a great module, it means you have a brilliant idea in the first place to start with. How does it come anyway? Is it a spontaneous process or can we work elaborately on it to train ideation from its conception to delivery? I want to say _Yes_ to both, please follow me to see what I have to offer in this _sidedish_ talk session. 

_[INSERT VIDEO HERE]_
<br />
<br />

## 7. Building a module from A to Z in an iteration

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 8. Deprecated legacy of Modules
In this recipe, we will take a review of how to deal with modules in an old fashioned way , just in case you really need it. 

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />


## 9. Converting old modules to new modules 
There are useful modules out there already developed in the old way.

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />