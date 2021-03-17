# Configuration

Usually, the first thing to do after setting up a fresh Vue Storefront project is configuring it. The bare minimum is to provide the API credentials for your integrations. Vue Storefront is configured by default to suit most cases, however you can customise it in many ways.

Your Vue Storefront-related configuration is located in two places:

- nuxt.config.js is a place where you're configuring properties related only to the frontend part of your application.

- middleware.config.js is a place where you're configuring your Commercetools middleware. You will put there API keys, integration configurations, custom GraphQL queries and new API endpoints.

## Nuxt Commercetools configuration

From version 2.3.x, most Commercetools configuration was moved from `nuxt.config.js` to `middleware.config.js`. Thanks to that, in `nuxt.config.js` you can focus on the frontend configuration (i.e. `i18n`) and leave API config to the middleware.

```js
['@vue-storefront/commercetools/nuxt', {
  i18n: {
    useNuxtI18nConfig: true
  }
}]
```

## Middleware Commercetools configuration

 With Vue Storefront Next you can easily configure your Commercetools instance by creating a config object inside `middleware.config.js`:

```js
ct: {
  location: '@vue-storefront/commercetools-api/server',
  configuration: {
    api: {
      /* your api configuration object */
    }
  }
}
```

Example configuration object:

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

## Creating an API Client

Inside `/packages/commercetools/api-client/src` there is an `index.server.ts` file where API Client can be configured. It will create an API Client based on configuration object, GraphQL API mutations and queries, and extensions (currently `tokenExtension`)

```js
const { createApiClient } = apiClientFactory({
  onCreate, // Config
  api, // GraphQL mutations and queries
  extensions: [tokenExtension]
});
```

### `onCreate`

Returns config and client objects with following properties:

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

### `api` (createApiClient)

GraphQL mutations and queries imported from `commercetools/packages/api-client/src/api`. 

### `extensions`

Additional features that can be added before app client initialization. By default it loads `tokenExtension` that extends basic functionality of token authorization.