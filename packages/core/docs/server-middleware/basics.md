# Server Middleware basics

The Server Middleware is an Express proxy that sits between the users and the integration platform. We implemented it for a variety of reasons, such as to:

- connect multiple services using different technologies and libraries,
- provide a way of [extending integrations](/integrate/extending-integrations.html) to add new capabilities or modify its behavior,
- give you control of the requests sent to the integration platform and responses sent back to the client,
- securely store credentials on the server, without exposing them to the end-users of your application,
- improve the performance by moving all logic of the networking layer to the server, thus shipping less code to the browser.

As shown later in this chapter, Server Middleware can be an extension to the Express server used by Nuxt.js or run independently as a separate process.

## Data flow

Before we can understand Server Middleware, we need to discuss data flow. In Vue Storefront, we can summarize it into three groups:

* **Nuxt.js** - requests data from the Server Middleware when specific methods in the [composables](/guide/composables.html) are called.
* **Server Middleware** - accepts requests from the Nuxt.js application, converts them, and sends them to the given platform into the expected format.
* **Third-party platforms** - expose an API.

We describe each of them in more detail in the following sections.

:::tip There are exceptions
It's true that in most cases, requests are sent from the Nuxt.js application to Server Middleware and then to 3rd party providers. However, for security reasons, there are cases where it's not the case. For example, the payment and authentication integrations communicate directly with or redirect to the third parties so that the sensitive customer information does not go through our server.
:::

<center>
  <img
    src="../images/middleware-diagram.jpg"
    alt="Data flow between the browser, Server Middleware, it's extensions and integration platforms"
  />
</center>

### Nuxt.js

Most integrations in Vue Storefront ask you to register a Nuxt.js plugin or module in the `nuxt.config.js` file. These extend the [Application context](./context.html) object, adding their **client, configuration, and the API methods** to an object under a unique key, starting with `$` sign, e.g. `$ct` (for commercetools), `$magento`, `$sb` (for storyblok), etc.
When you call any of these API methods, the client uses the configuration and parameters passed to make an API call to the Server Middleware. It includes all parameters in the request body.

[Composables](/guide/composables.html) use the exact mechanism to communicate with their corresponding platforms when you call their methods.

### Server Middleware

Server Middleware is an Express.js server that exposes API endpoints defined in the extensions registered in the `middleware.config.js` file. 

Extensions can prepare and send a request to the third-party platform using available lifecycle hooks and data available in the request's body. When the response is received, it can be modified and sent back to the application. If necessary, extensions can also retry the request or make other subsequent requests to collect more data.

Server Middleware doesn't make any assumptions about the technologies used for the API communication. This way, integrations are not limited to specific protocols and can use whatever stack they see fit, be it REST, GraphQL, or anything else.

### Third-party platforms

Server Middleware can communicate with a variety of third-party platforms as long as they expose an API. It can use industry-standard libraries like `axios` or `Apollo` or platform-specific JavaScript SDKs.

In some scenarios, when the traffic should not go through the Server Middleware, it's possible to communicate directly between the browser and platforms. However, keep in mind that adding necessary libraries to your frontend can negatively impact the performance.

## What's next

Now that we high-level overview of the Server Middleware and how it exchanges the data between the Nuxt.js application and Third-party platforms, we can dive deeper. On the next page, we will learn about the [Application context](./context.html) and its use.
