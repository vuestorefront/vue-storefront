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

### Props

### Data

### Loader

## Breadcrumbs

### Props

### Data

### Methods

## Logo

### Props

### Data

### Methods

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
