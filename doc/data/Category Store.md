# Category Vuex Store

Category Store is designed to handle all actions related the categories data.

This module works pretty tightly with Elastic Search and operates on the [Product data format](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/ElasticSearch%20data%20formats.md)

## State

```js
const state = {
  list: [],
  current: {},
  filters: { color: [], size: [], price: [] },
  breadcrumbs: {routes: []},
  current_path: [] // list of categories from root to current
}
```

Category state is generally populated by just two methods [list](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L38) and [single](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L70) and cleared to the defaults by [reset](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L28)

**Note:** The action `category/single` uses `localForage` cache only - no ElasticSearch data store directly; Because of this optimization, please do download the categories list by dispatching `category/list` at first.

The category state data:
- `breadcrumbs` - this is the list of routes used by the [Breadcrumbs component](https://github.com/DivanteLtd/vue-storefront/blob/master/core/components/Breadcrumbs.vue)
- `current` - this is the current category object,
- `filters` is a current state of the category filters - dictionary of selected variant attributes; for example it contains dictionary of selected product attributes:
```json
{
    "color": 123,
    "size": 24
}
```
Please note, that we're using the Magento like EAV attributes structure - so the values here are an attribute value indexes not the values itself. Please take a look at [Data formats](../ElasticSearch data formats,md) for a reference
- `current_path` - this is the list of category objects: from current category to the top level root,

## Events

The following events are published from `category` store:

- `EventBus.$emit('category-after-single', { category: mainCategory })` - from [category/single](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L70) after single category is loaded,
- `EventBus.$emit('category-after-current', { category: category })` - after current category has been changed - this is subsequent call of `category/single` action,
- `EventBus.$emit('category-after-reset', { })` - after category has been reseted (for example in the process of moving from one category page to another)
- `EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })` - this event emits the current category list as it's returned by `procategoryduct/list`.

## Actions 

The product store provides following public actions:

### `list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc' })`
This is the key method to load the category list. It returns the `Promise` that contains the product list object. This method should be used everywhere you need to get products data. 

### `single (context, { key, value, setCurrentCategory = true, setCurrentCategoryPath = true })`
This method gets the single category from `localForage`.
**Important**: To make this method work you should call `category/list` before. This category works only on localFotage and cannot access ElasticSearch directly


**Events**: this method emits category list as `EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })`

**Important**: This method synchronizes products for offline usage by: storing the whole query results object into `localForage` and by caching each category individually (to be used on the Product page for example)

- `parent` - `category` object to load the subcategories only

- `start`, `size` - both parameters are used for paging; start is the starting index; size is a page size 

- `onlyActive` - (bool) load only the categories marked as active in CMS (for Example in Magento)

- `sort` - category attribute using to sort, this field must be mapped in ElasticSearch as a numeric field

- `onlyNotEmpty` -  (bool) load only the categories that contain any products

## Getters 

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  current: (state) => state.current,
  list: (state) => state.list
}
```