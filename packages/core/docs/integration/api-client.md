# Building API Client

[[toc]]

___

API Client is just a tiny abstraction layer over network calls of your eCommerce platform. You can think about that as a data layer for your application. Every network call responsible for getting/setting certain type of data should be a simple function. For example when we have an enpoitnt responsible for fetching categories `category/{id}` we can express it as a following function `getCategory(id: string)`.

API Client is also a root source for all Typescript interfaces related to your integration.

You can find your API Client code under `{integration}/api-client` folder where `{integration}` is a name of your integration.

Before starting to build our API Client let's start with some theory:

## Package structure

By default fresh API Client package has following structure:

- `src/index.ts` - This is the entry point of your API Client. This is the only place that should export public business logic.
- `src/types.ts` - This is a place where all your types should be placed. Especially interfaces for API Client methods and data entities like `category`, `product` etc.
- `src/api` - This is a directory where you will put all API Client methods. It contains some example functions but feel free to remove them or add new. The content of this folder highly depend on eCommerce platform you're integrating with.

## Using `apiClientFactory`

There is one particularly important element in `src/index.ts` file of your integration - `apiClientFactory`. This function takes care of setting up everything you will need to implement API Client non-eCommerce functionalities like setup or overriding mechanism.

```js
const { setup, override, update, settings } = apiClientFactory<MyPlatformApiClientMethods, MyPlatformApiClientSettings>({ defaultSettings, onSetup })
```

Now, let's take a look at what `apiClientFactory` accepts and returns:

```js
apiClientFactory<API_CLIENT_METHODS, API_CLIENT_SETTINGS> (
  factoryParams: { 
    defaultSettings: API_CLIENT_SETTINGS;
    onSetup: (config: API_CLIENT_SETTINGS) => void;
  }
) => { 
  override: (overrides: API_CLIENT_METHODS) => void;
  setup: (settings: API_CLIENT_SETTINGS) => void;
  update: (settings: API_CLIENT_SETTINGS) => void;
  getSettings: () => API_CLIENT_SETTINGS
})
```

### Types

- `API_CLIENT_METHODS` - This should be an interface containing signatures of all your API Client methods
```ts
import { 
  GetCategory, 
  GetCategoryParams,
  GetProduct,
  GetProductParams,
  ...
} from './types'

interface MyPlatformApiClientMethods {
  getCategory: (params: GetCategoryParams): GetCategory,
  getProduct: (params: GetProductParams): GetProduct
  ...
}
```
- `API_CLIENT_SETTINGS` - Here you should specify all possible settings that can be passed to your API Client
```ts
interface MyPlatformApiClientSettings {
  api?: string;
  authSecret?: string;
  defaultLocale?: string
  ...
} 
```
::: warning 
Mark all API Client configuration settings as optional. Uusally users need to pass only a subset of them and use defaults for others
:::
### Params

- `defaultSettings` - This is a default configuration for your API Client. It's just an object similar to this one:
```js
{
  api: "https://demo.vuestorefront.io/api",
  authSecret: "doNotTellAnyone",
  defaultLocale: "en-US"
  ...
}
```
- `onSetup(settings)` - Function that will be invoked after `setup` is called. Usually this is a place where you create an instance of external API Client or Axios. `settings` parameter contains `defaultSettings` merged with settings passed to `setup` method. It could look similarly to below function:
```js
let MyPlatformApiClient;

onSetup(settings) {
   MyPlatformApiClient = new PlatformApiClient(settings)
}
```

### Returns

- `getSettings` - Method returning current configuration of your API Client _(readonly)_
- `setup` - Method responsible for setting up API Client. It saves credentials and options to your settings. This is a method that users willing to use the integration need to invoke.
- `override` - Method enabling overriding API Client methods. 
- `update` - Method to update your 


## Implementing API Client method

Let's see how we can implement a single API Client method. All other methods will be done in a same way

Below you can find an example of a properly implemented API Client method

```js
import { GetCategory, GetCategoryParams } from '../../types'
import { settings } from '../../index'
import { MyPlatformApiClient } '../../index'

function getCategory (params: GetCategoryParams): GetCategory {
  const products = await MyPlatformApiClient.getCategory(params)
  return products
}

export default getCategory || settings.overrides.getCategory

```
Okay. So what happened here?
```js
import { GetCategory, GetCategoryParams } from '../../types'
import { settings } from '../../index'
```
First we imported types and interfaces needed for this method from `types.ts` which is the entry point for all public types and interfaces. It's important to keep the method types in this format (params and returned values separately) to make it easier for users to extend them.

We also imported `settings` object that will be used later to enable overriding of `getCategory`.

```js
function getCategory (params: GetCategoryParams): GetCategory {
  const products = await MyPlatformApiClient.getCategory(params)
  return products
}
```
Then we're just writing our `getCategory` method.
```js
export default getCategory || settings.overrides.getCategory
```
This part is very important because without it API Client methods overriding mechanism won't work.

We are checking if user provided `getCategory` method to `override` function. Every time someone will use `override` method from `index.ts` and pass `getCategory` function there it will be automatically saved in `settings.overrides.getCategory`. If user did that then we are just using this new function, otherwise we're using the default one where we're invoking `MyPlatformApiClient.getCategory` method from our dedicated platform API Client (or one we made with axios).

Thats all! This is more or less how every API Client method works.

## To do

::: warning Don't forget about unit tests
Every integration needs to have 100% unit tests coverage
:::
1. Fill in the apiClientFactory types and params
2. Implement API Client methods for CRUD interactions with product, category, cart, checkout, user, wishlist. If you're not sure how to handle some specific case check `commercetools` integration for reference.

## Common problems

- **Sharing platform token:** We suggest using same approach as in within commercetools integration https://vsf-next-docs.netlify.com/commercetools/api-client.html#token-handling. Keep in mind that the solution shouldn't depend on Nuxt (but Nuxt theme can implement a solution using what integration has provided)
