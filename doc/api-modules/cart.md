# Cart module

This module contains all logic and components related to cart operations.

## Components

### AddToCart
Component responsible for adding product to the cart

**Props**
- `product` - product that'll be added to cart

**Methods**
- `addToCart(product)` - adds passed product to the cart. By default correlates with `product` prop

### Microcart
Microcart component.

**Computed**
- `productsInCart` - array of products that are currently in the cart
- `appliedCoupon` - return applied cart coupon or false if no coupon was applied
-` totals` - cart totals
- `isMicrocartOpen` - returns true if microcart is open

**Methods**
- `applyCoupon(code)` - appies cart coupon
- `removeCoupon()` removes currently applied cart coupon
- 'toggleMicrocart' - open/close microcart

### MicrocartButton
Component responsible for opening/closing Microcart

**Computed**
- `quantity` - number of products in cart

**Methods**
- `toggleMicrocart` - open/close microcart

### Product
Component representing product in microcart. Allows to modify it's quantity or remove from cart. 

**Compued**
- `thumbnail` - returns src of products thumbnail

**Methods**
- `removeFromCart` - removes current product (data property `product`) from cart
- `updateQuantity` - updates cart quantity for current product (data property `product`)


