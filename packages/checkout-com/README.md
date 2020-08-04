# Checkout.com Nuxt module
## How to install
1. Open your `nuxt.config.js`
2. At the bottom of `modules` add:
```js
['@vue-storefront/checkout-com/nuxt', {
    publicKey: 'pk_test_your-public-key',
    secretKey: 'sk_test_your-secret-key',
    ctApiUrl: 'https://your-commerctools-instance.com'
}],
```

## Render payment handlers & finalize payment
1. Import `useCko`:
```js
import { useCko } from '@vue-storefront/checkout-com';
```

2. `useCko` returns:
```ts
interface {
    availableMethods: { name: string, [key: string]: any },
    error: Error | null,
    selectedPaymentMethod: CKO_PAYMENT_TYPE,
    savePaymentInstrument: boolean,
    storedPaymentInstruments: any[],
    submitDisabled: boolean,
    loadAvailableMethods: (cartId: string, email?: string): { id, apms },
    initForm: (): void,
    submitCardForm: (): void,
    makePayment: ({ cartId, email, contextDataId }): Promise<Response | void>,
    setPaymentInstrument: (token: string): void,
    setSavePaymentInstrument: (newSavePaymentInstrument: boolean): void,
    loadSavePaymentInstrument: (): boolean,
    removePaymentInstrument: (customerId: string, paymentInstrument: string): Promise<void>,
    loadStoredPaymentInstruments: (customerId: string): Promise<void>
}
```

In this step you need:
```js
const { cart } = useCart();
const { setBillingDetails } = useCheckout();
const { isAuthenticated, user } = useUser();
const { initForm, loadAvailableMethods, availableMethods, submitDisabled, storedPaymentInstruments, loadStoredPaymentInstruments, error } = useCko();
```

3. `setBillingDetails` to save billing address. So you will be able to fetch `availableMethods` which base on your billing address (server-side)
4. Run `loadStoredPaymentInstruments` for logged in user to load stored payment instruments:
```js
if (isAuthenticated.value && cart.value && cart.value.customerId) {
    await loadStoredPaymentInstruments(cart.value.customerId);
}
```
4. Run `loadAvailableMethods` - first argument is cartId (access it via `cart.value.id`) - second for authenticated customer is an email (access it via `user.value.email`). Then it will return `interface { id, apms: Array<any> }` and set `apms` inside `availableMethods`
5. Execute `initForm`. It mounts different payment handlers depends on arguments (check details below). If you are calling it after load component - **use `onMounted` to make sure DOM Element where it will be mounted already exists**. Card's Frames will be mounted in DOM element with class `card-frame`.

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

Unfortunately, Checkout.com is not sharing any component for Saved Cards. After using `loadStoredPaymentInstruments` you can access array of them via `storedPaymentInstruments`. Show them to user in a way you want. To choose certain Stored Instrument call `setPaymentInstrument(item.id)` where `item` is single element of `storePaymentInstruments` array.

6. When `submitDisabled` changes to false - it means provided Card's data is proper and you could allow your user go forward. Card's token will be stored in localStorage for a moment.
7. Call `submitCardForm` function on card form submit (only for Credit Card method - not necessary for Saved Card).
8. Then you need to make Payment
`error` - contains error message from the response if you do not use 3ds or we have some server related issues. If the user just removed stored token from localStorage it will have `There is no payment token` inside.
`makePayment` - it proceeds with the payment and removes card token afterward. Returns Promise<Payment> if succeed, or Promise<null> if failed.

9. You should `makePayment` at first (remember to check if everything went ok):
```js
// If it is guest
const payment = await makePayment({ cartId: cart.value.id });
// If it is customer
const payment = await makePayment({ cartId: cart.value.id, email: user.value && user.value.email });
// If you've already loaded available payment methods with same useCko composable instance
const payment = await makePayment();

if (!payment) return;
```

10. If there is any error, you can access it via `error.value`. Otherwise, it will be nullish

11. If no errors, place an order:
```js
const order = await placeOrder();
```

12. `payment.data.redirect_url` contains 3DS Auth redirect url if it is required by bank. You have to support it:
```js
if (payment.data.redirect_url) {
    window.location.href = payment.data.redirect_url;
    return;
}
```

13. After 3DS Auth, user will be redirected to one of these urls. They are being created inside `makePayment` method:
```js
success_url: `${window.location.origin}/cko/payment-success`,
failure_url: `${window.location.origin}/cko/payment-error`
```

## Allowing user to decide whether save payment instrument or not
`useCko` composable shares `savePaymentInstrument` ref and `setSavePaymentInstrument` method for that purpose. It is also being stored in the localStorage and autoloaded in `onMounted` hook. Remember to always use `setSavePaymentInstrument` after `savePaymentInstrument` update state in localStorage. E.g:
```js
const {
      initForm,
      loadAvailableMethods,
      submitCardForm,
      makePayment,
      selectPaymentMethod,
      setPaymentInstrument,
      setSavePaymentInstrument, // Save
      loadSavePaymentInstrument, // Load
      selectedPaymentMethod,
      loadStoredPaymentInstruments,
      removePaymentInstrument,
      storedPaymentInstruments,
      submitDisabled,
      error
    } = useCko();
    const savePaymentInstrument = ref(loadSavePaymentInstrument());
```
```vue
<SfCheckbox
    @change="setSavePaymentInstrument(savePaymentInstrument)"
    v-model="savePaymentInstrument"
    label="Save payment instrument"
    name="savePaymentInstrument"
    class="form__element"
/>
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

## Customizing Frames
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