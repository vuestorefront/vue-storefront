# @vue-storefront/jest-config

> Common Jest base configuration for Alokai Integrations

## Usage

### Install

```bash
yarn add -D jest ts-jest @types/jest ts-node @vue-storefront/jest-config
```

### Extending Jest configuration

You need a configuration file in your package root:

```js
// jest.config.js

import { baseConfig } from "@vue-storefront/jest-config";

export {
  ...baseConfig,
  // your overrides
}
```
