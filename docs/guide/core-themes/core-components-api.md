# Core components API

:::warning Note
Temporary file for core components API. List of props, public methods and data that are available to use via mixin insertion.
In the case of injectable components (like modal) or the ones triggered by Vuex actions you should write them down also. Feel free to write some description/new api proposal for each documented component.
:::

## AddToCart

This component represents a single button that, when pressed, adds a product to the cart.

### Props

- `product` - An instance of a product

### Data

No data

### Methods

- `addToCart (product)` - Dispatches 'cart/addItem' action and passes a product instance as a parameter.

#### Parameters

_product_ - An instance of a product

## BaseCheckbox

This component represents a checkbox with label and validation.

### Props

- `id` - id for a checkbox input and a label
- `validation.condition` - vuelidate if statement
- `validation.text` - validation error text
- `disabled` - boolean prop to disable checkbox input

### Data

No data

### Methods

No methods

## BaseInput

This component represents an input with validation.

### Props

- `type` - input type
- `name` - input name
- `placeholder` - input placeholder
- `autocomplete` - input autocomplete
- `focus` - boolean prop that defines if this input is autofocused
- `validation.condition` - vuelidate if statement
- `validation.text` - validation error text
- `validations` - array of validation objects to apply multiple validations

### Data

- `passType` - a copy of password type for toggle password visibility
- `iconActive` - a boolean prop that defines if visibility button is enabled
- `icon` - default material icon name for visibility button

### Methods

- `togglePassType` - toggle password visibility and icon name

## Breadcrumbs

This component represents a hierarchy of the current page in relation to the application structure. It is used in Product, Category, My Account and Compare pages.

### Props

- `routes` - An array of route objects, each representing name and path to a parent page.
- `activeRoute` - A name of the current page

### Data

No data

### Methods

No methods

## ColorSelector

This component represents a button that is used for visualizing different options, specifically product filters. It is used on category's Sidebar and Product pages.

### Props

- `label` - a label that is shown on the component button.
- `id` - an identifier that unifies an option among others in an array.
- `code` - a name of an option that the component is being used to represent (currently 'color').
- `context` - a name of an entity that the component belongs to (currently one of 'category' or 'product').

### Data

- `active` - a boolean prop that defines if the button is pressed and is active.

### Methods

- `switchFilter (id, label)` - triggers `filter-changed-<context>` event, where context is a value of _context_ prop.

#### Parameters

_id_ - same as _id_ prop.
_label_ - same as _label_ prop.

### Hooks

#### beforeMount

If the current route's name is not 'product' defines 2 event listeners. First one is `filter-reset` that sets _active_ prop to false. Second is `filter-changed-<context>`, where context is a value of _context_ prop. This event listener toggles the value of _active_ prop depending on which instance of ColorSelector component was passed to it as a parameter.

#### beforeDestroy

Removes event listeners defined in `beforeMount` hook.

## Loader

This component is used for visualizing loading process, when something is happening in the background. It is currently used when an account is being registered, the password is being reset and the user is logging in.

### Props

No props

### Data

- `message` - A message that is shown while the loading process is on.
- `isVisible` - Computed property which is equal to UI-store's _loader_ property. This prop defines whether to show or hide the spinner.

### Methods

- `show (message = null)` - Sets message property and calls UI-store mutation 'ui/setLoader', which causes a spinner to show up.

#### Parameters

_message_ - A text that is shown when the loading process is on.

- `hide` - Calls UI-store mutation 'ui/setLoader', which hides a spinner.

#### Parameters

No parameters

### Hooks

#### Mounted

Two listeners are defined:
`'notification-progress-start'` - calls _show_ method.
`'notification-progress-stop'` - calls _hide_ method.

## Logo

This component is intended to serve an image of an application logo and to navigate the user to a Home page when the logo is pressed.

### Props

No props

### Data

No data

### Methods

No methods

## Newsletter popup (should be using modal)

Shows popup modal window where the user can enter his/her newsletter subscription preferences, currently only email address. This component is used in a Footer page.

### Props

No props

### Data

No data

### Methods

- `closeNewsletter` - Closes newsletter popup modal window by calling UI-store mutation 'ui/setNewsletterPopup'.

## Notification

Shows notifications after some actions being performed in the shop. There are four types of notifications: success, error, warning and info.

### Props

No props

### Data

- `notifications` - An Array of notifications that should be currently displayed

### Methods

- `action(action, id)` - Performs an `action` defined as String on notification with passed `id` - usually the action is `close`. Actions are defined in Notification component. Current Notification object schema:

```json
{
  // Choose one
  "type": "info/success/error/warning",
  "title": "Lorem ipsum",
  "action1": {
    "label": "OK",
    "action": "close"
  },
  // Optional param
  "action2": {
    "label": "NO",
    "action": "close"
  },
  // Optional param, if its empty TTL is 5s
  "timeToLive": 10
}
```

### Events

- `('notification', notificationObject)` - takes notification object and adds it to Notification array, then the new notification is displayed

## OfflineBadge

When there's no active internet connection, shows notification about getting offline at the bottom of the screen.

### Props

No props

### Data

- `isOnline` - defines if there is an active internet connection

### Methods

No methods

### Hooks

#### Mounted

Sets isOnline data property and defines two event listeners:

- `'online'` - sets _isOnline_ data property to true.
- `'offline'` - sets _isOnline_ data property to false.

## Overlay

This component is used to shadow parts of the screen that are left after opening modal windows, like WishList or Cart.

### Props

- `isVisible` - computed property that is equal to _overlay_ property of UI-store. Defines whether to shadow parts of the screen or not.

### Data

No data

### Methods

- `close` - calls UI-store mutation 'ui/setOverlay' and sets its _overlay_ property to _false_.

## PriceSelector

Represents one of the options on the Category page. Shows price range and allows the user to choose one of the ranges.

### Props

- `content` - text that shows the price range
- `id` - the unique identifier of the option
- `code` - options' code, equals to 'price'
- `from` - minimum value of the price range
- `to` - maximum value of the price range
- `context` - a name of an entity that the component belongs to (currently 'category')

### Data

- `active` - boolean prop that defines if button is pressed and is active.

### Methods

- `switchFilter (id, label)` - triggers `'filter-changed-<context>'` event, where context is a value of _context_ prop.

#### Parameters

_id_ - same as _id_ prop.
_label_ - same as _label_ prop.

### Hooks

#### beforeMount

Defines 2 event listeners. First one is `filter-reset` that sets _active_ prop to false. Second is `filter-changed-<context>`, where context is a value of _context_ prop. This event listener toggles the value of _active_ prop depending on which instance of PriceSelector component was passed to it as a parameter.

#### beforeDestroy

Removes event listeners defined in `beforeMoun`t hook.

## ProductAttribute

Shows attributes that a specific product has. Used on Product Page.

### Props

- `product` - reference to the product that the attribute belongs to
- `attribute` - attribute itself
- `emptyPlaceholder` - a string that is shown if an attribute has no value

### Data

- `label` - name of an attribute
- `value` - attribute's value(-s)

### Methods

No methods

### Hooks

#### beforeMount

Extracts attribute's label and value(-s) from _product_ and _attribute_ properties.

## ProductLinks

If the product is grouped (which means it consists of several products) this component shows a list of compound products. Used on the Product page.

### Props

- `products` - the array of compound products of a given product

### Data

No data

### Methods

No methods

## ProductListing

Shows given array of products on a page in a given number of columns. Used on Category and Home pages, and also on Related block.

### Props

- `product` - an array of products to show
- `columns` - the number of columns to display on a page. Each product is displayed with ProductTile component.

### Data

No data

### Methods

No methods

## ProductSlider

Shows product tiles slider. Used in Collection component in _default_ theme.

### Props

- `title` - a title of a slider
- `products` - an array of products to show in a slider
- `config` - and object that defines the configuration of a slider, like the number of tiles to show on a page, pagination and looping.

### Data

No data

### Methods

No methods

## ProductTile

Shows a product in a compact way when several products are shown on one page. Used in many places, such as Home page, Search panel, 404 pages and so on.

### Props

- `product` - a specific product
- `thumbnail` - a computed property that represents a smaller image for the product to show in this component. _The size of an image is hard-coded in this property, it might be better to keep dimensions in a config file._

### Data

No data

### Methods

No methods

## SizeSelector

Represents one of the options of a product, namely product's size. Used on Category and Product pages.

### Props

- `label` - a string that represents the size
- `id` - the unique identifier of the size
- `code` - a code name of an option, which is 'size'
- `context` - a name of an entity that the component belongs to (currently one of 'category' or 'product')

### Data

`active` - a boolean prop that defines if the button is pressed and is active.

### Methods

- `switchFilter (id, label)` - triggers `filter-changed-<context>` event, where context is a value of _context_ prop.

#### Parameters

_id_ - same as _id_ prop.
_label_ - same as _label_ prop.

### Hooks

#### beforeMount

Defines 2 event listeners. First one is `filter-reset` that sets _active_ prop to false. Second is `filter-changed-<context>`, where context is a value of _context_ prop. This event listener toggles the value of _active_ prop depending on which instance of SizeSelector component was passed to it as a parameter.

#### beforeDestroy

Removes event listeners defined in `beforeMount` hook.

## Tooltip

Shows an informational icon and hint when focused on that icon. Used on My Account and Checkout pages.

### Props

No props

### Data

No data

### Methods

No methods

## ValidationError

This was supposed to show a validation error message, but is not used anywhere. _Has to be deleted_

### Props

- `message` - a text that explains the error

### Data

No data

### Methods

No methods

# Core pages

## Category

Category page has been refactored (1.0RC) to the new core proposal and the [docs has been moved here](../components/category-page.md).

## Checkout

### Props

No props

### Data

- `stockCheckCompleted` - a boolean prop that shows if all products in the cart (if any) have been checked for availability (whether they are in stock or not).
- `stockCheckOK` - a boolean prop that shows if all products in the cart are in stock.
- `activeSection` - an object that consists of 4 boolean props: _personalDetails_, _shipping_, _payment_ and _orderReview_, - that define which section of Checkout page is currently active. At any point in time only one section can be active.
- `order` - an order object, that consists of all necessary order information that will be sent to the backend to place it.
- `personalDetails` - an object that contains personal details part of the Checkout page.
- `shipping` - an object that contains shipping details part of the Checkout page.
- `payment` - an object that contains payment details part of the Checkout page.
- `orderReview` - _this prop is not used_
- `cartSummary` - this prop is supposed to be filled after `checkout.cartSummary` the event has been triggered. _But this event is not triggered anywhere, therefore this prop currently has no usage._
- `validationResults` - an object that keeps validation result of 3 child components: Personal Details, Shipping Details and Payment Details. _Currently all the validation happens within those 3 child components and there's no need to store the result in a parent component. This prop is redundant._
- `userId` - this new user ID is returned by child OrderReview component if a user registers a new account at checkout. It is then sent to the backend to bind an order to the user.
- `isValid` - this boolean computed property defines if an order can be placed. If there's any validation error within any child component or _stockCheckOK_ prop is not true, this returns false and order won't be placed.

### Methods

- `checkConnection (status)` - checks if there's an active internet connection. If not, fires a notification.

#### Parameters

_status_ - a boolean parameter that defines if there's an active internet connection.

- `activateSection (sectionToActivate)` - sets _sectionToActivate_ named section in _activeSection_ prop object to true and all others to false.

#### Parameters

_sectionToActivate_ - a name of a section that needs to be activated.

- `prepareOrder ()` - returns an order object that will be sent to the backend.

- `placeOrder ()` - if _isValid_ prop is true dispatches `'checkout/placeOrder'` action which will place the order, otherwise fires a notification about the existence of validation errors.

- `savePersonalDetails ()` - dispatches `'checkout/savePersonalDetails'` action which will save checkout personal details information (from _personalDetails_ prop) to the Vuex store.

- `saveShippingDetails ()` - dispatches `'checkout/saveShippingDetails'` action which will save checkout shipping details information (from _shipping_ prop) to the Vuex store.

- `savePaymentDetails ()` - dispatches `'checkout/savePaymentDetails'` action which will save checkout payment details information (from _payment_ prop) to the Vuex store.

### Hooks

#### created

Defines several event listeners to communicate with child components.

- **'network.status'** event listener receives internet connection status and calls _checkConnection_ method.
- **'checkout.personalDetails'** event listener receives personal details information from PersonalDetails child component and activates the next section of the Checkout page (which is shipping details).
- **'checkout.shipping'** event listener receives shipping details information from Shipping child component and activates next section of the Checkout page (which is payment details).
- **'checkout.payment'** event listener receives payment details information from Payment child component and activates next section of the Checkout page (which is order review).
- **'checkout.cartSummary'** - _this event listener is not called anywhere._
- **'checkout.placeOrder'** the event listener is called by OrderReview child component. It has an optional _userId_ parameter that is passed to it in case user registers a new account at the checkout. With or without _userId_ this event listener calls _placeOrder_ method.
- **'checkout.edit'** event listener activates a section of the Checkout page, the name of which is passed to it in a parameter.
- **'order-after-placed'** event listener is called after placed order.

#### beforeMount

Checks if the cart is not empty. If it is, then a notification is fired. Otherwise, sets promises that will check the availability of the products from the cart and if they are all in stock.

#### destroyed

Removes all event listeners that were previously defined in `created` hook.

## Compare

### Props

`title` - the title of the Compare page

### Data

- `attributesByCode` - a computed property that returns the list of all product attributes by their code. Gets its value from `'attribute/attributeListByCode'` Vuex store getter.
- `attributesById` - a computed property that returns the list of all product attributes by their Id. Gets its value from `'attribute/attributeListById'` Vuex store getter. _This prop is not used anywhere._
- `items` - returns the list of products that were chosen for comparison from Vuex store.
- `all_comparable_attributes` - returns the subset of attributes from `attributesByCode` prop that have `is_comparable` property set to true.

### Methods

- `removeFromCompare (product)` - removes a given product from the compare list by dispatching `'compare/removeItem'` action.

#### Parameters

_product_ - a specific product to be removed.

### Hooks

#### created

Dispatches `'compare/load'` action that loads the list of products to compare from localStorage into Vuex store. Also dispatches `'attribute/list'` action that loads all product attributes that have `is_user_defined` property set to true into Vuex store.

## Home

The home page has been refactored to the new core proposal (1.0RC) and the [docs has been moved](../components/home-page.md).

## MyAccount

### Props

- `activeBlock` - currently active block displayed in component (i.e. newsletter preferences, shipping data or orders history)

### Data

- `navigation` - an object that contains names of sections of MyAccount page and anchor links to them.

### Methods

`notify (title)` - this is a temporary method that notifies the user if he presses on a link of a section that is not yet implemented.

### Hooks

#### created

Defines several event listeners to communicate with child components.

- **'myAccount.updateUser'** event listener receives filled out data from child components and dispatches `'user/update'` action to update user profile. It's called from PersonalDetails and ShippingDetails child components.
- **'myAccount.changePassword'** event listener receives updated authentication data from PersonalDetails child component and dispatches `'user/changePassword'` action.
- **'myAccount.updatePreferences'** event listener receives user's updated newsletter subscription preferences from MyNewsletter child component and updates them by dispatching `'user/updatePreferences'` action.

#### mounted

Checks if there's a user token in localStorage. If not, redirects user to the Home page.

#### destroyed

Removes all event listeners that were previously defined in `created` hook.

## PageNotFound

404 page

### Props

No props

### Data

No data

### Methods

No methods

### Hooks

#### asyncData

Since the app is using SSR, this method prefetches and resolves the asynchronous data before rendering happens and saves it to Vuex store. Asynchronous data for PageNotFound page is a list of 8 random products that are called Bestsellers.

## Product

The Product page has been refactored to the new core proposal (1.0RC) and the [docs has been moved](../components/product.md).
