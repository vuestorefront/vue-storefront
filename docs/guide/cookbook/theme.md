# Ch 6. Theming in depth
<style>
    img[alt*="borderline"] {
        border: 1px #000 solid;
    }
</style>
In this chapter, we are going to cover : 
[[toc]]


## 0. Introduction
Theme is what customers get first impression from your shop. You will be majorly discouraged if your customers underestimate your shop by looks and feels of the first impression due to poorly designed theme when you had pearls and golds in value for your customers on your shop. Great products, meticulously calibrated technology backing your store, are abysmally depreciated which impact your sales in result. We are here to help you get away with such disasters by guiding you in wrapping your head around how to deal with `theme` in _Vue Storefront_ context. Are you ready? a _Picaso_?


## 1. Start building your own theme
### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />
<br />

## 2. How to upgrade theme one from another
When you are already running your _Vue Storefront_ shop on production, chances are that you have made at least a few changes for your _theme_ even if you don't have developers resource. Hope you have made such changes to your child theme based on `default` theme so that normal upgrade won't make a huge impact in negative way for your shop. 

Sometimes, however, an upgrade so huge that you can't make a smooth conversion from one to another may take place. Helping you in such a case keep headaches at bay, we will show you the example where `1.10` to `1.11` upgrade affects how a theme works and fix broken pieces. 

This recipe helps you resolve errors you encounter after the upgrade as short a route as possible. There would be more warnings and small leftovers within your theme. To make a complete overhaul, look for [Migration from 1.10 to 11]() 

### 1. Preparation
 - You have a [Vue Storefront App running](/guide/cookbook/setup.html#_0-introduction) by `docker` or `yarn dev` and watch it in your browser.
 - You have a child theme [running](/guide/cookbook/theme.html#_1-start-building-your-own-theme) on top of _Vue Storefront_ app. 
 - In this recipe, we start with _degi_ child theme based on `1.10` version (git hash : ___1b53bd2a___) of `default` theme. This _degi_ theme is an example you might have created for your own. Which means, you can change it to whatever you like. 
 - In other words, suppose you have a _Vue Storefront_ shop running on a child theme `degi` that was branched off from _Vue Storefront_ `default` theme version `1.10` and want to upgrade to `1.11`. 

### 2. Recipe

1. Go to your _Vue Storefront_ app root directory and `git checkout` to following hash :
```bash
git fetch
git checkout 79f0c30f # origin/release/v1.11
```

2. Resulting screen in your browser would somewhat look like this as sad as can be : 

![error_1.11](../images/error_1.11.png)

3. Now we start hunting down the culprits one by one. 

 - First target is located at `./src/themes/degi/components/core/blocks/MyAccount/MyOrders.vue` on line `83` unless you modified it. Replace it as follows :
:::warning NOTICE
Line numbers denote the number in the file and they might not match since it assumes no modification. Think of it as an approximation reference.
:::

```js
// from
// import UserOrder from 'src/modules/order-history/components/UserOrders'
// to 
import UserOrder from '@vue-storefront/core/modules/order/components/UserOrdersHistory'
``` 

As you can see `UserOrdersHistory` has been moved to `core/modules` package. 

 - Next, go to `./src/themes/degi/pages/Home.vue` and fix it as follows on `7`: 
```html
<!-- from -->
<!-- <section class="new-collection container px15" v-if="everythingNewCollection && everythingNewCollection.length"> -->
<!-- to -->
<section class="new-collection container px15">
```

 And, line `16` :
```html
<!-- from -->
<!-- <product-listing columns="4" :products="everythingNewCollection" /> -->
<!-- to -->
<lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
  <product-listing columns="4" :products="getEverythingNewCollection" />
</lazy-hydrate>
<product-listing v-else columns="4" :products="getEverythingNewCollection" />
```

There you can see `lazy-hydrate` is implemented for the better UX.

 Plus, line `22` :
```html
<!-- from -->
<!-- <header class="col-md-12" :class="{ pt40: everythingNewCollection && everythingNewCollection.length }"> -->
<!-- to -->
<header class="col-md-12" :class="{ pt40: getEverythingNewCollection && getEverythingNewCollection.length }">
```

 Now, replace `36` we don't use any more with another :
```js
// from 
// import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
// to
import LazyHydrate from 'vue-lazy-hydration'
```

Because we now use `lazy-hydrate` feature. 

 Additionally, add these two lines at `53` :
```js
import {registerModule} from '@vue-storefront/core/lib/modules'
import {RecentlyViewedModule} from '@vue-storefront/core/modules/recently-viewed'
``` 
That is, `recently-viewed` module added to `Home.vue` template from `1.11`.

Fix them at `55` below `export default` as follows :
:::tip IMPORTANT !
Lines with strong background means _addition_ while commented with flag `#remove` means _elimination_
:::
```js{2-6,14,18,33-37,45-47}
export default { 
  data () {
    return {
      loading: true
    }
  },
  mixins: [Home],   
  components: { 
    HeadImage,     
    Onboard,     
    ProductListing,  
    PromotedOffers,    
    TileLinks,
    LazyHydrate
  },
  computed: {  
    ...mapGetters('user', ['isLoggedIn']),   
    ...mapGetters('homepage', ['getEverythingNewCollection']),
    categories () {
      return this.getCategories
    },
    /* #remove
    everythingNewCollection () {  
      return this.$store.state.homepage.new_collection  
    },  
    coolBagsCollection () { 
      return this.$store.state.homepage.coolbags_collection 
    },  
    */
    isOnline () {
      return onlineHelper.isOnline 
    },
    isLazyHydrateEnabled () {
      return config.ssr.lazyHydrateFor.some(
        field => ['homepage', 'homepage.new_collection'].includes(field)
      )
    }
  },
  /* #remove
  created () {    
    // Load personal and shipping details for Checkout page from IndexedDB      
    this.$store.dispatch('checkout/load') 
  }, 
  */
  beforeCreate () {
    registerModule(RecentlyViewedModule)
  },
```
`loading` is required to determine if `lazy-hydrate` needs triggered

From `1.11`, _collections_ comes from `vuex` `store` using `mapGetters` helper.

```js{1-5}
await Promise.all([
  store.dispatch('homepage/fetchNewCollection'),
  store.dispatch('promoted/updateHeadImage'),
  store.dispatch('promoted/updatePromotedOffers')
])
/* #remove
 let newProductsQuery = prepareQuery({ queryConfig: 'newProducts' })     
    let coolBagsQuery = prepareQuery({ queryConfig: 'coolBags' })       
    const newProductsResult = await store.dispatch('product/list', {
      query: newProductsQuery,      ])
      size: 8,  
      sort: 'created_at:desc' 
    })  
    if (newProductsResult) {  
      store.state.homepage.new_collection = newProductsResult.items 
    } 
    const coolBagsResult = await store.dispatch('product/list', { 
      query: coolBagsQuery, 
      size: 4,  
      sort: 'created_at:desc',  
      includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : [] 
    })  
    if (coolBagsResult) { 
      store.state.homepage.coolbags_collection = coolBagsResult.items 
    } 
    await store.dispatch('promoted/updateHeadImage')  
    await store.dispatch('promoted/updatePromotedOffers')
*/

```
Various `actions` in separate files under `./src/themes/degi/store` replaced in-page `actions`.

We will add those files in the next step.

```js{1-5}
next(vm =>
  vm.$store.dispatch('homepage/fetchNewCollection').then(res => {
    vm.loading = false
  })
)
/* #remove
next(vm => { 
  let newProductsQuery = prepareQuery({ queryConfig: 'newProducts' })  
  vm.$store.dispatch('product/list', { 
    query: newProductsQuery,  
    size: 8,  
    sort: 'created_at:desc' 
  })  
})  
*/
```
Again, new `actions` are used here instead of the old way. 


### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />
<br />


## 3. How `default` theme works
_Theme_ is the face of your store. Face is what makes people recognize you as you. That works just the same for your store. However, your _theme_ shows not only looks and feels of your store's identity, but also represents how features such as _UI_, _widgets_ and _components_ are arranged and interconnected just the same as your face helps connect _eyes_, _nose_, _ears_ and _brain_ under the skin.

Online stores should demand many features in common and they deal with similar types of requests from their customers to fulfill their desire : _Purchase_. They are divided and placed under the `core` folder to be dealt with.

We already got our hands dirty to place all the core business logic in place and created the `default` theme as the best practice to show how they are intertwined behind the scene and make it work seamlessly out of the box. 

In this recipe, we will walk through how `default` theme works in cooperation with other core parts of the `app` such as `modules`, `filters`, `stores` and so on. 
<br />
Among methodologies for this recipe, we will use the one inspired by [_Chaos Monkey_](https://en.wikipedia.org/wiki/Chaos_engineering); One that creates various errors on purpose, and ___see___ why it was needed to prevent such errors in the first place.

#### Sidetalk (If you are busy dev, please skip this)
Why we don't make a recipe for solution to a problem, but a recipe for a problem itself? Read this quote from _Aristotle_ and please ask me again
:::tip QUOTE
_He who sees things grow from their beginning will have the best view of them_

___- Aristotle___
:::
You are not the core developers who built the ___Vue Storefront___ from its beginning so you don't know the _why_ and _how_ and the history of what happened to each corner of the code base. (even if you are core developers, I bet you really don't know _every_ detail ;)) Yet, that's fine until you just take advantage of the platform and things work as `docs` dictates. It becomes, however, problems when things get in unexpected ways. 
<br/>
In attempts to reduce such frustration, one might need to simulate _How things grew from the beginning_. Creating problems on purpose and an attempt to solve them may help you understand why things were there in the first place. Think of it as _Hadron Collider_ of ___Vue Storefront___. Now time's up, Let's turn on the _particle accelerator_. 

### 1. Preparation
- You need [Vue Storefront](https://github.com/DivanteLtd/vue-storefront) app [working](/guide/cookbook/setup.html). 

### 2. Recipe
1. Open your editor and go to `./src/themes/default/index.js`
 


### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
#### Secret 1. What is `amp` here and there?
#### Secret 2. 

<br />
<br />
<br />




## 4. Execuse me, but can I use your theme if I may?
### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />
<br />
