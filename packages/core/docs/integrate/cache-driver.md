# Integrating cache driver

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, please **contact the core team on our [slack](https://slack.vuestorefront.io)** first. We are eager to help you with building it and ensuring its high quality! Building the integration together with the core team is the best way to keep its quality high and make it officially recommended once it's done.
:::

## Introduction

::: warning Before you get started
This page assumes you are familiar with caching in Vue Storefront. Please [see this page](../advanced/ssr-cache.md) for more information.
:::

Cache driver is not a standalone plugin, but an extension depending on `@vue-storefront/cache` module that does the heavy lifting.

It's a function that returns an object containing following properties.

```javascript
function CacheDriver (options) {
  const client = new Driver(options);

  return {
    async invoke({ key, route, context, render, getTags }) {},

    async invalidate({ request, response, tags }) {}

    async invalidateAll({ request, response, tags }) {}
  };
};
```

## Invoking driver

`invoke` method is called every time a route is rendered on the server. It's called with following parameters:

* `key` (string) - unique identifier for current route;
* `route` (object) - contains information about the current route;
* `context` (object) - contains information about the current context;
* `render` (function) - function to render the page, returns a Promise with HTML;
* `getTags` (function) - function to get all tags generated during render. Must be called after `render`;

Because calling `render()` is computationally expensive, it's the step we want to avoid. For this reason, `invoke` should work like this:

```javascript
{
  async invoke({ key, route, context, render, getTags }) {
    const cachedResponse = await client.getCache(key);

    if (cachedResponse) {
      // Page is already cached
      return cachedResponse;
    }

    const content = await render();

    if (!tags.length) {
      // Rendered page doesn't have any tags
      return content;
    }

    await client.setCache(
      key,
      content,
      getTags()
    );

    return content;
  },
}
```

## Invalidating cache

Invalidation methods are called when the cache invalidation page is visited and the invalidation key is confirmed There are two invalidation methods:
* `invalidateAll` - called when `*` is passed as a tag,
* `invalidate` - called in all other cases.

Both are called with following parameters:

* `request` (object) - Node.js HTTP request object;
* `response` (object) - Node.js HTTP response object;
* `tags` (array) - Array containing tags to invalidate;

By default, `@vue-storefront/cache` calls one of those methods and returns an empty response with `200 OK` or in case of error `500 Internal Server Error` HTTP code.

Because they have access to `response` object, they can optionally modify it to add custom HTTP headers or response, like JSON or a text.

```javascript
{
  async invalidate({ request, response, tags }) {
    await client.invalidate(tags);
    // Optionally add custom HTTP headers or response
  }
}
```
