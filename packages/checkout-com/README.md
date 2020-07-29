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
    initForm: (): void,
    fetchAvailableMethods: async(cartId): { id, apms } | null
}
```

In this step you need:
```js
const { submitForm, submitDisabled, initForm } = useCkoCard();
```

3. Execute `initForm` in `setup`. It will set `submitDisabled` to true and create Card Component in `onMounted` hook. It will be mounted with DOM element with class `card-frame`.
4. When `submitDisabled` changes to false - it means provided Card's data is proper and you could allow your user go forward. Card's token will be stored in localStorage for a moment.
5. Call `submitForm` function on form submit. You might add it to `handleFormSubmit` like:
```js
const handleFormSubmit = async () => {
    await setBillingDetails(billingDetails.value, { save: true });
    await submitForm();
    context.root.$router.push('/checkout/order-review');
};
```

## Finalizing payment
1. In this step you need:
```js
const { makePayment, error: paymentError } = useCkoCard();
const { cart } = useCart();
const { placeOrder } = useCheckout();
```

`error` - contains error message from the response if you do not use 3ds or we have some server related issues. If the user just removed stored token from localStorage it will have `There is no payment token` inside.
`makePayment` - it proceeds with the payment and removes card token afterward. Returns Promise<Payment> if succeed, or Promise<null> if failed.

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

## Autoloading SDK
Checkout.com supports 3 payment methods - Credit Card, Klarna & Paypal. By default, module fetches SDK only for Credit Card (Frames). You can customize it with module's config `paymentMethods` attribute. E.g:
```js
['@vue-storefront/checkout-com/nuxt', {
    publicKey: 'pk_test_XXX',
    paymentMethods: {
        cc: true,
        paypal: false,
        klarna: true
    }
}]
```

## Customization Frames
In `nuxt.config.js` module's config you can use each attribute from [this page](https://docs.checkout.com/quickstart/integrate/frames/frames-customization-guide), e.g:
```js
['@vue-storefront/checkout-com/nuxt', {
    publicKey: 'pk_test_XXXX',
    localization: 'KO-KR',
    styles: {
        'card-number': {
            color: 'red'
        },
        base: {
            color: '#72757e',
            fontSize: '19px',
            minWidth: '60px'
        },
        invalid: {
            color: 'red'
        },
        placeholder: {
            base: {
                color: 'cyan',
                fontSize: '50px'
            }
        }
    }
}]
```

`localization` attribute must be a string or fulfill `CustomLocalization` interface:
```ts
interface CustomLocalization {
  cardNumberPlaceholder: string;
  expiryMonthPlaceholder: string;
  expiryYearPlaceholder: string;
  cvvPlaceholder: string;
}
```

You can also send Frames configuration as argument to `initForm` function. This configuration will have bigger priority than one from `nuxt.config.js`. The thing is you cannot overwrite `publicKey` there. Signature looks like that:
```ts
(params?: Omit<Configuration, 'publicKey'>): void
```

## Fetching available payment methods
At first, you have to save billing address in your backend to do that. You can do it just after `setBillingDetails` call from `Creadit card component` step. Then you can easily use `fetchAvailableMethods` method. It requires reference as the first argument - which is cartId. E.g:
```js
// Somewhere inside Vue3's setup method
const { cart } = useCart();
const { fetchAvailableMethods } = useCkoCard();
const { setBillingDetails } = useCheckout();

const handleFormSubmit = async () => {
    await setBillingDetails(billingDetails.value, { save: true });
    const response = await fetchAvailableMethods(cart.value.id);
    console.log('Server respond with ', response)
};
```

Response might look like:
```json
{
    "id":"cid_XXX",
    "apms":[
        {
            "name":"paypal",
            "schema":"https://somewebsite.com/apms/paypal.json",
            "show":true
        }
    ]
}
```