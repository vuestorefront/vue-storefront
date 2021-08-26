# Core Category Page

## Props

No props

## Data

- `pagination` - an object that defines two settings:
  - `perPage`of product items to load per page, currently set to 50.
  - `offset` that probably defines which page was last loaded, currently set to 0 and isn't changed anywhere.
- `enabled` - Enables/disables paging. When it's disabled, it lazy-loads other products on a scroll.
- `filters.available`, `filters.chosen`- A set of filters that the user has defined on the Category page. There, we have available filters and chosen filter values.
- `products` - Computed property that returns a list of product items of the current category from the Vuex store.
- `isCategoryEmpty` - Computed property that returns true if the product list of the current category is empty.
- `category`  - Computed property that returns the current category from the Vuex store.
- `categoryName` - Category name.
- `categoryId` - Category ID.
- `breadcrumbs`  - Breadcrumbs for the current category from the Vuex store.
- `productsTotal` - How many products are in the category.
- `lazyLoadProductsOnscroll` - Allows lazy-loading more products on a scroll, by default it's true.

## Methods

- `fetchData ({ store, route })` - Prepares query for fetching a list of products of the current category and dispatches `product/list` action that extracts that list.

  - `{ store, route }` - An object consisting of the Vuex store and global router references.

- `validateRoute ({ store, route })` - This method is called whenever the global `$route` object changes its value. It dispatches `'category/single'` action to load current category object and then calls `fetchData` method to load a list of products that relate to this category.
  - `{ store, route }` - An object consisting of the Vuex store and global router references.

## Events

### asyncData

Since the app is using SSR, this method prefetches and resolves the asynchronous data before rendering happens and saves it to the Vuex store. Asynchronous data for the Category page is a list of all categories, category attributes, and list of products for each category.

### beforeMount

`filter-changed-category` event listener is initialized. The event is fired when the user selects custom filter value.

### beforeDestroy

`filter-changed-category`event listener is removed.
