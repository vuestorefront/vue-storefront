---
platform: AboutYouCloud
---


<IncludeContent content-key="api-client" />

<!-- Code example for setup method -->
::: slot setup
```javascript
import { setup } from '@vue-storefront/about-you-api'

setup({
  api: {
    host: 'https://boston.backbone-api.demo.aboutyou.cloud/v1/',
    auth: {
      username: 'aboutyou',
      password: 'OmNErAb96Y5Qn75SFhXr'
    },
    shopId: 121
  }
})
```
**`setup`** accepts following properties:


- `api: ApiConfig`
```js
export interface ApiConfig {
  host: string;
  auth: {
    username: string;
    password: name;
  };
  shopId: number;
}
```

### AboutYou tokens handling

AboutYouCloud platform requires tokens to load data from the API. Cart and Wishlist tokens have to be generated on the frontend side and stored to prevent generating them multiple times. The token structure used in the theme is UUID concatenated with timestamp to prevent possible collisions.

An example token generator is stored in `packages/about-you/theme/helpers/utils/generateToken.js` and is being used in a following way:

```js
import { generateToken } from '~/helpers/utils/generateToken';

const AYC_CART_TOKEN = 'vsf-ayc-cart-token';

export const getCartToken = context => {
  let token = context.$cookies.get(AYC_CART_TOKEN);

  if (token) {
    return token;
  }

  token = generateToken();

  context.$cookies.set(AYC_CART_TOKEN, token);

  return token;
};
```

:::

## Methods
You can find detailed information about all API Client methods [here](./api-client/index.html)
