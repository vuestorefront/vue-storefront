# Checkout.com Nuxt module
## How to install
1. Open your theme directory and run:
```
yarn add @vue-storefront/checkout-com
```
If you are Developing Core of Vue Storefront Next you might need to add `@vue-storefront/checkout-com` to `useRawSource` attribute in one of `buildModules`:
```js
['@vue-storefront/nuxt', {
    coreDevelopment: true,
    useRawSource: {
        dev: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core',
          '@vue-storefront/checkout-com'
        ],
        prod: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core',
          '@vue-storefront/checkout-com'
        ]
    }
}],
```
2. Open your `nuxt.config.js`
3. At the bottom of `modules` add:
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
    selectedPaymentMethod: CkoPaymentType,
    savePaymentInstrument: boolean,
    storedPaymentInstruments: PaymentInstrument[],
    submitDisabled: ComputedRef<boolean>,
    loadAvailableMethods: (cartId: string, email?: string): { id, apms },
    initForm: (): void,
    submitCardForm: (): void,
    makePayment: ({ cartId, email, contextDataId, success_url, failure_url, secure3d }): Promise<Response | void>,
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
const { 
    initForm, 
    loadAvailableMethods, 
    availableMethods, 
    submitDisabled, 
    storedPaymentInstruments, 
    loadStoredPaymentInstruments, 
    error 
} = useCko();
```

3. `setBillingDetails` to save billing address. So you will be able to fetch `availableMethods` which base on your billing address (server-side)
4. Run `loadStoredPaymentInstruments` for logged in user to load stored payment instruments. They will be loaded to `storedPaymentInstruments` array of `PaymentInstrument`s. Caution: This interface is being used for storing credit cards currently. It might have different shape for stored different payment methods in the future. Interface:
```ts
interface PaymentInstrument {
    id: string;
    type: string;
    expiry_month: number;
    expiry_year: number;
    scheme: string;
    last4: string;
    fingerprint: string;
    bin: string;
    card_type: string;
    card_category: string;
    issuer: string;
    issuer_country: string;
    product_id: string;
    product_type: string;
    avs_check: string;
    cvv_check: string;
    payouts: string;
    fast_funds: string;
    payment_instrument_id: string;
}
```
Example of usage:
```ts
if (isAuthenticated.value && cart.value && cart.value.customerId) {
    await loadStoredPaymentInstruments(cart.value.customerId);
}
```
4. Run `loadAvailableMethods` - first argument is cartId (access it via `cart.value.id`) - second for authenticated customer is an email (access it via `user.value.email`). Then it will return `interface { id, apms: Array<any> }` and set `apms` inside `availableMethods`. E.g:
```js
onMounted(async () => {
    await loadAvailableMethods(cart.value.id, user.value && user.value.email);
})
```
5. Execute `initForm`. It mounts different payment handlers depends on arguments (check details below). If you are calling it after load component - **use `onMounted` to make sure DOM Element where it should be mounted already exists**. Card's Frames will be mounted in DOM element with class `card-frame`. Caution: PayPal does not need any SDK, we just redirect to their's website like in 3DS redirection process for credit cards. So if you are interested only in this payment method you could omit this step.

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
This configuration will have bigger priority than one from `nuxt.config.js`. The thing is you cannot overwrite is `publicKey` there. Signature for Frames looks like that:
```ts
(params?: Omit<Configuration, 'publicKey'>): void
```

Unfortunately, Checkout.com is not sharing any component for Saved Cards. After using `loadStoredPaymentInstruments` you can access an array of them via `storedPaymentInstruments`. Show them to user in a way you want. To choose certain Stored Instrument call `setPaymentInstrument(item.id)` where `item` is single element of `storePaymentInstruments` array.

6. When `submitDisabled` changes to false - it means provided Card's data is proper and you could allow your user go forward. Card's token will be stored in localStorage for a moment.
7. Call `submitCardForm` function on card form submit (only for Credit Card method - not necessary for Stored Payment Method). It requires mounted `Frames` instance as it uses `Frames.submitCard()` under the hood.
8. Then you need to make Payment
`error` - contains error message from the response if you do not use 3ds or we have some server related issues. If the user just removed stored token from localStorage it will have `There is no payment token` inside.
`makePayment` - it proceeds with the payment and removes card token afterward. Returns Promise<Payment> if succeed, or Promise<null> if failed.

9. You should call `makePayment` at first (remember to check if everything went ok):
```js
// If it is guest
const payment = await makePayment({ cartId: cart.value.id });
// If it is customer
const payment = await makePayment({ cartId: cart.value.id, email: user.value && user.value.email });
// If you've already loaded available payment methods with same useCko composable instance
const payment = await makePayment();

if (error.value) {
    console.log(error.value);
    return;
}
```

10. If there is any error, you can access it via `error.value`. Otherwise, it will be nullish

11. If no errors, place an order:
```js
const order = await placeOrder();
```

12. `payment.data.redirect_url` contains 3DS Auth redirect url for Credit Card if it requires it and it always contain redirect url for the PayPal. You have to support it:
```js
if (payment.data.redirect_url) {
    window.location.href = payment.data.redirect_url;
    return;
}
```

13. After 3DS Auth/PayPal Auth, user will be redirected to one of these urls. They are being created inside `makePayment` method:
```js
success_url: `${window.location.origin}/cko/payment-success`,
failure_url: `${window.location.origin}/cko/payment-error`
```
You can override them while calling `makePayment` with `success_url` and `failure_url` attributes.
E.g:
```js
await makePayment({
    // ...
    success_url: 'https://example.com/success',
    failure_url: 'https://example.com/failure',
})
```
Would redirect after process to the:
```js
success_url: 'https://example.com/success',
failure_url: 'https://example.com/failure'
```

## Changing current payment method
It is important to set proper CKO's Payment Method in `useCko` instance so it will be able to figure out proper payload to send in `makePayment`. To do that:
```js
import { useCko, CkoPaymentType } from '@vue-storefront/checkout-com'
 
// ...

const {
    initForm,
    loadAvailableMethods,
    submitCardForm,
    makePayment,
    setPaymentInstrument,
    setSavePaymentInstrument,
    loadSavePaymentInstrument,
    selectedPaymentMethod, // Here
    loadStoredPaymentInstruments,
    removePaymentInstrument,
    storedPaymentInstruments,
    submitDisabled,
    error
} = useCko();
```

Currently, these are available payment methods:
```ts
enum CkoPaymentType {
    NOT_SELECTED = 0,
    CREDIT_CARD = 1,
    SAVED_CARD,
    KLARNA, // Not supported yet
    PAYPAL // Not supported yet
}
```

By default, `selectedPaymentMethod` equals `CkoPaymentType.NOT_SELECTED`.
If user uses stored payment call `setSavePaymentInstrument` and it will set `selectedPaymentMethod.value = CkoPaymentType.SAVED_CARD`
```js
setPaymentInstrument(item.id);
```
If user uses credit card use:
```js
selectedPaymentMethod.value = CkoPaymentType.CREDIT_CARD
```

## Allowing user to decide whether save payment instrument or not
`useCko` composable shares `savePaymentInstrument` ref and `setSavePaymentInstrument` method for that purpose. It is also being stored in the localStorage and autoloaded in `onMounted` hook. Remember to always use `setSavePaymentInstrument` after `savePaymentInstrument` update state in localStorage. E.g:
```js
const {
      initForm,
      loadAvailableMethods,
      submitCardForm,
      makePayment,
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
    // ...
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
    // ...
    card: {
        localization: 'KO-KR',
        style: {
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
const { user } = useUser();
const { loadAvailableMethods, availableMethods } = useCko();
const { setBillingDetails } = useCheckout();

const handleFormSubmit = async () => {
    await setBillingDetails(billingDetails.value, { save: true });
    // If it is Guest
    const response = await loadAvailableMethods(cart.value.id);
    // If it is Customer
    const response = await loadAvailableMethods(cart.value.id, user.value.email);
    console.log('Server respond with ', response)
    console.log('Array of available payment methods ', availableMethods)
};
```

Response might look like:
```json
{
    "id": "cid_XXX",
    "apms": [
        {
            "name": "paypal",
            "schema": "https://somewebsite.com/apms/paypal.json",
            "show": true
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

## Removing Stored Payment Instrument
`useCko` composable shares `removePaymentInstrument` method for that purpose. Keep in mind you use `storedPaymentMethods[i].id` for payment but `storedPaymentMethods[i].payment_instrument` for removing it from the vault. Use it like:
```ts
const {
    removePaymentInstrument,
    // ...
} = useCko();
const { isAuthenticated } = useUser();
const { cart } = useCart();

const removeMinePaymentInstrument = async (paymentInstrument: string): Promise<void> => {
    if (isAuthenticated.value && cart.value && cart.value.customerId) {
        await removePaymentInstrument(cart.value.customerId, paymentInstrument);
    }
}
```