# SDK overview

The Vue Storefront SDK is a set of tools, libraries, and documentation that simplifies the development process by providing reusable code and pre-built functionality. It offers a powerful and versatile approach to building solutions within the Vue Storefront ecosystem. Acting as a communication layer, this framework-agnostic SDK enables seamless interaction between your storefront and various Commerce Platforms and third-party services. By utilizing the Vue Storefront SDK, you can establish a robust contract that facilitates efficient data exchange and integration capabilities with the help of the Server Middleware acting as a proxy.

::: warning Why?
With the introduction of the SDK, users can now seamlessly connect to third-party services through a framework-agnostic communication layer. The SDK, written in pure TypeScript, provides type-safe connections and compatibility with any front-end framework, including Nuxt 3 and Next.js. This allows users to have more flexibility and adaptability in their projects without worrying about extra migration steps or being limited to a specific framework.
:::

## Naming convention

To avoid confusion, let's define some terms that we'll use to describe the SDK:

- **SDK** - A set of tools, libraries, and documentation that simplifies the development process by providing reusable code and pre-built functionality.
- **SDK Core** - the core package `@vue-storefront/sdk`, that combines all modules and implements the plug-in architecture.
- **Module** - a pluggable piece of code as a standalone package (eg.: `@vsf-enterprise/sapcc-sdk`).
- **Options** - a configuration used to initialize the module.
- **Extension** - a set of methods and interceptors that extends the module.
- **Methods** - a functions that are exposed by the module. By default, those functions are asynchronous and return a Promise. Methods affected by the interceptors are always returning a Promise, because interceptors requires it. However, there is a possibility to create a method that returns a value, not a Promise. To do it, you can use `lib` property in the method extension's configuration. Methods could be also extended and overridden. More about it in the [Extending the module](./sdk.md#extending-the-module) section.
- **Connector** - a set of methods that are used to communicate with the third-party service. Connectors are not exposed to the end-user, they are used internally by the module.
- **Interceptor** - a function that wraps a module's method and modifies the input (without modifying the parameter's type) or output (without modifying the return type) of that function.
- **Subscriber** - a function that is called when a module's method is called. It's a great place to add some custom logic, like logging or analytics.

## Architecture

The easiest way to explain the SDK architecture is to take a look at different levels of the Vue Storefront Integration context.

::: tip C4 diagrams
We use C4 diagrams to describe the architecture. To learn more about them check out the [C4 model for visualising software architecture](https://c4model.com/) website.
:::

### System context level

On this level, we can say that Vue Storefront Integration is a software system that can communicate with multiple 3rd party providers like Commerce Platforms, CMS, Payments, etc...

![System context level](https://res.cloudinary.com/vue-storefront/image/upload/v1678201501/C4%20Integrations/Integrations_Workspace_-_Copy_of_System_context_level_bfznrj.jpg)

### System container level

Vue Storefront Integration contains two containers - `storefront` (our frontend) and `server middleware` (backend for frontend).

![System container level](https://res.cloudinary.com/vue-storefront/image/upload/v1678201501/C4%20Integrations/Integrations_Workspace_-_Copy_of_System_container_level_jj4n84.jpg)

### System Component Level - Storefront Components

Finally, the part when SDK gets involved. In the Storefront container, frontend framework is using the SDK to communicate with the server middleware (which is communicating with a Commerce Backend or other 3rd party service under the hood).

![System Component Level - Storefront components](https://res.cloudinary.com/vue-storefront/image/upload/v1678201501/C4%20Integrations/Integrations_Workspace_-_Copy_of_System_component_level_-_Storefront_wd6dk4.jpg)

### System Component Level - SDK Components

Delving further into the details, the Vue Storefront SDK employs a microkernel architecture, consisting of the core Vue Storefront SDK and various modules that extend the microkernel's functionality.

![System Component Level - SDK Components](https://res.cloudinary.com/vue-storefront/image/upload/v1678387797/C4%20Integrations/Integrations_Workspace_-_System_component_level_-_SDK_1_aeoxpp.jpg)

An SDK module can extend the core of Vue Storefront SDK in many different ways. In most cases, it would be a `commerce` module that communicates with a commerce backend, a `cms` module that communicates with a CMS provider, and a `payment` module that communicates with a payment provider. However, the SDK core can be extended with virtually any type of module and not only those created by Vue Storefront.

Based on this information, the diagram can be simplified.

![System Component Level - SDK Components simplified](https://res.cloudinary.com/vue-storefront/image/upload/v1678387797/C4%20Integrations/Integrations_Workspace_-_System_component_level_-_SDK_simplified_1_dxh18q.jpg)

