## Core Category Page

### Props
No props

### Data

- `pagination` - an object that defines two settings:
  - `perPagr` of product items to load per page, currently set to 50
  - `offset` that probably defines which page has been last loaded, currently set to 0 and doesn't change anywhere.
- `enabled` - enables/disables paging. When it's disabled it lazy loads other products on scroll
- `filters.available`, `filters.chosen` - a set of filters that user has defined on Category page - here we have available filters and chosen filter values 
- `products` - computed property that return a list of product items of current category from the Vuex store.  
- `isCategoryEmpty` - computed property that return true if product list of current category is empty.  
- `category` - computed property that return current category from the Vuex store. 
- `categoryName` - category name.
- `categoryId` - category ID.
- `breadcrumbs` - breadcrumbs for the current category from the Vuex store.
- `productsCounter` - how many products are in the category.

### Methods
`fetchData ({ store, route })` - prepares query for fetching a list of products of the current category and dispatches *'product/list'* action that extracts that list.

**Parameters**  
`{ store, route }` - an object consisting of the Vuex store and global router references.  

`validateRoute ({ store, route })` - this method is called whenever the global *$route* object changes its value. It dispatches `'category/single'` action to load current category object and then calls *fetchData* method to load a list of products that relate to this category.  

**Parameters**  
`{ store, route }` - an object consisting of the Vuex store and global router references.

### Events

#### asyncData
Since the app is using SSR, this method prefetches and resolves the asyncronous data before rendering happens and saves it to Vuex store. Asyncronous data for Category page is a list of all categories, category attributes and list of products for each category.

#### beforeMount
`filter-changed-category` event listener is initialized. The event is fired when user select custom filter value.

#### beforeDestroy
`filter-changed-category`event listener is removed.
