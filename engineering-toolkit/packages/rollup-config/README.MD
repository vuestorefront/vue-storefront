# @vue-storefront/rollup-config

> Common rollup configuration used in Alokai integrations

## Usage

### Install
```bash
yarn add -D rollup @vue-storefront/rollup-config
```

### API Client config

```js
import pkg from './package.json';
import {
  generateBaseConfig,
  generateServerConfig
} from '@vue-storefront/rollup-config';

export default [generateBaseConfig(pkg), generateServerConfig(pkg)];
```

### SDK module config

```js
import pkg from './package.json';
import { generateSDKConfig } from '@vsf-integrations/rollup';

export default [generateSDKConfig(pkg)];
```
