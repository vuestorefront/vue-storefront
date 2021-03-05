# Project upgrade notes

## Access to API client

### Before

```js
import { getSettings } from '@vue-storefront/integration-name-api';

export default {
  setup () {
    const apiClientSettings = getSettings()
  }
}
```

### After
```js
import { useVSFContext } from '@vue-storefront/core';

export default {
  setup () {
    const { $tag } = useVSFContext()

    // $tag.config
    // $tag.client
    // $tag.api
  }
}
```

## Usage API client in plugins or middlewares

### Before
```js
import { getProduct } from '@vue-storefront/integration-name-api';

export default async ({ app }) => {
  const product = await getProduct({ id: 1 })
}
```

### After

```js
export default async ({ app, $vsf }) => {
  const product = await $vsf.$tag.api.getProduct({ id: 1 })
}
```

## Price formatting

### Before

```js
import { productGetters, useProduct } from '@vue-storefront/integration-name';

<template>
  <div>Price {{ productGetters.getFormattedPrice(productGetters.getPrice(product)) }}</div>
</template>

export default {
  setup () {
    const { product } = useProduct();

    return { product, productGetters }
  }
}
```

### After

```js
import { productGetters, useProduct } from '@vue-storefront/integration-name';
import { useUiHelpers } from '~/composables';

<template>
  <div>Price {{ th.formatPrice(productGetters.getPrice(product)) }}</div>
</template>

export default {
  setup () {
    const th = useUiHelpers();
    const { product } = useProduct();

    return { product, productGetters, th }
  }
}
```

## Configuring integration

### Before
```js
import { setup } from '@vue-storefront/integration-name';

export default ({ app }) => {
  setup({
    api: {
      host: '<%= options.api.host %>',
      auth: {
        username: '<%= options.api.auth.username %>',
        password: '<%= options.api.auth.password %>'
      },
      shopId: selectedLocale.shopId
    },
  });
}
```

### After
```js
import { integrationPlugin } from '@vue-storefront/integration-name'
import { getProduct } from './your-api';

export default integrationPlugin(({ app, integration }) => {
  integration.configure({
    api: {
      host: '<%= options.api.host %>',
      auth: {
        username: '<%= options.api.auth.username %>',
        password: '<%= options.api.auth.password %>'
      },
      shopId: selectedLocale.shopId
    },
  }, { getProduct })
});
```
