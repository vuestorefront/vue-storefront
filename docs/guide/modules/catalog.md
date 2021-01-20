# Catalog module

Catalog module is a big one combining all the logic, components and store for attribute, category, product, stock and tax operations

## Components

## Store

### Attribute Store

Attribute Store is designed to handle all actions related to the attributes management

#### State

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

This is example from [product compare feature](https://github.com/vuestorefront/vue-storefront/blob/c954b96f6633a201e10bed1d2e4c0def1aeb3071/core/pages/Compare.vue).

The attribute state data:

- `list_by_code` - this is a dictionary where you can get the specific attribute by just accessing the `list_by_code['color']` etc.
- `list_by_id` - this is a dictionary where you can get the specific attribute by just accessing the `list_by_id[123]` etc.
- `labels` - the preloaded labels of attribute values (the V in EAV)

#### Actions

The attribute store provides following public actions:

**`list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0 })`**

This method is used to load the attributes metadata. `filterValues` is an array of multiple values like: `['color', 'size']` and the `filterField` is the attribute field to compare the `filterValues` against. Usually is a `attribute_code` or `attribute_id`. The `size` and `start` are just used to limit the list.

#### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
export default {
  attributeListByCode: state => state.list_by_code,
  attributeListById: state => state.list_by_id,
};
```

### Category Store

Category Store is designed to handle all actions related the categories data.

This module works pretty tightly with Elastic Search and operates on the [Product data format](../data/elasticsearch.md)

#### State

```js
const state = {
  list: [],
  current: {},
  filters: { color: [], size: [], price: [] },
  breadcrumbs: { routes: [] },
  current_path: [], // list of categories from root to current
};
```

Category state is generally populated by just two methods [list](https://github.com/vuestorefront/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L38) and [single](https://github.com/vuestorefront/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L70) and cleared to the defaults by [reset](https://github.com/vuestorefront/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L28)

:::tip Note
The action `category/single` uses `localForage` cache only - no ElasticSearch data store directly; because of this optimization, please do download the categories list by dispatching `category/list` at first.
:::

The category state data:

- `breadcrumbs` - this is the list of routes used by the [Breadcrumbs component](https://github.com/vuestorefront/vue-storefront/blob/master/core/components/Breadcrumbs.js)
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

#### Events

The following events are published from `category` store:

- `EventBus.$emit('category-after-single', { category: mainCategory })` - from [category/single](https://github.com/vuestorefront/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L70) after single category is loaded,
- `EventBus.$emit('category-after-current', { category: category })` - after current category has been changed - this is subsequent call of `category/single` action,
- `EventBus.$emit('category-after-reset', { })` - after category has been reset (for example in the process of moving from one category page to another)
- `EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })` - this event emits the current category list as it's returned by `category/list`.

#### Actions

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

#### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  current: state => state.current,
  list: state => state.list,
};
```

### Product Store

Product Store is designed to handle all actions related the product data. It's responsible for loading the list of products or a single product as well as configuring the configurable products and managing the products attachments.

This module works pretty tightly with Elastic Search and operates on the [Product data format](../data/elasticsearch.md)

#### State

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

Product state is generally populated by just two methods [list](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L395) and [single](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L428) and cleared to the defaults by [reset](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L215)

The product state data:

- `breadcrumbs` - this is the list of routes used by the [Breadcrumbs component](https://github.com/vuestorefront/vue-storefront/blob/master/core/components/Breadcrumbs.js)
- `current` - this is the product object with selected `configurable_children` variant - so it's the base product with attributes overridden by the values from selected `configurable_children` variant; it's used on [Product.vue page](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/pages/Product.vue#L203) this is the product which is added to the cart after "Add to cart"
- `current_options` - it's a list used to populate the variant selector on the [Product.vue page](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/themes/default/pages/Product.vue#L56) it contains dictionary of attributes x possible attribute values and labels and it's populated by [setupVariants](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L344) based on the `configurable_children` property
- `current_configuration` is a current product configuration - dictionary of selected variant attributes; for example it contains dictionary of selected product attributes:

```json
{
  "color": 123,
  "size": 24
}
```

Please note, that we're using the Magento like EAV attributes structure - so the values here are an attribute value indexes not the values itself. Please take a look at [Data formats](../data/elasticsearch.md) for a reference

- `parent` - if the current product is a `type_id="single"` then in this variable the parent, `configurable` product is stored. This data is populated only on `Product.vue` by [checkConfigurableParent](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L323)
- `list` - this is an Array of products loaded by [list](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L395)
- `original` - used only for `configurable` products; this is the base product with no variant selected
- `related` - this is dictionary of related products; set outside this store (for [example here](https://github.com/vuestorefront/vue-storefront/blob/master/src/themes/default/components/core/blocks/Product/Related.vue)) by calling and [related action](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L528)

#### Events

The following events are published from `product` store:

- `EventBus.$emit('product-after-priceupdate', product)` - from [syncProductPrice](https://github.com/vuestorefront/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L33) after product price is synced with Magento;
- `EventBus.$emit('product-after-configure', { product: product, configuration: configuration, selectedVariant: selectedVariant })` from `configureProductAsync` (called by `product/configure` action after `product/single`). This event provides the information about selected product variant on the product page
- `EventBus.$emit('product-after-list', { query: query, start: start, size: size, sort: sort, entityType: entityType, result: resp })` - this event emits the current product list as it's returned by `product/list` providing the current filters etc. You can mark specific product list identifier by setting `meta` property; it's important because on single page this event can be executed multiple time for each individual block of products
- `EventBus.$emit('product-after-single', { key: key, options: options, product: cachedProduct })` - after single product has been loaded (invoked by `product/single` action)related products

#### Actions

The product store provides following public actions:

**`setupBreadcrumbs (context, { product })`**

This method is in charge of setting `state.breadcrumbs` to be used on `Product.vue` page. It's called from `Product.vue:fetchData`. The `product` parameter is a [ElasticSearch product object](../data/elasticsearch.md)

**`syncPlatformPricesOver(context, { skus })`**

When the config option `products.alwaysSyncPlatformPricesOver` is on, Vue Storefront will request the current product prices each time when `product/single` or `product/list` action is dispatched. It's called exclusively by these actions and shouldn't be called manually. This method calls `vue-storefront-api` proxy to get the current prices from Magento or any other backend CMS.

`skus` - this is an Array with product SKU's to be synchronized

**`setupAssociated (context, { product })`**

This method is called as a subsequent call of `Product.vue:fetchData` or `product/list` action. It's used to get the child products of `grouped` or `bundle` types of products.

**`checkConfigurableParent (context, {product})`**

This method is called by `Product.vue:fetchData` to check if current, simple product has got an configurable parent. If so the redirect is being made to the parent product. It's a fix for [#508](https://github.com/vuestorefront/vue-storefront/issues/508)

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

#### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  getParentProduct: state => state.parent,
  getCurrentProduct: state => state.current,
  getCurrentProductConfiguration: state => state.current_configuration,
  getOriginalProduct: state => state.original,
  getCurrentProductOptions: state => state.current_options,
  breadcrumbs: state => state.breadcrumbs,
};
```

### Stock Store

Stock Store is designed to handle stock quantity checks.

#### Events

The following events are published from `stock` store:

- `stock-after-check` - emitted just after the stock item has been received from eCommerce backend / Magento

#### Actions

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

### Tax Store

## Helpers

### optionLabel

Used to get the Label for specific `optionId`. For example, when the user filters products and uses the 165 attribute_value we can call `optionLabel( { attributeKey: 'color', optionId: 165 })` to get back 'Red' label.
