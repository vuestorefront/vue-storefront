# Checkout.com Nuxt module
## How to install
1. Open your `nuxt.config.js`
2. At the bottom of `modules` add:
```js
['@vue-storefront/checkout-com/nuxt', { publicKey: 'pk_test_your-public-key' }],
```

## Render payment handlers
1. Import `useCko` and `useCkoCard`:
```js
import { useCko, useCkoCard } from '@vue-storefront/checkout-com';
```

2. `useCko` returns:
```ts
interface {
    availableMethods: { name: string, [key: string]: any },
    error: Error | null,
    loadAvailableMethods: (): { id, apms },
    initForm: (): void
}
```
`useCkoCard` returns:
```ts
interface {
    error: Error | null,
    submitDisabled: Boolean,
    submitForm: async(),
    makePayment: async({ cartId }),
    initCardForm: (): void
}
```

In this step you need:
```js
const { cart } = useCart();
const { setBillingDetails } = useCheckout();
const { submitDisabled } = useCkoCard();
const { initForm, loadAvailableMethods, availableMethods } = useCko();
```

3. `setBillingDetails` to save billing address. So you will be able to fetch `availableMethods` which base on your billing address (server-side)
4. Run `loadAvailableMethods` - it will return `interface { id, apms: Array<any> }` and set `apms` inside `availableMethods`
5. Execute `initForm`. It mounts different payment handlers depends on arguments (check details below). If you are calling it after load component - **use `onMounted` to make sure DOM Element where it will be mounted already exists**.

```ts
interface PaymentMethods {
  card?: boolean;
  klarna?: boolean;
  paypal?: boolean;
}

interface PaymentMethodsConfig {
  card?: Omit<Configuration, 'publicKey'>;
  klarna?: any;
  paypal?: any;
}

const initForm = (initMethods: PaymentMethods = null, config: PaymentMethodsConfig = {}): void
```

`initMethods` - if it is `null` - method will try to mount handler for each supported payment method
- if it is `{}` - nothing will be mounted
- in object, you can specify which method you want to mount, e.g: `{ card: true }` but it will still check whether it is supported or not

`config` allows to specify configuration for some payment handler, e.g. for card Frames we could use:
```js
{
    card: {
        localization: 'es-ES'
    }
}
```
This configuration will have bigger priority than one from `nuxt.config.js`. The thing is you cannot overwrite `publicKey` there. Signature for Frames looks like that:
```ts
(params?: Omit<Configuration, 'publicKey'>): void
```
Card's Frames will be mounted with DOM element with class `card-frame`.

6. When `submitDisabled` changes to false - it means provided Card's data is proper and you could allow your user go forward. Card's token will be stored in localStorage for a moment.
7. Call `submitForm` function on card form submit.

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
const payment = await makePayment(cart.value.id);
if (!payment) return;
```

3. If there is any error, you can access it via `paymentError.value`. Otherwise, it will be nullish

4. If no errors, place an order:
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
    frames: {
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

## Fetching available payment methods
At first, you have to save billing address in your backend to do that. You can do it just after `setBillingDetails` call from `Creadit card component` step. Then you can easily use `loadAvailableMethods` method. It requires reference as the first argument - which is cartId. E.g:
```js
// Somewhere inside Vue3's setup method
const { cart } = useCart();
const { loadAvailableMethods, availableMethods } = useCko();
const { setBillingDetails } = useCheckout();

const handleFormSubmit = async () => {
    await setBillingDetails(billingDetails.value, { save: true });
    const response = await loadAvailableMethods(cart.value.id);
    console.log('Server respond with ', response)
    console.log('Array of available payment methods ', availableMethods)
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

`availableMethods` might look like:
```json
[
    {
        "name": "card"
    },
    {
        "name": "klarna",
        "some_key": "123"
    },
    {
        "name": "paypal",
        "some_key": "456"
    }
]
```