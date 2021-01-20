# Components

:::danger REMINDER
This document is _archived_ and _NOT_ relevant with the latest version which is `1.11` at the time of writing. Please keep in mind this document is supposed to help you maintain legacy product, not the fresh installation. 
:::

## Core Home Page

:::tip Note
Core page has almost zero functionality, everything is in theme component, which definitely needs to be replaced to the core.
:::

### Props

No props

### Data

`rootCategories` category list to be used for your own custom home page

### Methods

No methods

### Events

`home-after-load` event can be used to populate the vuex `store` with additional data required by SSR.

#### beforeMount

Clears Vuex store entries that define the current category by dispatching `category/reset` action.


## Core Category Page

### Props

No props

### Data

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

### Methods

- `fetchData ({ store, route })` - Prepares query for fetching a list of products of the current category and dispatches `product/list` action that extracts that list.

  - `{ store, route }` - An object consisting of the Vuex store and global router references.

- `validateRoute ({ store, route })` - This method is called whenever the global `$route` object changes its value. It dispatches `'category/single'` action to load current category object and then calls `fetchData` method to load a list of products that relate to this category.
  - `{ store, route }` - An object consisting of the Vuex store and global router references.

### Events

#### asyncData

Since the app is using SSR, this method prefetches and resolves the asynchronous data before rendering happens and saves it to the Vuex store. Asynchronous data for the Category page is a list of all categories, category attributes, and list of products for each category.

#### beforeMount

`filter-changed-category` event listener is initialized. The event is fired when the user selects custom filter value.

#### beforeDestroy

`filter-changed-category`event listener is removed.



## Core Product Page

### Props

No props

### Data

- `loading` - If `true` this indicates the product is currently being loaded from the backend.
- `favorite` - An object that defines 1) if the current product is in the list of favorite products and 2) the name of an icon that will be shown to indicate its status in relation to being in the list of favorite products.
- `compare` - Defines if the current product is in compare list.
- `product` -A computed property that represents the current product that is shown on the page. Initially gets its value from `product/productCurrent` Vuex store getter. Includes all the options like size and color that the user sets on the page.
- `originalProduct` - A computed property that represents the current product in its initial state. Gets its value from`product/productOriginal` Vuex store getter.
- `parentProduct` -  A computed property that represents the current product parent product, if any. Gets its value from `product/productParent` Vuex store getter.
- `attributesByCode` - A computed property that returns the list of all product attributes by their code. Gets its value from `attribute/attributeListByCode` Vuex store getter.
- `attributesById` - A computed property that returns the list of all product attributes by their ID. Gets its value from `attribute/attributeListById` Vuex store getter. **This prop is not used anywhere**.
- `breadcrumbs` - A computed property that represents breadcrumbs for the current product. Gets its value from `product/breadcrumbs` Vuex store getter.
- `configuration` -  A computed property that represents an object that shows which attributes (like size and color) are chosen on the product. Gets its value from `product/currentConfiguration` Vuex store getter.
- `options` - A computed property that represents an object that shows what attributes (like size and color) with what values are available on the product. Gets its value from `product/currentOptions` Vuex store getter.
- `category` - A computed property representing a category object of the current product. Gets its value from `category/getCurrentCategory` Vuex store getter.
- `productName` - A computed property that represents a product name. Gets its value from `category/getCurrentCategory` Vuex store getter.
- `productId` - A computed property representing a product ID. Gets its value from  `category/getCurrentCategory` Vuex store getter.
- `isOnCompare` - A computed property that checks if a given product is in compare list.
- `image` - A computed property that defines an image (thumbnail) that will be shown on the page and its size.
- `customAttributes` - this is a subset of `attributesByCode` list of attributes that the current product has.

### Methods

#### Unbound methods

##### filterChanged (filterOption)

Sets attributes on the product according to what the user has chosen on the page. Dispatches `product/configure` action.

:::tip Note
This method is called when the 'filter-changed-product' event is triggered, but it's not triggered anywhere in the code.
:::

_Parameters_

- `filterOption` - An object that represents an attribute that has changed on the product.

##### fetchData (store, route)

Fetches current product data from the backend by dispatching the product/single action. Also dispatches several other actions to get breadcrumbs, product attributes, variants for a configurable product, and to set sub-products if the product is grouped.

_Parameters_

- `store` - Vuex store
- `route` - global router object

##### loadData ({ store, route })

Dispatches `product/reset` action that sets the current product to the original product, nullifies all the configuration and options, then calls the `fetchData` method to load current product data.

_Parameters_

- `{store, route}`  - An object that consists of references to the Vuex store and global router object.

##### stateCheck

If the current product has a parent, redirects to a parent product page, then check if the current product is in the wishlist or in the compare list, and set `favorite` and `compare` props accordingly.

_Parameters_
No parameters

#### Bound methods

##### validateRoute

This method is called whenever the global `$route` object changes its value. Calls `loadData` and `stateCheck` methods.

_Parameters_
No parameters

##### addToList

Adds the current product to the compare by dispatching `compare/addItem` action accordingly.

_Parameters_

- `list` - compare

##### removeFromList

Removes the current product from the compare by dispatching `compare/removeItem` action accordingly.

_Parameters_

- `list` - compare

### Hooks

#### asyncData

Since the app is using SSR, this method prefetches and resolves the asynchronous data before rendering happens and saves it to the Vuex store. On the Product page, this is done by calling the `loadData` method.

The `asyncData` fires the `product-after-load` event which can be used to populate the Vuex SSR store for additional data regarding the product.

#### beforeMount

Calls `stateCheck` method. Defines `product-after-priceupdate` event listener which, if triggered, dispatches `product/setCurrent` action that sets current product object in Vuex store. Also defines `filter-changed-product` event listener, which, if triggered, calls `filterChanged` method. **Currently 'filter-changed-product' event is not triggered anywhere.**

#### beforeDestroy

Removes event listeners that were defined in `beforeMount` hook.


## Modal component

Simple modal component. Visibility of modal container is based on internal state `isVisible`. We can set this state with the `$emit` event on the global `$bus` event.

### Basic usage

#### Component markup

```html
<modal name="modal-example">
  <div> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
</modal>
```

#### Available events:

```html
<button @click="$bus.$emit('modal-toggle', 'modal-example')">Example</button>
<button @click="$bus.$emit('modal-show', 'modal-example')">Example</button>
<button @click="$bus.$emit('modal-hide', 'modal-example')">Example</button>
```

#### Available props

| Prop  | Type   | Required | Default | Description           |
| ----- | ------ | -------- | ------- | --------------------- |
| name  | String | true     |         | Unique name of modal  |
| delay | Number | false    | 300     | Timeout to show modal |

#### Available Methods

| Method | Argument       | Description                                                |
| ------ | -------------- | ---------------------------------------------------------- |
| toggle | state: Boolean | Manually toggles a modal                                   |
| close  |                | Alias for manually hides a modal. Helpful for Close button |

#### Styles

Core component doesn't have CSS styles. If you want to see an example of our implementation please look [here](https://github.com/vuestorefront/vue-storefront/blob/master/src/themes/default/components/core/Modal.vue)



## Events List

To keep track and make debugging of `$bus.$emit` events across components easier, here is a list of such events that are triggered by components of the default theme.

### ForgotPass

On component close:
- [`modal-hide`, `modal-signup`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Auth/ForgotPass.vue#L80)

On send email action:
- [`notification-progress-start`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Auth/ForgotPass.vue#L95)
- [`notification-progress-stop`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Auth/ForgotPass.vue#L97)

On error handler of email send action:
- [`notification-progress-stop`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Auth/ForgotPass.vue#L109)

### OrderConfirmation

On mounted lifecycle hook:
- [`modal-show`, `modal-order-confirmation`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/OrderConfirmation.vue#L65)

On order confirmation:
- [`modal-hide`, `modal-order-confirmation`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/OrderConfirmation.vue#L71)

On order cancelling:
- [`modal-show`, `modal-order-confirmation`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/OrderConfirmation.vue#L75)

### OrderReview

On 'Term and conditions' link click:
- [`modal-toggle`, `modal-terms`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/OrderReview.vue#L51)

### PersonalDetails

On 'Term and conditions' link click:
- [`modal-toggle`, `modal-terms`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/PersonalDetails.vue#L151)

### Newsletter

On newsletter popup show:
- [`modal-show`, `modal-newsletter`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Footer/Newsletter.vue#L49)

### Header

On 'Login to your account' link click:
- [`modal-toggle`, `modal-signup`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Header/Header.vue#L122)

### Reviews

On 'Login to your account' link click:
- [`modal-show`, `modal-signup`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Reviews/Reviews.vue#L155)

### SidebarMenu

On 'Login to your account' link click:
- [`modal-show`, `modal-signup`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/SidebarMenu/SidebarMenu.vue#L201)

### SubCategory

On user logout:
- [`user-before-logout`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/SidebarMenu/SubCategory.vue#L131)

### Language

On mounted lifecycle hook:
- [`modal-show`, `modal-switcher`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Switcher/Language.vue#L55)

On component close:
- [`modal-hide`, `modal-switcher`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Switcher/Language.vue#L60)

### LanguageSwitcher

On showing language popup:
- [`modal-show`, `modal-switcher`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/LanguageSwitcher.vue#L30)

### NewsletterPopup

On showing newsletter popup:
- [`modal-show`, `modal-newsletter`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/NewsletterPopup.vue#L54)

On hiding newsletter popup:
- [`modal-hide`, `modal-newsletter`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/NewsletterPopup.vue#L67)

### Onboard

On component close:
- [`modal-hide`, `modal-onboard`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/theme/blocks/Home/Onboard.vue#L45)

### Home

On beforeMount lifecycle hook:
- [`modal-toggle`, `modal-onboard`](https://github.com/vuestorefront/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/pages/Home.vue#L74)
