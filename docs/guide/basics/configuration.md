# Configuration file explained

The Vue Storefront application uses the [node-config](https://github.com/lorenwest/node-config) npm module to manage configuration files. Configuration is stored in the `/config` directory within two JSON files:

- `default.json` is a configuration file provided along with the core Vue Storefront code and updated with any new release of Vue Storefront. It contains the default values only and therefore it shouldn't be modified within your specific Vue Storefront instance.

- `local.json` is the second configuration file which is .gitignore'd from the repository. This is the place where you should store all instance-specific configuration variables.

The structure of these files is exactly the same! Vue Storefront does kind of  `Object.assign(default, local)` (but with the deep-merge). This means that the `local.json` overrides the `default.json` properties.

:::tip NOTE
Please take a look at the `node-config` docs as the library is open for some other ways to modify the configuration (using, for example the `ENV` variables).
:::

:::tip NOTE
Currently, the configuration files are being processed by the webpack during the build process. This means that whenever you apply some configuration changes, you shall rebuild the app, even when using the `yarn dev` mode. This limitation can be solved with the VS 1.4 special config variable. Now the config can be reloaded on the fly with each server request if `config.server.dynamicConfigReload`is set to true. However, in that case, the config is added to `window.**INITIAL_STATE**` with the responses.

When you using the `config.server.dynamicConfigReload` plase remember about `config.server.dynamicConfigExclude` and `config.server.dynamicConfigInclude`.
:::

Please find the configuration properties reference below.

## Server

```json
"server": {
  "host": "localhost",
  "port": 3000,
  "useHtmlMinifier": false,
  "htmlMinifierOptions": {
    "minifyJS": true,
    "minifyCSS": true
  },
  "useOutputCacheTagging": false,
  "useOutputCache": false
},
```

Vue Storefront starts an HTTP server to deliver the SSR (server-side rendered) pages and static assets. Its node.js server is located in the `core/scripts/server.js`. This is the hostname and TCP port which Vue Storefront is binding.

When the `useHtmlMinifier` is set to true the generated SSR HTML is being minified [using the `htmlMinifierOptions`](https://www.npmjs.com/package/html-minifier#options-quick-reference).

When the `useOutputCacheTagging` and `useOutputCache` options are enabled, Vue Storefront is storing the rendered pages in the Redis-based output cache. Some additional config options are available for the output cache. [Check the details](ssr-cache.md)

## Seo

```json
"seo": {
  "useUrlDispatcher": true,
  "disableUrlRoutesPersistentCache": true,
  "defaultTitle": "Vuestore"
},
```

When `config.seo.useUrlDispatcher` set to true the `product.url_path` and `category.url_path` fields are used as absolute URL addresses (no `/c` and `/p` prefixes anymore). Check the latest [`mage2vuestorefront`] snapshot and reimport Your products to properly set `url_path` fields.

For example, when the `category.url_path` is set to `women/frauen-20` the product will be available under the following URL addresses:

`http://localhost:3000/women/frauen-20`
`http://localhost:3000/de/women/frauen-20`

For, `config.seo.disableUrlRoutesPersistentCache` - to not store the url mappings; they're stored in in-memory cache anyway so no additional requests will be made to the backend for url mapping; however it might cause some issues with url routing in the offline mode (when the offline mode PWA installed on homescreen got reloaded, the in-memory cache will be cleared so there won't potentially be the url mappings; however the same like with `product/list` the ServiceWorker cache SHOULD populate url mappings anyway)

For, `config.seo.defaultTitle` is as name suggest it's default title for the store.

## Redis

```json
"redis": {
  "host": "localhost",
  "port": 6379,
  "db": 0
},
```

This is the Redis configuration for the output cache. See additional information [here](../basics/ssr-cache.md)

## GraphQL

```json
"graphql":{
  "host": "localhost",
  "port": 8080
},
```

This is an optional GraphQL endpoint. We're now supporting graphQL for the [catalog](https://docs.vuestorefront.io/guide/basics/graphql.html) and this section is being used when `server.api` is set to `graphql` (default is "api")

## ElasticSearch

```json
"elasticsearch": {
  "httpAuth": "",
  "host": "localhost:8080/api/catalog",
  "index": "vue_storefront_catalog",
  "min_score": 0.02,
  "csrTimeout": 5000,
  "ssrTimeout": 1000,
  "queryMethod": "POST"
},
```

Vue Storefront uses the Elasticsearch Query Language to query for data. However, here you're putting the Vue Storefront API `/api/catalog`  endpoint, which is a kind of Elasticsearch Proxy (dealing with the taxes, security etc.).

If your `vue-storefront-api` instance is running on the `localhost`, port `8080` then the correct elasticsearch endpoint is as presented here.

Starting from Vue Storefront v1.6, user may set `config.elasticsearch.queryMethod` either *POST* (default) or *GET*. When *GET* is set, the Elasticsearch Query object is passed to vue-storefront-api as a request parameter named *request*. By doing so, Service Worker will now be able to cache the results from Elasticsearch. Service Workers cannot cache any POST requests currently.

:::tip Notice
Service Worker is not caching the /api requests on development envs. (localhost) as the vue-storefront-api by default runs on a different port (8080).

:::

## SSR

```json
"ssr": {
  "executeMixedinAsyncData": true
},
```

By default, Vue Storefront themes are created by building a set of components that "mixins" the core-components. For example, you have `/src/themes/default/pages/Product.vue` which inherits the `/core/pages/Product.js` by having this core component included in the  `"mixins": [Product]` section.

The SSR data is being completed in the `asyncData` static method. If this configuration parameter is set to `true` (which is default) Vue Storefront will run the `asyncData` methods in the following sequence:
`core/pages/Product.js` -> `asyncData`
`src/themes/default/pages/Product.vue` -> `asyncData`

If it's set to `false`, then **just the** `src/themes/default/pages/Product.vue` -> `asyncData` will be executed.
This option is referenced in the [core/client-entry.ts](https://github.com/DivanteLtd/vue-storefront/blob/master/core/client-entry.ts) line: 85.

```json
    "lazyHydrateFor": ["category-next.products", "homepage"],
```

Filters out given properties from `window.__INITIAL_STATE__` and enables [lazy hydration](https://github.com/maoberlehner/vue-lazy-hydration) on client side
Available out of the box for `category-next.products` and `homepage`.
## Max attempt of tasks

```json
"queues": {
  "maxNetworkTaskAttempts": 1,
  "maxCartBypassAttempts": 1
},
```

This both option is used when you don't want re-attempting task of just X number time attempt task.

`maxNetworkTaskAttempts` config variable is referenced in the [core/lib/sync/task.ts](https://github.com/DivanteLtd/vue-storefront/blob/master/core/lib/sync/task.ts) and It's reattempt if user token is invalid.

`maxCartBypassAttempts`  config variable is referenced in the [core/modules/cart/store/actions.ts](https://github.com/DivanteLtd/vue-storefront/blob/master/core/modules/cart/store/actions.ts)

## Default store code

```json
"defaultStoreCode": "",
```

This option is used only in the [Multistore setup](../integrations/multistore.md). By default it's `''` but if you're running, for example, a multi-instance Vue Storefront setup and the current instance shall be connected to the `en` store on the backend, please just set it so. This config variable is referenced in the [core/lib/multistore.ts](https://github.com/DivanteLtd/vue-storefront/blob/master/core/lib/multistore.ts)

## Store views

```json
"storeViews": {
  "multistore": false,
  "commonCache": false,
  "mapStoreUrlsFor": ["de", "it"],
```

If the `storeViews.multistore` is set to `true` you'll see the `LanguageSwitcher.vue` included in the footer and all the [multistore operations](../integrations/multistore.md) will be included in the request flow.

You should add all the multistore codes to the `mapStoreUrlsFor` as this property is used by [core/lib/multistore.ts](https://github.com/DivanteLtd/vue-storefront/blob/master/core/lib/multistore.ts) -> `setupMultistoreRoutes` method to add the `/<store_code>/p/....` and other standard routes. By accessing them you're [instructing Vue Storefront to switch the current store](https://github.com/DivanteLtd/vue-storefront/blob/master/core/client-entry.ts) settings (i18n, API requests with specific storeCode etc...)

`commonCache` is refering to llocal browser cache. If it's set to false (default) the cache of cart, catalog, user data etc is shared between storeViews with default prefix (shop). Otherwise each of them is stored separately (storecode-shop prefix).

`storeViews` section contains one or more additional store views configured to serve proper i18n translations, tax settings etc. Please find the docs for this section below.

```json
  "de": {
    "storeCode": "de",
```
This attribute is not inherited through the "extend" mechanism.

```json
    "storeId": 3,
```

This is the `storeId`  as set in the backend panel. This parameter is being used by some API calls to get the specific store currency and/or tax settings.

```json
    "name": "German Store",
```

This is the store name as displayed in the `Language/Switcher.vue`.

```json
    "url": "/de",
```

This URL is used only in the `Switcher` component. Typically it equals just to `/<store_code>`. Sometimes you may like to have different store views running as separate Vue Storefront instances, even under different URL addresses. This is the situation when this property comes into action. Just take a look at how [Language/Switcher.vue](https://github.com/DivanteLtd/vue-storefront/blob/master/src/themes/default/components/core/blocks/Switcher/Language.vue) generates the list of the stores.
It accepts not only path, but also domains as well.
This attribute is not inherited through the "extend" mechanism.

```json
    "appendStoreCode": true,
```

In default configuration store codes are appended at the end of every url. If you want to use domain only as store url, you can set it to `false`.
This attribute is not inherited through the "extend" mechanism.

```json
    "elasticsearch": {
      "host": "localhost:8080/api/catalog",
      "index": "vue_storefront_catalog_de"
    },
```

ElasticSearch settings can be overridden in the specific `storeView` config. You can use different ElasticSearch instance powering specific `storeView`.

```json
    "tax": {
      "sourcePriceIncludesTax": false,
      "defaultCountry": "DE",
      "defaultRegion": "",
      "calculateServerSide": true
    },
```

Taxes section is used by the [core/modules/catalog/helpers/tax](https://github.com/DivanteLtd/vue-storefront/blob/master/core/modules/catalog/helpers/tax). When `sourcePricesIncludesTax` is set to `true` it means that the prices indexed in the ElasticSearch already consists of the taxes. If it's set to `false` the taxes will be calculated runtime.

```json
    "seo": {
      "defaultTitle": 'Vuestore'
    },
```

SEO section's `defaultTitle` is used at the set title for the specific store.

The `defaultCountry` and the `defaultRegion` settings are being used for finding the proper tax rate for the anonymous, unidentified user (which country is not yet set).

```json
    "i18n": {
      "fullCountryName": "Germany",
      "fullLanguageName": "German",
      "defaultLanguage": "DE",
      "defaultCountry": "DE",
      "defaultLocale": "de-DE",
      "currencyCode": "EUR",
      "currencySign": "EUR",
      "dateFormat": "HH:mm D-M-YYYY"
    }
  }
},
```

The internationalization settings are used by the translation engine (`defautlLocale`) and the [Language/Switcher.vue](https://github.com/DivanteLtd/vue-storefront/blob/master/src/themes/default/components/core/blocks/Switcher/Language.vue) (`fullCountryName`, `fullLanguageName`). `currencyCode` is used for some of the API calls (rendering prices, mostly) and `currencySign` is being used for displaying the prices in the frontend.


```json
   "extend": "de"
```

You can inherit settings from other storeview of your choice. Result config will be deep merged with chosen storeview by storecode set in `extend` property prioritizing current storeview values.
Keep in mind that `url`, `storeCode` and `appendStoreCode` attributes cannot be inherited from other storeviews.

## Entities

```json
"entities": {
  "optimize": true,
```

If this option is set to true, Vue Storefront will be limiting the data retrieved from the API endpoints to the `includeFields` and remove all the `excludeFields` as set for all the specific entities below. This option is set to `true` by default, as the JSON objects could be of significant size!

This option property is referenced in the [core/modules/catalog/store/product](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/catalog/store/product), [core/modules/catalog/store/category](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/catalog/store/category), [core/modules/catalog/store/attribute](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/catalog/store/attribute)

```json
  "twoStageCaching": true,
```

Vue Storefront caches all the data entities retrieved from  `vue-storefront-api` into indexedDB local cache. This is a key feature for providing users with offline mode. Unfortunately, when the `entities.optimize` option is set to `true`, we cannot cache the optimized entities, as they don't contain all the required information.

 which works like it executes two parallel server requests at once to get the required product, category, or attribute feeds. The first request is with the limited fields and the second is for full records. Only the second request is cached **but\*\*** the first (which typically ends up faster) is used for displaying the Category or Product page.

Please take a look at the [core/modules/catalog/store/category](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/catalog/store/category) for the reference.

```json
  "optimizeShoppingCart": true,
```

Vue Storefront product objects can be quite large. They consist of `configurable_children`, `media_gallery` and other information. Quite significant for rendering the Product and Category pages, but not so useful in the Shopping Cart. To limit the cart size (as it's transferred to the server while making an order), this option is being used.

Please take a look at the [core/modules/cart](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/cart).

```json
    "optimizeShoppingCartOmitFields": ["configurable_children", "configurable_options", "media_gallery", "description", "category", "category_ids", "product_links", "stock", "description"],
```

You can specify which fields get stripped out of the Cart object, by changing the `optimizeShoppingCartOmitFields` array.

```json
  "category": {
    "includeFields": [ "children_data", "id", "children_count", "sku", "name", "is_active", "parent_id", "level", "url_key", "product_count" ]
  },
  "attribute": {
    "includeFields": [ "attribute_code", "id", "entity_type_id", "options", "default_value", "is_user_defined", "frontend_label", "attribute_id", "default_frontend_label", "is_visible_on_front", "is_visible", "is_comparable" ]
  },
  "productList": {
    "sort": "",
    "includeFields": [ "type_id", "sku", "product_links", "tax_class_id", "special_price", "special_to_date", "special_from_date", "name", "price", "price_incl_tax", "original_price_incl_tax", "original_price", "special_price_incl_tax", "id", "image", "sale", "new", "url_key", "status" ],
    "excludeFields": [ "configurable_children", "description", "configurable_options", "sgn" ]
  },
  "productListWithChildren": {
    "includeFields": [ "type_id", "sku", "name", "tax_class_id", "special_price", "special_to_date", "special_from_date", "price", "priceInclTax", "original_price_incl_tax", "original_price", "special_price_incl_t_ax", "id", "image", "sale", "new", "configurable_children.image", "configurable_children.sku", "configurable_children.price", "configurable_children.special_price", "configurable_children.price_incl_tax", "configurable_children.special_price_incl_tax", "configurable_children.original_price", "configurable_children.original_price_incl_tax", "configurable_children.color", "configurable_children.size", "configurable_children.id", "product_links", "url_key", "status"],
    "excludeFields": [ "description", "sgn"]
  },
  "product": {
    "excludeFields": [ "updated_at", "created_at", "attribute_set_id", "tier_prices", "options_container", "msrp_display_actual_price_type", "has_options", "stock.manage_stock", "stock.use_config_min_qty", "stock.use_config_notify_stock_qty", "stock.stock_id",  "stock.use_config_backorders", "stock.use_config_enable_qty_inc", "stock.enable_qty_increments", "stock.use_config_manage_stock", "stock.use_config_min_sale_qty", "stock.notify_stock_qty", "stock.use_config_max_sale_qty", "stock.use_config_max_sale_qty", "stock.qty_increments", "small_image"],
    "includeFields": null
  }
},
```

These settings are used just to configure the optimization strategy for different entity types. Please take a look that we have `productListWithChildren` and the `product` configuration separately. The former one is used in the Category page -> `core/pages/Category.js`  and the latter is used in the Product page `core/pages/Product.js`

### Dynamic Categories prefetching

Starting with Vue Storefront 1.7, we added a configuration option `config.entities.category.categoriesDynamicPrefetch` (by default set to `true`). This option switches the way the category tree is fetched. Previously we were fetching the full categories tree. In some cases, it can generate a few MB of payload. Currently, with this option in place, we're prefetching the categories on demand while the user is browsing the category tree.

## Cart

```json
"cart": {
  "serverMergeByDefault": true,
```

Server cart is being synchronized with the client's cart in the Vue Storefront by default. When it's not set, the Vue Storefront will execute the server cart merge algorithm anyway, but using the `dryRun` option, which means that only the following event will be emitted:

```js
EventBus.$emit('servercart-after-diff', {
  diffLog: diffLog,
  serverItems: serverItems,
  clientItems: clientItems,
  dryRun: event.dry_run,
  event: event,
}); // send the difflog
```

In the event handler, one can handle the merge process manually. For example, displaying the proper information to the user before the real merge takes place.
Please have a look at the [core/modules/cart](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/cart) for a reference.

```json
  "synchronize": true,
```

If it's set to `true` the `serverPull` Vuex method will be executed whenever the user adds, removes or edits any product in the shopping cart. This method syncs the client-side shopping cart with the server-side one.

Please take a look at the [core/modules/cart](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/cart) for a reference.

```json
  "synchronize_totals": true,
```

Similarly to the `synchronize` option, you may want to disable or enable (the default behavior) the shopping-cart totals sync with the backend platform. If it's set to `true`, the shopping cart totals will be overridden by the Magento (or Pimcore, or any other platform you're using) totals whenever the user will add, remove, or change any item in the shopping cart.

```json
  "setCustomProductOptions": true,
```

If this option is set to `true`, in case of custom-options supporting products, Vue Storefront will add the main SKU to the shopping cart and set the `product_option`sub-object of the shopping-cart item to the currently configured set of custom options (for example, selected dates, checkboxes, captions, or other values).

```json
  "setConfigurableProductOptions": true,
```

If this option is set to `true`,  in case of configurable products, Vue Storefront will add the main SKU to the shopping cart and set the `product_option` sub-object of the shopping-cart item to the currently configured set of configurable options (for example, color and size). Otherwise, the simple product (according to the selected configurable_options) will be added to the shopping cart instead.

```json
  "displayItemDiscounts": true
```

If this option is set to `true`, Vue Storefront will add price item with a discount to the shopping cart. Otherwise, the product price and special will be added to the shopping cart instead.

```json
  "minicartCountType": "quantities",
```

If this option is set to `items`, Vue Storefront will calculate the cart count based on items instead of item quantities.

```json
  "create_endpoint": "http://localhost:8080/api/cart/create?token={{token}}",
  "updateitem_endpoint": "http://localhost:8080/api/cart/update?token={{token}}&cartId={{cartId}}",
  "deleteitem_endpoint": "http://localhost:8080/api/cart/delete?token={{token}}&cartId={{cartId}}",
  "pull_endpoint": "http://localhost:8080/api/cart/pull?token={{token}}&cartId={{cartId}}",
  "totals_endpoint": "http://localhost:8080/api/cart/totals?token={{token}}&cartId={{cartId}}",
  "paymentmethods_endpoint": "http://localhost:8080/api/cart/payment-methods?token={{token}}&cartId={{cartId}}",
  "shippingmethods_endpoint": "http://localhost:8080/api/cart/shipping-methods?token={{token}}&cartId={{cartId}}",
  "shippinginfo_endpoint": "http://localhost:8080/api/cart/shipping-information?token={{token}}&cartId={{cartId}}",
  "collecttotals_endpoint": "http://localhost:8080/api/cart/collect-totals?token={{token}}&cartId={{cartId}}",
  "deletecoupon_endpoint": "http://localhost:8080/api/cart/delete-coupon?token={{token}}&cartId={{cartId}}",
  "applycoupon_endpoint": "http://localhost:8080/api/cart/apply-coupon?token={{token}}&cartId={{cartId}}&coupon={{coupon}}"
```

These endpoints should point to the `vue-storefront-api` instance and typically, you're changing just the domain-name/base-url without touching the specific endpoint URLs, as it's related to the `vue-storefront-api` specifics.

```json
  "productsAreReconfigurable": true
```

If this option is set to `true`, you can edit current options such as color or size in the cart view. Works only for configurable products.

## Products

```json
  "useMagentoUrlKeys": false,
```

When `useMagentoUrlKeys` is set to `true` the `product.url_key`  value will be used for product and category slugs used in the URL building process. Otherwise, the slug will be generated based on the product or category name. Please take a look at the  [core/lib/search.ts](https://github.com/DivanteLtd/vue-storefront/tree/master/core/lib/search.ts) and [core/modules/catalog/store/category/mutations.ts](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/catalog/store/category/mutations.ts) for reference.

**Please note:** The `url_key` field must be unique across the categories collection. Therefore, we're by default generating its value based on name and category ID. Please [switch this option off](https://github.com/DivanteLtd/mage2vuestorefront/#initial-vue-storefront-import) if you'd like to keep the `url_key` as they come from Magento2.

```json
  "configurableChildrenStockPrefetchStatic": false,
  "configurableChildrenStockPrefetchStaticPrefetchCount": 8,
```
Vue Storefront tries to dynamically get the stock quantities for simple products related to the configurable ones (products included in the `configurabe_children` array). If the `configurableChildrenStockPrefetchStatic` is set to `true`,  the stock items are prefetched from the Category page level. Please take a look at the [core/modules/catalog/store/category/actions.ts](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/catalog/store/category/actions.ts). The second option - `configurableChildrenStockPrefetchStaticPrefetchCount` sets how many products in the category should be prefetched using this mechanism.

```json
  "configurableChildrenStockPrefetchDynamic": false,
```

Opposite to the static prefetching, Vue Storefront could also prefetch the `configurable_children` stock items just for the products that are visible on the Category page. This option is used from the theme level—for example, [src/themes/default/pages/Category.vue](https://github.com/DivanteLtd/vue-storefront/tree/master/src/themes/default/pages/Category.vue)

```json
  "filterUnavailableVariants": false,
```

By default, Vue Storefront displays all the variants assigned with the configurable product, no matter if they are visible or not. Then, by adding a specific variant to the shopping cart, the availability is checked. You can switch this setting to `true` to prefetch the variants availability (see the options described above) and hide unavailable options.

```json
  "listOutOfStockProducts": false,
```

By default, Vue Storefront is not displaying products with the stock availability = “Out of stock”. However, it can be changed using this variable. Vue Storefront uses the `product.stock`  object to access the product-information availability. Please note that this information is updated just when the `mage2vuestorefront` updates the ElasticSearch index.

```json
  "preventConfigurableChildrenDirectAccess": true,
```

If this option is set to true (default), Vue Storefront will prevent accessing the simple products assigned with the configurable one. A user will be redirected to the main configurable product in such a case.

```json
  "alwaysSyncPlatformPricesOver": false,
```

This property is used in the [core/store/modules/product/actions.ts](https://github.com/DivanteLtd/vue-storefront/tree/master/core/store/modules/product/actions.ts); if it's set to `true` Vue Storefront will query the `vue-storefront-api` endpoint (`/api/products/render-list`)  to render the product prices for currently displayed product(s) **every time** the user is about to display the product or category page.


```json
  "clearPricesBeforePlatformSync": false,
```

This is related to `alwaysSyncPlatformPricesOver` and when it's set to true, the prices provided from the Elasticsearch will be always overridden to zero before rendering the dynamic prices.

```json
  "waitForPlatformSync": false,
```

This is related to `alwaysSyncPlatformPricesOver`. When true, Vue Storefront will wait for dynamic prices before rendering the page. Otherwise, the product and category pages will be rendered using the default (Elasticsearch-based) prices and then asynchronously override them with current ones.


```json
  "endpoint": "http://localhost:8080/api/product",
```

This is the `vue-storefront-api` endpoint for rendering product lists.

```json
  "defaultFilters": ["color", "size", "price", "erin_recommends"],
```

`defaultFilters` array should contain **all** the filters that could be used in the [Sidebar menu filters](https://github.com/DivanteLtd/vue-storefront/tree/master/src/themes/default/components/core/blocks/Category/Sidebar.vue).

```json
  "sortByAttributes": {
    "Latest": "updated_at",
    "Price":"price"
  },
```

Here, we have the sort field settings as they're displayed on the Category page.

```json
  "systemFilterNames": ["sort"],
```

This is an array of query-fields which won't be treated as filter fields when in URL.

```json
  "gallery": {
      "mergeConfigurableChildren": true
```

Vue Storefront is feeding the Product page gallery with the combination of: `product.media_gallery`, `product.image` and the `product.configurable_children.image`. If set to `false` the Product page gallery shows the `product.media_gallery`of the selected variant.

```json
  "gallery": {
      "variantsGroupAttribute": "color"
```

If `mergeConfigurableChildren` is set to `true` in some cases simple products attached to the configurable one have the same photos as the main one assigned. If this option is set to the name of any particular attribute assigned with `configurable_children`,  images that Vue Storefront gets will be grouped by the color (getting single color images from the `configurable_children` collection)

```json
   "gallery": {
     "imageAttributes": ["image","thumbnail","small_image"]
```

Product attributes representing the images. We'll see it in the Product page gallery if `mergeConfigurableChildren` is set to `false` and the product is configured

```json
  "gallery": {
      "width": 600,
      "height": 744
```

The dimensions of the images in the gallery.

## Orders

```json
"orders": {
  "endpoint": "http://localhost:8080/api/order",
```

This property sets the URL of the order endpoint. Orders will be placed to this specific URL as soon as the internet connection is available.

```json
    "payment_methods_mapping": {
    },
```

This is a simple map used in the [core/pages/Checkout.js](https://github.com/DivanteLtd/vue-storefront/tree/master/core/pages/Checkout.js) to map the payment methods provided by the backend service with the ones available to Vue Storefront. Each payment method is a separate Vue Storefront extension and not all methods provided by the backend should necessarily be supported by the frontend.

```json
  "offline_orders": {
    "notification" : {
      "enabled": true,
      "title" : "Order waiting!",
      "message": "Click here to confirm the order that you made offline.",
      "icon": "/assets/logo.png"
    }
  }
```

When a user places the order in offline mode and agrees to receive push notifications, these variables are used to determine the look and feel of the notification.

Please check the [core/service-worker/order.js](https://github.com/DivanteLtd/vue-storefront/tree/master/core/service-worker/order.js) for reference.

Starting with Vue Storefront v1.6, we changed the default order-placing behavior. Currently, the `config.orders.directBackendSync` is set to `true` by default. With this option enabled, if the user is online, Vue Storefront tries to pass the order immediately and synchronously (waiting for result) to the eCommerce backend. This option gives immediate and direct feedback to the user. If there is an app-level error (for example, validation error on the Magento side), the user will be notified immediately. If there is a transmission issue (no connection, servers are down, etc.), the order is put into a queue (as it was prior to 1.6). If  `config.orders.directBackendSync` is set to false, the legacy behavior with queuing all the orders is being used. With `directBackendSync` set to true, we do have access to the server confirmation (with backend orderId) in  `store.state.order.last_order_confirmation`

## Local Forage

```json
"localForage": {
  "defaultDrivers": {
    "user": "LOCALSTORAGE",
    "carts": "LOCALSTORAGE",
    "orders": "LOCALSTORAGE",
    "wishlist": "INDEXEDDB",
    "categories": "INDEXEDDB",
    "attributes": "INDEXEDDB",
    "products": "INDEXEDDB",
    "elasticCache": "INDEXEDDB",
    "claims": "LOCALSTORAGE",
    "compare": "INDEXEDDB",
    "syncTasks": "INDEXEDDB",
    "newsletterPreferences": "INDEXEDDB",
    "ordersHistory": "INDEXEDDB",
    "checkout": "LOCALSTORAGE"
  }
},
```

We're using [localForage](https://github.com/localForage/localForage) library to providing the persistence layer to Vue Storefront. `localForage` provides the compatibility fallbacks for the users not equipped with some specific storage methods (for example indexedDb). However, we may want to enforce some specific storage methods in the config. This is the place to set it up.

## Users

```json
"users": {
  "autoRefreshTokens": true,
  "endpoint": "http://localhost:8080/api/user",
  "history_endpoint": "http://localhost:8080/api/user/order-history?token={{token}}",
  "resetPassword_endpoint": "http://localhost:8080/api/user/reset-password",
  "changePassword_endpoint": "http://localhost:8080/api/user/change-password?token={{token}}",
  "login_endpoint": "http://localhost:8080/api/user/login",
  "create_endpoint": "http://localhost:8080/api/user/create",
  "me_endpoint": "http://localhost:8080/api/user/me?token={{token}}",
  "refresh_endpoint": "http://localhost:8080/api/user/refresh"
},
```

In the `users` section, we can set the API endpoints for specific use-related operations. Most of the time, you only need to change the basic URL.

When the `autoRefreshTokens` property is set to `true` (default) Vue Storefront will try to refresh the user tokens automatically when the session ends. Please take a look at the [core/lib/sync/task.ts](https://github.com/DivanteLtd/vue-storefront/tree/master/core/lib/sync/task.ts) for reference.

## Stock

```json
"stock": {
  "synchronize": true,
  "allowOutOfStockInCart": true,
  "endpoint": "http://localhost:8080/api/stock"
},
```

The `stock` section configures how the Vue Storefront behaves when the product is being added to the cart. By default, the request to `stock.endpoint` is being made asynchronously to the `add to cart` operation. When the `allowOutOfStockInCart` is set to `true`, and the product is no longer available,  it will be removed from the cart (with a proper UI notification) shortly after the information becomes available to the Vue Storefront.

## Images

```json
"images": {
  "baseUrl": "https://demo.vuestorefront.io/img/",
  "productPlaceholder": "/assets/placeholder.jpg",
  "useExactUrlsNoProxy": false,
  "useSpecificImagePaths": false,
  "paths": {
    "product": "/catalog/product"
  }
},
```

This section is to set the default base URL of images. This should be a `vue-storefront-api` URL, pointing to its `/api/img` handler. The Vue Storefront API is in charge of downloading the local image cache from the Magento/Pimcore backend and does the resize/crop/scale operations to optimize the images for mobile devices and the UI.

If you wan't to also show non-product image thumbnails you must set `useSpecificImagePaths` to `true` and remove `/catalog/product` from the end of your API `magento1.imgUrl` or `magento2.imgUrl` setting in your API's config file – e.g.: `http://magento-demo.local/media`. After that you can use the `pathType` parameter of the `getThumbnail()` mixin method to traverse other images than product ones.

## Install

```json
"install": {
  "is_local_backend": true,
  "backend_dir": "../vue-storefront-api"
},
```

This is just to be used in the [core/scripts/installer.js](https://github.com/DivanteLtd/vue-storefront/tree/master/core/scripts/installer.js)

## Demo mode

```json
"demomode": false,
```

When `demomode` is set to `true`, Vue Storefront will display the "Welcome to Vue Storefront demo" popup.

## Taxes

```json
"tax": {
  "sourcePriceIncludesTax": false,
  "defaultCountry": "DE",
  "defaultRegion": "",
  "calculateServerSide": true,
  "userGroupId": null
},
```

The taxes section is used by the
[core/modules/catalog/helpers/tax](https://github.com/DivanteLtd/vue-storefront/tree/master/core/modules/catalog/helpers/tax.ts).
When `sourcePricesIncludesTax` is set to `true` it means that the prices
indexed in the Elasticsearch already consist of the taxes. If it's set
to `false` the taxes will be calculated runtime. The `userGroupId`
config does only work when you have set `sourcePriceIncludesTax` set to
`false` and `calculateServerSide` is set to `false`.

The `defaultCountry` and the `defaultRegion` settings are being used for finding the proper tax rate for the anonymous, unidentified user (which country is not yet set).

## Shipping

```json
"shipping": {
  "methods": [
    {
      "method_title": "DPD Courier",
      "method_code": "flatrate",
      "carrier_code": "flatrate",
      "amount": 4,
      "price_incl_tax": 5,
      "default": true,
      "offline": true
    }
  ]
},
```

Available shipping methods when the backend platform is not providing the dynamic list / or for offline scenarios.

## Internationalization

```json
  "i18n": {
    "fullCountryName": "Germany",
    "fullLanguageName": "German",
    "defaultLanguage": "DE",
    "defaultCountry": "DE",
    "defaultLocale": "de-DE",
    "currencyCode": "EUR",
    "currencySign": "EUR",
    "dateFormat": "HH:mm D-M-YYYY"
  }
}
},
```

Internationalization settings are used by the translation engine (`defautlLocale`) and the [Language/Switcher.vue](https://github.com/DivanteLtd/vue-storefront/tree/master/src/themes/default/components/core/blocks/Switcher/Language.vue) (`fullCountryName`, `fullLanguageName`). `currencyCode`  is used for some of the API calls (rendering prices, mostly) and `currencySign` is being used for displaying the prices in the frontend.

## Mailchimp

```json
"mailchimp": {
  "endpoint": "http://localhost:8080/api/ext/mailchimp-subscribe/subscribe"
},
```

This property is used by the Mailchimp extension (See [src/extensions](https://github.com/DivanteLtd/vue-storefront-api/tree/master/src/api/extensions) for a reference).

## Theme

```json
"theme": "@vue-storefront/theme-default",
```

This is the currently applied theme path. After changing it, Vue Storefront needs to be rebuilt.


## Analytics

```json
"analytics": {
  "id": false
},
```

You can put your Google Analytics ID in here as to be used by the analytics extension.

## Hotjar

```json
"hotjar": {
  "id": false
},
```

You can put your Hotjar Site ID in here as to be used by the hotjar extension.


## CMS

```json
"cms": {
  "endpoint": "http://localhost:8080/api/ext/cms-data/cms{{type}}/{{cmsId}}"
}
```

This is the URL endpoint of the Snow.dog Magento 2 CMS extensions. It needs to be set when using the [src/api/extensions/cms-data](https://github.com/DivanteLtd/vue-storefront-api/tree/master/src/api/extensions/cms-data)

## Use price tiers

```json
"usePriceTiers": false,
```

When set to `true` we're using Magento2 feature of tiered prices (individual prices set for client's groups). The prices are set in `product.tier_prices` property.

## Manage products with price zero

```json
"useZeroPriceProduct": true,
```

Set to `true` if you want the customer to add products with price zero to the cart, otherwise, an error is returned. Set true by default.

## Boost

```json
"boost": {
  "name": 3,
  "category.name": 1,
  "short_description": 1,
  "description": 1,
  "sku": 1,
  "configurable_children.sku": 1
},
```

This is a list of priorities for search features (higher boost = more important search field).

## Query

```json
"query": {
    "inspirations": {
      "filter": [
        {
          "key": "category.name",
          "value" : { "eq": "Performance Fabrics" }
        }
      ]
    },
    "newProducts": {
      "filter": [
        {
          "key": "category.name",
          "value" : { "eq": "Tees" }
        }
      ]
    },
    "coolBags": {
      "filter": [
        {
          "key": "category.name",
          "value" : { "eq": "Women" }
        }
      ]
    },
    "bestSellers": {
      "filter": [
        {
          "key": "category.name",
          "value" : { "eq": "Tees" }
        }
      ]
    }
  }
```

Search queries used by specific components (for example, related products). The format of the query has been described [here](https://docs.vuestorefront.io/guide/data/elastic-queries.html)
