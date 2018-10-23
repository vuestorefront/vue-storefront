# Core Category Page

## Props

No props

## Data

- `pagination` - an object that defines two settings:
  - `perPage` of product items to load per page, currently set to 50
  - `offset` that probably defines which page has been last loaded, currently set to 0 and isn't changed anywhere.
- `enabled` - enables/disables paging. When it's disabled it lazy-loads other products on scroll
- `filters.available`, `filters.chosen` - a set of filters that user has defined on Category page - there we have available filters and chosen filter values
- `products` - computed property that returns a list of product items of current category from the Vuex store.
- `isCategoryEmpty` - computed property that returns `true` if product list of current category is empty.
- `category` - computed property that returns current category from the Vuex store.
- `categoryName` - category name.
- `categoryId` - category ID.
- `breadcrumbs` - breadcrumbs for the current category from the Vuex store.
- `productsCounter` - how many products are in the category.
- `lazyLoadProductsOnscroll` - allows lazy-loading more products on scroll, by default it's true

## Methods

- `fetchData ({ store, route })` - prepares query for fetching a list of products of the current category and dispatches `product/list` action that extracts that list.

  - `{ store, route }` - an object consisting of the Vuex store and global router references.

- `validateRoute ({ store, route })` - this method is called whenever the global `$route` object changes its value. It dispatches `'category/single'` action to load current category object and then calls `fetchData` method to load a list of products that relate to this category.
  - `{ store, route }` - an object consisting of the Vuex store and global router references.

## Events

### asyncData

Since the app is using SSR, this method prefetches and resolves the asynchronous data before rendering happens and saves it to Vuex store. Asynchronous data for Category page is a list of all categories, category attributes and list of products for each category.

### beforeMount

`filter-changed-category` event listener is initialized. The event is fired when user selects custom filter value.

### beforeDestroy

`filter-changed-category`event listener is removed.
