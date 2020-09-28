# Vuex

:::danger REMINDER
This document is _archived_ and _NOT_ relevant with the latest version which is `1.11` at the time of writing. Please keep in mind this document is supposed to help you maintain legacy product, not the fresh installation. 
:::

## Introduction

All data processing and remote requests should be managed by Vuex data stores. The core modules generally contain `store` folder inside. 
You can modify the existing store actions by responding to events. Events are specified in the docs below and can be found in the [core module](https://github.com/DivanteLtd/vue-storefront/tree/master/core), where `EventBus.$emit` has been mostly used for Vuex Actions.

**You should put all the REST calls, Elasticsearch data queries inside the Vuex Actions.** This is our default design pattern for managing the data.

### Vuex conventions

Before you start working with Vuex, it's recommended to get familiar with our [vuex conventions](./vuex-conventions.md)

### Vuex modules

- [Product](product-store.md)
- [Category](category-store.md)
- [Cart](Cart%20Store.md)
- [Checkout](Checkout%20Store.md)
- [Order](Order%20Store.md)
- [Stock](stock-store.md)
- [Sync](sync-store.md)
- [User](User%20Store.md)
- [Attribute](attribute-store.md)
- [UI Store](<https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20UI%20Store%20(interface%20state).md>)

### Override existing core modules

Existing core modules can be overridden in the themes store. Just import any core store modules and override them using the `extendStore()` utility method like the example given below in `src/modules/ui-store/index.ts`.

```
import coreStore from '@vue-storefront/core/store/modules/ui-store'
import { extendStore } from '@vue-storefront/core/lib/themes'

const state = {
  // override state of core ui module...
}

const mutations = {
  // override mutations of core ui module...
}

const actions = {
  // override actions of core ui module...
}

export default extendStore(coreStore, {
  state,
  mutations,
  actions
})
```

And then import it in `src/modules/index.ts`

```
import ui from './ui-store'

export default {
  ui
}
```

### Related

[Working with data](data.md)



## Vuex conventions

### Module
The Vuex module should be created for a specific set of functionalities. It should also have only absolutely necessary dependencies to other modules. The name of module should be short, quite clear about it’s destination, and have words separated by a dash.

Good examples:

- products
- product
- user
- checkout
- compare-products
- notifications
- order

Bad examples:

- next-module
- compare (because it’s not saying what it compares)

### State
State properties should be simple and their structure should not be nested. Their names are written in underscore-case notation and indicate what they contain. We should avoid having more than one instance of an object, even between modules. In the vast majority of cases, they can be referenced by their unique ID property. Example:

```
{
  "products_map": {
    "WS08": {
      "sku": "WS08",
      "name": "Minerva LumaTech&trade; V-Tee"
      // other options
    },
    "WS12": {
      "sku": "WS12",
      "name": "Radiant Tee"
      // other options
    },
    "WS08-XS-Black": {
        "sku": "WS08-XS-Black",
        "name": "Minerva LumaTech&trade; V-Tee"
        // other options
    }
    // maaaaaaaany more products
  },
  "current_product_id": "WS08-XS-Black",
  "wishlist": ["MP01-32-Black", "MSH05-32-Black"],
  "cart_items": [
    {
      "sku": "WH09-XS-Green",
      "qty": 3
    },
    {
      "sku": "WH09-S-Red",
      "qty": 1
    }
  ]
}
```

Good examples:

 - categories_map
- current_category_id
- order
- product_parent_id

Bad examples
- list
- elements

```
filters: {
  available: {},
  chosen: {}
},
```

### Getters
The Vuex state, except of mutations, should always be accessed by getters, including actions. Getter should:

* Start from `is` when returns Boolean, or `get` otherwise
* Answer to question `what am I returning?`
* Contain module name to ensure that getter is unique through whole Vuex, but it doesn’t have to start with that name. First, it should have a natural name, so for example we have module `category` and in the state `availableFilters`. So `what am I returning?` -> `available Filters` and these filters are `category filters`. It's not a Boolean, it’s an array or map so we’re starting with `get` -> `getAvailableCategoryFilters`

Good examples:

- For state user -> isUserLoggedIn, getUser
- For state availableFilters -> getAvailableCategoryFilters
- For state currentProductId -> getCurrentProduct (because it gets product object from map), getCurrentProductId

Bad examples:

- totals
- product
- current
- list

### Actions

Every state change from outside of a module should be invoked as an action. Actions are meant to:

- Fetch something from the server(or cache) — in this case, they have to be asynchronous (return promise).
- Mutate state of current module.
- Dispatch actions from the same module (to avoid repeating logic).
- Dispatch actions from another module (only if it’s absolutely required).
- Their names should be as unique as possible and simply describe what specific action will happen. **Almost every action should return promise.** We allow you to replicate conventions for existing methods like list or single in new modules to have a consistent API.

Good examples:

- fetchProduct - Gets product by ID from server or cache, sets it in products map, and returns it by getter.
- findProducts - Fetches products by specific query, sets them in products map, and returns them as array.
- setCurrentProduct - Param could be ID, it could dispatch fetchProduct, mutate it to productsMap, and mutate its ID to currentProductId. Also if productId is null, then it removes currentProduct.
- addCartItem
- toggleMicrocart

Bad examples:

- products
- reset

### Mutations

Finally we have mutations. Only mutations can change the state of the module. They should be synchronous (never return promise), not contain any logic (be extremely fast), except one needed to keep the state as it should be (for example, sets default value for state). Mutations should be invoked only by actions from the same module. In most cases, it should only be a single action that invokes a specific mutation. Types of mutations:

- SET_ - The most common type of mutation. It can set an object (or whole array), set default value of object (or maybe clean array),
- ADD_ - It can add a new element to the state property, which is an array or add new element to map.
- REMOVE_ - An opposite to ADD. It can remove the map element or array element by index (or by finding object, which is not recommended on big arrays, as mutation could be slow).

Good examples:

- ADD_PRODUCT
- SET_CURRENT_PRODUCT_ID
- ADD_CATEGORY_FILTER
- REMOVE_WISHLIST_PRODUCT_ID

Bad examples:

- CATEGORY_UPD_CURRENT_CATEGORY
- TAX_UPDATE_RULES



## Product Vuex Store

The Product Store is designed to handle all actions related product data. It's responsible for loading the list of products or a single product as well as configuring the configurable products and managing the product attachments.

This module works pretty tightly with Elasticsearch and operates on the [Product data format](../data/elasticsearch.md)

### State

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

The product state is generally populated by just two methods - [list](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L395) and [single](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L428) - and cleared to the defaults by [reset](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L215).

The product state data:

- `breadcrumbs` - This is the list of routes used by the [Breadcrumbs component](https://github.com/DivanteLtd/vue-storefront/blob/master/core/components/Breadcrumbs.js)
- `current` - This is the product object with selected `configurable_children` variant, so it's the base product with attributes overridden by the values from selected `configurable_children` variant; it's used on [Product.vue page](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/pages/Product.vue#L203). This is the product which is added to the cart after "Add to cart"
- `current_options` - The list used to populate the variant selector on the [Product.vue page](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/themes/default/pages/Product.vue#L56). It contains dictionary of attributes and possible attribute values and labels, and it's populated by [setupVariants](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L344) based on the `configurable_children` property.
- `current_configuration` The current product configuration. A dictionary of selected variant attributes; for example, it contains a dictionary of selected product attributes:

```json
{
  "color": 123,
  "size": 24
}
```

Please note, we're using the Magento-like EAV attributes structure so the values here are attribute value indexes, not the values itself. Please take a look at [Data formats](../data/elasticsearch.md) for a reference.

- `parent` - If the current product is a `type_id="single"`, then in this variable the parent, `configurable` product is stored. This data is populated only on `Product.vue` by [checkConfigurableParent](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L323)
- `list` - This is an array of products loaded by [list](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L395)
- `original` - Used only for `configurable` products, this is the base product with no selected variant.
- `related` - This is dictionary of related products; set outside this store (for [example here](https://github.com/DivanteLtd/vue-storefront/blob/master/src/themes/default/components/core/blocks/Product/Related.vue)) by calling and [related action](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L528)

### Events

The following events are published from `product` store:

- `EventBus.$emit('product-after-priceupdate', product)` - from [syncProductPrice](https://github.com/DivanteLtd/vue-storefront/blob/bd559f1baad7cd392bc5bae7b935a60484e2e6e5/src/store/modules/product.js#L33) after product price is synced with Magento.
- `EventBus.$emit('product-after-configure', { product: product, configuration: configuration, selectedVariant: selectedVariant })` from `configureProductAsync` (called by `product/configure` action after `product/single`). This event provides the information about selected product variant on the product page.
- `EventBus.$emit('product-after-list', { query: query, start: start, size: size, sort: sort, entityType: entityType, result: resp })` - this event emits the current product list as it's returned by `product/list`providing the current filters, etc. You can mark the specific product list identifier by setting the `meta` property; it's important because on a single page, this event can be executed multiple time for each individual block of products.
- `EventBus.$emit('product-after-single', { key: key, options: options, product: cachedProduct })` - After single product has been loaded (invoked by `product/single` action).

### Actions

The product store provides following public actions:

#### `setupBreadcrumbs (context, { product })`

This method is in charge of setting `state.breadcrumbs` to be used on the `Product.vue` page. It's called from `Product.vue:fetchData`. The `product` parameter is an [Elasticsearch product object](../data/elasticsearch.md).

#### `syncPlatformPricesOver(context, { skus })`

When the config option `products.alwaysSyncPlatformPricesOver` is on, Vue Storefront will request the current product prices each time when `product/single` or `product/list` action is dispatched. It's called exclusively by these actions and shouldn't be called manually. This method calls `vue-storefront-api` proxy to get the current prices from Magento or any other backend CMS.

`skus` - this is an array with product SKUs to be synchronized.

#### `setupAssociated (context, { product })`

This method is called as a subsequent call of `Product.vue:fetchData` or `product/list` action. It's used to get the child products of `grouped` or `bundle` types of products.

#### `checkConfigurableParent (context, {product})`

This method is called by `Product.vue:fetchData` to check if current, simple product has got an configurable parent. If so, the redirect is being made to the parent product. It's a fix for [#508](https://github.com/DivanteLtd/vue-storefront/issues/508)

#### `setupVariants (context, { product })`

This method is subsequently called by `Product.vue:fetchData` to load all configurable attributes defined in `product.configurable_options` and then to populate `state.current_configuration` and `state.current_options`. The main usage of this action is to prepare a product to be configured by the user on the product page and to display the product configurator UI properly.

#### `list (context, { query, start = 0, size = 50, entityType = 'product', sort = '', cacheByKey = 'sku', prefetchGroupProducts = true, updateState = true, meta = {} })`

This is the key method to load the product list. It returns the Promise that contains the product list object. This method should be used everywhere you need to get product data. When `config.tax.calculateServerSide=false` this method runs product taxes calculator and synchronizes prices with Magento if it's required.

**Events**: this method emits product list as `EventBus.$emit('product-after-list', { query: query, start: start, size: size, sort: sort, entityType: entityType, meta: meta, result: resp })`

:::warning Important
This method synchronizes products for offline usage by storing the whole query results object into `localForage` and by caching each product individually (to be used on the product page, for example).
:::

- `query` - This is the `bodybuilder` Elasticsearch query (please check `bodybuilder` package or for example `Home.vue` for a reference how to use it).

- `start`, `size` - Both parameters are used for paging; start is the starting index; size is a page size.

- `entityType` - By default it's of course set to `product` and it's mapped to Elasticsearch entity class.

- `sort` - Product attribute using to sort. This field must be mapped in Elasticsearch as a numeric field,

- `prefetchGroupProducts` - By default, it's set to true and causes the `setupAssociated` action to be dispatched to get all the associated products

- `updateState` - If you set this to false, the `state.list` will not be updated, just the products will be returned.

- `meta` - This is an optional attribute which is returned with the `product-after-list` event; it can be used for example to mark any specific ES call.

#### `single (context, { options, setCurrentProduct = true, selectDefaultVariant = true, key = 'sku' })`

This method subsequently dispatches the `product/list` action to get the products and synchronize the taxes/prices. When the product has been recently downloaded via `product/list` this method will return the cached version from `localForage`, but update the cache anyway.

#### `configure (context, { product = null, configuration, selectDefaultVariant = true })`

This action is used to configure the `configurable` product with specified attributes. It gets the `configuration` object, which should have the following format: `{ attribute_code: attribute_value_id }` and finds the `product.configurable_children` item which complies with this configuration. Then, it merges this specific `configurable_child` with the product itself - for example, setting the product.price to the configurable price, color, size etc. This method is used on: `Product.vue` page for allowing user to select color, size etc. The second usage for it is on `Category.vue` page after user selects some filters - the resulting products are configured to display the proper images (related to selected color and size) and prices.

If `selectDefaultVariant` is set to true (default), the `state.current` will be altered with configured product.

#### `setCurrent (context, productVariant)`

Auxiliary method just to set `state.current` to productVariant.

#### `setOriginal (context, originalProduct)`

Auxiliary method just to set `state.original` to originalProduct.

#### `related (context, { key = 'related-products', items })`

Alters `state.related` dictionary to set specific list of related products to be displayed on `Product.vue` page (`RelatedProducts` component is used for this).

### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats.

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



## Category Vuex Store

The Category Store is designed to handle all actions related to category data.

This module works pretty tightly with Elasticsearch and operates on the [Product data format](../data/elasticsearch.md)

### State

```js
const state = {
  list: [],
  current: {},
  filters: { color: [], size: [], price: [] },
  breadcrumbs: { routes: [] },
  current_path: [], // list of categories from root to current
};
```

The category state is generally populated by just two methods- [list](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L38) and [single](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L70) - and cleared to the defaults by [reset](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L28)

:::tip Note
The action `category/single` uses `localForage` cache only—no Elasticsearch data store directly. Because of this optimization, download the categories list by dispatching the `category/list` at first.
:::

The category state data:

- `breadcrumbs` - This is the list of routes used by the [Breadcrumbs component](https://github.com/DivanteLtd/vue-storefront/blob/master/core/components/Breadcrumbs.js)
- `current` - This is the current category object.
- `filters` is a current state of the category filters, a dictionary of selected variant attributes; for example it contains dictionary of selected product attributes:

```json
{
  "color": 123,
  "size": 24
}
```

Please note, we're using the Magento-like EAV attributes structure so the values here are attribute value indexes, not the values itself. Please take a look at [Data formats](../data/elasticsearch.md) for a reference

- `current_path` - this is the list of category objects: from current category to the top level root,

### Events

The following events are published from `category` store:

- `EventBus.$emit('category-after-single', { category: mainCategory })` - from [category/single](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L70) after single category is loaded.
- `EventBus.$emit('category-after-current', { category: category })` - After current category has been changed - this is subsequent call of `category/single` action.
- `EventBus.$emit('category-after-reset', { })` - After the category has been reset (for example, in the process of moving from one category page to another).
- `EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })` - This event emits the current category list as it's returned by `category/list`.

### Actions

The cart store provides following public actions:

#### `list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc' })`

This is the key method to load the category list. It returns the Promise that contains the product list object. This method should be used everywhere you need to get products data.

#### `single (context, { key, value, setCurrentCategory = true, setCurrentCategoryPath = true })`

This method gets the single category from `localForage`.

:::warning Important
To make this method work, you should call `category/list` before. This category works only on localForage and cannot access Elasticsearch directly
:::

:::warning Important
This method synchronizes products for offline usage by storing the whole query results object into `localForage` and by caching each category individually (to be used on the product page, for example).
:::

**Events**: this method emits category list as `EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })`

- `parent` - `category` - Object to load the subcategories only.

- `start`, `size`  - Both parameters are used for paging; start is the starting index; size is a page size.

- `onlyActive` - (bool) load only the categories marked as active in CMS (for example, in Magento).

- `sort` - Category attribute used to sort. This field must be mapped in Elasticsearch as a numeric field.

- `onlyNotEmpty` - (bool) load only the categories that contain any products.

### Getters

All state members should be accessed only by getters. Please take a look at the state reference for data formats.

```js
const getters = {
  current: state => state.current,
  list: state => state.list,
};
```



## Stock Vuex Store

Stock Store is designed to handle stock-quantity checks.

### Events

The following events are published from `stock` store:

- `stock-after-check` - Emitted just after the stock item has been received from eCommerce backend / Magento.


### Actions

The cart store provides the following public actions:

#### `check (context, { product, qty = 1 })`

Check if the `product` can be added to the shopping cart with a given quantity.

The resulting promise is expanded to the following object:

```js
{
  qty: 100,
  status: 'ok', // another option is: 'out_of_stock'
  onlineCheckTaskId: 14241
}
```


## Attribute Vuex Store

Attribute Store is designed to handle all actions related to attributes management.

### State

```js
  state: {
    list_by_code: {},
    list_by_id: {},
    labels: {}
  },
```

As we're using the attributes dictionary for the product management in a very similar way as Magento ([EAV model](http://www.xpertdeveloper.com/2010/10/what-is-eav-model-in-magento/)), we're operating on the attributes, attribute types, and dictionaries.

Attributes are **explicitly** loaded by the user by calling the `attribute/list` method. For example, when you're going to work with customizable attributes of the product, or to work on variants, you need to prefetch the attributes metadata:

```js
this.$store.dispatch('attribute/list', {
  filterValues: [true],
  filterField: 'is_user_defined',
});
```

This is an example from [product compare feature](https://github.com/DivanteLtd/vue-storefront/blob/c954b96f6633a201e10bed1d2e4c0def1aeb3071/core/pages/Compare.vue).

The attribute state data:

- `list_by_code` - This is a dictionary where you can get the specific attribute just by accessing the `list_by_code['color']` etc.
- `list_by_id` - This is a dictionary where you can get the specific attribute just by accessing the `list_by_id[123]` etc.
- `labels` - The preloaded labels of attribute values (the V in EAV).

### Actions

The attribute store provides the following public actions:

#### `list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0 })``

This method is used to load the attributes metadata. `filterValues` is an array of multiple values like: `['color', 'size']` and the `filterField` is the attribute field to compare the `filterValues` against. Usually, it is a `attribute_code` or `attribute_id`. The `size` and `start` are just used to limit the list.

### Helpers

Attribute module exports one very popular helper method:

#### `export function optionLabel (state, { attributeKey, searchBy = 'code', optionId })`

This is used to get the label for specific `optionId`. For example, when the user filters products and uses the 165 attribute_value we can call `optionLabel( { attributeKey: 'color', optionId: 165 })` to get back 'Red' label.

### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
export default {
  attributeListByCode: state => state.list_by_code,
  attributeListById: state => state.list_by_id,
};
```
