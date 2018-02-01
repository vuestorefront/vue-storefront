# Core components API

Temporary file for core components API. List of props, public methods and data that are available to use via mixin insertion.
In case of injectable components (like modal) or the ones triggered by Vuex actions you should write them down also. Feel free to write some description/new api proposal for each docummented component.

## AddToCart
This component represents a single button that when pressed adds a product to cart. Right now this component is used on Product page only.
### Props
**product** - An instance of a product  
### Data
No data
### Methods
#### addToCart (product)  
Dispatches 'cart/addItem' action and passes a product instance as a parameter.  
**Parameters:**  
*product* - An instance of a product

## Breadcrumbs
This component represents a hierarchy of the current page in relation to the application's structure. It is used in Product, Category, My Account and Compare pages.
### Props
**routes** - An array of route objects, each representing name and path to a parent page.  
**activeRoute** - A name of the current page
### Data
No data
### Methods
No methods

## ColorButton
This components represents a button that is used for visualizing different options, specifically product filters. It is used on category's Sidebar and Product pages.
### Props
**label** - label that is shown on the component button.  
**id** - identifier that unifies an option among others in array.  
**code** - a name of an option that the component is being used to represent (currently 'color').  
**context** - a name of an entity that the component belongs to (currently one of 'category' or 'product').
### Data
No data
### Methods
No methods

## Loader
This component is used for visualizing loading process, when something is happening in the background. It is currently used when account is being registered, password is being reset and user is logging in. 
### Props
No props
### Data
**message** - A message that is shown while loading process is on.  
**isVisible** - Computed property which is equal to UI-store's *loader* property. This prop defines whether to show or hide the spinner.
### Methods
#### show (message = null)
Sets message property and calls UI-store mutation 'ui/setLoader', which causes a spinner to show up.  
**Parameters:**  
*message* - A text that is shown when loading process is on.
#### hide
Calls UI-store mutation 'ui/setLoader', which hides a spinner.  
**Parameters:**  
No parameters
### Mounted
Two listeners are defined:  
*'notification-progress-start'* - calls *show* method.  
*'notification-progress-stop'* - calls *hide* method.

## Logo
This component is intended to serve an image of an application's logo and to navigate the user to a Home page when the logo is pressed.
### Props
No props
### Data
No data
### Methods
No methods

## Newsletter popup (should be using modal)

### Props

### Data

### Methods

## Notification

### Props

### Data

### Methods

## OfflineBadge

### Props

### Data

### Methods

## Overlay

### Props

### Data

### Methods

## PriceButton

### Props

### Data

### Methods

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
