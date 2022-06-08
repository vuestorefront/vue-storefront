# Integrating payments solutions

:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, don't hesitate to contact the core team on our [Discord](https://discord.vuestorefront.io/) server. We are eager to help you to ensure its high quality and maybe even officially recommend it 😉
:::

Integrating payment solutions is a task that requires a proper understanding of how both the Payment Service Provider and the e-commerce platform approach them. Because such integrations deal with real money, even the most minor bug can be costly.

Every e-commerce platform handles integrating with PSP differently, making it impossible to cover all possibilities and edge cases. This document aims to help you understand the basics, some laws around implementing payment solutions, and other complex parts of building it.

## Payment basics

The very first step is to learn the theory behind payments.

### Terminology

#### Payment Service Provider (PSP)

The Payment Service Provider is a company that handles transactions with various payment methods securely and safely. Examples of these companies are Adyen, Checkout.com, Przelewy24, etc.

See the [Payment service provider](https://en.wikipedia.org/wiki/Payment_service_provider) page for more details.

#### Payment Card Industry (PCI)

The Payment Card Industry Data Security Standards (PCI DSS) are security standards created to ensure that the companies processing cardholder data do so securely.

See the [PCI DSS compliance guide](https://docs.adyen.com/development-resources/pci-dss-compliance-guide) for more details.

#### Strong Customer Authentication (3DS1 and 3DS2)

In [European Economic Area](https://en.wikipedia.org/wiki/European_Economic_Area), each bank has to perform [Strong Customer Authentication](https://en.wikipedia.org/wiki/Strong_customer_authentication) such as [3DS1 or 3DS2](https://www.tokenex.com/blog/what-is-3-d-secure-authentication-and-why-do-i-need-it). This requirement means that users have to verify the payment by entering an SMS Code from the bank, in the bank's application, or a similar authorization mechanism.

#### Payment authorization

Authorization means that money for a transaction is reserved on the account and waiting for capture.

#### Payment capture

Capture means that the bank transferred money from the user's account to the merchant.

### Handling credit card data

Before starting, you must know that you should **not** implement custom forms for submitting payment information. You also shouldn't process this data on your servers. Only PCI-compliant companies that pass rigorous audits can safely process this data.

However, most payment service providers offer components that handle payments and allow you to hook into certain events using callback functions. Inside these callbacks, you can access hashed payment data and, if necessary, communicate with the e-commerce backend.

::: tip
You should always check the documentation of your Payment Service Provider to learn about PCI-related requirements of their solution.

For example, they will require you to assess your PCI DSS compliance according to requirements of the Self-Assessment Questionnaire A (also called `SAQ A`) available in PSP's documentation.
:::

### Saving cards for recurring payments

Payment service providers like Adyen allow storing user credit cards for future payments. They store them inside their database, but you have to create a mechanism that generates unique User IDs that others can't see or manipulate.

For example, you shouldn't create an endpoint that returns saved cards based on data provided by the user because, with enough (bad) luck, someone can guess this ID and download the card information of another user.

Instead, you should use data that identifies if the user is who they say they are (such as their access token) to download saved cards.

## Analysis

After the theoretical foundations, it's time to start the analysis.

### Look for an existing solution

You should start by checking if there is an existing headless-ready integration with your e-commerce platform and PSP.

If you find one, be careful with you estimations. Headless-ready is a trendy term nowadays, and some developers tend to publish not well-tested integrations. You might encounter integrations marked as headless-ready but without key functionalities like 3DS1/3DS2 fully working.

However, using the existing solution is the most straightforward scenario. If — after validating the integration — you decide that it's okay, you can use the [Payment template repository](https://github.com/vuestorefront/payment-template) as a boilerplate for the integration.

Here're some examples of already existing e-commerce and PSP integrations:

- [commercetools and Adyen](https://github.com/commercetools/commercetools-adyen-integration),
- [Magento2 and Adyen](https://github.com/adyen/adyen-magento2),
- [commercetools and mollie](https://github.com/mollie/commercetools).

### If there is no existing solution

If there is no existing solution and you have to write your own, you first have to learn how the e-commerce platform of your choice deals with payments. Make sure you consider:

- creating a payment,
- updating a payment (after authorization, capture, refund),
- attaching payment to an order,
- updating order status after successful payment,
- updating status based on asynchronous messages (webhook).

Depending on the platform, you'll either have to create one or both of the following:

- an integration for Server Middleware in Vue Storefront to communicate with PSP and the e-commerce platform,
- or an extension for an e-commerce platform, e.g., Magento2 Plugin in PHP.

Taking the above into account, browse possible ways of integrating with the PSP and visualize how you could use it to bring essential data to the e-commerce platform while still offering the best possible UX. Plan what users will see on the frontend and how to make the following pieces communicate:

- Nuxt application,
- Server Middleware,
- E-commerce platform,
- Payment Service Provider.

## Edge cases

### Modyfing total price in second tab

Users can open a second tab and modify the cart's total price during the payment process by adding or removing products or coupons from the cart. To prevent a mismatch, you should compare the current cart's total price with the payment amount during each step, especially before authorization.

### Payment's status update via webhook

Creating a payment and an order is not the end of the story. Payment Service Provider can send asynchronous notifications about modifications of payment's status. You should create an endpoint to handles them and updates the status of payment and order based on this information.

You can use [`ngrok`](https://ngrok.com/) or [`localtunnel`](https://theboroer.github.io/localtunnel-www/) to test the webhook locally.

### Authorizing payments too early

Don't authorize or capture too early. The recommended approach is to create an endpoint in Server Middleware that authorizes the payment and then creates an order immediately afterward.

See the [When I should create an order?](https://github.com/commercetools/commercetools-adyen-integration/blob/master/docs/FAQ.md#when-i-should-create-commercetools-order-) document created by the commercetools team to understand whether you should create an order before or after successful payment.

### Duplicated requests in webhooks

PSPs queue requests to integration webhooks if the previous attempts failed to try again once the server is back online. For example, if your server crashed while processing the request and didn't send a response back to PSP, the PSP will send the same request again later.

In the above case, if the server processed only part of the request during the first attempt and made corresponding calls to the e-commerce platform, receiving the same request again will duplicate some operations.

You should add proper checks to not perform the same operations twice in such cases.

### Assuming that all currencies use two decimal numbers

You should not assume that all currencies have two decimals and respects other values too.

See the [Currency codes](https://docs.adyen.com/development-resources/currency-codes) document for a list of currencies and their number of decimals.

## Architecture

Integration with PSPs in Vue Storefront consists of a few pieces listed below.

Server Middleware:

- API endpoints to communicate with the e-commerce and the PSP,
- API endpoint for PSP's webhook.

Nuxt application:

- Composable for communication with endpoints and storing data,
- Vue component that uses above composable and implements visual part and view's logic,
- Nuxt plugin that registers PSP with provided configuration and the module that registers the plugin.

Based on our experience, we've created the [Payment integration template](https://github.com/vuestorefront/payment-template) that contains everything mentioned above. It's a perfect starting point for creating a new integration.

## Integration checklist

In addition to the Payment integration template mentioned in the previous section, we also created a checklist that you can use to ensure your integration covers the essential features and edge cases.

When creating an integration make sure:

- It has an endpoint for PSP's webhook that updates payment inside.
- It has a webhook that validates the request signature if available.
- It supports 3DS1 and 3DS2 as required in the European Economic Area (EEA).
- It handles [edge cases](#edge-cases) listed above.
