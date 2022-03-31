# Integration's config based on request

## Introduction

In the previous document, you've read about extending an integration. Here I will show you a practical case of extending [Adyen commercetools](https://docs.vuestorefront.io/adyen/guide/introduction.html) integration to use a different `adyenMerchantAccount` and `clientKey` based on store cookie's value.

## Creating an extension

Create `extensions` directory in your project and inside it, create `adyen.js` file:

```js{34}
const { VSF_STORE_COOKIE } = require('@vue-storefront/core');

const config = {
  default: {
    adyenMerchantAccount: 'DefaultMerchantAccount'
  },
  en: {
    adyenMerchantAccount: 'EnMerchantAccount'
  },
  de: {
    adyenMerchantAccount: 'DeMerchantAccount'
  },
  es: {
    adyenMerchantAccount: 'EsMerchantAccount'
  }
};

function getConfiguration(request, staticConfig) {
  const cookieName = request.cookies?.storeCookieName || VSF_STORE_COOKIE;
  const store = request.cookies?.[cookieName] || 'default';
  
  return {
    ...staticConfig,
    ...config[store]
  };
}

module.exports = {
  name: 'adyenDynamicConfigExtension',
  hooks(request) {
    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        ...getConfiguration(request, configuration)
      })
    };
  },
};

```

The extension overwrites configuration part with values corresponding to the current store.

## Registering an extension

To register an extension, add it to the array returned from the `extensions` function of a given integration in the `middleware.config.js` file:

```js{23}
const adyenDynamicConfigExtension = require('./extensions/adyen');

module.exports = {
  integrations: {
    adyen: {
      location: '@vsf-enterprise/adyen-commercetools/server',
      configuration: {
        ctApi:{
          apiHost: 'https://api.europe-west1.gcp.commercetools.com',
          authHost: 'https://auth.europe-west1.gcp.commercetools.com',
          projectKey: 'vsf-******-demo',
          clientId: '***',
          clientSecret: '***',
          scopes:[
            'manage_project:vsf--******--demo'
          ]
        },
        adyenMerchantAccount: 'DefaultMerchantAccount',
        origin: 'http://localhost:3000',
        buildRedirectUrlAfter3ds1Auth: (paymentAndOrder) => `/checkout/thank-you?order=${paymentAndOrder.order.id}`,
        buildRedirectUrlAfter3ds1Error: (err) => '/?3ds1-server-error'
      },
      extensions: extensions => [...extensions, adyenDynamicConfigExtension]
    }
  }
};
```

Server will be correctly updating configuration based on the store cookie's value since now. Below, I will show you how to approach updating of client-side configuration.

## Modifying front-end configuration

Adyen commercetools integration has `clientKey` setting inside `nuxt.config.js`. We need to modify it for certain store cookie's value. 

### Method #1: Dedicated property in Vue component

Official payment integrations components share `beforeLoad` property that allows to modify configuration before mounting component provided by payment provider's SDK. We can use it to modify `clientKey` based on the request:

```vue
<template>
  <div>
    <!-- ... --->
    <PaymentAdyenProvider
      :beforeLoad="beforeLoadAdyen"
    />
  </div>
</template>

<script>
import { VSF_STORE_COOKIE } from '@vue-storefront/core';
import { useContext } from '@nuxtjs/composition-api';

export default {
  setup () {
    const { $cookies } = useContext();

    const beforeLoadAdyen = (config) => {
      const adyenConfigs = {
        default: {
          clientKey: 'test_default-clientKey'
        },
        en: {
          clientKey: 'test_en-clientKey'
        },
        de: {
          clientKey: 'test_de-clientKey'
        },
        es: {
          clientKey: 'test_es-clientKey'
        }
      };

      const cookieName = $cookies.get('storeCookieName') || VSF_STORE_COOKIE;
      const store = $cookies.get(cookieName) || 'default';

      return {
        ...config,
        ...adyenConfigs[store]
      };
    };

    return {
      beforeLoadAdyen
    };
  }
};
</script>
```

### Method #2: Nuxt plugin

Not in every situation we are able to use `beforeLoad` component. There might be a case where we want to do it once and globally or where there is no Vue component or `beforeLoad` property. Then we need to create a Nuxt plugin.

Create `plugins` directory in your project and inside it, create `adyen.ts` file:
```ts
import { VSF_STORE_COOKIE } from '@vue-storefront/core';

const config = {
  default: {
    clientKey: 'test_default-clientKey'
  },
  en: {
    clientKey: 'test_en-clientKey'
  },
  de: {
    clientKey: 'test_de-clientKey'
  },
  es: {
    clientKey: 'test_es-clientKey'
  }
};

export default ({ $vsf, $cookies }) => {
  const cookieName = $cookies.get('storeCookieName') || VSF_STORE_COOKIE;
  const store = $cookies.get(cookieName) || 'default';
  
  if ($vsf.$adyen?.config) {
    $vsf.$adyen.config = {
      ...$vsf.adyen.config,
      ...config[store]
    };
  }
};
```

To register a plugin, add it to the `plugins` array in the `nuxt.config.js` file. This plugin has to be **client-side only**:
```js
// nuxt.config.js
export default {
  // ...
  plugins: [
    { src: '~/plugins/adyen.ts', mode: 'client' },
  ]
};
```

Client will be correctly updating configuration based on the store cookie's value since now.
