# Category Vuex Store

The Category Store is designed to handle all actions related to category data.

This module works pretty tightly with Elasticsearch and operates on the [Product data format](../data/elasticsearch.md)

## State

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

## Events

The following events are published from `category` store:

- `EventBus.$emit('category-after-single', { category: mainCategory })` - from [category/single](https://github.com/DivanteLtd/vue-storefront/blob/06fbb89a5a8bc2c607847f65a7bca9ad54ed7146/core/store/modules/category.js#L70) after single category is loaded.
- `EventBus.$emit('category-after-current', { category: category })` - After current category has been changed - this is subsequent call of `category/single` action.
- `EventBus.$emit('category-after-reset', { })` - After the category has been reset (for example, in the process of moving from one category page to another).
- `EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })` - This event emits the current category list as it's returned by `category/list`.

## Actions

The cart store provides following public actions:

### `list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc' })`

This is the key method to load the category list. It returns the Promise that contains the product list object. This method should be used everywhere you need to get products data.

### `single (context, { key, value, setCurrentCategory = true, setCurrentCategoryPath = true })`

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

## Getters

All state members should be accessed only by getters. Please take a look at the state reference for data formats.

```js
const getters = {
  current: state => state.current,
  list: state => state.list,
};
```
