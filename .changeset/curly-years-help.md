---
"@vue-storefront/next": major
---

[ADDED] global state management with Zustand. This will allow you to keep your global state in a more organized way.
It shares the data about:
- cart
- customer
- currency
- locale

This change will require you to refactor your hooks to make use of the introduced state manager.
As this is only a state management, you will still need to use the hooks to fetch the data and put it into the state.

To make use of the new state solution you will need to change the file `sdk/sdk-context.ts`.

```ts
// before
'use client';

import { createSdkContext } from '@vue-storefront/next/client';

import type { Sdk } from './sdk.server';

export const [SdkProvider, useSdk] = createSdkContext<Sdk>();
```

```ts
// after
'use client';

import { createAlokaiContext } from '@vue-storefront/next/client';
import type { SfContract } from 'storefront-middleware/types';

import type { Sdk } from './sdk.server';

export const {
  AlokaiProvider,
  useSdk,
  useSfCartState,
  useSfCurrenciesState,
  useSfCurrencyState,
  useSfCustomerState,
  useSfLocaleState,
  useSfLocalesState,
} = createAlokaiContext<Sdk, SfContract>();
```

The type `SfContract` is a type that represents the contract between the middleware and the state manager. 
It is delivered out of the box.

Example of usage:

```tsx
import { 
  useSfCartState,
  useSfCustomerState,
  useSfCurrencyState,
  useSfLocaleState,
} from '@/sdk/alokai-context';

function Component() {
  const [cart, setCart] = useSfCartState();
  const [customer] = useSfCustomerState();
  const [currency] = useSfCurrencyState();
  const [locale] = useSfLocaleState();

  // updating the cart state
  useEffect(() => {
    setCart(useSdk().unified.getCart());
  }, []);
  
  return (
    <div>
      <p>Cart total: {cart.total}</p>
      <p>Customer name: {customer.firstName} {customer.lastName}</p>
      <p>Currency: {currency}</p>
      <p>Locale: {locale}</p>
    </div>
  );
}

```

[BREAKING] [CHANGED] the function `createSdkContext` exported from the `client` is changed to `createAlokaiContext`. 
Also, it no longer returns an array with two elements, but an object with multiple properties.
This change is related to the fact that now it not only provide SDK context but also global state management context and hooks for handling it.

```diff
- import { createSdkContext } from '@vue-storefront/next/client';
+ import { createAlokaiContext } from '@vue-storefront/next/client';
```
