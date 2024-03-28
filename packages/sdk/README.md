# Alokai SDK

Alokai SDK is a framework-agnostic communication layer in Alokai Integrations. It communicates with Commerce Platforms and third-party services through the Server Middleware, which works as a proxy. Alokai SDK creates a contract between the storefront and the Server Middleware.

## Docs

To learn more about the SDK, visit the [SDK documentation](https://docs.vuestorefront.io/sdk/).

## Installation

To install the SDK, run the following command:

```bash
yarn add @vue-storefront/sdk
```

Before initializing the SDK, ensure you have also installed the desired SDK modules for your project. For instance, to use the SAP Commerce Cloud module, you'll need to install it as well:

```bash
yarn add @vsf-enterprise/sapcc-sdk
```

> Warning! The installation process for each module varies and may necessitate additional package installations. Be sure to consult the installation guide for the specific module you intend to use.

## Initialization

> The examples below use the SAP Commerce Cloud module. However, the same principles apply to all modules.

To initialize the SDK, begin by providing the `sdkConfig`, which is an object containing the complete SDK configuration.

```js
const sdkConfig = {};
```

Now, let's incorporate a module into the configuration. To accomplish this, you should:

1. Import the desired module. By default, it exports a function that returns a collection of module methods. Alokai modules also export a type for these methods.

```js
// SAPCC Example

import { sapccModule, SAPCCModuleType } from '@vsf-enterprise/sapcc-sdk';
```

2. Import the `buildModule` helper from the `@vue-storefront/sdk package`. This helper is used by the SDK core to properly type the module, enabling IDEs to display TSDocs when hovering over the module's methods.

```js
// SAPCC Example

import { sapccModule, SAPCCModuleType } from '@vsf-enterprise/sapcc-sdk';
import { buildModule } from '@vue-storefront/sdk';
```

3. Create a namespace for the module in the `sdkConfig` and use `buildModule` helper to build it.

```js
// SAPCC Example

import { sapccModule, SAPCCModuleType } from '@vsf-enterprise/sapcc-sdk';
import { buildModule } from '@vue-storefront/sdk';

const sdkConfig = {
  sapcc:
    buildModule<SAPCCModuleType>(
      sapccModule,
      {
        apiUrl: 'http://localhost:8181/sapcc',
        ssrApiUrl: 'http://localhost:8181/sapcc'
      }
    )
};
```

Let's now learn about the `buildModule` in detail. 

The buildModule function is a generic function that expects both the module's methods type and the module's extension type. 

This helper accepts 3 arguments:

- module init function (the default export of a module),
- module options,
- module extension.

1. Now, when the `sdkConfig` is ready, you should import `initSDK` function from `@vue-storefront/sdk` package and export it, as shown below.

```js
// SAPCC Example

import { sapccModule, SAPCCModuleType } from '@vsf-enterprise/sapcc-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';

const sdkConfig = {
  sapcc:
    buildModule<SAPCCModuleType>(
      sapccModule,
      {
        apiUrl: 'http://localhost:8181/sapcc',
        ssrApiUrl: 'http://localhost:8181/sapcc'
      }
    )
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
```

The `initSDK` function is a generic function, that expects the type of the `sdkConfig`. 
It accepts the `sdkConfig` as an argument and returns the `sdk` client.
