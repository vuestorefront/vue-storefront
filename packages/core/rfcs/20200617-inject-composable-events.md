# Injecting events to composables

## Introduction

As a developer I'd like to attach independent functionality that will be called every before and after composable action.

This feature will allow to implement:
- analytics 3rd party tools (e.g. Google's Enchanced Ecommerce)
- external logger (e.g. elastic.co)
- cache service

Having this feature will reduce need of creating composables and factories to just provide tools.

## Implementation roules

This RFC is focused on below principles:
- Events are optional
- Composables must be replacable without affecting on events. In other words: events are independent from composables
- Events can be overriden by any other

## Core implementation
Empty events container:
```TS
// This object is inaccessible for developer. It just contains all events that might be used in factories
export default {
  useCart: {
    before_loadCart: async () => {},
    after_loadCart: async (cart) => {},
    //...and so on
  },
  useProduct: {
    //...another empty events
  }
}
```

Events container:
```TS
// This object should be written by developer to override events
// TODO: Need to discuss which place is the best to be used for this.
import logger from 'just-some-example-external-logger';

export default {
  useCart: {
    before_loadCart: async () => logger.info('Trying to load a cart'),
    after_loadCart: async (cart) => logger.info(`Loaded cart #${cart.id}`),
    //...and so on
  },
  useProduct: {
    //...another events
  }
}
```

Example interface of events of one factory/composable:
```TS
// packages/core/core/src/events/useCartEvents.ts

export interface UseCartEvents {
  before_loadCart: () => Promise<void>;
  after_loadCart (cart: CartResponse) => Promise<void>;
  after_updateQuantity: (cart: Cart) => Promise<void>;
  // ...and so on
}
```

Helper to get specific events:
```TS
// packages/core/core/src/utils/events/index.ts

// The config property is needed to be discussed. It can be nuxt.config.js, vue.config.js, separate plugin, etc.
export default (eventName: string) => config.get(eventName);
```

Example:
```TS
import getEvent from 'packages/core/core/src/utils/events/index.ts';

const useCartEvents = getEvent('useCart');

// Will return:
{
  before_loadCart: () => { /* event implementation */ },
  after_loadCart: () => { /* event implementation */ },
  //...etc.
}
```

## Example integration
Events should be provided into factories, in order to make composables replacable

Custom useCart events:
```TS
// customPackage/events/useCart.ts
export default {
  before_loadCart: async () => {
    console.log("I'll be called before loadCurrentCart()");
  },
  after_loadCart: async (cart) => {
    console.log("I'll be called after loadCurrentCart() with returned value");
  },
  after_updateQuantity: async (cart) => {
    console.log("I'll be called after apiUpdateCartQuantity() with returned value");
  },
};
```

Integration with useCartFactory
```TS
// packages/core/core/src/factories/useCartFactory.ts
import getEvent from 'packages/core/core/src/utils/events/index.ts';

const events = getEvent('useCart');

const params = {
  loadCart: async () => {
    await events.before_loadCart();

    const data = await loadCurrentCart();

    await events.after_loadCart(data);

    return data;
  },
  updateQuantity: async (data) => {
    const { currentCart, product, quantity } = data;

    await events.before_updateQuantity(data); // This will do nothing as we didn't provide that event

    const updatedCart = await apiUpdateCartQuantity(
      currentCart, { ...product, quantity }
    );

    await events.after_updateQuantity(updatedCart.data.cart);

    return updatedCart.data.cart;
  },
};

export const useCartFactory = <CART, CART_ITEM, PRODUCT, COUPON>(
  params: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON>,
);
```

## Using more than one event callback
User should be able to attach more than just one event. Of course, this can affect on application performance.
In order to do this it's worth to implement a function that will aggregate events into one, whole container.

Example events:
```TS
// events-a
export default {
  useCart: {
    before_loadCart: async () => console.log('A: before_loadCart');
  },
  useProduct: {
    before_updateQuantity: async (data) => console.log('A: before_updateQuantity');
  },
};

// events-b {
  export default {
    useCart: {
      before_loadCart: async () => console.log('B: before_loadCart');
    },
    useProduct: {
      before_updateQuantity: async (data) => console.log('B: before_updateQuantity');
    },
  }
}
```

Example configuration:
```TS
import ConfigTransformer from 'another-events-helper?';
import eventsA from 'events-a';
import eventsB from 'events-b';

export default ConfigTransformer
  .attach(eventsA)
  .attach(eventsB, 'useCart');
```

Result:
```TS
export default {
  useCart: {
    before_loadCart: async () => {
      await eventsA.before_loadCart();
      await eventsB.before_loadCart();
  },
  useProduct: {
    before_updateQuantity: async (data) => {
      await eventsA.before_updateQuantity(data);
    }
  },
  // ...other events like useLanguage, useUser,etc.
}
```

## Using 3rd party events

Let's say, user downloaded 3rd party events like:
- ELK library for external logging (let's name it as: `@elk/storefront-events`)
- Ecommerce analytics library (sample name: `@ecommerce/storefront-events`)

To apply them, user is required to only modify their events container.

```TS
import ConfigTransformer from 'another-events-helper?';
import elk from '@elk/storefront-events';
import ecommerce from '@ecommerce/storefront-events';

export default ConfigTransformer
  .attach(elk)
  .attach(ecommerce);
```
