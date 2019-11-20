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

This recipe helps you resolve errors you encounter after the upgrade as short a route as possible. There would be more warnings and small leftovers within your theme. To make a complete overhaul, look for [Migration from 1.10 to 11](/guide/cookbook/migration.html#_1-upgrade-from-1-10-to-1-11) 

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

:::tip TIP
By the way, you can also compare the changes made between `1.10` to `1.11` in [github link](https://github.com/DivanteLtd/vue-storefront/commit/a42d480aea56d90f7ab65c5caf6ce3f49b00dfec) with a glance too.
:::

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

4. Add new files introduced from `1.11` as following path from the `default` theme : 
```bash
# Assuming you are at the root directory
cd src
cp -r themes/default/store themes/degi/

# Now replace index.js to import new features and abandon deprecated ones.
cp themes/default/index.js themes/degi/index.js
```

5. Open your browser once again, then your errors now be gone as follows :

![success_home_with_1.11_borderline](../images/success_1.11_home.png)

6. Now you are OK with _Home_ page, but there are still subtle changes made to each corner of the app. Let's find them out. 
Click the _Microcart_ icon then you will see the page like below : 

![microcart_nan_borderline](../images/microcart_nan.png)

Multiple spots need attention to be fixed. We upgraded _Microcart_ to enable _Edit Mode_ on the fly. Let's fix it. 

7. Copy newly added files from the `default` theme to `degi` theme :
```bash
# you are at the root directory
cd src
cp themes/default/components/core/blocks/Microcart/EditButton.vue themes/degi/components/core/blocks/Microcart/
cp themes/default/components/core/blocks/Microcart/EditMode.vue themes/degi/components/core/blocks/Microcart/
```

8. Then fix files that you might have modified before upgrade. 

 - Go to `./src/themes/degi/components/core/blocks/Microcart/Microcart.vue` and fix it as follows at `3` : 

```html
<!-- from -->
<!-- class="microcart cl-accent" -->
<!-- to -->
class="microcart cl-accent relative"
```

 - Add this at `7` : 
```html
<transition name="fade">
  <div v-if="isEditMode" class="overlay" @click="closeEditMode" />
</transition>
```
This transition allows _EditMode_ overlay and also works as a toggle button. 

 - Replace `49` with below : 
```html
<!-- from -->
<!--  <product v-for="product in productsInCart" :key="product.sku" :product="product" /> -->
<!-- to -->
<product v-for="product in productsInCart" :key="product.checksum || product.sku" :product="product" />
``` 
Now, `product.checksum` can be used as a key

 - Fix it at `125` :
```js
// from
// import { isModuleRegistered } from '@vue-storefront/core/lib/module'
// import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'
// to
import { mapGetters, mapActions } from 'vuex'
import { isModuleRegistered } from '@vue-storefront/core/lib/modules'
import { registerModule } from '@vue-storefront/core/lib/modules'
import EditMode from './EditMode'
import { InstantCheckoutModule } from 'src/modules/instant-checkout'
``` 
Importing new features while removing deprecated ones.

 - Change `mixins` at `147` : 
```js{6,17}
mixins: [
  /* #remove
  Microcart,
  */  
  VueOfflineMixin,    
  EditMode,
  onEscapePress    
],   
data () {  
  return {      
    addCouponPressed: false,   
    couponCode: '',       
    componentLoaded: false,  
    /* #remove     
    isInstantCheckoutRegistered: isModuleRegistered('instant-checkout')
    */
    isInstantCheckoutRegistered: isModuleRegistered('InstantCheckoutModule')
  }  
},
```
 - Add _functions_ and fix _methods_ at around `166` :
```js{1-3,9-16,18-20,28,31-33,44,52}
beforeCreate () {
  registerModule(InstantCheckoutModule)
},
mounted () {
  this.$nextTick(() => {
    this.componentLoaded = true
  })
},
computed: {
  ...mapGetters({
    productsInCart: 'cart/getCartItems',
    appliedCoupon: 'cart/getCoupon',
    totals: 'cart/getTotals',
    isOpen: 'cart/getIsMicroCartOpen'
  })
},
methods: {
  ...mapActions({
    applyCoupon: 'cart/applyCoupon'
  }),
  addDiscountCoupon () {
    this.addCouponPressed = true
  },
  clearCoupon () {
    /* #remove
    this.removeCoupon()
    */
    this.$store.dispatch('cart/removeCoupon')
    this.addCouponPressed = false
  },
  toggleMicrocart () {
    this.$store.dispatch('ui/toggleMicrocart')
  },
  async setCoupon () {    
    const couponApplied = await this.applyCoupon(this.couponCode)
    this.addCouponPressed = false 
    // ... abridged ... 
    } 
  }, 
  closeMicrocartExtend () {
    /* #remove
    this.closeMicrocart()
    */
    this.toggleMicrocart()
    this.$store.commit('ui/setSidebar', false)
    this.addCouponPressed = false
  },
  onEscapePress () {
    /* #remove
    this.closeMicrocart()
    */
    this.toggleMicrocart()  
  },
```
Here, you can see `InstantCheckoutModule` is registered at `beforeCreate`.

`mapGetters` helper is used for getting `vuex` `actions`. [more info](https://stackoverflow.com/questions/49696542/differences-b-n-mapstate-mapgetters-mapactions-mapmutations-in-vuex) on `vuex` _helpers_

 - Last but not least for the file, add some styles inside _\<style\>\</style\>_ tag at around `311` : 
```css
.overlay {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 0;
  height: 100%;
  background:rgba(0, 0, 0, 0.4);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
```

 - Another big change has been made to `./src/themes/degi/components/core/blocks/Microcart/Product.vue`. 

Start with replacing _template_ at `2` as follows :
```html{4-15,45-79,88-94,103-130,175-201,203-209}
<template>
  <!-- #remove -->
  <!-- <li class="row flex-nowrap py10"> -->
  <li class="row py10 bg-cl-white" :class="{ 'relative': editMode }">
    <div class="mx10 w-100 py10 mb15 edit-mode flex between-xs middle-xs" v-if="editMode">
      Edit mode
      <button class="brdr-none bg-cl-transparent" @click="closeEditMode">
        <span class="cl-accent">
          <i class="material-icons cl-accent mr5">
            close
          </i>
        </span>
      </button>
    </div>
    <div class="blend">
      <div class="ml10 bg-cl-secondary">
        <product-image :image="image" />
      </div>
    </div>
    <!-- #remove -->
    <!-- <div class="col-xs flex pl35 py15 start-xs between-sm details"> -->
    <!--  <div> -->
    <!--   <router-link -->
    <!--      class="serif h4 name" -->
    <!--      :to="localizedRoute({ -->
    <!--        name: product.type_id + '-product', -->
    <!--        params: { -->
    <!--          parentSku: product.parentSku ? product.parentSku : product.sku,-->
    <!--          slug: product.slug, -->
    <!--          childSku: product.sku -->
    <!--        } -->
    <!--      })" -->
    <!--      data-testid="productLink" -->
    <!--      @click.native="$store.commit('ui/setMicrocart', false)" -->
    <!--    > -->
    <!--      {{ product.name | htmlDecode }} -->
    <!--    </router-link> -->
    <!--    <div class="h6 cl-bg-tertiary pt5 sku" data-testid="productSku"> -->
    <!--      {{ product.sku }} -->
    <!--    </div> -->
    <!--    <div class="h6 cl-bg-tertiary pt5 options" v-if="isOnline && product.totals && product.totals.options"> -->
    <!--      <div v-for="opt in product.totals.options" :key="opt.label"> -->
    <!--        <span class="opn">{{ opt.label }}: </span> -->
    <!--        <span class="opv" v-html="opt.value" /> -->
        <div class="col-xs pt15 flex pl35 flex-wrap">
           <div class="flex flex-nowrap details">
             <div class="flex w-100 flex-wrap between-xs">
              <div :class="{ 'w-100 pb10': !productsAreReconfigurable }">
                <div>
                  <router-link
                    class="serif h4 name"
                     :to="productLink"
                    data-testid="productLink"
                    @click.native="$store.commit('ui/setMicrocart', false)"
                  >
                    {{ product.name | htmlDecode }}
                  </router-link>
                  <div class="h6 cl-bg-tertiary pt5 sku" data-testid="productSku">
                    {{ product.sku }}
                  </div>
                   <div class="h6 cl-bg-tertiary pt5 options" v-if="isOnline && !editMode && product.totals && product.totals.options">
                     <div v-for="opt in product.totals.options" :key="opt.label">
                      <span class="opn">{{ opt.label }}: </span>
                       <span class="opv" v-html="opt.value" />
                    </div>
                   </div>
                   <div class="h6 cl-bg-tertiary pt5 options" v-else-if="!editMode && product.options">
                    <div v-for="opt in product.options" :key="opt.label">
                  <span class="opn">{{ opt.label }}: </span>
                  <span class="opv" v-html="opt.value" />
                </div>
              </div>
              <div class="h6 pt5 cl-error" v-if="product.errors && Object.keys(product.errors).length > 0">
                {{ product.errors | formatProductMessages }}
              </div>
              <div class="h6 pt5 cl-success" v-if="product.info && Object.keys(product.info).length > 0 && Object.keys(product.errors).length === 0">
                {{ product.info | formatProductMessages }}
              </div>
            </div>
          <!-- #remove -->  
          <!-- </div> -->
        <!-- </div> -->
        <!-- <div class="h6 cl-bg-tertiary pt5 options" v-else-if="product.options"> -->
        <!--  <div v-for="opt in product.options" :key="opt.label">  --> 
        <!--    <span class="opn">{{ opt.label }}: </span>  -->
        <!--    <span class="opv" v-html="opt.value" />  -->
              </div>
              <div class="h5 cl-accent lh25 qty">
                <base-input-number
                   :name="$t('Quantity')"
                   :value="productQty"
                   @input="updateProductQty"
                   :min="1"
              />
          </div>        
        </div>    
        <!-- #remove -->
        <!--  <div class="h6 pt5 cl-error" v-if="product.errors && Object.keys(product.errors).length > 0"> -->
        <!--   {{ product.errors | formatProductMessages }} -->
        <!-- </div> -->
        <!-- <div class="h6 pt5 cl-success" v-if="product.info && Object.keys(product.info).length > 0 && Object.keys(product.errors).length === 0">
        <!--   {{ product.info | formatProductMessages }} -->
         <div class="flex mr10 align-right start-xs between-sm prices">
          <div class="prices" v-if="!displayItemDiscounts || !isOnline">
            <span class="h4 serif cl-error price-special" v-if="product.special_price">
              {{ product.price_incl_tax * product.qty | price }}
            </span>
            <span class="h6 serif price-original" v-if="product.special_price">
              {{ product.original_price_incl_tax * product.qty | price }}
            </span>
            <span class="h4 serif price-regular" v-else data-testid="productPrice">
              {{ (product.original_price_incl_tax ? product.original_price_incl_tax : product.price_incl_tax) * product.qty | price }}
            </span>
          </div>
          <div class="prices" v-else-if="isOnline && product.totals">
            <span class="h4 serif cl-error price-special" v-if="product.totals.discount_amount">
              {{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price }}
            </span>
            <span class="h6 serif price-original" v-if="product.totals.discount_amount">
              {{ product.totals.row_total_incl_tax | price }}
            </span>
            <span class="h4 serif price-regular" v-if="!product.totals.discount_amount">
              {{ product.totals.row_total_incl_tax | price }}
            </span>
          </div>
          <div class="prices" v-else>
            <span class="h4 serif price-regular">
              {{ (product.regular_price || product.price_incl_tax) * product.qty | price }}
            </span>
          </div>
        </div>
      </div>
      <!-- #remove -->
      <!-- <div class="h5 pt5 cl-accent lh25 qty"> -->
        <!-- <base-input-number -->
          <!-- :name="$t('Quantity')" -->
          <!-- :value="product.qty" -->
          <!-- @input="updateQuantity" -->
          <!-- :min="1" -->
        <!-- /> -->
      <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="flex py15 mr10 align-right start-xs between-sm actions"> -->
      <!-- <div class="prices" v-if="!displayItemDiscounts || !isOnline"> -->
        <!-- <span class="h4 serif cl-error price-special" v-if="product.special_price"> -->
        <!--   {{ product.priceInclTax * product.qty | price }}&nbsp; -->
        <!-- </span> -->
        <!-- <span class="h6 serif price-original" v-if="product.special_price"> -->
        <!--   {{ product.originalPriceInclTax * product.qty | price }} -->
        <!-- </span> -->
        <!-- <span class="h4 serif price-regular" v-else data-testid="productPrice"> -->
        <!--   {{ (product.originalPriceInclTax ? product.originalPriceInclTax : product.priceInclTax) * product.qty | price }} -->
        <!-- </span> -->
      <!-- </div> -->
      <!-- <div class="prices" v-else-if="isOnline && product.totals"> -->
        <!-- <span class="h4 serif cl-error price-special" v-if="product.totals.discount_amount"> -->
        <!--   {{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price }}&nbsp; -->
        <!-- </span> --> 
        <!-- <span class="h6 serif price-original" v-if="product.totals.discount_amount"> -->
        <!--   {{ product.totals.row_total_incl_tax | price }} -->
        <!-- </span> -->
        <!-- <span class="h4 serif price-regular" v-if="!product.totals.discount_amount"> -->
        <!--   {{ product.totals.row_total_incl_tax | price }} -->
        <!-- </span> -->
      <!-- </div> -->
      <!-- <div class="prices" v-else> -->
        <!-- <span class="h4 serif price-regular"> -->
        <!--   {{ product.regular_price * product.qty | price }} -->
        <!-- </span> -->
      <!-- </div> -->
      <!-- <div class="links"> -->
        <!-- <div class="mt5" @click="removeItem"> -->
          <!-- <remove-button /> -->
      <div class="w-100 pb15 flex flex-wrap bottom-xs" v-if="editMode">
        <div class="ml0 flex flex-wrap filters" v-if="productsAreReconfigurable">
          <div class="h5 pt5 w-100" v-for="(option, index) in product.configurable_options" :key="index">
            <div class="h6 cl-bg-tertiary mr10">
              {{ option.label }}:
            </div>
            <div class="flex flex-wrap pt5" v-if="option.label == 'Color' && editMode">
              <color-selector
                v-for="filter in getAvailableFilters[option.attribute_code]"
                v-if="isOptionAvailable(filter)"
                :key="filter.id"
                :variant="filter"
                :selected-filters="getSelectedOptions"
                @change="editModeSetFilters"
              />
            </div>
            <div class="flex flex-wrap pt5" v-else-if="option.label == 'Size' && editMode">
              <size-selector
                class="mr10 mb10"
                v-for="filter in getAvailableFilters[option.attribute_code]"
                v-if="isOptionAvailable(filter)"
                :key="filter.id"
                :variant="filter"
                :selected-filters="getSelectedOptions"
                @change="editModeSetFilters"
              />
            </div>
          </div>
        </div>
        <button-full class="update-button mb10 mr10" @click.native="updateProductVariant">
          {{ $t('Update item') }}
        </button-full>
      </div>
      <div class="w-100 flex middle-xs actions" :class="{ 'end-xs pb5': !productsAreReconfigurable }" v-if="!editMode">
        <edit-button class="mx5" @click="openEditMode" v-if="productsAreReconfigurable && !editMode" />
        <remove-button class="mx5" @click="removeItem" />
      </div>
    </div>
  </li>
</template>          
```
Here we replaced template.

 - Now fix script as follows at `135` : 

```js{2,4-5,8-9,11,14-17,19-24,29-32,34,39-44,50-64,72-88}
<script>
import { mapActions } from 'vuex'
import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'
import ProductImage from 'theme/components/core/ProductImage'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import RemoveButton from './RemoveButton'
import EditButton from './EditButton'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import { onlineHelper } from '@vue-storefront/core/helpers'
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption'
import { getThumbnailForProduct, getProductConfiguration } from '@vue-storefront/core/modules/cart/helpers'
import ButtonFull from 'theme/components/theme/ButtonFull'
import EditMode from './EditMode'
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    RemoveButton,
    BaseInputNumber,
    ProductImage,
    ColorSelector,
    SizeSelector,
    EditButton,
    ButtonFull
  },
  mixins: [Product, ProductOption, EditMode],
  computed: {
    isOnline () {
      return onlineHelper.isOnline
    },
    productsAreReconfigurable () {
      return config.cart.productsAreReconfigurable && this.product.type_id === 'configurable' && this.isOnline
    },
    displayItemDiscounts () {
      return config.cart.displayItemDiscounts
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    thumbnail () {
      return getThumbnailForProduct(this.product)
    },
    configuration () {
      return getProductConfiguration(this.product)
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    editMode () {
      return this.getEditingProductId === this.product.id
    },
    productQty () {
      return this.editMode ? this.getEditingQty : this.product.qty
    }
  },
  /* #remove
  data () {
    return {
      displayItemDiscounts: config.cart.displayItemDiscounts
  */
  methods: {
    updateProductVariant () {
      this.updateVariant()
      this.closeEditMode()
    },
    updateProductQty (qty) {
      if (this.editMode) {
        this.editModeSetQty(qty)
        return
      }
      this.updateQuantity(qty)
    },
    removeFromCart () {
      this.$store.dispatch('cart/removeItem', { product: this.product })
    },
    updateQuantity (quantity) {
      this.$store.dispatch('cart/updateQuantity', { product: this.product, qty: quantity })
    }
  }
}
</script>
```
As you can see here, we added `EditMode` in _Microcart_. Many things were considered in doing so, e.g. `color`, `size`, `option`, _multistores_ and so on. 


 - Time to fix _styles_ : 
```css{2-7,22-24,32,38-40,75-89}
<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
  .blend {
    flex: 0 0 150px;
  }

  .image {
    mix-blend-mode: multiply;
    vertical-align: top;

/* ... abridged ... */

  }
  .details {
    /* #remove
    flex-direction: column;
    @media (max-width: 767px) {
      padding: 0 10px 0 20px;
    }
    */
    flex: 1 1 auto;
    display: flex;
    flex-flow: row wrap;
  }
  .name {

/* ... abridged ... */

  }
  .qty {
    padding-right: 30px;
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }
  .actions {
    margin: 0 -5px;
  }
  .prices {
    flex-direction: column;
    @media (max-width: 767px) {
      padding: 0;
      font-size: 12px;
    }
    /* #remove
    .links {
      @media (max-width: 767px) {
        margin-top: 20px;
      }
    }
    */
  }
  .price-special {

/* ... abridged ... */

    text-decoration: line-through;
  }

  /* #remove
  .price-regular {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  */

  input {
    width: 30px;
  }
  .flex-nowrap {
    flex-wrap: nowrap;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .edit-mode {
    border-bottom: 1px solid color(white-smoke);
  }
  .filters {
    flex: 1 1 200px;
  }
  .update-button {
    font-size: 14px;
    min-width: 150px;
    width: 150px;
    padding: 10px;
  }
</style>

``` 

 - Move on to next file `./src/themes/degi/components/core/blocks/Microcart/RemoveButton.vue` and fix it at `2` as follows : 
```html
<!-- from -->
<!-- <button class="brdr-none bg-cl-transparent p0 middle-xs inline-flex cl-secondary"> -->
<!-- to -->
<button @click="$emit('click')" class="brdr-none bg-cl-transparent p0 middle-xs inline-flex cl-secondary">
``` 
Here we added _Vue_ click event.

9. Let's confirm if we got it right so far on your browser. Open it then _Voila !_ : 

![editmode_in_mc_borderline](../images/editmodeInMC.png)

Now you can edit options for your products in _Microcart_.

### 3. Peep into the kitchen (what happens internally)

### 4. Chef's secret (protip)
1. Debunk _github_ features to uncover the code changes

2. 
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
