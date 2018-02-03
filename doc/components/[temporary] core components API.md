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

## Breadcrumbs
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
No data
### Methods
No methods

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
### Hooks
#### beforeCreate
Adds *no-scroll* property to document, making shadowed parts of the screen unscrollable.
#### destroyed
Removes *no-scroll* property from document.

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
No data
### Methods
No methods

## ProductAttribute

### Props

### Data

### Methods

## ProductLinks

### Props

### Data

### Methods

## ProductListing

### Props

### Data

### Methods

## ProductSlider

### Props

### Data

### Methods

## ProductTile

### Props

### Data

### Methods

## SizeButton

### Props

### Data

### Methods

## Tooltip

### Props

### Data

### Methods

## ValidationError

### Props

### Data

### Methods
