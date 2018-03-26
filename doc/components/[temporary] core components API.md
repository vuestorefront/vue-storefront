# Core components API

Temporary file for core components API. List of props, public methods and data that are available to use via mixin insertion.
In case of injectable components (like modal) or the ones triggered by Vuex actions you should write them down also. Feel free to write some description/new api proposal for each docummented component.

## AddToCart
This component represents a single button that when pressed adds a product to cart. Right now this component is used on Product page only.
### Props
`product` - An instance of a product  
### Data
No data
### Methods
`addToCart (product)` - Dispatches 'cart/addItem' action and passes a product instance as a parameter.  
**Parameters:**  
*product* - An instance of a product

## Breadcrumbsf
This component represents a hierarchy of the current page in relation to the application's structure. It is used in Product, Category, My Account and Compare pages.
### Props
`routes` - An array of route objects, each representing name and path to a parent page.  
`activeRoute` - A name of the current page
### Data
No data
### Methods
No methods

## ColorButton
This components represents a button that is used for visualizing different options, specifically product filters. It is used on category's Sidebar and Product pages.
### Props
`label` - label that is shown on the component button.  
`id` - identifier that unifies an option among others in array.  
`code` - a name of an option that the component is being used to represent (currently 'color').  
`context` - a name of an entity that the component belongs to (currently one of 'category' or 'product').
### Data
`active` - boolean prop that defines if button is pressed and is active.  
### Methods
`switchFilter (id, label)` - triggers *'filter-changed-<context>'* event, where context is a value of *context* prop.  
**Parameters**  
*id* - same as *id* prop.  
*label* - same as *label* prop.
### Hooks
#### beforeMount
If current route's name is not 'product' defines 2 event listeners. First one is *'filter-reset'* that sets *active* prop to false. Second is *'filter-changed-<context>'*, where context is a value of *context* prop. This event listener toggles the value of *active* prop depending on which instance of ColorButton component was passed to it as a parameter.
#### beforeDestroy
Removes event listeners defined in *beforeMount* hook.

## Loader
This component is used for visualizing loading process, when something is happening in the background. It is currently used when account is being registered, password is being reset and user is logging in. 
### Props
No props
### Data
`message` - A message that is shown while loading process is on.  
`isVisible` - Computed property which is equal to UI-store's *loader* property. This prop defines whether to show or hide the spinner.
### Methods
`show (message = null)` - Sets message property and calls UI-store mutation 'ui/setLoader', which causes a spinner to show up.  
**Parameters:**  
*message* - A text that is shown when loading process is on.  

`hide` - Calls UI-store mutation 'ui/setLoader', which hides a spinner.  
**Parameters:**  
No parameters
### Hooks
#### Mounted
Two listeners are defined:  
`'notification-progress-start'` - calls *show* method.  
`'notification-progress-stop'` - calls *hide* method.

## Logo
This component is intended to serve an image of an application's logo and to navigate the user to a Home page when the logo is pressed.
### Props
No props
### Data
No data
### Methods
No methods

## Newsletter popup (should be using modal)
Shows popup modal window where user can enter his newsletter subscription preferences, currently only email address. This components is used in a Footer page.
### Props
No props
### Data
No data
### Methods
`closeNewsletter` - Closes newsletter popup modal window by calling UI-store mutation 'ui/setNewsletterPopup'.

## Notification

Shows notifications after some actions being performed in shop. There are four types of notifications: success, error, warning and info.

### Props
No props 

### Data
`notifications` - An Array of notifications that should be currently displayed

### Methods
`action(action, id)` - Performs an `action` defined as String on notification with passed `id` - usually the action is `close`. Actions are defined in Notification component. Current Notification object schema:
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

`('notification', notificationObject)` - takes notification object and adds it to Notification array, then the nnew notification is displayed

## OfflineBadge
When there's no active internet connection, shows notification about getting offline at the bottom of the screen.
### Props
No props
### Data
`isOnline` - defines if there is an active internet connection
### Methods
No methods
### Hooks
#### Mounted
Sets isOnline data property and defines two event listeners:  
`'online'` - sets *isOnline* data property to true.  
`'offline'` - sets *isOnline* data property to false.

## Overlay
This component is used to shadow parts of the screen that are left after opening modal windows, like WishList or Cart.
### Props
`isVisible` - computed property that is equal to *overlay* property of UI-store. Defines whether to shadow parts of the screen or not.
### Data
No data
### Methods
`close` - calls UI-store mutation 'ui/setOverlay' and sets its *overlay* property to *false*.

## PriceButton
Represents one of the options on Category page. Shows price range and allows uesr to choose one of the ranges.
### Props
`content` - text that shows the price range  
`id` - unique identifier of the option  
`code` - options' code, equals to 'price'  
`from` - minimum value of the price range  
`to` - maximum value of the price range  
`context` - a name of an entity that the component belongs to (currently 'category')
### Data
`active` - boolean prop that defines if button is pressed and is active.  
### Methods
`switchFilter (id, label)` - triggers *'filter-changed-<context>'* event, where context is a value of *context* prop.  
**Parameters**  
*id* - same as *id* prop.  
*label* - same as *label* prop.
### Hooks
#### beforeMount
Defines 2 event listeners. First one is *'filter-reset'* that sets *active* prop to false. Second is *'filter-changed-<context>'*, where context is a value of *context* prop. This event listener toggles the value of *active* prop depending on which instance of PriceButton component was passed to it as a parameter.
#### beforeDestroy
Removes event listeners defined in *beforeMount* hook.

## ProductAttribute
Shows attributes that a specific product has. Used on Product Page.
### Props
`product` - reference to product that the attribute belongs to  
`attribute` - attribute itself  
`emptyPlaceholder` - a string that is shown if an attribute has no value
### Data
`label` - name of an attribute
`value` - attribute's value(-s)
### Methods
No methods
### Hooks
#### beforeMount
Extracts attribute's label and value(-s) from *product* and *attribute* properties.

## ProductLinks
If product is grouped (which means it consists of several products) this component shows list of compound products. Used on Product page.
### Props
`products` - array of compound products of a given product
### Data
No data
### Methods
No methods

## ProductListing
Shows given array of products on a page in a given number of columns. Used on Category and Home pages, and also on Related block.
### Props
`product` - array of products to show  
`columns` - number of columns to display on a page. Each product is displayed with ProductTile component.
### Data
No data
### Methods
No methods

## ProductSlider
Shows product tiles slider. Used in Collection component in *default* theme. 
### Props
`title` - a title of a slider  
`products` - an array of products to show in a slider  
`config` - and object that defines configuration of a slider, like number of tiles to show on a page, pagination and looping.
### Data
No data
### Methods
No methods

## ProductTile
Shows a product in a compact way when several products are shown on one page. Used in many places, such as Home page, Search panel, 404 page and so on.
### Props
`product` - a specific product  
`thumbnail` - a computed property that represents a smaller image for the product to show in this component. *The size of an image is hard-coded in this property, it might be better to keep dimensions in a config file.*
### Data
No data
### Methods
No methods

## SizeButton
Represents one of the options of a product, namely product's size. Used on Category and Product pages.
### Props
`label` - a string that represents the size  
`id` - unique identifier of the size  
`code` - a code name of an option, which is 'size'  
`context` - a name of an entity that the component belongs to (currently one of 'category' or 'product')
### Data
`active` - boolean prop that defines if button is pressed and is active.  
### Methods
`switchFilter (id, label)` - triggers *'filter-changed-<context>'* event, where context is a value of *context* prop.  
**Parameters**  
*id* - same as *id* prop.  
*label* - same as *label* prop.
### Hooks
#### beforeMount
Defines 2 event listeners. First one is *'filter-reset'* that sets *active* prop to false. Second is *'filter-changed-<context>'*, where context is a value of *context* prop. This event listener toggles the value of *active* prop depending on which instance of SizeButton component was passed to it as a parameter.
#### beforeDestroy
Removes event listeners defined in *beforeMount* hook.

## Tooltip
Shows an informational icon and hint when focused on that icon. Used on My Account and Checkout pages.
### Props
No props
### Data
No data
### Methods
No methods

## ValidationError
This was supposed to show a validation error message, but is not used anywhere. *Has to be deleted*
### Props
`message` - a text that explains the error
### Data
No data
### Methods
No methods

# Core pages

## Category

Category page has been refactored (1.0RC) to the new core proposal and the [docs has been moved here](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/core/CategoryPage.md).

## Checkout

### Props
No props
### Data
`stockCheckCompleted` - a boolean prop that shows if all products in cart (if any) have been checked for availability (whether they are in stock or not).  
`stockCheckOK` - a boolean prop that shows if all products in cart are in stock.  
`orderPlaced` - a boolean prop that is set to true after *'order-after-placed'* event has been triggered, defining a successful placement of an order.  
`activeSection` - an object that consists of 4 boolean props: *personalDetails*, *shipping*, *payment* and *orderReview*, - that define which section of Checkout page is currently active. At any point of time only one section can be active.  
`order` - an order object, that consists of all necessary order information that will be sent to the backend to place it.  
`personalDetails` - an object that contains personal details part of the Checkout page.  
`shipping` - an object that contains shipping details part of the Checkout page.  
`payment` - an object that contains payment details part of the Checkout page.  
`orderReview` - *this prop is not used*  
`cartSummary` - this prop is supposed to be filled after *'checkout.cartSummary'* event has been triggered. *But this event is not triggered anywhere, therefore this prop currently has no usage.*  
`validationResults` - an object that keeps validation result of 3 child components: Personal Details, Shipping Details and Payment Details. *Currently all the validation happens within those 3 child components and there's no need to store the result in a parent component. I think is prop is redundant.*  
`userId` - this new user ID is returned by child OrderReview component if a user registers a new account at checkout. It is then sent to the backend to bind an order to the user.  
`isValid` - this boolean computed property defines if an order can be placed. If there's any validation error within any child component or *stockCheckOK* prop is not true, this returns false and an order won't be placed.  
### Methods
`checkConnection (status)` - checks if there's an active internet connection. If not, fires a notification.  
**Parameters**  
*status* - a boolean parameter that defines if there's an active internet connection.  

`activateSection (sectionToActivate)` - sets *sectionToActivate* named section in *activeSection* prop object to true and all others to false.  
**Parameters**  
*sectionToActivate* - a name of a section that needs to be activated.  

`prepareOrder ()` - returns an order object that will be sent to the backend.  

`placeOrder ()` - if *isValid* prop is true dispatches *'checkout/placeOrder'* action which will place the order, otherwise fires a notification about existence of validation errors.  

`savePersonalDetails ()` - dispatches *'checkout/savePersonalDetails'* action which will save checkout personal details information (from *personalDetails* prop) to the Vuex store.  

`saveShippingDetails ()` - dispatches *'checkout/saveShippingDetails'* action which will save checkout shipping details information (from *shipping* prop) to the Vuex store.  

`savePaymentDetails ()` - dispatches *'checkout/savePaymentDetails'* action which will save checkout payment details information (from *payment* prop) to the Vuex store.
### Hooks
#### created
Defines several event listeners to communicate with child components.  
**'network.status'** event listener receives internet connection status and calls *checkConnection* method.  
*'checkout.personalDetails'* event listener receives personal details information from PersonalDetails child component and activates next section of the Checkout page (which is shipping details).  
**'checkout.shipping'** event listener receives shipping details information from Shipping child component and activates next section of the Checkout page (which is payment details).  
**'checkout.payment'** event listener receives payment details information from Payment child component and activates next section of the Checkout page (which is order review).  
**'checkout.cartSummary'** - *this event listener is not called anywhere.*  
**'checkout.placeOrder'** event listener is called by OrderReview child component. It has optional *userId* parameter that is passed to it in case user registers a new account at the checkout. With or without *userId* this event listener calls *placeOrder* method.  
**'checkout.edit'** event listener activates a section of Checkout page, name of which is passed to it in a parameter.  
**'order-after-placed'** event listener sets *orderPlaced* prop to true.
#### beforeMount
Checks if cart is not empty. If it is, then a notification is fired. Otherwise, sets promises that will check availability of the products from the cart and if they are all in stock.
#### destroyed
Removes all event listeners that were previously defined in *created* hook.

## Compare

### Props
`title` - title of the Compare page
### Data
`attributesByCode` - a computed property that returns the list of all product attributes by their code. Gets its value from *'attribute/attributeListByCode'* Vuex store getter.  
`attributesById` - a computed property that return the list of all product attributes by their Id. Gets its value from *'attribute/attributeListById'* Vuex store getter. *This prop is not used anywhere.*  
`items` - returns the list of products that were chosen for comparison from Vuex store.  
`all_comparable_attributes` - returns the subset of attributes from *attributesByCode* prop that have *is_comparable* property set to true.
### Methods
`removeFromCompare (product)` - removes a given product from the compare list by dispatching *'compare/removeItem'* action.  
**Parameters**  
*product* - a specific product to be removed.
### Hooks
#### created
Dispatches *'compare/load'* action that loads list of products to compare from localStorage into Vuex store. Also dispatches *'attribute/list'* action that loads all product attributes that have *is_user_defined* property set to true into Vuex store.

## Home

Home page has been refactored to the new core proposal (1.0RC) and the [docs has been moved](core/HomePage.md).

## MyAccount

### Props
`activeBlock` - currently active block displayed in component (i.e. newsletter preferences, shipping data or orders history)
### Data
`navigation` - an object that contains names of sections of MyAccount page and anchor links to them.   
### Methods
`notify (title)` - this is a temporary method that notifies user if he presses on a link of a section that is not yet implemented.  
### Hooks
#### created
Defines several event listeners to communicate with child components.  
**'myAccount.updateUser'** event listener receives filled out data from child components and dispatches *'user/update'* action to update user profile. It's called from PersonalDetails and ShippingDetails child components.  
**'myAccount.changePassword'** event listener receives updated authentication data from PersonalDetails child component and dispatches *'user/changePassword'* action.  
**'myAccount.updatePreferences'** event listener receives user's updated newsletter subscription preferences from MyNewsletter child component and updates them by dispatching *'user/updatePreferences'* action.
#### mounted
Checks if there's a user token in localStorage. If not, redirects user to Home page.
#### destroyed
Removes all event listeners that were previously defined in *created* hook.

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
Since the app is using SSR, this method prefetches and resolves the asyncronous data before rendering happens and saves it to Vuex store. Asyncronous data for PageNotFound page is a list of 8 random products that are called Bestsellers.

## Product

Product page has been refactored to the new core proposal (1.0RC) and the [docs has been moved](core/ProductPage.md).
