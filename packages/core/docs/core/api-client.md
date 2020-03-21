# API Client

[[toc]]

----
::: tip Installation
If you want to learn how to install the API Client check our [Getting Started guide](/getting-started.html)
:::

API Client is a data layer of your eCommerce integration. It provides a friendly abstraction layer over network calls to your eComemrce platform.

It expresses each network request as a declarative method like `getProduct` or `getCategory`. By having this additional layer we can hide implementation details of **how** we get the data which gives you freedom of introducing major changes in this layer without influencing other parts of the app.

API Client by itself is a Vanilla JavaScript application and it doesn't require any frontend framework to run. It's usually not used directly in the UI and is responsible only for providing data to Composition Functions.

## Configuration
::: danger storing credentials
  **Never** pass fragile data like API Client secrets as plain strings. Use env variables instead!
:::

<Content slot-key="setup"/>

## Overriding and extending API Client methods

One of the biggest benefits of using headless architecture is the flexibility of combining multiple specialized third-party services in one application. It gives you a freedom of replacing parts of your app that are not meeting your expectations with other ones that do. For example if you don't like your eCommerce default CMS you can easily replace it with Storyblok.

The main purpose of introducing the API Client into Vue Storefront architecture was to make such changes as simple as possible and let people apply them without introducing breaking changes to other parts of the app

For example: If you want to change the way you're getting eCommerce data and switch from REST API to GraphQL or fetch product reviews from external service you can easily do that without introducing breaking changes in the UI layer or composition API functions **as long as your method will keep the same interface** 

You can override any of API Client methods with `override` function. It accepts an object where you can put functions you want to override.

<Content slot-key="override"/>

Lets see how we can override `getProduct` method in our API Client. It accepts `params` parameter and returns an array of products. It could look more or less like this:


TODO: Make it per-platform example

::: warning
Provided examples are not the real APIs of this integration. They are here only to explain the concepts of overriding API Client methods
:::
```js
async function getProduct(params: ProductSearch): Promise<ProductVariant[]> {
  const products = await fetch('https://vuestorefrontstore.com/product/' + params.slug)
  return products
}
```

I can imagine at least a few scenarios when we might want to change this function.

::: tip Augementing types
 If you want to add TypeScript checking for enriched data objects you need to augement Composition Functions interfaces as well.
:::
- **Enriching the default API response with data from  external source**

Let's say we want to enrich product object from our eCommerce platform with data that comes from  external review service _Cool Product Reviews_:

```js
import { override } from '@vue-storefront/{platform}-api'


override({
  async getProduct(params) {
    const product = this.super(params) // invokes default getProduct that we're just overriding
    const reviews = await fetch('https://coolproductreviews.com/review/' + params.slug)
    product.reviews = reviews
    return product
  },
})
```
- **Replacing the default API response with data from external source**


## Methods

<Content slot-key="methods"/>

