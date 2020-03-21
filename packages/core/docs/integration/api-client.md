# Building API Client

[[toc]]

___

API Client is just a tiny abstraction layer over network calls of your eCommerce platform. Every network call responsible for getting/setting certain type of data should be a simple function. For example when we have an enpoitnt responsible for fetching categories `category/{id}` we can express it as a following function `getCategory(id: string)`.

API Client is also a root source for all Typescript interfaces related to your integration.

You can find your API Client code under `{integration}/api-client` folder where `{integration}` is a name of your integration.

Before starting to build our API Client let's start with some theory:

## Package structure

By default fresh API Client package has following structure:

- `src/index.ts` - This is the entry point of your API Client. This is the only place that should export public business logic.
- `src/types.ts` - This is a place where all your types should be placed. Especially interfaces for API Client methods and data entities like `category`, `product` etc.
- `src/api` - This is a directory where you will put all API Client methods. It contains some example functions but feel free to remove them or add new. The content of this folder highly depend on eCommerce platform you're integrating with.

## Using `ApiClientFactory`

There is one particularly important element in `src/index.ts` file of your integration - `ApiClientFactory`. This function takes care of setting up everything you will need to implement API Client non-eCommerce functionalities like setup or overriding mechanism.

```js
const { setup, override, settings } = ApiClientFactory<MyPlatformApiClientMethods>(defaultSettings, onSetup)
```

Now lets take a look at what `ApiClientFactory` accepts and returns:

```js
ApiClientFactory<API_CLIENT_METHODS>(defaultSettings, onSetup: (settings) => void)
```


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
- `onSetup(settings)` - Function that will be invoked after `setup`. Usually this is a place where you create an instance of external API Client or Axios. `settings` parameter contains `defaultSettings` merged with settings passed to `setup` method. It could look similarly to below function:
```js
let api;

onSetup(settings) {
   api = new PlatformApiClient(settings)
}
```
- `API_CLIENT_METHODS` - Typings for API Client methods
```ts
import { GetCategory, 
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
### Returned values

- `settings` - Default configuration of your API Client overridable with `setup` and `override`. This is almost exactly the same object you have passed as `defaultSettings` enriched with `overrides` property. It's a 
- `setup` - Method responsible for setting up API Client. It saves credentials and options to `settings`. This is a method that user willing to use the integration needs to invoke.
- `override` Method responsible for overriding API Client methods. 


## Implementing API Client method

Lets see how we can implement a single API Client method. All other methods will be done in a same way
Below you can find an example of properly implemented API Client method

```js
import { GetCategory, GetCategoryParams } from '../../types'
import { settings } from '../../index'
import { MyPlatformApiClient } '../../index'

function getCategory (params: GetCategoryParams): GetCategory {
 const products = await MyPlatformApiClient.getCategory(params)
}

export default settings.overrides.getCategory || getCategory
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
}
```
Then we just invoked `getCategory` method from our dedicated platform API Client (or one we made with axios).

```js
export default settings.overrides.getCategory || getCategory
```
This line is really important because it enables users to override API Client methods. Every time someone will use `override` method from `index.ts` and pass `getCategory` function there it will be automatically saved in `settings.overrides.getCategory`. By default this property is undefined therefore we're exporting `getCategory` but once it's filled the overrided method will be imported.