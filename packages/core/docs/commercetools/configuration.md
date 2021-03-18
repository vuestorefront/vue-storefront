# Configuration


Commercetools configuration is located in two places:

- nuxt.config.js is a place where you're configuring properties related only to the frontend part of your application.

- middleware.config.js is a place where you're configuring the Commercetools SDK, Apollo and extensions. You will put there API keys, integration configurations, custom GraphQL queries and new API endpoints.

## Nuxt Commercetools configuration


```js
['@vue-storefront/commercetools/nuxt', {
  i18n: {
    useNuxtI18nConfig: true
  }
}]
```

## Middleware Commercetools configuration


```js
// middleware.config.js
ct: {
  location: '@vue-storefront/commercetools-api/server',
  configuration: {
    api: {
      /* your api configuration object */
    }
  }
}
```

Minimal configuration object:

```js
ct: {
  location: '@vue-storefront/commercetools-api/server',
  configuration: {
    api: {
      uri: 'https://<DOMAIN_NAME>.com/<PROJECT_KEY>/graphql',
      authHost: 'https://auth.sphere.io',
      projectKey: '<PROJECT_KEY>',
      clientId: '<CLIENT_ID>',
      clientSecret: '<CLIENT_SECRET>',
      scopes: [
        'manage_products:<PROJECT_KEY>',
        /* other scope rules */
      ]
    },
    currency: 'USD',
    country: 'US'
  }
}
```

### uri

Link to your Commercetools GraphQL API instance. It should look like this:
`https://<DOMAIN_NAME>.com/<PROJECT_KEY>/graphql`

### authHost

Link to Commercetools Authentication Server. It is used to request an access token from commercetools OAuth 2.0 service. To choose the nearest service, please visit [Commercetools hosts list](https://docs.commercetools.com/api/authorization)

### projectKey

i.e. `my-awesome-vsf-project`

### clientId

Unique Commercetools Client ID. Visit [Commercetools documentation](https://docs.commercetools.com/tutorials/getting-started#creating-an-api-client) for more details about creating an API Client

### clientSecret

Commercetools secret API key. Visit [Commercetools documentation](https://docs.commercetools.com/tutorials/getting-started#creating-an-api-client) for more details about creating an API Client

### scopes

The scope constrains the endpoints to which a client has access, and whether a client has read or write access to an endpoint. Visit [Commercetools documentation](https://docs.commercetools.com/api/scopes#top) for more details about Scopes.


Full configuration:

```js
interface Config<T = any> {
  client?: ApolloClient<T>;
  api: ApiConfig;
  customOptions?: ApolloClientOptions<any>;
  currency: string;
  locale: string;
  country: string;
  countries: LocaleItem[];
  currencies: LocaleItem[];
  locales: LocaleItem[];
  languageMap: Record<string, any>;
  acceptLanguage: string[];
  cookies: CookiesConfig;
  auth?: Auth;
  forceToken?: boolean;
  handleIsTokenUserSession: (token: Token) => boolean;
}
```

#### `client`

Connection to the Commercetools client. `SdkAuth` and `TokenProvider` are imported from `@commercetools/sdk-auth`

```js
interface ClientInstance extends ApolloClient<any> {
  sdkAuth?: SdkAuth;
  tokenProvider?: TokenProvider;
}
```

#### `api`

Commercetools API configuration from `middleware.config.js`

```js
interface ApiConfig {
  uri: string;
  authHost: string;
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
}
```

#### `countries`, `currencies`, `locales`

Array of accepted items

```js
interface LocaleItem {
  name: string;
  label: string;
}
```

#### `cookies`

Cookie names for `currency`, `country`, and `locale`

```js
interface CookiesConfig {
  currencyCookieName: string;
  countryCookieName: string;
  localeCookieName: string;
}
```

#### `auth`

Token Authentication object. Later extended with custom extension `tokenExtension`

```js
interface Auth {
  onTokenChange?: (token: Token) => void;
  onTokenRead?: () => string;
  onTokenRemove?: () => void;
}

interface Token {
  access_token: string;
  expires_at: number;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token: string;
}
```

#### `acceptLanguage`

Commercetools supports querying localised fields via an array of accepted languages - `acceptLanguage`.

```js
acceptLanguage: ['en-gb', 'en-us']
```

#### `languageMap`

If you supply a `languageMap` during setup this will be used to map a locale to the accepted languages.

```js
languageMap: {
  'en-gb': ['en-gb', 'en-us'],
  'en-us': ['en-us', 'en-gb'],
}
```

