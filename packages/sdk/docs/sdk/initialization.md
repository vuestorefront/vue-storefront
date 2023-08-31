# Initialization

## Recommended approach

:::tip
The examples below use the commercetools and Stripe for commercetools modules. However, the same principles apply to all modules.
:::

To initialize the SDK, follow these steps:

1. Create a new file, let's say `sdk.ts` or `sdk/index.ts`, in your project directory,

2. Import the required modules from their respective packages:

```typescript
import { ctModule } from '@vsf-enterprise/commercetools-sdk';
import { initSDK, buildModule } from '@vsf-enterprise/sdk';
import { stripeCtModule } from '@vsf-enterprise/stripe-commercetools-sdk';
```

3. Initialize the SDK by selectively importing and building the required modules:

```typescript
const { ct } = initSDK({ ct: buildModule(ctModule, { apiUrl: 'http://localhost:8181/ct' }) });
const { stripeCt } = initSDK({ stripeCt: buildModule(stripeCtModule, { apiUrl: 'http://localhost:8181/stripe' }) });
```

:::tip
You can name the modules whatever you want. For example, you can rename `ct` to `commerce` and `stripeCt` to `payment`. 
`initSDK` will return an object with the same keys as the one passed to it.
:::

4. Export the initialized modules for usage in your application:

```typescript
export { ct, stripeCt };
```

### Usage

Once you have initialized the SDK, you can start utilizing the imported modules in your application. Here's an example of how you can use the Commercetools and Stripe for Commercetools modules:

```typescript
// Use the Commercetools module on the Product Page
import { ct } from "./sdk";

const { products } = await sdk.commerce.getProduct();

// Use the Stripe for Commercetools module on the Checkout Page
import { ct, stripeCt } from "./sdk";

const cart = await ct.getCart();
const { paymentElement, elements } = await stripeCt.mountPaymentElement({ cart: cart! });
```

That's it! Start exploring the capabilities of our SDK by selectively initializing and utilizing the modules that best suit your application's needs.

## Combining modules

You can also combine multiple modules into a single SDK instance. This approach is useful if you want to use multiple modules in your application and don't want to initialize them separately.

To combine multiple modules, follow these steps:

1. Create a new file, let's say `sdk.ts` or `sdk/index.ts`, in your project directory,

2. Import the required modules from their respective packages:

```typescript
import { ctModule } from '@vsf-enterprise/commercetools-sdk';
import { stripeCtModule } from '@vsf-enterprise/stripe-commercetools-sdk';
import { initSDK, buildModule } from '@vsf-enterprise/sdk';
```

3. Initialize the SDK by selectively importing and building the required modules:

```typescript
const sdkConfig = {
  ct: buildModule(ctModule, { apiUrl: 'http://localhost:8181/ct' }),
  stripeCt: buildModule(stripeCtModule, { apiUrl: 'http://localhost:8181/stripe' })
};

const sdk = initSDK(sdkConfig);
```

4. Export the initialized SDK for usage in your application:

```typescript
export { sdk };
```

### Usage

Once you have initialized the SDK, you can start utilizing the imported modules in your application. Here's an example of how you can use the commercetools and Stripe for commercetools modules as a single SDK instance:

```typescript
import { sdk } from "./sdk";


const { products } = await sdk.commerce.getProduct();
// do something with products...
const cart = await sdk.ct.getCart();
const { paymentElement, elements } = await sdk.stripeCt.mountPaymentElement({ cart: cart! });
```

This makes it easier to use multiple modules in your application without having to initialize them separately, however, it can lead to performance issues if you're using several large modules.
Experiment with combining the modules that best fit your application's requirements and enjoy the enhanced capabilities of our SDK.