## Core Product Page 

### Props
No props

### Data
`loading` - if true indicates the product is currently being loaded from the backend.  
`favorite` - an object that defines 1) if the current product is in the list of favorite products and 2) name of an icon that will be shown to indicate its status in relation to being in the list of favorite products.  
`compare` - defines if the current product is in compare list.  
`product` - a computed property that represents current product that is shown on the page. Initially gets its value from *'product/productCurrent'* Vuex store getter. Includes all the options like size and color that user sets on the page.  
`originalProduct` - a computed property that represents current product in its initial state. Gets its value from *'product/productOriginal'* Vuex store getter.  
`parentProduct` - a computed property that represents current product's parent product, if any. Gets its value from *'product/productParent'* Vuex store getter.  
`attributesByCode` - a computed property that returns the list of all product attributes by their code. Gets its value from *'attribute/attributeListByCode'* Vuex store getter.  
`attributesById` - a computed property that return the list of all product attributes by their Id. Gets its value from *'attribute/attributeListById'* Vuex store getter. *This prop is not used anywhere.*  
`breadcrumbs` - a computed property that represents breadcrumbs for the current product. Gets its value from *'product/breadcrumbs'* Vuex store getter.  
`configuration` - a computed property that represents an object that shows which attributes (like size and color) are chosen on the product. Gets its value from *'product/currentConfiguration'* Vuex store getter.  
`options` - a computed property that represents an object that shows what attributes (like size and color) with what values are available on the product. Gets its value from *'product/currentOptions'* Vuex store getter.  
`category` - a computed property that represents a category object of the current product. Gets its value from *'category/current'* Vuex store getter.  
`productName` - a computed property that represents a product name. Gets its value from *'category/current'* Vuex store getter.  
`productId` - a computed property that represents a product id. Gets its value from *'category/current'* Vuex store getter.
`isOnWishlist` - a computed property that checks if a given product is in the wishlist.
`isOnCompare` - a computed property that checks if a given product is in compare list.
`image` - a computed property that defines an image (thumbnail) that will be shown on the page and its size.  
`customAttributes` - this is a subset of *attributesByCode* list of attributes that the current product has.  

### Methods
#### Unbound methods
`filterChanged (filterOption)` - sets attributes on the product according to what the user has chosen on the page. Dispatches *'product/configure'* action. *This method is called when 'filter-changed-product' event is triggered, but it's not triggered anywhere in the code.*  
**Parameters**  
*filterOption* - an object that represents an attribute that have changed on the product.

`fetchData (store, route)` - fetches current product data from the backend by dispatching *'product/single'* action. Also dispatches several other actions to get breadcrumbs, product attributes, variants for configurable product, also to set subproducts if the product is grouped.  
**Parameters**  
*store* - Vuex store  
*route* - global router object  

`loadData ({ store, route })` - dispatches *'product/reset'* action that sets current product to original product, nullifies all the configuration and options, then calls *fetchData* method to load current product data.  
**Parameters**
*{store, route}* - an object that consists of references to Vuex store and global router object.  

`stateCheck` - if current product has a parent, redirects to parent product's page. Then checks if the current product is in the wishlist or in the compare list, sets *favorite* and *compare* props accordingly.  
**Parameters**  
No parameters  

#### Bound methods
`validateRoute` - this method is called whenever the global *$route* object changes its value. Calls *loadData* and *stateCheck* methods.    
**Parameters**  
No Parameters  

`addToList` - adds the current product to the wishlist or compare by dispatching *'wishlist/addItem'* or *'compare/addItem'* actions accordingly.
**Parameters**
*list* - compare or wishlist

`removeFromList` - remove the current product from the wishlist or compare by dispatching *'wishlist/removeItem'* or *'compare/removeItem'* actions accordingly.
**Parameters**
*list* - compare or wishlist

### Hooks
#### asyncData
Since the app is using SSR, this method prefetches and resolves the asyncronous data before rendering happens and saves it to Vuex store. On Product page this is done by calling *loadData* method.  

The `asyncData` fires the `product-after-load` event which can be used to populate the Vuex SSR store for additional data regarding the product.

#### beforeMount
Calls *stateCheck* method. Defines *'product-after-priceupdate'* event listener which, if triggered, dispatches *'product/setCurrent'* action that sets current product object in Vuex store. Also defines *'filter-changed-product'* event listener which, if triggered, calls *filterChanged* method. *Currently 'filter-changed-product' event is not triggered anywhere.*
#### beforeDestroy
Removes event listeners that were defined in *beforeMount* hook.
