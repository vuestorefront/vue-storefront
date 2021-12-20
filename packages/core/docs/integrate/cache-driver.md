# Integrating cache driver

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, don't hesitate to get in touch with the core team on our [Discord](https://discord.vuestorefront.io/) server. We are eager to help you to ensure its high quality and maybe even officially recommend it 😉
:::

## Introduction

::: warning Before you get started
This page assumes you are familiar with caching in Vue Storefront. Please [see this page](../performance/ssr-cache.md) for more information.
:::

Cache driver is not a standalone plugin but an extension depending on `@vue-storefront/cache` module that does the heavy lifting.

It's a function that returns an object containing the following properties.

```javascript
function CacheDriver (options) {
  const client = new Driver(options);

  return {
    async invoke({ route, context, render, getTags }) {},

    async invalidate({ request, response, tags }) {}
  };
};
```

## Invoking driver

`invoke` method is called every time a route is rendered on the server. It's called with following parameters:

* `route` (object) - contains information about the current route;
* `context` (object) - contains information about the current context;
* `render` (function) - function to render the page, returns a Promise with HTML;
* `getTags` (function) - function to get all tags generated during render. Must be called after `render`;

Because calling `render()` is computationally expensive, it's the step we want to avoid. For this reason, `invoke` should work like this:

```javascript
{
  async invoke({ route, render, getTags }) {
    const key = `page:${ route }`;
    const cachedResponse = await client.get(key);

    if (cachedResponse) {
      return cachedResponse;
    }

    const content = await render();
    const tags = getTags();

    if (!tags.length) {
      return content;
    }

    await client.set(
      key,
      content,
      tags
    );

    return content;
  }
}
```

## Invalidating cache

`invalidate` method is called when the cache invalidation page is visited. It is called with following parameters:

* `request` (object) - Node.js HTTP request object;
* `response` (object) - Node.js HTTP response object;
* `tags` (array) - Array containing tags to invalidate;

By default, `@vue-storefront/cache` calls it and returns an empty response with `200 OK` or in case of error `500 Internal Server Error` HTTP code.

`response` object passed to it can optionally be modified to add body (like JSON or a text) and custom HTTP headers.

This method should be able to delete all tags when `*` is one of the keys passed to the `tags` array.

```javascript
{
  async invalidate({ request, response, tags }) {
    if (tags.includes('*')) {
      // invalidate all tags
      await client.invalidateAll();
    } else {
      // invalidate provided tags
      await client.invalidate(tags);
    }
  }
}
```
