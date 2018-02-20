## Category

### Props
No props
### Data
`pagination` - an object that defines two settings:  
    1. *number* of product items to load per page, currently set to 50;  
    2. <span style="color: red*>offset* that probably defines which page has been last loaded, currently set to 0 and doesn't change anywhere.</span>
`filterSet` - a set of filters that user has defined on Category page.  
`products` - computed property that return a list of product items of current category from the Vuex store.  
`isCategoryEmpty` - computed property that return true if product list of current category is empty.  
`category` - computed property that return current category from the Vuex store.  
`aggregations` - computed property *that is not used*.  
`filters` - a set of all available filters for current category from the Vuex store.  
`breadcrumbs` - breadcrumbs for the current category from the Vuex store.
### Methods
`fetchData ({ store, route })` - prepares query for fetching a list of products of the current category and dispatches *'product/list'* action that extracts that list.  
**Parameters**  
*{ store, route }* - an object consisting of the Vuex store and global router references.  

`validateRoute ({ store, route })` - this method is called whenever the global *$route* object changes its value. It dispatches *'category/single'* action to load current category object and then calls *fetchData* method to load a list of products that relate to this category.  
**Parameters**  
*{ store, route }* - an object consisting of the Vuex store and global router references.
### Hooks
#### asyncData
Since the app is using SSR, this method prefetches and resolves the asyncronous data before rendering happens and saves it to Vuex store. Asyncronous data for Category page is a list of all categories, category attributes and list of products for each category.
#### beforeMount
**'filter-changed-category'** event listener is initialized. *Although this event is not triggered anywhere.*
#### beforeDestroy
**'filter-changed-category'** event listener is removed.
