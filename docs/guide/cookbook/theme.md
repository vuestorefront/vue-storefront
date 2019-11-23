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
  - [Category](#_11-the-next-big-chunk-to-take-care-of-is-category-from-pages)
  - [Checkout](#_12-now-look-into-checkout-from-pages)
  - [Compare](#_13-next-is-compare-in-pages)
  - [MyAccount](#_14-here-comes-myaccount-in-pages)
  - [PageNotFound](#_15-another-page-pagenotfound-in-pages)
  - [Product](#_16-another-big-update-for-product-in-pages)
  - [Static](#_17-now-static-in-pages)

- Core components
  - Blocks
    - [Microcart](#_6-now-you-are-ok-with-home-page-but-there-are-still-subtle-changes-made-to-each-corner-of-the-app-let-s-find-them-out)
    - [Auth](#_18-time-to-work-on-auth-part)
      - ForgotPass
      - Login
      - Register
    - Category
      - [Sidebar](#_19-next-block-to-fix-is-category-sidebar)
    - [Checkout](#_20-next-block-to-fix-is-checkout)
      - OrderConfirmation
      - OrderReview
      - Payment
      - Product
      - Shipping
      - ThankYouPage
    - CMS
      - [Block](#_21-move-on-to-cms-block)
    - Compare
      - [AddToCompare](#_22-copy-addtocompare)
    - [Footer](#_23-time-for-footer-block)
      - Footer
      - MinimalFooter
      - NewsLetter
    - Form
      - [BaseInputNumber](#_24-baseinputnumber-needs-update)
    - [Header](#_25-header-needs-fix-too)
      - CompareIcon
      - Header
      - MicroCartIcon
      - MinimalHeader
      - WishListIcon
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


#### 10. Next target is _Breadcrumb_. Now _Breadcrumb_ supports the multistore feature. 

 - Open `./src/themes/degi/components/core/Breadcrumbs.vue` and fix them as follows : 



<div id="d-bread">

</div>
<script>
var dBread = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/components/core/Breadcrumbs.vue\n+++ b/src/themes/degi/components/core/Breadcrumbs.vue\n@@ -1,20 +1,52 @@\n <template>\n   <div class=\"breadcrumbs h5 cl-gray\">\n-    <span v-for=\"link in routes\" :key=\"link.route_link\">\n-      <router-link :to=\"localizedRoute(link.route_link)\">\n+    <span v-for=\"link in paths\" :key=\"link.route_link\">\n+      <router-link :to=\"link.route_link\">\n         {\{ link.name | htmlDecode }\}\n       </router-link> /\n     </span>\n     <span class=\"cl-mine-shaft\">\n-      {\{ activeRoute | htmlDecode }\}\n+      {\{ current | htmlDecode }\}\n     </span>\n   </div>\n </template>\n \n <script>\n-import Breadcrumbs from \'@vue-storefront/core/compatibility/components/Breadcrumbs\'\n+import { localizedRoute, currentStoreView } from \'@vue-storefront/core/lib/multistore\'\n+import i18n from \'@vue-storefront/i18n\'\n \n export default {\n-  mixins: [Breadcrumbs]\n+  computed: {\n+    paths () {\n+      const routes = this.routes ? this.routes : this.$store.state.breadcrumbs.routes\n+\n+      if (this.withHomepage) {\n+        return [\n+          { name: i18n.t(\'Homepage\'), route_link: localizedRoute(\'/\', currentStoreView().storeCode) },\n+          ...routes\n+        ]\n+      }\n+\n+      return routes\n+    },\n+    current () {\n+      return this.activeRoute || this.$store.state.breadcrumbs.current\n+    }\n+  },\n+  props: {\n+    routes: {\n+      type: Array,\n+      required: false,\n+      default: null\n+    },\n+    withHomepage: {\n+      type: Boolean,\n+      default: false\n+    },\n+    activeRoute: {\n+      type: String,\n+      default: \'\'\n+    }\n+  }\n }\n <\/script>\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-bread").innerHTML = dBread;
</script>

 As you can see, `paths` are _computed_ for allocating storeviews. Now clicking on a breadcrumb link brings you to the link of designated storeview as it's supposed to.

#### 11. The next big chunk to take care of is _Category_ from _pages_.

 - Go to `./src/themes/degi/pages/Category.vue` and overhaul it as follows : 


<div id="d-cate">

</div>
<script>
var dCategory = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/pages/Category.vue\n+++ b/src/themes/degi/pages/Category.vue\n@@ -2,17 +2,21 @@\n   <div id=\"category\">\n     <header class=\"bg-cl-secondary py35 pl20\">\n       <div class=\"container\">\n-        <breadcrumbs :routes=\"breadcrumbs.routes\" :active-route=\"category.name\" />\n+        <breadcrumbs :routes=\"getBreadcrumbs\" :active-route=\"getCurrentCategory.name\" />\n         <div class=\"row middle-sm\">\n           <h1 class=\"col-sm-8 category-title mb10\">\n-            {\{ category.name }\}\n+            {\{ getCurrentCategory.name }\}\n           </h1>\n           <div class=\"sorting col-sm-2 align-right mt50\">\n             <label class=\"mr10\">{\{ $t(\'Columns\') }\}:</label>\n             <columns @change-column=\"columnChange\" />\n           </div>\n           <div class=\"sorting col-sm-2 align-right mt50\">\n-            <sort-by :has-label=\"true\" />\n+            <sort-by\n+              :has-label=\"true\"\n+              @change=\"changeFilter\"\n+              :value=\"getCurrentSearchQuery.sort\"\n+            />\n           </div>\n         </div>\n       </div>\n@@ -25,7 +29,10 @@\n             {\{ $t(\'Filters\') }\}\n           </button>\n           <div class=\"mobile-sorting col-xs-6 mt25\">\n-            <sort-by />\n+            <sort-by\n+              @change=\"changeFilter\"\n+              :value=\"getCurrentSearchQuery.sort\"\n+            />\n           </div>\n         </div>\n       </div>\n@@ -33,13 +40,13 @@\n     <div class=\"container pb60\">\n       <div class=\"row m0 pt15\">\n         <div class=\"col-md-3 start-xs category-filters\">\n-          <sidebar :filters=\"filters.available\" />\n+          <sidebar :filters=\"getAvailableFilters\" @changeFilter=\"changeFilter\" />\n         </div>\n         <div class=\"col-md-3 start-xs mobile-filters\" v-show=\"mobileFilters\">\n           <div class=\"close-container absolute w-100\">\n             <i class=\"material-icons p15 close cl-accent\" @click=\"closeFilters\">close</i>\n           </div>\n-          <sidebar class=\"mobile-filters-body\" :filters=\"filters.available\" />\n+          <sidebar class=\"mobile-filters-body\" :filters=\"getAvailableFilters\" @changeFilter=\"changeFilter\" />\n           <div class=\"relative pb20 pt15\">\n             <div class=\"brdr-top-1 brdr-cl-primary absolute divider w-100\" />\n           </div>\n@@ -52,7 +59,7 @@\n         </div>\n         <div class=\"col-md-9 px10 border-box products-list\">\n           <p class=\"col-xs-12 end-md m0 pb20 cl-secondary\">\n-            {\{ productsTotal }\} {\{ $t(\'items\') }\}\n+            {\{ $t(\'{count} items\', { count: getCategoryProductsTotal }) }\}\n           </p>\n           <div v-if=\"isCategoryEmpty\" class=\"hidden-xs\">\n             <h4 data-testid=\"noProductsInfo\">\n@@ -60,7 +67,10 @@\n             </h4>\n             <p>{\{ $t(\'Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!\') }\}</p>\n           </div>\n-          <product-listing :columns=\"defaultColumn\" :products=\"products\" />\n+          <lazy-hydrate :trigger-hydration=\"!loading\" v-if=\"isLazyHydrateEnabled\">\n+            <product-listing :columns=\"defaultColumn\" :products=\"getCategoryProducts\" />\n+          </lazy-hydrate>\n+          <product-listing v-else :columns=\"defaultColumn\" :products=\"getCategoryProducts\" />\n         </div>\n       </div>\n     </div>\n@@ -68,17 +78,38 @@\n </template>\n \n <script>\n-import Category from \'@vue-storefront/core/pages/Category\'\n+import LazyHydrate from \'vue-lazy-hydration\'\n import Sidebar from \'../components/core/blocks/Category/Sidebar.vue\'\n import ProductListing from \'../components/core/ProductListing.vue\'\n import Breadcrumbs from \'../components/core/Breadcrumbs.vue\'\n import SortBy from \'../components/core/SortBy.vue\'\n+import { isServer } from \'@vue-storefront/core/helpers\'\n+import { getSearchOptionsFromRouteParams } from \'@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers\'\n+import config from \'config\'\n import Columns from \'../components/core/Columns.vue\'\n import ButtonFull from \'theme/components/theme/ButtonFull.vue\'\n-// import builder from \'bodybuilder\'\n+import { mapGetters } from \'vuex\'\n+import onBottomScroll from \'@vue-storefront/core/mixins/onBottomScroll\'\n+import rootStore from \'@vue-storefront/core/store\';\n+import { catalogHooksExecutors } from \'@vue-storefront/core/modules/catalog-next/hooks\'\n+\n+const composeInitialPageState = async (store, route, forceLoad = false) => {\n+  try {\n+    const filters = getSearchOptionsFromRouteParams(route.params)\n+    const cachedCategory = store.getters[\'category-next/getCategoryFrom\'](route.path)\n+    const currentCategory = cachedCategory && !forceLoad ? cachedCategory : await store.dispatch(\'category-next/loadCategory\', { filters })\n+    await store.dispatch(\'category-next/loadCategoryProducts\', {route, category: currentCategory})\n+    const breadCrumbsLoader = store.dispatch(\'category-next/loadCategoryBreadcrumbs\', currentCategory)\n+    if (isServer) await breadCrumbsLoader\n+    catalogHooksExecutors.categoryPageVisited(currentCategory)\n+  } catch (e) {\n+    console.error(\'Problem with setting Category initial data!\', e)\n+  }\n+}\n \n export default {\n   components: {\n+    LazyHydrate,\n     ButtonFull,\n     ProductListing,\n     Breadcrumbs,\n@@ -86,17 +117,52 @@ export default {\n     SortBy,\n     Columns\n   },\n+  mixins: [onBottomScroll],\n   data () {\n     return {\n       mobileFilters: false,\n-      defaultColumn: 3\n+      defaultColumn: 3,\n+      loadingProducts: false,\n+      loading: true\n+    }\n+  },\n+  computed: {\n+    ...mapGetters({\n+      getCurrentSearchQuery: \'category-next/getCurrentSearchQuery\',\n+      getCategoryProducts: \'category-next/getCategoryProducts\',\n+      getCurrentCategory: \'category-next/getCurrentCategory\',\n+      getCategoryProductsTotal: \'category-next/getCategoryProductsTotal\',\n+      getAvailableFilters: \'category-next/getAvailableFilters\'\n+    }),\n+    isLazyHydrateEnabled () {\n+      return config.ssr.lazyHydrateFor.includes(\'category-next.products\')\n+    },\n+    isCategoryEmpty () {\n+      return this.getCategoryProductsTotal === 0\n+    },\n+    getBreadcrumbs () {\n+      return this.$store.getters[\'category-next/getBreadcrumbs\'].filter(breadcrumb => breadcrumb.name !== this.getCurrentCategory.name)\n     }\n   },\n   async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it\'s always executed before parent component methods\n-    await store.dispatch(\'category/mergeSearchOptions\', { // this is just an example how can you modify the search criteria in child components\n-      sort: store.state.config.products.defaultSortBy.attribute + (store.state.config.products.defaultSortBy.order ? \':\' + store.state.config.products.defaultSortBy.order : \'\')\n-      // searchProductQuery: builder().query(\'range\', \'price\', { \'gt\': 0 }).andFilter(\'range\', \'visibility\', { \'gte\': 2, \'lte\': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query\n-    })\n+    await composeInitialPageState(store, route)\n+  },\n+  async beforeRouteEnter (to, from, next) {\n+    if (isServer) next() // SSR no need to invoke SW caching here\n+    else if (!from.name) { // SSR but client side invocation, we need to cache products and invoke requests from asyncData for offline support\n+      next(async vm => {\n+        vm.loading = true\n+        await composeInitialPageState(vm.$store, to, true)\n+        await vm.$store.dispatch(\'category-next/cacheProducts\', { route: to }) // await here is because we must wait for the hydration\n+        vm.loading = false\n+      })\n+    } else { // Pure CSR, with no initial category state\n+      next(async vm => {\n+        vm.loading = true\n+        vm.$store.dispatch(\'category-next/cacheProducts\', { route: to })\n+        vm.loading = false\n+      })\n+    }\n   },\n   methods: {\n     openFilters () {\n@@ -105,18 +171,24 @@ export default {\n     closeFilters () {\n       this.mobileFilters = false\n     },\n-    notify () {\n-      this.$store.dispatch(\'notification/spawnNotification\', {\n-        type: \'error\',\n-        message: this.$t(\'Please select the field which You like to sort by\'),\n-        action1: { label: this.$t(\'OK\') }\n-      })\n+    async changeFilter (filterVariant) {\n+      this.$store.dispatch(\'category-next/switchSearchFilters\', [filterVariant])\n     },\n     columnChange (column) {\n       this.defaultColumn = column\n+    },\n+    async onBottomScroll () {\n+      if (this.loadingProducts) return\n+      this.loadingProducts = true\n+      try {\n+        await this.$store.dispatch(\'category-next/loadMoreCategoryProducts\')\n+      } catch (e) {\n+        console.error(\'Problem with fetching more products\', e)\n+      } finally {\n+        this.loadingProducts = false\n+      }\n     }\n-  },\n-  mixins: [Category]\n+  }\n }\n <\/script>\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-cate").innerHTML = dCategory;
</script>

 _Lazy Hydrate_ is implemented in _Category_ page too. 
 
Many _getters_ to fetch values from _store_ are _computed_ using `mapGetters`

#### 12. Now look into _Checkout_ from _pages_

 - Go to `./src/themes/degi/pages/Checkout.vue` and fix it as follows : 


<div id="d-checkout">

</div>
<script>
var dCheckout = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/pages/Checkout.vue\n+++ b/src/themes/degi/pages/Checkout.vue\n@@ -36,6 +36,8 @@ import Payment from \'theme/components/core/blocks/Checkout/Payment\'\n import OrderReview from \'theme/components/core/blocks/Checkout/OrderReview\'\n import CartSummary from \'theme/components/core/blocks/Checkout/CartSummary\'\n import ThankYouPage from \'theme/components/core/blocks/Checkout/ThankYouPage\'\n+import { registerModule } from \'@vue-storefront/core/lib/modules\'\n+import { OrderModule } from \'@vue-storefront/core/modules/order\'\n \n export default {\n   components: {\n@@ -47,6 +49,9 @@ export default {\n     ThankYouPage\n   },\n   mixins: [Checkout],\n+  beforeCreate () {\n+    registerModule(OrderModule)\n+  },\n   methods: {\n     notifyEmptyCart () {\n       this.$store.dispatch(\'notification/spawnNotification\', {\n@@ -58,7 +63,7 @@ export default {\n     notifyOutStock (chp) {\n       this.$store.dispatch(\'notification/spawnNotification\', {\n         type: \'error\',\n-        message: chp.name + this.$t(\' is out of the stock!\'),\n+        message: chp.name + this.$t(\' is out of stock!\'),\n         action1: { label: this.$t(\'OK\') }\n       })\n     },\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-checkout").innerHTML = dCheckout;
</script>


 _Checkout_ page imports _Order_ module and register it at _beforeCreate_ hook. 

 It also fix a small typo. 


#### 13. Next is _Compare_ in _pages_

 - Go to `./src/themes/degi/pages/Compare.vue` and fix it as follows : 


<div id="d-compare">

</div>
<script>
var dCompare = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/pages/Compare.vue\n+++ b/src/themes/degi/pages/Compare.vue\n@@ -2,7 +2,7 @@\n   <div class=\"compare\">\n     <div class=\"bg-cl-secondary py35 pl20\">\n       <div class=\"container\">\n-        <breadcrumbs :routes=\"[{name: \'Homepage\', route_link: \'/\'}]\" active-route=\"Compare\" />\n+        <breadcrumbs :with-homepage=\"true\" active-route=\"Compare\" />\n         <h2>{\{ title }\}</h2>\n       </div>\n     </div>\n@@ -15,28 +15,28 @@\n                 {\{ $t(\'Products\') }\}\n               </div>\n               <ul class=\"compare__features-list\">\n-                <li class=\"compare__features-item\">\n-                  {\{ $t(\'SKU\') }\}\n-                </li>\n-                <li v-for=\"(attr, index) in all_comparable_attributes\" :key=\"index\" class=\"compare__features-item\">\n+                <li\n+                  v-for=\"(attr, index) in all_comparable_attributes\"\n+                  :key=\"index\"\n+                  class=\"compare__features-item\"\n+                >\n                   {\{ attr.default_frontend_label }\}\n                 </li>\n               </ul>\n             </div>\n             <div class=\"compare__products-wrapper\">\n               <ul class=\"compare__products-columns\">\n-                <li v-for=\"(product, index) in items\" :key=\"index\" class=\"compare__product\" data-testid=\"comparedProduct\">\n+                <li\n+                  v-for=\"(product, index) in items\"\n+                  :key=\"index\"\n+                  class=\"compare__product\"\n+                  data-testid=\"comparedProduct\"\n+                >\n                   <div class=\"compare__top-info\">\n                     <div class=\"check\" />\n                     <product-tile class=\"col-md-12 collection-product\" :product=\"product\" />\n-                    <span class=\"compare__remove\" @click=\"removeFromCompare(product)\">\n-                      <remove-button />\n-                    </span>\n                   </div>\n                   <ul class=\"compare__features-list\">\n-                    <li class=\"compare__features-item\">\n-                      {\{ product.sku }\}\n-                    </li>\n                     <li\n                       v-for=\"(attr, attIndex) in all_comparable_attributes\"\n                       :key=\"attIndex\"\n@@ -72,7 +72,6 @@\n <script>\n import Compare from \'@vue-storefront/core/pages/Compare\'\n import Breadcrumbs from \'../components/core/Breadcrumbs\'\n-import RemoveButton from \'../components/core/blocks/Compare/RemoveButton\'\n import ProductTile from \'../components/core/ProductTile\'\n import ProductAttribute from \'../components/core/blocks/Compare/ProductAttribute\'\n import i18n from \'@vue-storefront/i18n\'\n@@ -81,7 +80,6 @@ export default {\n   components: {\n     Breadcrumbs,\n     ProductTile,\n-    RemoveButton,\n     ProductAttribute\n   },\n   mixins: [Compare],\n@@ -94,7 +92,9 @@ export default {\n   metaInfo () {\n     return {\n       title: this.$route.meta.title || this.title || i18n.t(\'Compare Products\'),\n-      meta: this.$route.meta.description ? [{ vmid: \'description\', description: this.$route.meta.description }] : []\n+      meta: this.$route.meta.description\n+        ? [{ vmid: \'description\', description: this.$route.meta.description }]\n+        : []\n     }\n   }\n }\n@@ -122,7 +122,6 @@ $screen-l: 1170px;\n }\n \n .compare {\n-\n   &__products-wrapper {\n     overflow-x: auto;\n     -webkit-overflow-scrolling: touch;\n@@ -156,7 +155,7 @@ $screen-l: 1170px;\n     border-color: $border;\n     border-width: 1px 0 1px 0;\n     background-color: mix(#000, $color-white, 2%);\n-    opacity: .95;\n+    opacity: 0.95;\n \n     @media (min-width: $screen-l) {\n       width: $features-column-width;\n@@ -169,7 +168,7 @@ $screen-l: 1170px;\n     float: left;\n     width: $products-column-width-mobile;\n     text-align: center;\n-    transition: opacity .3s, visibility .3s, transform .3s;\n+    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;\n \n     @media (min-width: $screen-l) {\n       width: $products-column-width;\n@@ -198,7 +197,7 @@ $screen-l: 1170px;\n     border-color: $border;\n     border-style: solid;\n     border-width: 0 1px 0 0;\n-    transition: height .3s;\n+    transition: height 0.3s;\n     cursor: pointer;\n     background: $color-product-bg;\n     overflow: hidden;\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-compare").innerHTML = dCompare;
</script>

 _RemoveButton_  was _removed!_


#### 14. Here comes _MyAccount_ in _pages_. 


 - Go to `./src/themes/degi/pages/MyAccount.vue` and fix it as follows : 


<div id="d-my-account">

</div>
<script>
var dMyAccount = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/pages/MyAccount.vue\n+++ b/src/themes/degi/pages/MyAccount.vue\n@@ -3,7 +3,7 @@\n     <div class=\"bg-cl-secondary py35 pl20\">\n       <div class=\"container\">\n         <breadcrumbs\n-          :routes=\"[{name: \'Homepage\', route_link: \'/\'}]\"\n+          :with-homepage=\"true\"\n           active-route=\"My Account\"\n         />\n         <h1>\n@@ -45,6 +45,8 @@ import MyOrders from \'../components/core/blocks/MyAccount/MyOrders\'\n import MyOrder from \'../components/core/blocks/MyAccount/MyOrder\'\n import MyRecentlyViewed from \'../components/core/blocks/MyAccount/MyRecentlyViewed\'\n import NoSSR from \'vue-no-ssr\'\n+import {RecentlyViewedModule} from \'@vue-storefront/core/modules/recently-viewed\'\n+import {registerModule} from \'@vue-storefront/core/lib/modules\'\n \n export default {\n   data () {\n@@ -70,6 +72,9 @@ export default {\n     MyRecentlyViewed,\n     \'no-ssr\': NoSSR\n   },\n+  beforeCreate () {\n+    registerModule(RecentlyViewedModule)\n+  },\n   mixins: [MyAccount],\n   methods: {\n     notify (title) {\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-my-account").innerHTML = dMyAccount;
</script>

 _RecentlyViewed_ module is imported and registered at _beforeCreate_ hook. 

#### 15. Another page _PageNotFound_ in _pages_. 


 - Go to `./src/themes/degi/pages/PageNotFound.vue` and fix it as follows : 


<div id="d-page-not">

</div>
<script>
var dPageNotFound = Diff2Html.getPrettyHtml(
  '--- a/src/themes/degi/pages/PageNotFound.vue\n+++ b/src/themes/degi/pages/PageNotFound.vue\n@@ -49,14 +49,31 @@\n </template>\n \n <script>\n-import PageNotFound from \'@vue-storefront/core/pages/PageNotFound\'\n+import { mapGetters } from \'vuex\'\n+import { Logger } from \'@vue-storefront/core/lib/logger\'\n+import i18n from \'@vue-storefront/i18n\'\n import ProductTile from \'../components/core/ProductTile.vue\'\n \n export default {\n   name: \'PageNotFound\',\n   computed: {\n-    ourBestsellersCollection () {\n-      return this.$store.state.homepage.bestsellers\n+    ...mapGetters({\n+      ourBestsellersCollection: \'homepage/getBestsellers\'\n+    })\n+  },\n+  async asyncData ({ store, route, context }) {\n+    Logger.log(\'Entering asyncData for PageNotFound \' + new Date())()\n+    if (context) {\n+      context.output.cacheTags.add(`page-not-found`)\n+      context.server.response.statusCode = 404\n+    }\n+\n+    await store.dispatch(\'homepage/loadBestsellers\')\n+  },\n+  metaInfo () {\n+    return {\n+      title: this.$route.meta.title || i18n.t(\'404 Page Not Found\'),\n+      meta: this.$route.meta.description ? [{ vmid: \'description\', name: \'description\', content: this.$route.meta.description }] : []\n     }\n   },\n   components: {\n@@ -66,8 +83,7 @@ export default {\n     toggleSearchpanel () {\n       this.$store.commit(\'ui/setSearchpanel\', true)\n     }\n-  },\n-  mixins: [PageNotFound]\n+  }\n }\n <\/script>',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-page-not").innerHTML = dPageNotFound;
</script>

 _ourBestsellersCollection_ is fetched by _vuex_ _store_ via _mapGetters_



#### 16. Another big update for _Product_ in _pages_. 


 - Go to `./src/themes/degi/pages/Product.vue` and fix it as follows : 


<div id="d-page-prod">

</div>
<script>
var dProductPage = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/pages/Product.vue\n+++ b/src/themes/degi/pages/Product.vue\n@@ -5,184 +5,152 @@\n         <section class=\"row m0 between-xs\">\n           <div class=\"col-xs-12 col-md-6 center-xs middle-xs image\">\n             <product-gallery\n-              :offline=\"image\"\n-              :gallery=\"gallery\"\n-              :configuration=\"configuration\"\n-              :product=\"product\"\n+              :offline=\"getOfflineImage\"\n+              :gallery=\"getProductGallery\"\n+              :configuration=\"getCurrentProductConfiguration\"\n+              :product=\"getCurrentProduct\"\n             />\n           </div>\n           <div class=\"col-xs-12 col-md-5 data\">\n             <breadcrumbs\n               class=\"pt40 pb20 hidden-xs\"\n-              :routes=\"breadcrumbs.routes\"\n-              :active-route=\"breadcrumbs.name\"\n+              :routes=\"getBreadcrumbs\"\n+              :active-route=\"getCurrentProduct.name\"\n             />\n-            <h1 class=\"mb20 mt0 cl-mine-shaft product-name\" data-testid=\"productName\" itemprop=\"name\">\n-              {\{ product.name | htmlDecode }\}\n-              <web-share :title=\"product.name | htmlDecode\" text=\"Check this product!\" class=\"web-share\" />\n+            <h1\n+              class=\"mb20 mt0 cl-mine-shaft product-name\"\n+              data-testid=\"productName\"\n+              itemprop=\"name\"\n+            >\n+              {\{ getCurrentProduct.name | htmlDecode }\}\n+              <web-share\n+                :title=\"getCurrentProduct.name | htmlDecode\"\n+                text=\"Check this product!\"\n+                class=\"web-share\"\n+              />\n             </h1>\n-            <div class=\"mb20 uppercase cl-secondary\" itemprop=\"sku\" :content=\"product.sku\">\n-              {\{ $t(\'SKU\') }\}: {\{ product.sku }\}\n+            <div\n+              class=\"mb20 uppercase cl-secondary\"\n+              itemprop=\"sku\"\n+              :content=\"getCurrentProduct.sku\"\n+            >\n+              {\{ $t(\'SKU: {sku}\', { sku: getCurrentProduct.sku }) }\}\n             </div>\n             <div itemprop=\"offers\" itemscope itemtype=\"http://schema.org/Offer\">\n-              <meta itemprop=\"priceCurrency\" :content=\"currentStore.i18n.currencyCode\">\n-              <meta itemprop=\"price\" :content=\"parseFloat(product.priceInclTax).toFixed(2)\">\n+              <meta itemprop=\"priceCurrency\" :content=\"$store.state.storeView.i18n.currencyCode\">\n+              <meta itemprop=\"price\" :content=\"parseFloat(getCurrentProduct.priceInclTax).toFixed(2)\">\n               <meta itemprop=\"availability\" :content=\"structuredData.availability\">\n-              <meta itemprop=\"url\" :content=\"product.url_path\">\n-              <div\n-                class=\"mb40 price serif\"\n-                v-if=\"product.type_id !== \'grouped\'\"\n-              >\n+              <meta itemprop=\"url\" :content=\"getCurrentProduct.url_path\">\n+              <div class=\"mb40 price serif\" v-if=\"getCurrentProduct.type_id !== \'grouped\'\">\n                 <div\n                   class=\"h3 cl-secondary\"\n-                  v-if=\"product.special_price && product.priceInclTax && product.originalPriceInclTax\"\n+                  v-if=\"getCurrentProduct.special_price && getCurrentProduct.priceInclTax && getCurrentProduct.original_price_incl_tax\"\n                 >\n-                  <span class=\"h2 cl-mine-shaft weight-700\">\n-                    {\{ product.priceInclTax * product.qty | price }\}\n-                  </span>&nbsp;\n-                  <span class=\"price-original h3\">\n-                    {\{ product.originalPriceInclTax * product.qty | price }\}\n-                  </span>\n+                  <span\n+                    class=\"h2 cl-mine-shaft weight-700\"\n+                  >{\{ getCurrentProduct.priceInclTax * getCurrentProduct.qty | price }\}</span>&nbsp;\n+                  <span\n+                    class=\"price-original h3\"\n+                  >{\{ getCurrentProduct.original_price_incl_tax * getCurrentProduct.qty | price }\}</span>\n                 </div>\n                 <div\n                   class=\"h2 cl-mine-shaft weight-700\"\n-                  v-if=\"!product.special_price && product.priceInclTax\"\n+                  v-if=\"!getCurrentProduct.special_price && getCurrentProduct.priceInclTax\"\n                 >\n-                  {\{ product.qty > 0 ? product.priceInclTax * product.qty : product.priceInclTax | price }\}\n+                  {\{ getCurrentProduct.qty > 0 ? getCurrentProduct.priceInclTax * getCurrentProduct.qty : getCurrentProduct.priceInclTax | price }\}\n                 </div>\n               </div>\n-              <div\n-                class=\"cl-primary variants\"\n-                v-if=\"product.type_id ==\'configurable\' && !loading\"\n-              >\n-                <div class=\"error\" v-if=\"product.errors && Object.keys(product.errors).length > 0\">\n-                  {\{ product.errors | formatProductMessages }\}\n-                </div>\n+              <div class=\"cl-primary variants\" v-if=\"getCurrentProduct.type_id ==\'configurable\'\">\n                 <div\n-                  class=\"h5\"\n-                  v-for=\"(option, index) in product.configurable_options\"\n-                  v-if=\"(!product.errors || Object.keys(product.errors).length === 0) && Object.keys(configuration).length > 0\"\n-                  :key=\"index\"\n+                  class=\"error\"\n+                  v-if=\"getCurrentProduct.errors && Object.keys(getCurrentProduct.errors).length > 0\"\n                 >\n+                  {\{ getCurrentProduct.errors | formatProductMessages }\}\n+                </div>\n+                <div class=\"h5\" v-for=\"option in getProductOptions\" :key=\"option.id\">\n                   <div class=\"variants-label\" data-testid=\"variantsLabel\">\n                     {\{ option.label }\}\n-                    <span class=\"weight-700\">\n-                      {\{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label }\}\n-                    </span>\n+                    <span\n+                      class=\"weight-700\"\n+                    >{\{ getOptionLabel(option) }\}</span>\n                   </div>\n                   <div class=\"row top-xs m0 pt15 pb40 variants-wrapper\">\n                     <div v-if=\"option.label == \'Color\'\">\n                       <color-selector\n-                        v-for=\"(c, i) in options[option.attribute_code]\"\n-                        v-if=\"isOptionAvailable(c)\"\n-                        :key=\"i\"\n-                        :id=\"c.id\"\n-                        :label=\"c.label\"\n-                        context=\"product\"\n-                        :code=\"option.attribute_code\"\n-                        :class=\"{ active: c.id == configuration[option.attribute_code].id }\"\n+                        v-for=\"filter in getAvailableFilters[option.attribute_code]\"\n+                        :key=\"filter.id\"\n+                        :variant=\"filter\"\n+                        :selected-filters=\"getSelectedFilters\"\n+                        @change=\"changeFilter\"\n                       />\n                     </div>\n                     <div class=\"sizes\" v-else-if=\"option.label == \'Size\'\">\n                       <size-selector\n-                        v-for=\"(s, i) in options[option.attribute_code]\"\n-                        v-if=\"isOptionAvailable(s)\"\n-                        :key=\"i\"\n-                        :id=\"s.id\"\n-                        :label=\"s.label\"\n-                        context=\"product\"\n-                        :code=\"option.attribute_code\"\n                         class=\"mr10 mb10\"\n-                        :class=\"{ active: s.id == configuration[option.attribute_code].id }\"\n-                        v-focus-clean\n+                        v-for=\"filter in getAvailableFilters[option.attribute_code]\"\n+                        :key=\"filter.id\"\n+                        :variant=\"filter\"\n+                        :selected-filters=\"getSelectedFilters\"\n+                        @change=\"changeFilter\"\n                       />\n                     </div>\n                     <div :class=\"option.attribute_code\" v-else>\n                       <generic-selector\n-                        v-for=\"(s, i) in options[option.attribute_code]\"\n-                        v-if=\"isOptionAvailable(s)\"\n-                        :key=\"i\"\n-                        :id=\"s.id\"\n-                        :label=\"s.label\"\n-                        context=\"product\"\n-                        :code=\"option.attribute_code\"\n                         class=\"mr10 mb10\"\n-                        :class=\"{ active: s.id == configuration[option.attribute_code].id }\"\n-                        v-focus-clean\n+                        v-for=\"filter in getAvailableFilters[option.attribute_code]\"\n+                        :key=\"filter.id\"\n+                        :variant=\"filter\"\n+                        :selected-filters=\"getSelectedFilters\"\n+                        @change=\"changeFilter\"\n                       />\n                     </div>\n                     <span\n                       v-if=\"option.label == \'Size\'\"\n                       @click=\"openSizeGuide\"\n-                      class=\"\n-                        p0 ml30 inline-flex middle-xs no-underline h5\n-                        action size-guide pointer cl-secondary\n-                      \"\n+                      class=\"p0 ml30 inline-flex middle-xs no-underline h5 action size-guide pointer cl-secondary\"\n                     >\n                       <i class=\"pr5 material-icons\">accessibility</i>\n-                      <span>\n-                        {\{ $t(\'Size guide\') }\}\n-                      </span>\n+                      <span>{\{ $t(\'Size guide\') }\}</span>\n                     </span>\n                   </div>\n                 </div>\n               </div>\n             </div>\n             <product-links\n-              v-if=\"product.type_id ==\'grouped\' && !loading\"\n-              :products=\"product.product_links\"\n+              v-if=\"getCurrentProduct.type_id ==\'grouped\'\"\n+              :products=\"getCurrentProduct.product_links\"\n             />\n             <product-bundle-options\n-              v-if=\"product.bundle_options && product.bundle_options.length > 0 && !loading\"\n-              :product=\"product\"\n+              v-if=\"getCurrentProduct.bundle_options && getCurrentProduct.bundle_options.length > 0\"\n+              :product=\"getCurrentProduct\"\n             />\n             <product-custom-options\n-              v-else-if=\"product.custom_options && product.custom_options.length > 0 && !loading\"\n-              :product=\"product\"\n+              v-else-if=\"getCurrentProduct.custom_options && getCurrentProduct.custom_options.length > 0\"\n+              :product=\"getCurrentProduct\"\n+            />\n+            <product-quantity\n+              class=\"row m0 mb35\"\n+              v-if=\"getCurrentProduct.type_id !== \'grouped\' && getCurrentProduct.type_id !== \'bundle\'\"\n+              v-model=\"getCurrentProduct.qty\"\n+              :max-quantity=\"maxQuantity\"\n+              :loading=\"isStockInfoLoading\"\n+              :is-simple-or-configurable=\"isSimpleOrConfigurable\"\n+              show-quantity\n+              @error=\"handleQuantityError\"\n             />\n-            <div class=\"row m0 mb35\" v-if=\"product.type_id !== \'grouped\' && product.type_id !== \'bundle\'\">\n-              <base-input-number\n-                :name=\"$t(\'Quantity\')\"\n-                v-model=\"product.qty\"\n-                :min=\"1\"\n-                @blur=\"$v.$touch()\"\n-                :validations=\"[\n-                  {\n-                    condition: $v.product.qty.$error && !$v.product.qty.minValue,\n-                    text: $t(\'Quantity must be above 0\')\n-                  }\n-                ]\"\n-              />\n-            </div>\n             <div class=\"row m0\">\n               <add-to-cart\n-                :product=\"product\"\n-                :disabled=\"$v.product.qty.$error && !$v.product.qty.minValue\"\n+                :product=\"getCurrentProduct\"\n+                :disabled=\"isAddToCartDisabled\"\n                 class=\"col-xs-12 col-sm-4 col-md-6\"\n               />\n             </div>\n             <div class=\"row py40 add-to-buttons\">\n               <div class=\"col-xs-6 col-sm-3 col-md-6\">\n-                <wishlist-button :product=\"product\" />\n+                <AddToWishlist :product=\"getCurrentProduct\" />\n               </div>\n-              <div class=\"col-xs-6 col-sm-3 col-md-6 product__add-to-compare\">\n-                <button\n-                  @click=\"isOnCompare ? removeFromList(\'compare\') : addToList(\'compare\')\"\n-                  class=\"\n-                    p0 inline-flex middle-xs bg-cl-transparent brdr-none\n-                    action h5 pointer cl-secondary\n-                  \"\n-                  type=\"button\"\n-                  data-testid=\"addToCompare\"\n-                >\n-                  <i class=\"pr5 material-icons\">compare</i>\n-                  <template v-if=\"!isOnCompare\">\n-                    {\{ $t(\'Add to compare\') }\}\n-                  </template>\n-                  <template v-else>\n-                    {\{ $t(\'Remove from compare\') }\}\n-                  </template>\n-                </button>\n+              <div class=\"col-xs-6 col-sm-3 col-md-6\">\n+                <AddToCompare :product=\"getCurrentProduct\" />\n               </div>\n             </div>\n           </div>\n@@ -193,51 +161,51 @@\n       <h2 class=\"h3 m0 mb10 serif lh20 details-title\">\n         {\{ $t(\'Product details\') }\}\n       </h2>\n-      <div\n-        class=\"h4 details-wrapper\"\n-        :class=\"{\'details-wrapper--open\': detailsOpen}\"\n-      >\n+      <div class=\"h4 details-wrapper\" :class=\"{\'details-wrapper--open\': detailsOpen}\">\n         <div class=\"row between-md m0\">\n           <div class=\"col-xs-12 col-sm-6\">\n-            <div\n-              class=\"lh30 h5\"\n-              itemprop=\"description\"\n-              v-html=\"product.description\"\n-            />\n+            <div class=\"lh30 h5\" itemprop=\"description\" v-html=\"getCurrentProduct.description\" />\n           </div>\n           <div class=\"col-xs-12 col-sm-5\">\n             <ul class=\"attributes p0 pt5 m0\">\n               <product-attribute\n                 :key=\"attr.attribute_code\"\n-                v-for=\"attr in customAttributes\"\n-                :product=\"product\"\n+                v-for=\"attr in getCustomAttributes\"\n+                :product=\"getCurrentProduct\"\n                 :attribute=\"attr\"\n                 empty-placeholder=\"N/A\"\n               />\n             </ul>\n           </div>\n-          <div\n-            class=\"details-overlay\"\n-            @click=\"showDetails\"\n-          />\n+          <div class=\"details-overlay\" @click=\"showDetails\" />\n         </div>\n       </div>\n     </section>\n-    <reviews :product-id=\"originalProduct.id\" v-show=\"OnlineOnly\" />\n-    <related-products\n-      type=\"upsell\"\n-      :heading=\"$t(\'We found other products you might like\')\"\n-    />\n-    <promoted-offers single-banner />\n-    <related-products type=\"related\" />\n+    <lazy-hydrate when-idle>\n+      <reviews\n+        :product-name=\"getOriginalProduct.name\"\n+        :product-id=\"getOriginalProduct.id\"\n+        v-show=\"isOnline\"\n+      />\n+    </lazy-hydrate>\n+    <lazy-hydrate when-idle>\n+      <related-products type=\"upsell\" :heading=\"$t(\'We found other products you might like\')\" />\n+    </lazy-hydrate>\n+    <lazy-hydrate when-idle>\n+      <promoted-offers single-banner />\n+    </lazy-hydrate>\n+    <lazy-hydrate when-idle>\n+      <related-products type=\"related\" />\n+    </lazy-hydrate>\n     <SizeGuide />\n   </div>\n </template>\n",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-page-prod").innerHTML = dProductPage;
</script>

 Here, _template_ part is overhauled. 

 Data is filled up by _vuex_ _getters_. 

 _Reviews_ are also _lazy hydrated_.


 - Continue with it for the _script_ part. 

<div id="d-page-prod-2">

</div>
<script>
var dProductPage2 = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/pages/Product.vue\n+++ b/src/themes/degi/pages/Product.vue\n@@ -5,184 +5,152 @@\n <script>\n-import { minValue } from \'vuelidate/lib/validators\'\n+import i18n from \'@vue-storefront/i18n\'\n import Product from \'@vue-storefront/core/pages/Product\'\n import VueOfflineMixin from \'vue-offline/mixin\'\n+import config from \'config\'\n import RelatedProducts from \'theme/components/core/blocks/Product/Related.vue\'\n import Reviews from \'theme/components/core/blocks/Reviews/Reviews.vue\'\n import AddToCart from \'theme/components/core/AddToCart.vue\'\n@@ -246,20 +214,37 @@ import ColorSelector from \'theme/components/core/ColorSelector.vue\'\n import SizeSelector from \'theme/components/core/SizeSelector.vue\'\n import Breadcrumbs from \'theme/components/core/Breadcrumbs.vue\'\n import ProductAttribute from \'theme/components/core/ProductAttribute.vue\'\n+import ProductQuantity from \'theme/components/core/ProductQuantity.vue\'\n import ProductLinks from \'theme/components/core/ProductLinks.vue\'\n import ProductCustomOptions from \'theme/components/core/ProductCustomOptions.vue\'\n import ProductBundleOptions from \'theme/components/core/ProductBundleOptions.vue\'\n import ProductGallery from \'theme/components/core/ProductGallery\'\n+import Spinner from \'theme/components/core/Spinner\'\n import PromotedOffers from \'theme/components/theme/blocks/PromotedOffers/PromotedOffers\'\n import focusClean from \'theme/components/theme/directives/focusClean\'\n-import WebShare from \'@vue-storefront/core/modules/social-share/components/WebShare\'\n+import WebShare from \'theme/components/theme/WebShare\'\n import BaseInputNumber from \'theme/components/core/blocks/Form/BaseInputNumber\'\n import SizeGuide from \'theme/components/core/blocks/Product/SizeGuide\'\n+import AddToWishlist from \'theme/components/core/blocks/Wishlist/AddToWishlist\'\n+import AddToCompare from \'theme/components/core/blocks/Compare/AddToCompare\'\n+import { mapGetters } from \'vuex\'\n+import LazyHydrate from \'vue-lazy-hydration\'\n+import { ProductOption } from \'@vue-storefront/core/modules/catalog/components/ProductOption.ts\'\n+import { getAvailableFiltersByProduct, getSelectedFiltersByProduct } from \'@vue-storefront/core/modules/catalog/helpers/filters\'\n+import { isOptionAvailableAsync } from \'@vue-storefront/core/modules/catalog/helpers/index\'\n+import { localizedRoute, currentStoreView } from \'@vue-storefront/core/lib/multistore\'\n+import { htmlDecode } from \'@vue-storefront/core/filters\'\n+import { ReviewModule } from \'@vue-storefront/core/modules/review\'\n+import { RecentlyViewedModule } from \'@vue-storefront/core/modules/recently-viewed\'\n+import { registerModule, isModuleRegistered } from \'@vue-storefront/core/lib/modules\'\n+import { onlineHelper, isServer } from \'@vue-storefront/core/helpers\'\n+import { catalogHooksExecutors } from \'@vue-storefront/core/modules/catalog-next/hooks\'\n \n export default {\n   components: {\n-    \'WishlistButton\': () => import(/* webpackChunkName: \"wishlist\" */\'theme/components/core/blocks/Wishlist/AddToWishlist\'),\n     AddToCart,\n+    AddToCompare,\n+    AddToWishlist,\n     Breadcrumbs,\n     ColorSelector,\n     GenericSelector,\n@@ -273,20 +258,110 @@ export default {\n     Reviews,\n     SizeSelector,\n     WebShare,\n-    BaseInputNumber,\n-    SizeGuide\n+    SizeGuide,\n+    LazyHydrate,\n+    ProductQuantity\n+  },\n+  mixins: [ProductOption],\n+  directives: { focusClean },\n+  beforeCreate () {\n+    registerModule(ReviewModule)\n+    registerModule(RecentlyViewedModule)\n   },\n-  mixins: [Product, VueOfflineMixin],\n   data () {\n     return {\n-      detailsOpen: false\n+      detailsOpen: false,\n+      maxQuantity: 0,\n+      quantityError: false,\n+      isStockInfoLoading: false,\n+      hasAttributesLoaded: false\n     }\n   },\n-  directives: { focusClean },\n   computed: {\n+    ...mapGetters({\n+      getCurrentCategory: \'category-next/getCurrentCategory\',\n+      getBreadcrumbs: \'product/getProductBreadcrumbs\',\n+      getCurrentProduct: \'product/getCurrentProduct\',\n+      getProductGallery: \'product/getProductGallery\',\n+      getCurrentProductConfiguration: \'product/getCurrentProductConfiguration\',\n+      getOriginalProduct: \'product/getOriginalProduct\',\n+      attributesByCode: \'attribute/attributeListByCode\'\n+    }),\n+    getOptionLabel () {\n+      return (option) => {\n+        const configName = option.attribute_code ? option.attribute_code : option.label.toLowerCase()\n+        return this.getCurrentProductConfiguration[configName] ? this.getCurrentProductConfiguration[configName].label : configName\n+      }\n+    },\n+    isOnline (value) {\n+      return onlineHelper.isOnline\n+    },\n     structuredData () {\n       return {\n-        availability: (this.product.stock.is_in_stock) ? \'InStock\' : \'OutOfStock\'\n+        availability: this.getCurrentProduct.stock && this.getCurrentProduct.stock.is_in_stock ? \'InStock\' : \'OutOfStock\'\n+      }\n+    },\n+    getProductOptions () {\n+      if (\n+        this.getCurrentProduct.errors &&\n+        Object.keys(this.getCurrentProduct.errors).length &&\n+        Object.keys(this.getCurrentProductConfiguration).length\n+      ) {\n+        return []\n+      }\n+      return this.getCurrentProduct.configurable_options\n+    },\n+    getOfflineImage () {\n+      return {\n+        src: this.getThumbnail(this.getCurrentProduct.image, config.products.thumbnails.width, config.products.thumbnails.height),\n+        error: this.getThumbnail(this.getCurrentProduct.image, config.products.thumbnails.width, config.products.thumbnails.height),\n+        loading: this.getThumbnail(this.getCurrentProduct.image, config.products.thumbnails.width, config.products.thumbnails.height)\n+      }\n+    },\n+    getCustomAttributes () {\n+      return Object.values(this.attributesByCode).filter(a => {\n+        return a.is_visible && a.is_user_defined && (parseInt(a.is_visible_on_front) || a.is_visible_on_front === true) && this.getCurrentProduct[a.attribute_code]\n+      }).sort((a, b) => { return a.attribute_id > b.attribute_id })\n+    },\n+    getAvailableFilters () {\n+      return getAvailableFiltersByProduct(this.getCurrentProduct)\n+    },\n+    getSelectedFilters () {\n+      return getSelectedFiltersByProduct(this.getCurrentProduct, this.getCurrentProductConfiguration)\n+    },\n+    isSimpleOrConfigurable () {\n+      return [\'simple\', \'configurable\'].includes(this.getCurrentProduct.type_id)\n+    },\n+    isAddToCartDisabled () {\n+      return this.quantityError ||\n+        this.isStockInfoLoading ||\n+        (this.isOnline && !this.maxQuantity && this.isSimpleOrConfigurable)\n+    }\n+  },\n+  async mounted () {\n+    await this.$store.dispatch(\'recently-viewed/addItem\', this.getCurrentProduct)\n+  },\n+  async asyncData ({ store, route }) {\n+    const product = await store.dispatch(\'product/loadProduct\', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null })\n+    const loadBreadcrumbsPromise = store.dispatch(\'product/loadProductBreadcrumbs\', { product })\n+    if (isServer) await loadBreadcrumbsPromise\n+    catalogHooksExecutors.productPageVisited(product)\n+  },\n+  beforeRouteEnter (to, from, next) {\n+    if (isServer) {\n+      next()\n+    } else {\n+      next((vm) => {\n+        vm.getQuantity()\n+      })\n+    }\n+  },\n+  watch: {\n+    isOnline: {\n+      handler (isOnline) {\n+        if (isOnline) {\n+          this.getQuantity()\n+        }\n       }\n     }\n   },\n@@ -298,26 +373,70 @@ export default {\n     notifyOutStock () {\n       this.$store.dispatch(\'notification/spawnNotification\', {\n         type: \'error\',\n-        message: this.$t(\'The product is out of stock and cannot be added to the cart!\'),\n+        message: this.$t(\n+          \'The product is out of stock and cannot be added to the cart!\'\n+        ),\n         action1: { label: this.$t(\'OK\') }\n       })\n     },\n     notifyWrongAttributes () {\n       this.$store.dispatch(\'notification/spawnNotification\', {\n         type: \'warning\',\n-        message: this.$t(\'No such configuration for the product. Please do choose another combination of attributes.\'),\n+        message: this.$t(\n+          \'No such configuration for the product. Please do choose another combination of attributes.\'\n+        ),\n         action1: { label: this.$t(\'OK\') }\n       })\n     },\n+    changeFilter (variant) {\n+      this.$bus.$emit(\n+        \'filter-changed-product\',\n+        Object.assign({ attribute_code: variant.type }, variant)\n+      )\n+      this.getQuantity()\n+    },\n     openSizeGuide () {\n       this.$bus.$emit(\'modal-show\', \'modal-sizeguide\')\n+    },\n+    isOptionAvailable (option) { // check if the option is available\n+      const currentConfig = Object.assign({}, this.getCurrentProductConfiguration)\n+      currentConfig[option.type] = option\n+      return isOptionAvailableAsync(this.$store, { product: this.getCurrentProduct, configuration: currentConfig })\n+    },\n+    async getQuantity () {\n+      if (this.isStockInfoLoading) return // stock info is already loading\n+      this.isStockInfoLoading = true\n+      try {\n+        const res = await this.$store.dispatch(\'stock/check\', {\n+          product: this.getCurrentProduct,\n+          qty: this.getCurrentProduct.qty\n+        })\n+        this.maxQuantity = res.qty\n+      } finally {\n+        this.isStockInfoLoading = false\n+      }\n+    },\n+    handleQuantityError (error) {\n+      this.quantityError = error\n     }\n   },\n-  validations: {\n-    product: {\n-      qty: {\n-        minValue: minValue(1)\n-      }\n+  metaInfo () {\n+    const storeView = currentStoreView()\n+    return {\n+      link: [\n+        { rel: \'amphtml\',\n+          href: this.$router.resolve(localizedRoute({\n+            name: this.getCurrentProduct.type_id + \'-product-amp\',\n+            params: {\n+              parentSku: this.getCurrentProduct.parentSku ? this.getCurrentProduct.parentSku : this.getCurrentProduct.sku,\n+              slug: this.getCurrentProduct.slug,\n+              childSku: this.getCurrentProduct.sku\n+            }\n+          }, storeView.storeCode)).href\n+        }\n+      ],\n+      title: htmlDecode(this.getCurrentProduct.meta_title || this.getCurrentProduct.name),\n+      meta: this.getCurrentProduct.meta_description ? [{ vmid: \'description\', name: \'description\', content: htmlDecode(this.getCurrentProduct.meta_description) }] : []\n     }\n   }\n }\n",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-page-prod-2").innerHTML = dProductPage2;
</script>

Here once again _vuex_ _getters_ are widely used to _compute_ data. 


#### 17. Now, _Static_ in _pages_. 

- Go to `./src/themes/degi/pages/Static.vue` and fix it as follows :

<div id="d-page-static">

</div>
<script>
var dStaticPage = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/pages/Static.vue\n+++ b/src/themes/degi/pages/Static.vue\n@@ -2,7 +2,7 @@\n   <div>\n     <div class=\"bg-cl-secondary py35 pl20\">\n       <div class=\"container\">\n-        <breadcrumbs :routes=\"[{name: \'Homepage\', route_link: \'/\'}]\" :active-route=\"$props.title\" />\n+        <breadcrumbs :with-homepage=\"true\" :active-route=\"$props.title\" />\n         <h2 class=\"fs-big\">\n           {\{ $props.title }\}\n         </h2>\n@@ -35,6 +35,8 @@ import i18n from \'@vue-storefront/i18n\'\n import Breadcrumbs from \'theme/components/core/Breadcrumbs\'\n import StaticExample from \'theme/components/theme/blocks/Static/Example\'\n import StaticShortExample from \'theme/components/theme/blocks/Static/Short\'\n+import { getPathForStaticPage } from \'theme/helpers\'\n+import { localizedRoute } from \'@vue-storefront/core/lib/multistore\'\n \n export default {\n   components: {\n@@ -65,9 +67,9 @@ export default {\n   data () {\n     return {\n       navigation: [\n-        { title: i18n.t(\'About us\'), link: \'/about-us\', component: StaticExample },\n-        { title: i18n.t(\'Customer service\'), link: \'/customer-service\', component: StaticShortExample },\n-        { title: i18n.t(\'Store locator\'), link: \'/store-locator\', component: StaticExample },\n+        { title: i18n.t(\'About us\'), link: getPathForStaticPage(\'/about-us\'), component: StaticExample },\n+        { title: i18n.t(\'Customer service\'), link: getPathForStaticPage(\'/customer-service\'), component: StaticShortExample },\n+        { title: i18n.t(\'Store locator\'), link: localizedRoute(\'/store-locator\'), component: StaticExample },\n         { title: i18n.t(\'Delivery\'), link: \'/delivery\', component: StaticShortExample },\n         { title: i18n.t(\'Return policy\'), link: \'/returns\', component: StaticExample },\n         { title: i18n.t(\'Privacy policy\'), link: \'/privacy\', component: StaticShortExample },\n",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-page-static").innerHTML = dStaticPage;
</script>

 _Routing_ has been updated to support the _multistore_ feature. 


#### 18. Time to work on _Auth_ part

- Go to `./src/themes/degi/components/core/blocks/Auth/ForgotPass.vue` and fix it as follows :

<div id="d-auth-forgot">

</div>
<script>
var dAuthForgot = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Auth/ForgotPass.vue\n+++ b/src/themes/degi/components/core/blocks/Auth/ForgotPass.vue\n@@ -1,17 +1,17 @@\n <template>\n   <div>\n     <header class=\"modal-header py25 px65 h1 serif weight-700 bg-cl-secondary\">\n+      {\{ $t(\'Reset password\') }\}\n       <i\n         slot=\"close\"\n-        class=\"modal-close material-icons p15 cl-bg-tertiary\"\n+        class=\"modal-close material-icons cl-bg-tertiary\"\n         @click=\"close\"\n       >\n         close\n       </i>\n-      {\{ $t(\'Reset password\') }\}\n     </header>\n \n-    <div class=\"modal-content pt30 pb60 px65 cl-secondary\">\n+    <div class=\"modal-content bg-cl-primary pt30 pb60 px65 cl-secondary\">\n       <template v-if=\"!passwordSent\">\n         <form @submit.prevent=\"sendEmail\" novalidate>\n           <div class=\"mb20\">\n@@ -128,6 +128,14 @@ export default {\n <\/script>\n \n <style lang=\"scss\" scoped>\n+  .modal-header{\n+    display: flex;\n+    align-items: center;\n+    justify-content: space-between;\n+  }\n+  .modal-close{\n+    cursor: pointer;\n+  }\n   .modal-content {\n     @media (max-width: 400px) {\n       padding-left: 20px;",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-auth-forgot").innerHTML = dAuthForgot;
</script>


- Go to `./src/themes/degi/components/core/blocks/Auth/Login.vue` and fix it as follows :

<div id="d-auth-login">

</div>
<script>
var dAuthLogin = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Auth/Login.vue\n+++ b/src/themes/degi/components/core/blocks/Auth/Login.vue\n@@ -1,21 +1,21 @@\n <template>\n   <div>\n     <header class=\"modal-header py25 px65 h1 serif weight-700 bg-cl-secondary\">\n+      {\{ $t(\'Log in\') }\}\n       <i\n         slot=\"close\"\n-        class=\"modal-close material-icons p15 cl-bg-tertiary\"\n+        class=\"modal-close material-icons cl-bg-tertiary\"\n         @click=\"close\"\n       >\n         close\n       </i>\n-      {\{ $t(\'Log in\') }\}\n     </header>\n     <div v-if=\"hasRedirect\" class=\"pt10 pb10 px65 redirect-error\">\n       <p class=\"h5 mb0 mt0\">\n         {\{ $t(\'You need to be logged in to see this page\') }\}\n       </p>\n     </div>\n-    <div class=\"modal-content pt30 pb60 px65 cl-secondary\">\n+    <div class=\"modal-content bg-cl-primary pt30 pb60 px65 cl-secondary\">\n       <form @submit.prevent=\"login\" novalidate>\n         <base-input\n           class=\"mb10\"\n@@ -156,7 +156,14 @@ export default {\n @import \'~theme/css/helpers/functions/color\';\n $color-error: color(error);\n $white: color(white);\n-\n+  .modal-header{\n+    display: flex;\n+    align-items: center;\n+    justify-content: space-between;\n+  }\n+  .modal-close{\n+    cursor: pointer;\n+  }\n   .modal-content {\n     @media (max-width: 400px) {\n       padding-left: 20px;",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-auth-login").innerHTML = dAuthLogin;
</script>


- Go to `./src/themes/degi/components/core/blocks/Auth/Register.vue` and fix it as follows :

<div id="d-auth-register">

</div>
<script>
var dAuthRegister = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Auth/Register.vue\n+++ b/src/themes/degi/components/core/blocks/Auth/Register.vue\n@@ -1,17 +1,17 @@\n <template>\n   <div>\n     <header class=\"modal-header py25 px65 h1 serif weight-700 bg-cl-secondary\">\n+      {\{ $t(\'Register\') }\}\n       <i\n         slot=\"close\"\n-        class=\"modal-close material-icons p15 cl-bg-tertiary\"\n+        class=\"modal-close material-icons cl-bg-tertiary\"\n         @click=\"close\"\n       >\n         close\n       </i>\n-      {\{ $t(\'Register\') }\}\n     </header>\n \n-    <div class=\"modal-content pt30 pb60 px65 cl-secondary\">\n+    <div class=\"modal-content bg-cl-primary pt30 pb60 px65 cl-secondary\">\n       <form @submit.prevent=\"register\" novalidate>\n         <base-input\n           class=\"mb10\"\n@@ -37,7 +37,7 @@\n           <base-input\n             class=\"col-xs-6\"\n             type=\"text\"\n-            name=\"fist-name\"\n+            name=\"first-name\"\n             autocomplete=\"given-name\"\n             v-model=\"firstName\"\n             @blur=\"$v.firstName.$touch()\"\n@@ -204,6 +204,14 @@ export default {\n <\/script>\n \n <style lang=\"scss\" scoped>\n+  .modal-header{\n+    display: flex;\n+    align-items: center;\n+    justify-content: space-between;\n+  }\n+  .modal-close{\n+    cursor: pointer;\n+  }\n   .modal-content {\n     @media (max-width: 400px) {\n       padding-left: 20px;",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-auth-register").innerHTML = dAuthRegister;
</script>


#### 19. Next block to fix is _Category/Sidebar_

- Go to `./src/themes/degi/components/core/blocks/Category/Sidebar.vue` and fix it as follows :

<div id="d-cate-sidebar">

</div>
<script>
var dCateSidebar = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Category/Sidebar.vue\n+++ b/src/themes/degi/components/core/blocks/Category/Sidebar.vue\n@@ -27,8 +27,9 @@\n           code=\"color\"\n           v-for=\"(color, index) in filter\"\n           :key=\"index\"\n-          :id=\"color.id\"\n-          :label=\"color.label\"\n+          :variant=\"color\"\n+          :selected-filters=\"getCurrentFilters\"\n+          @change=\"$emit(\'changeFilter\', $event)\"\n         />\n       </div>\n       <div v-else-if=\"filterIndex===\'size\'\">\n@@ -38,8 +39,9 @@\n           class=\"size-select mr10 mb10\"\n           v-for=\"(size, index) in sortById(filter)\"\n           :key=\"index\"\n-          :id=\"size.id\"\n-          :label=\"size.label\"\n+          :variant=\"size\"\n+          :selected-filters=\"getCurrentFilters\"\n+          @change=\"$emit(\'changeFilter\', $event)\"\n         />\n       </div>\n       <div v-else-if=\"filterIndex===\'price\'\">\n@@ -53,6 +55,9 @@\n           :from=\"price.from\"\n           :to=\"price.to\"\n           :content=\"price.label\"\n+          :variant=\"price\"\n+          :selected-filters=\"getCurrentFilters\"\n+          @change=\"$emit(\'changeFilter\', $event)\"\n         />\n       </div>\n       <div v-else class=\"sidebar__inline-selecors\">\n@@ -62,8 +67,9 @@\n           :code=\"filterIndex\"\n           v-for=\"(option, index) in filter\"\n           :key=\"index\"\n-          :id=\"option.id\"\n-          :label=\"option.label\"\n+          :variant=\"option\"\n+          :selected-filters=\"getCurrentFilters\"\n+          @change=\"$emit(\'changeFilter\', $event)\"\n         />\n       </div>\n     </div>\n@@ -85,12 +91,11 @@\n </template>\n \n <script>\n-import Sidebar from \'@vue-storefront/core/compatibility/components/blocks/Category/Sidebar\'\n-\n import ColorSelector from \'theme/components/core/ColorSelector\'\n import SizeSelector from \'theme/components/core/SizeSelector\'\n import PriceSelector from \'theme/components/core/PriceSelector\'\n import GenericSelector from \'theme/components/core/GenericSelector\'\n+import pickBy from \'lodash-es/pickBy\'\n \n export default {\n   components: {\n@@ -99,7 +104,31 @@ export default {\n     PriceSelector,\n     GenericSelector\n   },\n-  mixins: [Sidebar]\n+  props: {\n+    filters: {\n+      type: Object,\n+      required: true\n+    }\n+  },\n+  computed: {\n+    hasActiveFilters () {\n+      return this.$store.getters[\'category-next/hasActiveFilters\']\n+    },\n+    getCurrentFilters () {\n+      return this.$store.getters[\'category-next/getCurrentFilters\']\n+    },\n+    availableFilters () {\n+      return pickBy(this.filters, (filter, filterType) => { return (filter.length && !this.$store.getters[\'category-next/getSystemFilterNames\'].includes(filterType)) })\n+    }\n+  },\n+  methods: {\n+    resetAllFilters () {\n+      this.$store.dispatch(\'category-next/resetSearchFilters\')\n+    },\n+    sortById (filters) {\n+      return [...filters].sort((a, b) => { return a.id - b.id })\n+    }\n+  }\n }\n <\/script>\n",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-cate-sidebar").innerHTML = dCateSidebar;
</script>

 _Events_ are added. 

 _Methods_ and _computed_ are also added for _filters_



#### 20. Next block to fix is _Checkout_

- Go to `./src/themes/degi/components/core/blocks/Checkout/OrderConfirmation.vue` and fix it as follows :

<div id="d-checkout-order-confirm">

</div>
<script>
var dCheckoutOrderConfirm = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Checkout/OrderConfirmation.vue\n+++ b/src/themes/degi/components/core/blocks/Checkout/OrderConfirmation.vue\n@@ -6,7 +6,7 @@\n     <div slot=\"content\">\n       <p>{\{ $t(\'Please confirm order you placed when you was offline\') }\}</p>\n       <div class=\"mb40\" v-for=\"(order, key) in ordersData\" :key=\"key\">\n-        <h3>{\{ $t(\'Order #\') }\}{\{ key + 1 }\}</h3>\n+        <h3>{\{ $t(\'Order #{id}\', { id: key + 1}) }\}</h3>\n         <h4>{\{ $t(\'Items ordered\') }\}</h4>\n         <table class=\"brdr-1 brdr-cl-bg-secondary\">\n           <thead>\n@@ -34,13 +34,13 @@\n                 </span>\n               </td>\n               <td class=\"fs-medium lh25\" :data-th=\"$t(\'Price\')\">\n-                {\{ product.priceInclTax | price }\}\n+                {\{ product.price_incl_tax | price }\}\n               </td>\n               <td class=\"fs-medium lh25 align-right\" :data-th=\"$t(\'Qty\')\">\n                 {\{ product.qty }\}\n               </td>\n               <td class=\"fs-medium lh25\" :data-th=\"$t(\'Subtotal\')\">\n-                {\{ product.priceInclTax * product.qty | price }\}\n+                {\{ product.price_incl_tax * product.qty | price }\}\n               </td>\n             </tr>\n           </tbody>",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-checkout-order-confirm").innerHTML = dCheckoutOrderConfirm;
</script>


- Go to `./src/themes/degi/components/core/blocks/Checkout/OrderReview.vue` and fix it as follows :

<div id="d-checkout-order-review">

</div>
<script>
var dCheckoutOrderReview = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Checkout/OrderReview.vue\n+++ b/src/themes/degi/components/core/blocks/Checkout/OrderReview.vue\n@@ -116,6 +116,8 @@ import ButtonFull from \'theme/components/theme/ButtonFull\'\n import CartSummary from \'theme/components/core/blocks/Checkout/CartSummary\'\n import Modal from \'theme/components/core/Modal\'\n import { OrderReview } from \'@vue-storefront/core/modules/checkout/components/OrderReview\'\n+import { OrderModule } from \'@vue-storefront/core/modules/order\'\n+import { registerModule } from \'@vue-storefront/core/lib/modules\'\n \n export default {\n   components: {\n@@ -132,6 +134,9 @@ export default {\n       }\n     }\n   },\n+  beforeCreate () {\n+    registerModule(OrderModule)\n+  },\n   methods: {\n     onSuccess () {\n     },",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-checkout-order-review").innerHTML = dCheckoutOrderReview ;
</script>

 _Order_ module is imported for registration. 


- Go to `./src/themes/degi/components/core/blocks/Checkout/Payment.vue` and fix it as follows :

<div id="d-checkout-payment">

</div>
<script>
var dCheckoutPayment = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Checkout/Payment.vue\n+++ b/src/themes/degi/components/core/blocks/Checkout/Payment.vue\n@@ -121,10 +121,16 @@\n             v-model.trim=\"payment.city\"\n             @blur=\"$v.payment.city.$touch()\"\n             autocomplete=\"address-level2\"\n-            :validations=\"[{\n+            :validations=\"[\n+            {\n               condition: $v.payment.city.$error && !$v.payment.city.required,\n               text: $t(\'Field is required\')\n-            }]\"\n+            },\n+            {\n+              condition: $v.payment.city.$error && $v.payment.city.required,\n+              text: $t(\'Please provide valid city name\')\n+            }\n+            ]\"\n           />\n \n           <base-input\n@@ -171,7 +177,7 @@\n             v-model=\"payment.country\"\n             autocomplete=\"country-name\"\n             @blur=\"$v.payment.country.$touch()\"\n-            @change=\"$v.payment.country.$touch()\"\n+            @change=\"$v.payment.country.$touch(); changeCountry();\"\n           />\n \n           <base-input",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-checkout-payment").innerHTML = dCheckoutPayment ;
</script>


- Go to `./src/themes/degi/components/core/blocks/Checkout/Product.vue` and fix it as follows :

<div id="d-checkout-product">

</div>
<script>
var dCheckoutProduct = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Checkout/Product.vue\n+++ b/src/themes/degi/components/core/blocks/Checkout/Product.vue\n@@ -1,6 +1,8 @@\n <template>\n   <div class=\"row p25 between-xs\">\n-    <product-image :image=\"image\" class=\"blend\" />\n+    <div class=\"blend\">\n+      <product-image :image=\"image\" />\n+    </div>\n     <div class=\"col-xs\">\n       <div class=\"row\">\n         <div class=\"col-xs-12 col-md-9 pb15\">\n@@ -45,9 +47,9 @@\n             <span v-if=\"!product.totals.discount_amount\" class=\"h4\">{\{ product.totals.row_total_incl_tax | price }\}</span>\n           </div>\n           <div v-else>\n-            <span class=\"h4 cl-error\" v-if=\"product.special_price\">{\{ product.priceInclTax * product.qty | price }\} </span>\n-            <span class=\"price-original h5\" v-if=\"product.special_price\">{\{ product.originalPriceInclTax * product.qty | price }\}</span>\n-            <span v-if=\"!product.special_price\" class=\"h4\">{\{ product.priceInclTax * product.qty | price }\}</span>\n+            <span class=\"h4 cl-error\" v-if=\"product.special_price\">{\{ product.price_incl_tax * product.qty | price }\} </span>\n+            <span class=\"price-original h5\" v-if=\"product.special_price\">{\{ product.original_price_incl_tax * product.qty | price }\}</span>\n+            <span v-if=\"!product.special_price\" class=\"h4\">{\{ product.price_incl_tax * product.qty | price }\}</span>\n           </div>\n         </div>\n       </div>\n@@ -84,9 +86,6 @@ export default {\n   text-decoration: line-through;\n }\n .blend {\n-  mix-blend-mode: multiply;\n-  align-self: center;\n   flex: 0 0 121px;\n-  padding-bottom: 32.68%;\n }\n </style>\n",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-checkout-product").innerHTML = dCheckoutProduct ;
</script>



- Go to `./src/themes/degi/components/core/blocks/Checkout/Shipping.vue` and fix it as follows :

<div id="d-checkout-shipping">

</div>
<script>
var dCheckoutShipping = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Checkout/Shipping.vue\n+++ b/src/themes/degi/components/core/blocks/Checkout/Shipping.vue\n@@ -112,10 +112,16 @@\n             v-model.trim=\"shipping.city\"\n             @blur=\"$v.shipping.city.$touch()\"\n             autocomplete=\"address-level2\"\n-            :validations=\"[{\n+            :validations=\"[\n+            {\n               condition: $v.shipping.city.$error && !$v.shipping.city.required,\n               text: $t(\'Field is required\')\n-            }]\"\n+            },\n+            {\n+              condition: $v.shipping.city.$error && $v.shipping.city.required,\n+              text: $t(\'Please provide valid city name\')\n+            }\n+            ]\"\n           />\n \n           <base-input",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-checkout-shipping").innerHTML = dCheckoutShipping ;
</script>


- Go to `./src/themes/degi/components/core/blocks/Checkout/ThankYouPage.vue` and fix it as follows :

<div id="d-checkout-thanks">

</div>
<script>
var dCheckoutThanks = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Checkout/ThankYouPage.vue\n+++ b/src/themes/degi/components/core/blocks/Checkout/ThankYouPage.vue\n@@ -3,7 +3,7 @@\n     <header class=\"thank-you-title bg-cl-secondary py35 pl20\">\n       <div class=\"container\">\n         <breadcrumbs\n-          :routes=\"[{name: \'Homepage\', route_link: \'/\'}]\"\n+          :with-homepage=\"true\"\n           :active-route=\"this.$t(\'Order confirmation\')\"\n         />\n         <h2 class=\"category-title\">\n@@ -19,8 +19,7 @@\n               {\{ $t(\'Your purchase\') }\}\n             </h3>\n             <p v-if=\"OnlineOnly\" v-html=\"this.$t(\'You have successfuly placed the order. You can check status of your order by using our <b>delivery status</b> feature. You will receive an order confirmation e-mail with details of your order and a link to track its progress.\')\" />\n-            <p v-if=\"OnlineOnly && lastOrderConfirmation\" v-html=\"this.$t(\'The server order id has been set to \') + lastOrderConfirmation.backendOrderId\" />\n-            <p v-if=\"OnlineOnly && lastOrderConfirmation.orderNumber\" v-html=\"this.$t(\'The OrderNumber is \') + lastOrderConfirmation.orderNumber\" />\n+            <p v-if=\"OnlineOnly && lastOrderConfirmation.orderNumber\" v-html=\"this.$t(\'The OrderNumber is {id}\', { id: lastOrderConfirmation.orderNumber })\" />\n \n             <h4 v-if=\"OfflineOnly\">\n               {\{ $t(\'You are offline\') }\}\n@@ -31,6 +30,9 @@\n             <p v-if=\"OfflineOnly && isNotificationSupported && !isPermissionGranted\">\n               {\{ $t(\"You can allow us to remind you about the order via push notification after coming back online. You\'ll only need to click on it to confirm.\") }\}\n             </p>\n+            <p v-if=\"OfflineOnly && isNotificationSupported && !isPermissionGranted\">\n+              {\{ $t(`Or if you will stay on \"Order confirmation\" page, the order will be placed automatically without confirmation, once the internet connection will be back.`) }\}\n+            </p>\n             <p v-if=\"OfflineOnly && isNotificationSupported && isPermissionGranted\">\n               <strong>{\{ $t(\'You will receive Push notification after coming back online. You can confirm the order by clicking on it\') }\}</strong>\n             </p>\n@@ -85,10 +87,15 @@ import VueOfflineMixin from \'vue-offline/mixin\'\n import { EmailForm } from \'@vue-storefront/core/modules/mailer/components/EmailForm\'\n import { isServer } from \'@vue-storefront/core/helpers\'\n import config from \'config\'\n+import { registerModule } from \'@vue-storefront/core/lib/modules\'\n+import { MailerModule } from \'@vue-storefront/core/modules/mailer\'\n \n export default {\n   name: \'ThankYouPage\',\n   mixins: [Composite, VueOfflineMixin, EmailForm],\n+  beforeCreate () {\n+    registerModule(MailerModule)\n+  },\n   data () {\n     return {\n       feedback: \'\'",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-checkout-thanks").innerHTML = dCheckoutThanks ;
</script>

 _Mailer_ module is registered and a message for offline order fulfillment is added. 


#### 21. Move on to _CMS/Block_

- Go to `./src/themes/degi/components/core/blocks/Cms/Block.vue` and fix it as follows :

<div id="d-cms-block">

</div>
<script>
var dCmsBlock = Diff2Html.getPrettyHtml(
  "--- a/src/themes/degi/components/core/blocks/Cms/Block.vue\n+++ b/src/themes/degi/components/core/blocks/Cms/Block.vue\n@@ -59,9 +59,9 @@ export default {\n   computed: {\n     getCmsData () {\n       if (this.id) {\n-        return this.$store.getters[`cmsBlock/cmsBlockId`](this.id)\n+        return this.$store.getters[`cmsBlock/getCmsBlockById`](this.id)\n       } else if (this.identifier) {\n-        return this.$store.getters[`cmsBlock/cmsBlockIdentifier`](this.identifier)\n+        return this.$store.getters[`cmsBlock/getCmsBlockByIdentifier`](this.identifier)\n       }\n       return null\n     }\n",
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById("d-cms-block").innerHTML = dCmsBlock;
</script>


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
