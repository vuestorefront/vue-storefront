# API Client

[[toc]]

----
::: tip Installation
If you want to learn how to install the API Client check our [Getting Started guide](/getting-started.html)
:::

API Client is a data layer of your eCommerce integration. It provides a friendly abstraction layer over network calls to your eCommerce platform.

It expresses each network request as a declarative method like `getProduct` or `getCategory`. By having this additional layer we can hide implementation details of **how** we get the data which gives you freedom of introducing major changes in this layer without influencing other parts of the app.

API Client by itself is a Vanilla JavaScript application and it doesn't require any frontend framework to run. It's usually not used directly in the UI and is responsible only for providing data to Composition Functions.

## Configuration
::: danger storing credentials
  **Never** pass fragile data like API Client secrets as plain strings.
:::
<Content slot-key="setup"/>

## Methods

<Content slot-key="methods"/>

