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

...


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