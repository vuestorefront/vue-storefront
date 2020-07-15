# Checkout.com Nuxt module
## How to install
1. Open your `nuxt.config.js`
2. At the bottom of `modules` add:
```js
['@vue-storefront/checkout-com/nuxt', { publicKey: 'pk_test_your-public-key' }],
```

## Credit card component
1. Import `useCkoCard`:
```js
import { useCkoCard } from '@vue-storefront/checkout-com';
```

2. `useCkoCard` returns:
```ts
interface {
    error: Error | null,
    submitDisabled: Boolean,
    submitForm: async(),
    makePayment: async({ cartId }),
    initForm: (): void
}
```

In this step you need:
```js
const { submitForm, submitDisabled, initForm } = useCkoCard();
```

3. Execute `initForm` in `setup`. It will set `submitDisabled` to true and create Card Component in `onMounted` hook.
4. When `submitDisabled` changes to false - it means provided Card's data is proper and you could allow your user go forward. Card's token will be stored in localStorage for a moment.

## Finalizing payment
1. In this step you need:
```js
const { makePayment, error: paymentError } = useCkoCard();
const { cart } = useCart();
const {
    placeOrder
} = useCheckout();
```

`error` - contains error message from the response if you do not use 3ds or we have some server related issue. If user just removed stored token from localStorage it will have `new Error('There is no payment token')` inside.
`makePayment` - it creates context, then payment, then removes card token. Returns Promise<Payment> if succeed, or Promise<null> if failed.

2. You should `makePayment` at first (remember to check if everything went ok):
```js
const payment = await makePayment({ cartId: cart.value.id });
if (!payment) return;
```

3. If so, place an order:
```js
const order = await placeOrder();
```

4. `payment.data.redirect_url` contains 3DS Auth redirect url if it is required by bank. You have to support it:
```js
if (payment.data.redirect_url) {
    window.location.href = payment.data.redirect_url;
    return;
}
```

5. After 3DS Auth, user will be redirected to one of these urls. They are being created inside `makePayment` method:
```js
success_url: `${window.location.origin}/cko/payment-success`,
failure_url: `${window.location.origin}/cko/payment-error`
```