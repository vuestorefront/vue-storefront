# Stock Vuex Store

Stock Store is designed to handle stock quantity checks.

## Events

The following events are published from `stock` store:

- `stock-after-check` - emited just after the stock item has been received from eCommerce backend / Magento

## Actions 

The cart store provides following public actions:

### `check (context, { product, qty = 1 })`
Check if the `product` can be added to the shopping cart with given by `qty` qunatity.

The resulting promise is expanded to the following object:
```js
{ 
  qty: 100, 
  status: 'ok', // another option is: 'out_of_stock'
  onlineCheckTaskId: 14241
}
```