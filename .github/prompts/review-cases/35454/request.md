/code-review  The bug tracker task description is the following:
<task_description>
Vue Storefront - add Amazon Pay payment method support
</task_description>

Issue analysis provided:
<task_analysis>
# Analysis

## Refining Requirements

Add support for the Amazon Pay express checkout flow.

## Requirements Analysis

There are two versions of the Amazon Pay Checkout flow:

1. **Version 1** – Requires a separate order review page.
2. **Version 2 (“Amazon Pay Buy Now”)** – Supports a checkout flow similar to the existing express checkout methods. The checkout is fully handled by the Amazon popup, and checkout data can be updated using callbacks.

We should use **Version 2**, but we need to verify that the appropriate Magento module supports it.

### Button Rendering

First, add the `https://static-na.payments-amazon.com/checkout.js` script to the page.
This can be done using `$extendedHead.append`, similar to how it’s implemented for the Fera or True Vault scripts.

Next, render the button using the `amazon.Pay.renderJSButton('element-selector', options)` function.

**Important options:**

* `merchantId`
* `productType: 'PayAndShip' | 'PayOnly'`
  Use `PayOnly` for virtual carts.
* `checkoutSessionConfig`:
   - `storeId` – Amazon Pay store ID.
   - `scopes` – Should include all applicable values. Possible options:
      * `name`
      * `email`
      * `phoneNumber`
      * `billingAddress`
      * `shippingAddress` – Omit if the cart contains only virtual products.
   - `paymentDetails`:
      * `paymentIntent: "AuthorizeWithCapture"`

Callbacks should also be provided for different events in the initialization options. These callbacks may be asynchronous.

Most callbacks should return an object with the following interface:

```js
{
  totalBaseAmount: Price,
  totalTaxAmount: Price,
  totalShippingAmount: Price,
  totalChargeAmount: Price,
  totalOrderAmount: Price,
  totalDiscountAmount: Price,
  deliveryOptions?: DeliveryOption[]
}
```

**Price interface:**

```js
{
  amount: string,
  currencyCode: string
}
```

**Delivery option interface:**

```js
{
  id: string,
  price: Price,
  shippingMethod: {
    shippingMethodName: string,
    shippingMethodCode: string
  },
  isDefault?: boolean
}
```

The main difference compared to the existing express checkout methods is the extended list of totals.
These values should be respected in the `updateShippingDetails` function of the `express-checkout-buttons` component.
All required values can be retrieved from the totals.

### Shipping Address Selection

When the user selects a shipping address, the `onShippingAddressSelection` callback will be triggered.

Additionally, when the user is authorized and the checkout is initialized, the `onInitCheckout` callback will be called.

In both cases, the `event` object will include a `shippingAddress` field with the following interface:

```js
{
  name: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  county: string,
  district: string,
  stateOrRegion: string,
  postalCode: string,
  countryCode: string,
  phoneNumber: string
}
```

This includes all the required address data.

### Shipping Method Selection

When the user selects a shipping method, the `onDeliveryOptionSelection` callback will be triggered.

The `event` object will include a `deliveryOptions` field with the following interface:

```js
{
  id: string,
  displayName: string,
  amount: string
}
```

### Billing Address Retrieval

The billing address can be retrieved in the `onCompleteCheckout` callback.
Its interface matches that of the shipping address.

### Order Placement

In the `onCompleteCheckout` callback, retrieve the `amazonCheckoutSessionId` from the event and use it as the payment nonce.

</task_analysis>