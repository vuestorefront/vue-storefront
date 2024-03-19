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

### Execution order of interceptors

Assume that you have the following interceptors defined for the `getProducts` method:

```js
const extension = {
  interceptors: [
    {
      before: {
        getProducts: (args: any) => {
          return ["modified-args"];
        },
      },
      after: {
        getProducts: (result: any) => {
          return `${result}-modified-result`;
        },
      },
      around: {
        getProducts: [
          (next: any, arg1: any, arg2: any) => {
            const result = next(arg1, arg2);
            return result + "-around1";
          },
          (next: any, arg1: any, arg2: any) => {
            const result = next(arg1, arg2);
            return result + "-around2";
          },
          (next: any, arg1: any, arg2: any) => {
            const result = next(arg1, arg2);
            return result + "-around3";
          },
        ],
      },
    },
  ],
};
```

The execution order of interceptors will be as follows:
* all `before` interceptors in the order they are defined
  * `around` interceptor 1 up to next() call
    * `around` interceptor 2 up to next() call
      * `around` interceptor 3 up to next() call
        * `getProducts` method
      * `around` interceptor 3 after next() call
    * `around` interceptor 2 after next() call
  * `around` interceptor 1 after next() call
* all `after` interceptors in the order they are defined

`getProducts` method will be called only once.

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

### `around` interceptors
`around` interceptors allow you to define a list of interceptors that can modify the input and output of an SDK method and have access to the original method.

These interceptors run after all `before` interceptors and before all `after` interceptors.

:::warning `around` interceptors should not change the return type of the parameter!
it is up to the developer to call the original method, if it's not called, the SDK method won't be executed.
:::

```js
// SAPCC Example
type GetProductsFn = typeof SAPCCModuleType['connector']['getProducts'];

export const sapccExtension: SAPCCExtension = {
  interceptors: [
    {
      around: {
        getProducts: (next: GetProductsFn, ...args: Parameters<GetProductsFn>): ReturnType<GetProductsFn> => {
          // Do something before the method call
          // ...

          // Call the original method, if it's not called, the SDK method won't be executed
          const result = next(...args);
          
          // Do something after the method call with the result
          result.myCustomProperty = 'Hello world';

          return result;
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

:::tip These methods are affected by interceptors
Like the built-in SDK methods, methods in `extend` are impacted by your interceptors.
:::

The very common use case and also very basic example of using `extend` is to create a new method that is not covered by the module. In this example the `extend` attribute is configured with an object that contains a method `getProductBySku` that returns a promise.

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

In the example below, we are using the `extend` attribute to create a new method `getProductBySkuWithLogger` that logs the used sku and then calls the original `getProductBySku` method.

`buildModule` function provides the parent object that contains the original methods and optional context. You can use it to call the original method or access additional properties in the context.

We pass a factory function as the third argument to the `buildModule` function. The factory function receives the options and the parent object as arguments. Parent object contains the original methods and optional context.

In this example, we are also using the `customMethod` that calls an external API using the `context.client` method.

```ts
const sdkConfig = {
  sapcc: buildModule(
    // sapccModule is the module that we want to extend
    sapccModule, 
    // module options
    { url: "some-url" }, 
    // factory function that receives the options and the parent object as arguments
    (options, { methods, context }) => { 
    return {
      extend: {
        getProductBySkuWithLogger: (sku: string) => {
          console.log("used sku", sku);
          return await parent.methods.getProductBySku(sku);(1);
        },
        customMethod: async () => {
          return (
            await parent.context.client(
              "some-url-to-external-api",
            )
          );
        },
      },
    };
  }),
};
```
In such way you can easily extend the module with new methods and use the original methods. Also, it is up to the developer to decide if the `context` object is available and what properties it contains.

:::tip
As a rule of thumb, it's recommended to add options and client to the context object as it allows for easy implementation of custom methods.
:::

:::
warning the `context` object is optional and might not be available in all modules. Please, check the module's documentation to see if it's available and what properties it contains. You can also check type-hinting in your IDE to see what properties are available.
:::


## `override`

While `extend` allows you to create a new method, `override` allows you to change the behavior of the existing method.

:::tip 
These methods are affected by interceptors
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
