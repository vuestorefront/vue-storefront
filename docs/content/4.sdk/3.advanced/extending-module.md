# Extending a Module

In most cases, a module exports the base set of communication methods and utilities. 

However, developers might require additional functionality that the module doesn't provide.
 
To address this issue without requesting new features from the module's author, each module can be customized to meet the specific needs of developers.

A module extension is an object that defines a custom behavior for a module. It can contain interceptors, utility methods, and subscribers. This enables developers to tailor the module to their specific needs and add new functionality.

SDK Core package exports the `Extension` type that defines the structure of the module extension.

Example extension looks like this:

```js
// SAPCC Example

import { Extension } from '@vue-storefront/sdk';

/**
 * SAPCC Extension type.
 * In this example we used `any` type for the `interceptors`, `utils`, `extend` and `override` properties, however, it's recommended to use a specific type for each of them.
 */
interface SAPCCExtension extends Extension {
  interceptors: any[];
  utils: any;
  extend: any;
  override: any;
  subscribers: any;
}

export const sapccExtension: SAPCCExtension = {
  interceptors: [],
  utils: {},
  extend: {},
  override: {},
  subscribers: {}
};
```

Let's review each of the extension properties to understand their roles and responsibilities.

## Interceptors

Interceptors are functions that modify the input parameters of a method or the output result of a method. 

### `before` interceptors

`before` interceptors allow you to define a list of interceptors that can modify the input parameters of an SDK method. 

These interceptors will run before your method call and will modify the input parameters before they enter the SDK method.

:::warning `before` interceptors should not change the return type of the parameter!

The idea of `before` interceptors is to modify the input parameters values only. 
It should not be used to change the contract, that may break the typing and cause unforeseen issues.
:::

```js
// SAPCC Example

export const sapccExtension: SAPCCExtension = {
  interceptors: [
    {
      before: {
        getProducts: (args: Parameters<SAPCCModuleType['connector']['getProducts']>): Parameters<SAPCCModuleType['connector']['getProducts']> => {
          console.log(`Interceptor modifies the input of getProducts method.`)

          return [{
            id: 2
          }]
        }
      }
    }
  ]
}
```

### `after` interceptors

`after` interceptors allow you to define a list of interceptors that can modify the output of an SDK method. 

These interceptors run after your method call and modify the output result.

:::warning `after` interceptors should not change the return type of the parameter!
The idea of `after` interceptors is to modify the output value only. 
It should not be used to change the contract, that may break the typing and cause unforeseen issues.
:::

```js
// SAPCC Example

export const sapccExtension: SAPCCExtension = {
  interceptors: [
    {
      after: {
        getProducts: (res: ReturnType<SAPCCModuleType['connector']['getProducts']>): ReturnType<SAPCCModuleType['connector']['getProducts']> => {
          console.log(`Interceptor modifies the output of getProducts method.`)

          return [{ id: res[0].id, name: 'Hello world' }]
        }
      }
    }
  ]
}
```

## `utils`

The `utils` property allows you to define methods that can be used to extend the module's functionalities. Utils should not depend on on any other components

:::tip Why to use `utils` methods?
Imagine you're creating an integration with a payment provider. 
To initialize the payment, you need to pass a specific config, that might be hard to create for someone who is not familiar with the payment provider. 
In this case, you can create a `utils` method that will create the config for you. 
Such method won't be asynchronous and won't be affected by the interceptors.
:::

```js
// SAPCC Example

export const sapccExtension: SAPCCExtension = {
  utils: {
    buildConfig: (config: any) => {
      return {
        ...config,
        paymentServiceProvider: 'SAPCC-Payments'
      };
    }
  }
};
```

Example of using `utils` method:

```js
// SAPCC Example

import { sdk } from './sdk'

// Using utils methods
const sapccPaymentConfig = sdk.sapcc.utils.buildConfig(baseConfig);
```

## `extend`

`extend` can be used to create a new method that is not covered by the module. 

::: tip These methods are affected by interceptors
Like the built-in SDK methods, methods in `extend` are impacted by your interceptors.
:::

```js
// SAPCC Example

export const sapccExtension: SAPCCExtension = {
  extend: {
    getProductBySku: (sku: string) => {
      return axios.get(`/products/${sku}`);
    }
  }
};
```

Example of using `extend` method:

```js
// SAPCC Example

import { sdk } from './sdk';

// Using extend methods
const product = await sdk.sapcc.getProductBySku('product-sku');
```

## `override`

While `extend` allows you to create a new method, `override` allows you to change the behavior of the existing method.

::: tip These methods are affected by interceptors
Like the built-in SDK methods, methods in `extend` are impacted by your interceptors.
:::

```js
// SAPCC Example

export const sapccExtension: SAPCCExtension = {
  override: {
    getProducts: (params: any) => {
      return axios.get(`/products`, { params });
    }
  }
};
```

Example of using `override` method:

```js
import { sdk } from './sdk';

// Using module's method
sdk.sapcc.getProducts({ ids: [1, 2, 3] });

```

## `subscribers`

Subscribers are functions that are called when the specific event is emitted.

Events that can be emited are:
- `*_before` - run the function before EACH method of EACH module,
- `*_after` - run the function after EACH method of EACH module,
- `<module>_before` - run the function before EACH method of the specific module,
- `<module>_after` - run the function after EACH method of the specific module,
- `<module>_<method>_before` - run the function before the specific method of the specific module,
- `<module>_<method>_after` - run the function after the specific method of the specific module.

It implements the [publish-subscribe](https://www.enjoyalgorithms.com/blog/publisher-subscriber-pattern) pattern. 

It's a great place to add some custom logic, like logging or analytics.

```js
// SAPCC Example

export const sapccExtension: SAPCCExtension = {
  subscribers: {
    sapcc_before: () => {
      console.log(`Before each SAPCC method do something`);
    },
    sapcc_after: () => {
      console.log(`After each SAPCC method do something`);
    }
  }
};
```

## Using the extension

To use the extension, you need to import it and pass it as the third argument to the buildModule function. In addition, you need to pass the type of the extension (SAPCCExtensionType) as the second generic argument to the buildModule function. To pass the type of the extension, you can use the typeof operator. Here's an example:

```js
// SAPCC Example

import { sapccModule, SAPCCModuleType } from '@vsf-enterprise/sapcc-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { sapccExtension, type SAPCCExtensionType } from './sapccExtension';

const sdkConfig = {
  sapcc: buildModule<SAPCCModuleType, SAPCCExtensionType>(
    sapccModule,
    {
      apiUrl: "http://localhost:8181/sapcc",
    },
    sapccExtension
  ),
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
```

Now you can use the extension in your application.
