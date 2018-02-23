# Product Vuex Store

Product Store is designed to handle all actions related the product data. Loading the list of products or single product as well as configuring the configurable products and managing the products attachments.

This module works pretty tightly with Elastic Search and operates on the [Product data format](../ElasticSearch data formats,md)

## State

```js
const state = {
  breadcrumbs: {routes: []},
  current: null, // shown product
  current_options: {color: [], size: []},
  current_configuration: {},
  parent: null,
  list: [],
  original: null, // default, not configured product
  related: {}
}
```

Product state is generally populated by just two methods [list](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L395) and [single](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L428) and cleared to the defaults by [reset](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L215)

The product state data:
- `breadcrumbs` - this is the list of routes used by the [Breadcrumbs component](https://github.com/DivanteLtd/vue-storefront/blob/master/core/components/Breadcrumbs.vue)
- `current` - this is the product object with selected `configurable_children` variant - so it's the base product with attributes overriden by the values from selected `configurable_children` variant; it's used on [Product.vue page](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/pages/Product.vue#L203) this is the product which is added to the cart after "Add to cart"
- `current_options` - it's a list used to populate the variant selector on the [Product.vue page](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/themes/default/pages/Product.vue#L56) it contains dictionary of attributes x possible attribute values and labels and it's populated by [setupVariants](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L344) based on the `configurable_children` property
- `current_configuration` is a current product configuration - dictionary of selected variant attributes; for example it contains dictionary of selected product attributes:
```json
{
    "color": 123,
    "size": 24
}
```
Please note, that we're using the Magento like EAV attributes structure - so the values here are an attribute value indexes not the values itself. Please take a look at [Data formats](../ElasticSearch data formats,md) for a reference
- `parent` - if the current product is a `type_id="single"` then in this variable the parent, `configurable` product is stored. This data is populated only on `Product.vue` by [checkConfigurableParent](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L323)
- `list` - this is an Array of products loaded by [list](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L395)
- `original` - used only for `configurable` products; this is the base product with no variant selected
- `related` - this is dictionary of related products; set outside this store (for [example here](https://github.com/DivanteLtd/vue-storefront/blob/master/src/themes/default/components/core/blocks/Product/Related.vue)) by calling and [related action](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L528)

## Events

The following events are published from `product` store:

- `EventBus.$emit('product-after-priceupdate', product)` - from [syncProductPrice](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L33) after product price is synced with Magento
- `EventBus.$emit('product-after-configure', { product: product, configuration: configuration, selectedVariant: selectedVariant })` from `configureProductAsync` (called by `product/configure` action after `product/single`). This event provides the information about selected product variant on the product page
- `EventBus.$emit('product-after-list', { query: query, start: start, size: size, sort: sort, entityType: entityType, result: resp })` - this event emits the current product list as it's returned by `product/list` providing the current filters etc. You can mark specific product list identifier by setting `meta` property; it's important because on single page this event can be executed multiple time for each individual block of products
- `EventBus.$emit('product-after-single', { key: key, options: options, product: cachedProduct })` - after single product has been loaded (invoked by `product/single` action)
- `EventBus.$emit('product-after-related', { key: key, items: items })` - invoked whenever the related products block is set for the current product; the key is the name of the related block and items are related products
- `EventBus.$emit('product-after-original', { original: product })` - invoked by `product/single` whenever product has been loaded 
- `EventBus.$emit('product-after-parent', { parent: product })` - invoked externally by `product/checkConfigurableParent` provides the current single product configurable parent
- `EventBus.$emit('product-after-reset', { })` - after product has been reseted (for example in the process of moving from one product page to another)

## Actions 

The product store provides following public actions:

### `setupBreadcrumbs (context, { product })`
This method is in charge of setting `state.breadcrumbs` to be used on `Product.vue page`. It's called from `Product.vue:fetchData`. The `product` parameter is a [ElasticSearch product object](../ElasticSearch data formats.md)

### `syncPlatformPricesOver(context, { skus })`
When the config option `products.alwaysSyncPlatformPricesOver` is on, Vue Storefront will request the current product prices each time when `product/single` or `product/list` action is dispatched. It's called exlusively by these actions and shouldn't be called manually. This method calls `vue-storefront-api` proxy to get the current prices from Magento or any other backend CMS.

`skus` - this is an Array with product SKU's to be synchronized

### `setupAssociated (context, { product })`
This method is called as a subsequent call of `Product.vue:fetchData` or `product/list` action. It's used to get the child products of `grouped` or `bundle` types of products.

### `checkConfigurableParent (context, {product})`
This methods is called by `Product.vue:fetchData` to check if current, simple product has got an configurable parent. If so the redirect is being made to the parent product. It's a fix for [#508](https://github.com/DivanteLtd/vue-storefront/issues/508)

### `setupVariants (context, { product })`
This method is subsequently called by `Product.vue:fetchData` to load all configurable attributes defined in `product.configurable_options` and then to populate `state.current_configuration` and `state.current_options`. The main usage of this action is to prepare product to be configured by the user on the product page and to display the product configurator UI properly 

### `list (context, { query, start = 0, size = 50, entityType = 'product', sort = '', cacheByKey = 'sku', prefetchGroupProducts = true, updateState = true, meta = {} })`
This is the key method to load the product list. It returns the `Promise` that contains the product list object. This method should be used everywhere you need to get products data. When `config.tax.calculateServerSide=false` this method runs product taxes calculator and synchronizes prices with Magento if it's required.

**Events**: this method emits product list as `EventBus.$emit('product-after-list', { query: query, start: start, size: size, sort: sort, entityType: entityType, meta: meta, result: resp })`

**Important**: This method synchronizes products for offline usage by: storing the whole query results object into `localForage` and by caching each product individually (to be used on the Product page for example)

- `query` - this is the `bodybuilder` ElasticSearch query (please check `bodybuilder` package or for example `Home.vue` for a reference how to use it)

- `start`, `size` - both parameters are used for paging; start is the starting index; size is a page size 

- `entityType` - by default it's of course set to `product` and it's mapped to ElasticSearch entity class

- `sort` - product attribute using to sort, this field must be mapped in ElasticSearch as a numeric field

- `prefetchGroupProducts` - by default it's set to true and causes `setupAssociated` action to be dispatched to get all the associated products

- `updateState` - if you set this to false, the `state.list` will not be updated - just the products will be returned

- `meta` - this is an optional attribute which is return with `product-after-list` event; it can be used for example to mark any specific ES call.

### `single (context, { options, setCurrentProduct = true, selectDefaultVariant = true, key = 'sku' })`
This method subsequently dispatched `product/list` action to get the products and synchronize the taxes/prices. When the product has been recently downlaoded via `product/list` this method will return the cached version from `localForage` - but update the cache anyway.

### `configure (context, { product = null, configuration, selectDefaultVariant = true })`
This action is used to configure the `configurable` product with specified attributes. It get's the `configuration` object which should have the following format: `{ attribute_code: attribute_value_id }` and finds the `product.configurable_children` item which complies to this configuration. Then it's merges this specific configurable_child with product itself - for example setting the product.price to the coonfigurable price, color, size etc. The method is used on: `Product.vue` page for allowing user to select color, size ... The second usage for it is on `Category.vue` page - after user selects some filters, the resulting products are configured to display the proper images (related to selected color and size) and prices.

If `selectDefaultVariant` is set to true (default), the `state.current` will be altered with configured product.

### `setCurrent (context, productVariant)`
Auxiliary method just to set `state.current` to productVariant

### `setOriginal (context, originalProduct)`
Auxiliary method just to set `state.original` to originalProduct

### `related (context, { key = 'related-products', items })`
Alters `state.related` dictionary to set specific list of related products to be displayed on `Product.vue` page (`RelatedProducts` component is used for this)

## Getters 

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  productParent: (state) => state.parent,
  productCurrent: (state) => state.current,
  currentConfiguration: (state) => state.current_configuration,
  productOriginal: (state) => state.original,
  currentOptions: (state) => state.current_options,
  breadcrumbs: (state) => state.breadcrumbs
}
```