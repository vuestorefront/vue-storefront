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
 - In this recipe, we start with _degi_ child theme based on `1.10` version (git hash : [___1b53bd2a___](https://github.com/DivanteLtd/vue-storefront/commit/1b53bd2a829f7cab571dbd3c2a4021ea46857da7)) of `default` theme. This _degi_ theme is an example you might have created for your own. Which means, you can change it to whatever you like. 
 - In other words, suppose you have a _Vue Storefront_ shop running on a child theme `degi` that was branched off from _Vue Storefront_ `default` theme version `1.10` and want to upgrade to `1.11`. 


### 1-1. Contents
There are many features added/removed/enhanced with `1.11`. This recipe deals with all of them. They are, however, too many to skim in a glance. That's why you might need this _contents_ for them. They are grouped in as features but that's just a conceptual grouping. 

<!-- Javascripts -->
<script type="text/javascript" src="../../node_modules/diff2html/dist/diff2html.js"></script>


- Pages
  - [Home](#_3-now-we-start-hunting-down-the-culprits-one-by-one)
  - [Category]
  - [Checkout]
  - [CmsPage]
  - [Compare]
  - [MyAccount]
  - [PageNotFound]
  - [Product]
  - [Static]

- Core components
  - Blocks
    - [Microcart](#_6-now-you-are-ok-with-home-page-but-there-are-still-subtle-changes-made-to-each-corner-of-the-app-let-s-find-them-out)
    - Auth
      - [ForgotPass]
      - [Login]
      - [Register]
    - Category
      - [Sidebar]
    - Checkout
      - [OrderConfirmation]
      - [OrderReview]
      - [Payment]
      - [Product]
      - [Shipping]
      - [ThankYouPage]
    - CMS
      - [Block]
    - Compare
      - [AddToCompare]
    - Footer
      - [Footer]
      - [MinimalFooter]
      - [NewsLetter]
    - Form
      - [BaseInputNumber]
    - Header
      - [CompareIcon]
      - [Header]
      - [MicroCartIcon]
      - [MinimalHeader]
      - [WishListIcon]
    - MyAccount
      - [MyNewsLetter]
      - [MyOrder]
      - [MyOrders]
      - [MyProfile]
      - [MyShippingDetails]
    - Product
      - [Related]
    - Reviews
      - [Reviews]
    - SearchPanel
      - [SearchPanel]
    - SidebarMenu
      - [SidebarMenu]
      - [SubCategory]
    - Switcher
      - [Language]
    - Wishlist
      - [AddToWishlist]
      - [Product]

  - [Breadcrumb](#_10-next-target-is-breadcrumb-now-breadcrumb-supports-the-multistore-feature)
  - [AddToCart] 
  - [ColorSelector] 
  - [CookieNotification]
  - [GenericSelector]
  - [Logo]
  - [Modal]
  - [NewsletterPopup]
  - [OfflineBadge]
  - [Overlay]
  - [PriceSelector]
  - [ProductBundleOptions]
  - [ProductCustomOptions]
  - [ProductGalleryCarousel]
  - [ProductGalleryZoomCarousel]
  - [ProductImage]
  - [ProductLinks]
  - [ProductQuantity]
  - [ProductTile]
  - [SizeSelector]
  - [SortBy]
  - [Spinner]
  
- Theme components
  - [ButtonFull]
  - [ButtonOutline]
  - [WebShare]
  - Blocks
    - AsyncSidebar
      - [AsyncSidebar]
    - Home
      - [Onboard]
    - Inspirations
      - [InspirationTile]
    - Reviews
      - [ReviewsList]

- Store
  
- Other Important Files
  - [helpers/index.ts]
  - [index.js]
  - [mixins/filterMixin.ts]
  - [package.json]
  - [router/index.js]
  - Resource
    - i18n



### 2. Recipe

1. Go to your _Vue Storefront_ app root directory and `git checkout` to following hash [`79f0c30f`](https://github.com/DivanteLtd/vue-storefront/commit/79f0c30f1707ff913bde18c7e13654d5ca6bd867) :
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

 - First target is located at `./src/themes/degi/components/core/blocks/MyAccount/MyOrders.vue`. Replace it as follows :
:::warning NOTICE
Line numbers denote the number in the file and they might not match since it assumes no modification. Think of it as an approximation reference.
:::

<div id="d-my-orders">

</div>
<script>
var myOrders = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/MyAccount/MyOrders.vue\n+++ b/src/themes/degi/components/core/blocks/MyAccount/MyOrders.vue\n@@ -80,7 +80,7 @@\n </template>\n \n <script>\n-import UserOrder from \'src/modules/order-history/components/UserOrders\'\n+import UserOrder from \'@vue-storefront/core/modules/order/components/UserOrdersHistory\'\n \n export default {\n   mixins: [UserOrder]\n",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-my-orders").innerHTML = myOrders;
</script>


As you can see `UserOrdersHistory` has been moved to `core/modules` package. 

 - Next, go to `./src/themes/degi/pages/Home.vue` and fix it as follows : 

<div id="d-home">

</div>
<script>
var dHome = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/pages/Home.vue\n+++ b/src/themes/degi/pages/Home.vue\n@@ -4,7 +4,7 @@\n \n     <promoted-offers />\n \n-    <section class=\"new-collection container px15\" v-if=\"everythingNewCollection && everythingNewCollection.length\">\n+    <section class=\"new-collection container px15\">\n       <div>\n         <header class=\"col-md-12\">\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-home").innerHTML = dHome;
</script>

<div id="d-home-2">

</div>
<script>
var dHome2 = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/pages/Home.vue\n+++ b/src/themes/degi/pages/Home.vue\n@@ -13,13 +13,16 @@\n         </header>\n       </div>\n       <div class=\"row center-xs\">\n-        <product-listing columns=\"4\" :products=\"everythingNewCollection\" />\n+        <lazy-hydrate :trigger-hydration=\"!loading\" v-if=\"isLazyHydrateEnabled\">\n+          <product-listing columns=\"4\" :products=\"getEverythingNewCollection\" />\n+        </lazy-hydrate>\n+        <product-listing v-else columns=\"4\" :products=\"getEverythingNewCollection\" />\n       </div>\n     </section>\n \n     <section v-if=\"isOnline\" class=\"container pb60 px15\">\n       <div class=\"row center-xs\">\n-        <header class=\"col-md-12\" :class=\"{ pt40: everythingNewCollection && everythingNewCollection.length }\">\n+        <header class=\"col-md-12\" :class=\"{ pt40: getEverythingNewCollection && getEverythingNewCollection.length }\">\n           \n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-home-2").innerHTML = dHome2;
</script>


There you can see `lazy-hydrate` is implemented for the better UX.


- Now, replace `36` we don't use any more with another because we now use lazy-hydrate feature :

<div id="d-home-3">

</div>
<script>
var dHome3 = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/pages/Home.vue\n+++ b/src/themes/degi/pages/Home.vue\n@@ -33,51 +36,56 @@\n \n <script>\n // query constructor\n-import { prepareQuery } from \'@vue-storefront/core/modules/catalog/queries/common\'\n import { isServer, onlineHelper } from \'@vue-storefront/core/helpers\'\n+import LazyHydrate from \'vue-lazy-hydration\'\n \n // Core pages\n import Home from \'@vue-storefront/core/pages/Home\'\n-\n // Theme core components\n import ProductListing from \'theme/components/core/ProductListing\'\n import HeadImage from \'theme/components/core/blocks/MainSlider/HeadImage\'\n-\n // Theme local components\n import Onboard from \'theme/components/theme/blocks/Home/Onboard\'\n import PromotedOffers from \'theme/components/theme/blocks/PromotedOffers/PromotedOffers\'\n import TileLinks from \'theme/components/theme/blocks/TileLinks/TileLinks\'\n-import { Logger } from \'@vue-storefront/core/lib/logger\'\n-import { mapGetters } from \'vuex\'\n+import {Logger} from \'@vue-storefront/core/lib/logger\'\n+import {mapGetters} from \'vuex\'\n import config from \'config\'\n+import {registerModule} from \'@vue-storefront/core/lib/modules\'\n+import {RecentlyViewedModule} from \'@vue-storefront/core/modules/recently-viewed\'\n \n export default {\n+  data () {\n+    return {\n+      loading: true\n+    }\n+  },\n   mixins: [Home],\n   components: {\n     HeadImage,\n     Onboard,\n     ProductListing,\n     PromotedOffers,\n-    TileLinks\n+    TileLinks,\n+    LazyHydrate\n   },\n   computed: {\n     ...mapGetters(\'user\', [\'isLoggedIn\']),\n+    ...mapGetters(\'homepage\', [\'getEverythingNewCollection\']),\n     categories () {\n       return this.getCategories\n     },\n-    everythingNewCollection () {\n-      return this.$store.state.homepage.new_collection\n-    },\n-    coolBagsCollection () {\n-      return this.$store.state.homepage.coolbags_collection\n-    },\n     isOnline () {\n       return onlineHelper.isOnline\n+    },\n+    isLazyHydrateEnabled () {\n+      return config.ssr.lazyHydrateFor.some(\n+        field => [\'homepage\', \'homepage.new_collection\'].includes(field)\n+      )\n     }\n   },\n-  created () {\n-    // Load personal and shipping details for Checkout page from IndexedDB\n-    this.$store.dispatch(\'checkout/load\')\n+  beforeCreate () {\n+    registerModule(RecentlyViewedModule)\n   },\n   async beforeMount () {\n     if (this.$store.state.__DEMO_MODE__) {\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-home-3").innerHTML = dHome3;
</script>

Because we now use `lazy-hydrate` feature. 

Additionally `recently-viewed` module is added to `Home.vue` template from `1.11`.

`loading` is required to determine if `lazy-hydrate` needs triggered

From `1.11`, _collections_ comes from `vuex` `store` using `mapGetters` helper.


- Various `actions` in separate files under `./src/themes/degi/store` replaced in-page `actions`.

We will add those files in the next step.

<div id="d-home-4">

</div>
<script>
var dHome4 = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/pages/Home.vue\n+++ b/src/themes/degi/pages/Home.vue\n@@ -101,41 +109,19 @@ export default {\n   async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data\n     Logger.info(\'Calling asyncData in Home (theme)\')()\n \n-    let newProductsQuery = prepareQuery({ queryConfig: \'newProducts\' })\n-    let coolBagsQuery = prepareQuery({ queryConfig: \'coolBags\' })\n-\n-    const newProductsResult = await store.dispatch(\'product/list\', {\n-      query: newProductsQuery,\n-      size: 8,\n-      sort: \'created_at:desc\'\n-    })\n-    if (newProductsResult) {\n-      store.state.homepage.new_collection = newProductsResult.items\n-    }\n-\n-    const coolBagsResult = await store.dispatch(\'product/list\', {\n-      query: coolBagsQuery,\n-      size: 4,\n-      sort: \'created_at:desc\',\n-      includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []\n-    })\n-    if (coolBagsResult) {\n-      store.state.homepage.coolbags_collection = coolBagsResult.items\n-    }\n-\n-    await store.dispatch(\'promoted/updateHeadImage\')\n-    await store.dispatch(\'promoted/updatePromotedOffers\')\n+    await Promise.all([\n+      store.dispatch(\'homepage/fetchNewCollection\'),\n+      store.dispatch(\'promoted/updateHeadImage\'),\n+      store.dispatch(\'promoted/updatePromotedOffers\')\n+    ])\n   },\n   beforeRouteEnter (to, from, next) {\n     if (!isServer && !from.name) { // Loading products to cache on SSR render\n-      next(vm => {\n-        let newProductsQuery = prepareQuery({ queryConfig: \'newProducts\' })\n-        vm.$store.dispatch(\'product/list\', {\n-          query: newProductsQuery,\n-          size: 8,\n-          sort: \'created_at:desc\'\n+      next(vm =>\n+        vm.$store.dispatch(\'homepage/fetchNewCollection\').then(res => {\n+          vm.loading = false\n         })\n-      })\n+      )\n     } else {\n       next()\n     }\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-home-4").innerHTML = dHome4;
</script>

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

<div id="d-micro">

</div>
<script>
var dMicro = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n@@ -1,9 +1,12 @@\n <template>\n   <div\n-    class=\"microcart cl-accent\"\n+    class=\"microcart cl-accent relative\"\n     :class=\"[productsInCart.length ? \'bg-cl-secondary\' : \'bg-cl-primary\']\"\n     data-testid=\"microcart\"\n   >\n+    <transition name=\"fade\">\n+      <div v-if=\"isEditMode\" class=\"overlay\" @click=\"closeEditMode\" />\n+    </transition>\n     <div class=\"row bg-cl-primary px40 actions\">\n       <div class=\"col-xs end-xs\">\n         <button\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro").innerHTML = dMicro;
</script>

This transition allows _EditMode_ overlay and also works as a toggle button. 

 - Replace `48` with below : 

<div id="d-micro-2">

</div>
<script>
var dMicro2 = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n@@ -46,7 +49,7 @@\n     </div>\n     <ul v-if=\"productsInCart.length\" class=\"bg-cl-primary m0 px40 pb40 products\">\n-      <product v-for=\"product in productsInCart\" :key=\"product.sku\" :product=\"product\" />\n+      <product v-for=\"product in productsInCart\" :key=\"product.checksum || product.sku\" :product=\"product\" />\n     </ul>\n     <div v-if=\"productsInCart.length\" class=\"summary px40 cl-accent serif\">\n       <h3 class=\"m0 pt40 mb30 weight-400 summary-heading\">',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro-2").innerHTML = dMicro2;
</script> 

Now, `product.checksum` can be used as a key

 - Fix it at `125` :

<div id="d-micro-3">

</div>
<script>
var dMicro3 = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n@@ -121,19 +124,22 @@\n </template>\n \n <script>\n+import { mapGetters, mapActions } from \'vuex\'\n import i18n from \'@vue-storefront/i18n\'\n-import { isModuleRegistered } from \'@vue-storefront/core/lib/module\'\n+import { isModuleRegistered } from \'@vue-storefront/core/lib/modules\'\n \n-import Microcart from \'@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart\'\n import VueOfflineMixin from \'vue-offline/mixin\'\n import onEscapePress from \'@vue-storefront/core/mixins/onEscapePress\'\n import InstantCheckout from \'src/modules/instant-checkout/components/InstantCheckout.vue\'\n+import { registerModule } from \'@vue-storefront/core/lib/modules\'\n \n import BaseInput from \'theme/components/core/blocks/Form/BaseInput\'\n import ClearCartButton from \'theme/components/core/blocks/Microcart/ClearCartButton\'\n import ButtonFull from \'theme/components/theme/ButtonFull\'\n import ButtonOutline from \'theme/components/theme/ButtonOutline\'\n import Product from \'theme/components/core/blocks/Microcart/Product\'\n+import EditMode from \'./EditMode\'\n+import { InstantCheckoutModule } from \'src/modules/instant-checkout\'\n \n export default {\n   components: {\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro-3").innerHTML = dMicro3;
</script> 



Importing new features while removing deprecated ones.

 - Change `mixins` at `148` : 

<div id="d-micro-4">

</div>
<script>
var dMicro4 = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n@@ -145,8 +151,8 @@ export default {\n     InstantCheckout\n   },\n   mixins: [\n-    Microcart,\n     VueOfflineMixin,\n+    EditMode,\n     onEscapePress\n   ],\n   data () {\n@@ -154,7 +160,7 @@ export default {\n       addCouponPressed: false,\n       couponCode: \'\',\n       componentLoaded: false,\n-      isInstantCheckoutRegistered: isModuleRegistered(\'instant-checkout\')\n+      isInstantCheckoutRegistered: isModuleRegistered(\'InstantCheckoutModule\')\n     }\n   },\n   props: {\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro-4").innerHTML = dMicro4;
</script> 

 - Add _functions_ and fix _methods_ at around `166` :

<div id="d-micro-5">

</div>
<script>
var dMicro5 = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n@@ -164,19 +170,36 @@ export default {\n       default: () => false\n     }\n   },\n+  beforeCreate () {\n+    registerModule(InstantCheckoutModule)\n+  },\n   mounted () {\n     this.$nextTick(() => {\n       this.componentLoaded = true\n     })\n   },\n+  computed: {\n+    ...mapGetters({\n+      productsInCart: \'cart/getCartItems\',\n+      appliedCoupon: \'cart/getCoupon\',\n+      totals: \'cart/getTotals\',\n+      isOpen: \'cart/getIsMicroCartOpen\'\n+    })\n+  },\n   methods: {\n+    ...mapActions({\n+      applyCoupon: \'cart/applyCoupon\'\n+    }),\n     addDiscountCoupon () {\n       this.addCouponPressed = true\n     },\n     clearCoupon () {\n-      this.removeCoupon()\n+      this.$store.dispatch(\'cart/removeCoupon\')\n       this.addCouponPressed = false\n     },\n+    toggleMicrocart () {\n+      this.$store.dispatch(\'ui/toggleMicrocart\')\n+    },\n     async setCoupon () {\n       const couponApplied = await this.applyCoupon(this.couponCode)\n       this.addCouponPressed = false\n@@ -190,12 +213,12 @@ export default {\n       }\n     },\n     closeMicrocartExtend () {\n-      this.closeMicrocart()\n+      this.toggleMicrocart()\n       this.$store.commit(\'ui/setSidebar\', false)\n       this.addCouponPressed = false\n     },\n     onEscapePress () {\n-      this.closeMicrocart()\n+      this.toggleMicrocart()\n     },\n     clearCart () {\n       this.$store.dispatch(\'notification/spawnNotification\', {',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro-5").innerHTML = dMicro5;
</script> 

Here, you can see `InstantCheckoutModule` is registered at `beforeCreate`.

`mapGetters` helper is used for getting `vuex` `actions`. [more info](https://stackoverflow.com/questions/49696542/differences-b-n-mapstate-mapgetters-mapactions-mapmutations-in-vuex) on `vuex` _helpers_

 - Last but not least for the file, add some styles inside _\<style\>\</style\>_ tag at around `311` : 

<div id="d-micro-6">

</div>
<script>
var dMicro6 = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/Microcart.vue\n@@ -308,4 +331,22 @@ export default {\n       width: 100%;\n     }\n   }\n+\n+  .overlay {\n+    top: 0;\n+    bottom: 0;\n+    left: 0;\n+    right: 0;\n+    position: absolute;\n+    z-index: 0;\n+    height: 100%;\n+    background:rgba(0, 0, 0, 0.4);\n+  }\n+\n+  .fade-enter-active, .fade-leave-active {\n+    transition: opacity .4s;\n+  }\n+  .fade-enter, .fade-leave-to {\n+    opacity: 0;\n+  }\n </style>\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro-6").innerHTML = dMicro6;
</script> 

 - Another big change has been made to `./src/themes/degi/components/core/blocks/Microcart/Product.vue`. 

Start with replacing _template_ at `2` as follows :

<div id="d-micro-prod-1">

</div>
<script>
var dMicroProd1 = Diff2Html.getPrettyHtml("--- a/src/themes/degi/components/core/blocks/Microcart/Product.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/Product.vue\n@@ -1,131 +1,312 @@\n <template>\n-  <li class=\"row flex-nowrap py10\">\n-    <div>\n+  <li class=\"row py10 bg-cl-white\" :class=\"{ \'relative\': editMode }\">\n+    <div class=\"mx10 w-100 py10 mb15 edit-mode flex between-xs middle-xs\" v-if=\"editMode\">\n+      Edit mode\n+      <button class=\"brdr-none bg-cl-transparent\" @click=\"closeEditMode\">\n+        <span class=\"cl-accent\">\n+          <i class=\"material-icons cl-accent mr5\">\n+            close\n+          </i>\n+        </span>\n+      </button>\n+    </div>\n+    <div class=\"blend\">\n       <div class=\"ml10 bg-cl-secondary\">\n         <product-image :image=\"image\" />\n       </div>\n     </div>\n-    <div class=\"col-xs flex pl35 py15 start-xs between-sm details\">\n-      <div>\n-        <router-link\n-          class=\"serif h4 name\"\n-          :to=\"localizedRoute({\n-            name: product.type_id + \'-product\',\n-            params: {\n-              parentSku: product.parentSku ? product.parentSku : product.sku,\n-              slug: product.slug,\n-              childSku: product.sku\n-            }\n-          })\"\n-          data-testid=\"productLink\"\n-          @click.native=\"$store.commit(\'ui/setMicrocart\', false)\"\n-        >\n-          {\{ product.name | htmlDecode }\}\n-        </router-link>\n-        <div class=\"h6 cl-bg-tertiary pt5 sku\" data-testid=\"productSku\">\n-          {\{ product.sku }\}\n-        </div>\n-        <div class=\"h6 cl-bg-tertiary pt5 options\" v-if=\"isOnline && product.totals && product.totals.options\">\n-          <div v-for=\"opt in product.totals.options\" :key=\"opt.label\">\n-            <span class=\"opn\">{\{ opt.label }\}: </span>\n-            <span class=\"opv\" v-html=\"opt.value\" />\n+    <div class=\"col-xs pt15 flex pl35 flex-wrap\">\n+      <div class=\"flex flex-nowrap details\">\n+        <div class=\"flex w-100 flex-wrap between-xs\">\n+          <div>\n+            <router-link\n+              class=\"serif h4 name\"\n+              :to=\"productLink\"\n+              data-testid=\"productLink\"\n+              @click.native=\"$store.commit(\'ui/setMicrocart\', false)\"\n+            >\n+              {\{ product.name | htmlDecode }\}\n+            </router-link>\n+            <div class=\"h6 cl-bg-tertiary pt5 sku\" data-testid=\"productSku\">\n+              {\{ product.sku }\}\n+            </div>\n+            <div class=\"h6 cl-bg-tertiary pt5 options\" v-if=\"isTotalsActive\">\n+              <div v-for=\"opt in product.totals.options\" :key=\"opt.label\">\n+                <span class=\"opn\">{\{ opt.label }\}: </span>\n+                <span class=\"opv\" v-html=\"opt.value\" />\n+              </div>\n+            </div>\n+            <div class=\"h6 cl-bg-tertiary pt5 options\" v-else-if=\"!editMode && product.options\">\n+              <div v-for=\"opt in product.options\" :key=\"opt.label\">\n+                <span class=\"opn\">{\{ opt.label }\}: </span>\n+                <span class=\"opv\" v-html=\"opt.value\" />\n+              </div>\n+            </div>\n+            <div class=\"h6 pt5 cl-error\" v-if=\"hasProductErrors\">\n+              {\{ product.errors | formatProductMessages }\}\n+            </div>\n+            <div class=\"h6 pt5 cl-success\" v-if=\"hasProductInfo && !hasProductErrors\">\n+              {\{ product.info | formatProductMessages }\}\n+            </div>\n           </div>\n+          <product-quantity\n+            class=\"h5 cl-accent lh25 qty\"\n+            v-if=\"product.type_id !== \'grouped\' && product.type_id !== \'bundle\'\"\n+            :value=\"productQty\"\n+            :max-quantity=\"maxQuantity\"\n+            :loading=\"isStockInfoLoading\"\n+            :is-simple-or-configurable=\"isSimpleOrConfigurable\"\n+            @input=\"updateProductQty\"\n+            @error=\"handleQuantityError\"\n+          />\n         </div>\n-        <div class=\"h6 cl-bg-tertiary pt5 options\" v-else-if=\"product.options\">\n-          <div v-for=\"opt in product.options\" :key=\"opt.label\">\n-            <span class=\"opn\">{\{ opt.label }\}: </span>\n-            <span class=\"opv\" v-html=\"opt.value\" />\n+        <div class=\"flex mr10 align-right start-xs between-sm prices\">\n+          <div class=\"prices\" v-if=\"!displayItemDiscounts || !isOnline\">\n+            <span class=\"h4 serif cl-error price-special\" v-if=\"product.special_price\">\n+              {\{ product.price_incl_tax * product.qty | price }\}\n+            </span>\n+            <span class=\"h6 serif price-original\" v-if=\"product.special_price\">\n+              {\{ product.original_price_incl_tax * product.qty | price }\}\n+            </span>\n+            <span class=\"h4 serif price-regular\" v-else data-testid=\"productPrice\">\n+              {\{ (product.original_price_incl_tax ? product.original_price_incl_tax : product.price_incl_tax) * product.qty | price }\}\n+            </span>\n+          </div>\n+          <div class=\"prices\" v-else-if=\"isOnline && product.totals\">\n+            <span class=\"h4 serif cl-error price-special\" v-if=\"product.totals.discount_amount\">\n+              {\{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price }\}\n+            </span>\n+            <span class=\"h6 serif price-original\" v-if=\"product.totals.discount_amount\">\n+              {\{ product.totals.row_total_incl_tax | price }\}\n+            </span>\n+            <span class=\"h4 serif price-regular\" v-if=\"!product.totals.discount_amount\">\n+              {\{ product.totals.row_total_incl_tax | price }\}\n+            </span>\n+          </div>\n+          <div class=\"prices\" v-else>\n+            <span class=\"h4 serif price-regular\">\n+              {\{ (product.regular_price || product.price_incl_tax) * product.qty | price }\}\n+            </span>\n           </div>\n         </div>\n-        <div class=\"h6 pt5 cl-error\" v-if=\"product.errors && Object.keys(product.errors).length > 0\">\n-          {\{ product.errors | formatProductMessages }\}\n-        </div>\n-        <div class=\"h6 pt5 cl-success\" v-if=\"product.info && Object.keys(product.info).length > 0 && Object.keys(product.errors).length === 0\">\n-          {\{ product.info | formatProductMessages }\}\n-        </div>\n-      </div>\n-      <div class=\"h5 pt5 cl-accent lh25 qty\">\n-        <base-input-number\n-          :name=\"$t(\'Quantity\')\"\n-          :value=\"product.qty\"\n-          @input=\"updateQuantity\"\n-          :min=\"1\"\n-        />\n-      </div>\n-    </div>\n-    <div class=\"flex py15 mr10 align-right start-xs between-sm actions\">\n-      <div class=\"prices\" v-if=\"!displayItemDiscounts || !isOnline\">\n-        <span class=\"h4 serif cl-error price-special\" v-if=\"product.special_price\">\n-          {\{ product.priceInclTax * product.qty | price }\}&nbsp;\n-        </span>\n-        <span class=\"h6 serif price-original\" v-if=\"product.special_price\">\n-          {\{ product.originalPriceInclTax * product.qty | price }\}\n-        </span>\n-        <span class=\"h4 serif price-regular\" v-else data-testid=\"productPrice\">\n-          {\{ (product.originalPriceInclTax ? product.originalPriceInclTax : product.priceInclTax) * product.qty | price }\}\n-        </span>\n-      </div>\n-      <div class=\"prices\" v-else-if=\"isOnline && product.totals\">\n-        <span class=\"h4 serif cl-error price-special\" v-if=\"product.totals.discount_amount\">\n-          {\{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price }\}&nbsp;\n-        </span>\n-        <span class=\"h6 serif price-original\" v-if=\"product.totals.discount_amount\">\n-          {\{ product.totals.row_total_incl_tax | price }\}\n-        </span>\n-        <span class=\"h4 serif price-regular\" v-if=\"!product.totals.discount_amount\">\n-          {\{ product.totals.row_total_incl_tax | price }\}\n-        </span>\n-      </div>\n-      <div class=\"prices\" v-else>\n-        <span class=\"h4 serif price-regular\">\n-          {\{ product.regular_price * product.qty | price }\}\n-        </span>\n       </div>\n-      <div class=\"links\">\n-        <div class=\"mt5\" @click=\"removeItem\">\n-          <remove-button />\n+      <div class=\"w-100 pb15 flex flex-wrap bottom-xs\" v-if=\"editMode\">\n+        <div class=\"ml0 flex flex-wrap filters\" v-if=\"productsAreReconfigurable\">\n+          <div class=\"h5 pt5 w-100\" v-for=\"(option, index) in product.configurable_options\" :key=\"index\">\n+            <div class=\"h6 cl-bg-tertiary mr10\">\n+              {\{ option.label }\}:\n+            </div>\n+            <div class=\"flex flex-wrap pt5\" v-if=\"option.label == \'Color\' && editMode\">\n+              <color-selector\n+                v-for=\"filter in getAvailableFilters[option.attribute_code]\"\n+                v-if=\"isOptionAvailable(filter)\"\n+                :key=\"filter.id\"\n+                :variant=\"filter\"\n+                :selected-filters=\"getSelectedOptions\"\n+                @change=\"changeEditModeFilter\"\n+              />\n+            </div>\n+            <div class=\"flex flex-wrap pt5\" v-else-if=\"option.label == \'Size\' && editMode\">\n+              <size-selector\n+                class=\"mr10 mb10\"\n+                v-for=\"filter in getAvailableFilters[option.attribute_code]\"\n+                v-if=\"isOptionAvailable(filter)\"\n+                :key=\"filter.id\"\n+                :variant=\"filter\"\n+                :selected-filters=\"getSelectedOptions\"\n+                @change=\"changeEditModeFilter\"\n+              />\n+            </div>\n+          </div>\n         </div>\n+        <button-full\n+          class=\"update-button mb10 mr10\"\n+          @click.native=\"updateProductVariant\"\n+          :disabled=\"isUpdateCartDisabled\"\n+        >\n+          {\{ $t(\'Update item\') }\}\n+        </button-full>\n+      </div>\n+      <div class=\"w-100 flex middle-xs actions\" v-if=\"!editMode\">\n+        <edit-button class=\"mx5\" @click=\"openEditMode\" v-if=\"productsAreReconfigurable && !editMode\" />\n+        <remove-button class=\"mx5\" @click=\"removeItem\" />\n       </div>\n     </div>\n   </li>\n </template>\n",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro-prod-1").innerHTML = dMicroProd1;
</script> 

Here we replaced template.

 - Now fix script as follows at `135` : 

<div id="d-micro-prod-2">

</div>
<script>
var dMicroProd2 = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Microcart/Product.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/Product.vue\n@@ -1,131 +1,312 @@\n <script>\n+import { mapActions } from \'vuex\'\n import config from \'config\'\n+import { currentStoreView } from \'@vue-storefront/core/lib/multistore\'\n+import { formatProductLink } from \'@vue-storefront/core/modules/url/helpers\'\n import Product from \'@vue-storefront/core/compatibility/components/blocks/Microcart/Product\'\n \n+import ProductQuantity from \'theme/components/core/ProductQuantity.vue\'\n import ProductImage from \'theme/components/core/ProductImage\'\n+import ColorSelector from \'theme/components/core/ColorSelector.vue\'\n+import SizeSelector from \'theme/components/core/SizeSelector.vue\'\n import RemoveButton from \'./RemoveButton\'\n-import BaseInputNumber from \'theme/components/core/blocks/Form/BaseInputNumber\'\n+import EditButton from \'./EditButton\'\n import { onlineHelper } from \'@vue-storefront/core/helpers\'\n+import { ProductOption } from \'@vue-storefront/core/modules/catalog/components/ProductOption\'\n+import { getThumbnailForProduct, getProductConfiguration } from \'@vue-storefront/core/modules/cart/helpers\'\n+import ButtonFull from \'theme/components/theme/ButtonFull\'\n+import EditMode from \'./EditMode\'\n \n export default {\n+  data () {\n+    return {\n+      maxQuantity: 0,\n+      quantityError: false,\n+      isStockInfoLoading: false\n+    }\n+  },\n+  props: {\n+    product: {\n+      type: Object,\n+      required: true\n+    }\n+  },\n   components: {\n     RemoveButton,\n-    BaseInputNumber,\n-    ProductImage\n+    ProductImage,\n+    ColorSelector,\n+    SizeSelector,\n+    EditButton,\n+    ButtonFull,\n+    ProductQuantity\n   },\n-  mixins: [Product],\n+  mixins: [Product, ProductOption, EditMode],\n   computed: {\n+    hasProductInfo () {\n+      return this.product.info && Object.keys(this.product.info).length > 0\n+    },\n+    hasProductErrors () {\n+      return this.product.errors && Object.keys(this.product.errors).length > 0\n+    },\n+    isTotalsActive () {\n+      return this.isOnline && !this.editMode && this.product.totals && this.product.totals.options\n+    },\n     isOnline () {\n       return onlineHelper.isOnline\n     },\n+    productsAreReconfigurable () {\n+      return config.cart.productsAreReconfigurable && this.product.type_id === \'configurable\' && this.isOnline\n+    },\n+    displayItemDiscounts () {\n+      return config.cart.displayItemDiscounts\n+    },\n     image () {\n       return {\n         loading: this.thumbnail,\n         src: this.thumbnail\n       }\n+    },\n+    thumbnail () {\n+      return getThumbnailForProduct(this.product)\n+    },\n+    configuration () {\n+      return getProductConfiguration(this.product)\n+    },\n+    productLink () {\n+      return formatProductLink(this.product, currentStoreView().storeCode)\n+    },\n+    editMode () {\n+      return this.getEditingProductId === this.product.id\n+    },\n+    productQty () {\n+      return this.editMode ? this.getEditingQty : this.product.qty\n+    },\n+    isSimpleOrConfigurable () {\n+      return [\'simple\', \'configurable\'].includes(this.product.type_id)\n+    },\n+    isUpdateCartDisabled () {\n+      return this.quantityError ||\n+        this.isStockInfoLoading ||\n+        (this.isOnline && !this.maxQuantity && this.isSimpleOrConfigurable)\n     }\n   },\n-  data () {\n-    return {\n-      displayItemDiscounts: config.cart.displayItemDiscounts\n+  methods: {\n+    updateProductVariant () {\n+      this.updateVariant()\n+      this.closeEditMode()\n+    },\n+    updateProductQty (qty) {\n+      if (this.editMode) {\n+        this.editModeSetQty(qty)\n+        return\n+      }\n+\n+      this.updateQuantity(qty)\n+    },\n+    removeFromCart () {\n+      this.$store.dispatch(\'cart/removeItem\', { product: this.product })\n+    },\n+    updateQuantity (quantity) {\n+      this.$store.dispatch(\'cart/updateQuantity\', { product: this.product, qty: quantity })\n+    },\n+    async getQuantity (product) {\n+      if (this.isStockInfoLoading) return // stock info is already loading\n+      this.isStockInfoLoading = true\n+      try {\n+        const validProduct = product || this.product\n+        const res = await this.$store.dispatch(\'stock/check\', {\n+          product: validProduct,\n+          qty: this.productQty\n+        })\n+        return res.qty\n+      } finally {\n+        this.isStockInfoLoading = false\n+      }\n+    },\n+    handleQuantityError (error) {\n+      this.quantityError = error\n+    },\n+    async changeEditModeFilter (filter) {\n+      const editedProduct = this.getEditedProduct(filter)\n+      const maxQuantity = await this.getQuantity(editedProduct)\n+      if (!maxQuantity) {\n+        this.$store.dispatch(\'notification/spawnNotification\', {\n+          type: \'error\',\n+          message: this.$t(\n+            \'The product is out of stock and cannot be added to the cart!\'\n+          ),\n+          action1: { label: this.$t(\'OK\') }\n+        })\n+      } else if (maxQuantity < this.productQty) {\n+        this.$store.dispatch(\'notification/spawnNotification\', {\n+          type: \'error\',\n+          message: this.$t(\'Only {maxQuantity} products of this type are available!\', { maxQuantity }),\n+          action1: { label: this.$t(\'OK\') }\n+        })\n+      } else {\n+        this.maxQuantity = maxQuantity\n+        this.editModeSetFilters(filter)\n+      }\n+    }\n+  },\n+  watch: {\n+    isOnline: {\n+      async handler (isOnline) {\n+        if (isOnline) {\n+          const maxQuantity = await this.getQuantity()\n+          this.maxQuantity = maxQuantity\n+        }\n+      },\n+      immediate: true\n     }\n   }\n }\n<\/script>",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro-prod-2").innerHTML = dMicroProd2;
</script> 


As you can see here, we added `EditMode` in _Microcart_. Many things were considered in doing so, e.g. `color`, `size`, `option`, _multistores_ and so on. 


 - Time to fix _styles_ : 


<div id="d-micro-prod-3">

</div>
<script>
var dMicroProd3 = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Microcart/Product.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/Product.vue\n@@ -1,131 +1,312 @@ <style lang=\"scss\" scoped>\n+@import \'~theme/css/variables/colors\';\n+@import \'~theme/css/helpers/functions/color\';\n+  .blend {\n+    flex: 0 0 150px;\n+  }\n+\n   .image {\n     mix-blend-mode: multiply;\n     vertical-align: top;\n@@ -136,10 +317,9 @@ export default {\n   }\n \n   .details {\n-    flex-direction: column;\n-    @media (max-width: 767px) {\n-      padding: 0 10px 0 20px;\n-    }\n+    flex: 1 1 auto;\n+    display: flex;\n+    flex-flow: row wrap;\n   }\n \n   .name {\n@@ -155,22 +335,23 @@ export default {\n   }\n \n   .qty {\n+    padding-right: 30px;\n+\n     @media (max-width: 767px) {\n       font-size: 12px;\n     }\n   }\n \n   .actions {\n+    margin: 0 -5px;\n+  }\n+\n+  .prices {\n     flex-direction: column;\n     @media (max-width: 767px) {\n       padding: 0;\n       font-size: 12px;\n     }\n-    .links {\n-      @media (max-width: 767px) {\n-        margin-top: 20px;\n-      }\n-    }\n   }\n \n   .price-special {\n@@ -183,12 +364,6 @@ export default {\n     text-decoration: line-through;\n   }\n \n-  .price-regular {\n-    @media (max-width: 767px) {\n-      font-size: 14px;\n-    }\n-  }\n-\n   input {\n     width: 30px;\n   }\n@@ -196,4 +371,23 @@ export default {\n   .flex-nowrap {\n     flex-wrap: nowrap;\n   }\n+\n+  .flex-wrap {\n+    flex-wrap: wrap;\n+  }\n+\n+  .edit-mode {\n+    border-bottom: 1px solid color(white-smoke);\n+  }\n+\n+  .filters {\n+    flex: 1 1 200px;\n+  }\n+\n+  .update-button {\n+    font-size: 14px;\n+    min-width: 150px;\n+    width: 150px;\n+    padding: 10px;\n+  }\n </style>",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro-prod-3").innerHTML = dMicroProd3;
</script> 


 - Move on to next file `./src/themes/degi/components/core/blocks/Microcart/RemoveButton.vue` and fix it at `2` as follows : 


<div id="d-micro-remove">

</div>
<script>
var dMicroRemove = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/components/core/blocks/Microcart/RemoveButton.vue\n+++ b/src/themes/degi/components/core/blocks/Microcart/RemoveButton.vue\n@@ -1,5 +1,5 @@\n <template>\n-  <button class=\"brdr-none bg-cl-transparent p0 middle-xs inline-flex cl-secondary\">\n+  <button @click=\"$emit(\'click\')\" class=\"brdr-none bg-cl-transparent p0 middle-xs inline-flex cl-secondary\">\n     <span class=\"hidden-xs h6\">\n       {\{ $t(\'Remove\') }\}\n     </span>\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-micro-remove").innerHTML = dMicroRemove;
</script>


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
