# Core Product Page

## Props

No props

## Data

- `loading` - if `true` indicates the product is currently being loaded from the backend.
- `favorite` - an object that defines 1) if the current product is in the list of favorite products and 2) name of an icon that will be shown to indicate its status in relation to being in the list of favorite products.
- `compare` - defines if the current product is in compare list.
- `product` - a computed property that represents current product that is shown on the page. Initially gets its value from `product/productCurrent` Vuex store getter. Includes all the options like size and color that user sets on the page.
- `originalProduct` - a computed property that represents current product in its initial state. Gets its value from `product/productOriginal` Vuex store getter.
- `parentProduct` - a computed property that represents current product parent product, if any. Gets its value from `product/productParent` Vuex store getter.
- `attributesByCode` - a computed property that returns the list of all product attributes by their code. Gets its value from `attribute/attributeListByCode` Vuex store getter.
- `attributesById` - a computed property that returns the list of all product attributes by their id. Gets its value from `attribute/attributeListById` Vuex store getter. **This prop is not used anywhere**.
- `breadcrumbs` - a computed property that represents breadcrumbs for the current product. Gets its value from `product/breadcrumbs` Vuex store getter.
- `configuration` - a computed property that represents an object that shows which attributes (like size and color) are chosen on the product. Gets its value from `product/currentConfiguration` Vuex store getter.
- `options` - a computed property that represents an object that shows what attributes (like size and color) with what values are available on the product. Gets its value from `product/currentOptions` Vuex store getter.
- `category` - a computed property representing a category object of the current product. Gets its value from `category/current` Vuex store getter.
- `productName` - a computed property that represents a product name. Gets its value from `category/current` Vuex store getter.
- `productId` - a computed property representing a product id. Gets its value from `category/current` Vuex store getter.
- `isOnCompare` - a computed property that checks if a given product is in compare list.
- `image` - a computed property that defines an image (thumbnail) that will be shown on the page and its size.
- `customAttributes` - this is a subset of `attributesByCode` list of attributes that the current product has.

## Methods

### Unbound methods

#### filterChanged (filterOption)

Sets attributes on the product according to what the user has chosen on the page. Dispatches `product/configure` action.

:::tip Note
This method is called when 'filter-changed-product' event is triggered, but it's not triggered anywhere in the code.
:::

_Parameters_

- `filterOption` - an object that represents an attribute that have changed on the product.

#### fetchData (store, route)

Fetches current product data from the backend by dispatching `product/single` action. Also dispatches several other actions to get breadcrumbs, product attributes, variants for configurable product, also to set sub-products if the product is grouped.

_Parameters_

- `store` - Vuex store
- `route` - global router object

#### loadData ({ store, route })

Dispatches `product/reset` action that sets current product to original product, nullifies all the configuration and options, then calls `fetchData` method to load current product data.

_Parameters_

- `{store, route}` - an object that consists of references to Vuex store and global router object.

#### stateCheck

If current product has a parent, redirects to a parent product page. Then checks if the current product is in the wishlist or in the compare list, sets `favorite` and `compare` props accordingly.

_Parameters_
No parameters

### Bound methods

#### validateRoute

This method is called whenever the global `$route` object changes its value. Calls `loadData` and `stateCheck` methods.

_Parameters_
No parameters

#### addToList

Adds the current product to the compare by dispatching `compare/addItem` action accordingly.

_Parameters_

- `list` - compare

#### removeFromList

Removes the current product from the compare by dispatching `compare/removeItem` action accordingly.

_Parameters_

- `list` - compare

## Hooks

### asyncData

Since the app is using SSR, this method prefetches and resolves the asynchronous data before rendering happens and saves it to Vuex store. On Product page this is done by calling `loadData` method.

The `asyncData` fires the `product-after-load` event which can be used to populate the Vuex SSR store for additional data regarding the product.

### beforeMount

Calls `stateCheck` method. Defines `product-after-priceupdate` event listener which, if triggered, dispatches `product/setCurrent` action that sets current product object in Vuex store. Also defines `filter-changed-product` event listener which, if triggered, calls `filterChanged` method. **Currently 'filter-changed-product' event is not triggered anywhere.**

### beforeDestroy

Removes event listeners that were defined in `beforeMount` hook.
