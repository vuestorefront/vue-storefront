# Integrating payment service provider

:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, don't hesitate to get in touch with the core team on our [Discord](https://discord.vuestorefront.io/) server. We are eager to help you to ensure its high quality and maybe even officially recommend it 😉
:::

## Introduction

Integrating payment solutions is a task that requires a proper understanding of both the Payment Service Provider and the e-commerce platform's approach to them. Because it deals with real money, even the tiniest bug can be costly.

This document aims to help you understand some laws around implementing payment solutions and other complex parts of building it.

## Understand the basics

//TODO: This needs more explanation

The first step is to learn the theory behind payments:

- [What's PCI Compliance?](https://docs.adyen.com/development-resources/pci-dss-compliance-guide)
- [What's Payment Service Provider (PSP)?](https://en.wikipedia.org/wiki/Payment_service_provider)

### Handling credit card data

Before starting, you must know that you should **not** implement custom forms for submitting payment information. You also shouldn't process this data on your servers. Only PCI-compliant companies that pass rigorous audits can safely process this data.

However, most payment service providers offer components that handle payments and allow you to hook into certain events via callback functions. Using these callbacks, you can access hashed payment data and, if necessary, communicate with the e-commerce backend. Because they give you already hashed data, you can send it to your server without worrying about PCI.

### Saving cards for recurring payments

Payment service providers like Adyen allow storing user credit cards for future payments. They store them inside their database, but you have to create a mechanism that generates unique User IDs that others can't see or manipulate.

For example, you shouldn't create an endpoint that returns saved cards based on data provided by the user because, with enough (bad) luck, someone can guess this ID and download the card information of another user.

Instead, you should use data that identifies if the user is who they say they are (such as their access token) to download saved cards.

### Strong Customer Authentication

In [European Economic Area](https://en.wikipedia.org/wiki/European_Economic_Area), each bank has to perform [Strong Customer Authentication](https://en.wikipedia.org/wiki/Strong_customer_authentication)such as [3DS1 or 3DS2](https://www.tokenex.com/blog/what-is-3-d-secure-authentication-and-why-do-i-need-it). This requirement means that users have to verify the payment by entering an SMS Code from the bank, in the bank's application, or a similar authorization mechanism.

This verification is sometimes skipped in PSPs sandbox mode to make development faster. Before going into production, make sure to test both 3DS1 and 3DS2.

### The difference between Authorization and Capture

Authorization means that money for a transaction is reserved on the account and waiting for capture.

Capture means that the bank transferred money from the user's account to the merchant.

### Every integration is different

Every e-commerce platform handles integrating with PSP differently, making it very difficult to integrate with more than one of them within one codebase. We recommend creating separate integration for every e-commerce platform.

## Analysis

After the theoretical foundations, it's time to start the analysis.

### Look for an existing solution

Check if there is an existing headless-ready integration with your e-commerce platform and PSP. If you found one, be careful with estimations. Headless-ready is a trendy term nowadays, and some developers tend to publish not well-tested integrations. You might encounter integrations marked as headless-ready but without key functionalities like 3DS1/3DS2 fully working.

However, using the existing solution is the most straightforward scenario. If — after validating the integration — you decide that it's okay, you can use the [Payment template repository](https://github.com/vuestorefront/payment-template) as a boilerplate for the integration.

Here're some examples of already existing e-commerce and PSP integrations:

- [commercetools and Adyen](https://github.com/commercetools/commercetools-adyen-integration),
- [Magento2 and Adyen](https://github.com/adyen/adyen-magento2),
- [commercetools and mollie](https://github.com/mollie/commercetools).

#### If there is no existing solution

If there is no existing solution and you have to write your own, you first have to learn how the e-commerce platform of your choice deals with payments. Make sure you consider:

- creating a payment,
- updating a payment (after authorization, capture, refund),
- attaching payment to an order,
- updating order status after successful payment,
- updating status based on asynchronous messages (webhook).

Depending on the platform, you'll have to write:
either an integration for Server Middleware in Vue Storefront to communicate with PSP and the e-commerce platform,
or an extension for an e-commerce platform, e.g., Magento2 Plugin in PHP.

#### Find the best way to integrate with your Payment Service Provider

Browse possible ways of integrating with the PSP and visualize how you could use it to bring essential data to the e-commerce platform while still offering the best possible UX. Plan what users will see on the frontend and how to make the following pieces communicate:

Vue Storefront Frontend,
Vue Storefront Server Middleware,
E-commerce platform,
Payment Service Provider.

## Edge cases

### Second tab total price modification

Users can open a second tab and modify the cart's total price during the payment process by adding or removing products or coupons from the cart. To prevent a mismatch, you should compare the current cart's total price with the payment amount during each step, especially before authorization.

### Payment's status update via webhook

Creating a payment and an order is not all. Payment Service Provider will send asynchronous notifications about modifications of payment's status. You should create an endpoint to handle them and update the status of payment and order based on this information.

You can use [`ngrok`](https://ngrok.com/) or [`localtunnel`](https://theboroer.github.io/localtunnel-www/) to test the webhook locally.

### Authorize when you are placing an order or after

Don't authorize or capture too early! It's best to do it as late as possible. The recommended approach is to create an endpoint in Vue Storefront Server Middleware that authorizes a payment and creates an order a line below. The desired situation is to authorize payment and create an order at once.

## Architecture

- API Endpoints in VSF2 Middleware for communication with the eCommerce and PSP,
- API Endpoint for PSP's Webhook,
- composable for communication with endpoints and storing some data,
- Vue component that uses composable and implements visual part and view's logic,
- separate build for the client (component, composable, types, and constants) and for the server (endpoints, types),
- Nuxt plugin that registers PSP with provided configuration, and Nuxt module that registers the plugin,
- it's worth using monorepo and separate packages per eCommerce. If you would want to create an integration for the same PSP with a different eCommerce one day - then you could create an additional package with shared things like types or some constants.

Based on our experience, we've created the [**Payment integration template**](https://github.com/vuestorefront/payment-template), which is a perfect starting point for creating a new integration. There you have everything that's mentioned above. Customize what's necessary, and remove what's redundant.

## Integrating PSP with certain eCommerce

### [commercetools](https://docs.vuestorefront.io/v2/commercetools/guide/payment-service-provider-integration.html)

### Magento2

You need a PHP plugin for an integration that is Headless-ready. So it shares API/GQL endpoints. Then you have to communicate with the plugin like that VSF2 Frontend <-> VSF2 Middleware <-> Magento2 PSP's Plugin.

### BigCommerce

BigCommerce integration uses [embedded checkout](https://developer.bigcommerce.com/docs/92d1297c7a025-embedded-checkout-overview) which uses `iframe` under the hood. So it should be enough to install the BigCommerce plugin.

## Integration checklist

Use the bullets below to check if your integration has everything that's necessary:

- has a great documentation, examples: [commercetools & PayPal](https://docs.vuestorefront.io/paypal/commercetools/), [commercetools & Adyen](https://docs.vuestorefront.io/adyen/), [Magento2 & Adyen](https://docs.vuestorefront.io/adyen/magento2/),
- handles [modifying total price](./payment.html#second-tab-total-price-modification) in the second tab/during payment,
- shares endpoint for PSP's webhook and updates payment inside,
- webhook validates request signature if available,
- PSP could queue failed requests from webhook - handle it to prevent duplicates
- supports 3DS1 and 3DS2 if it contains Credit Cards because it's required in EEA
- [ ] write a list of manual tests to make before each release and use it
- do not assume that currency has 2 decimals. Respect other values, too: https://docs.adyen.com/development-resources/currency-codes
- delay authorization of payment as far as possible. Probably you should make it together with placing an order https://github.com/commercetools/commercetools-adyen-integration/blob/master/docs/FAQ.md#when-i-should-create-commercetools-order-
- describe how to capture and refund in the documentation

Additional for Express Flow:

- if shipping & billing information is being brought from PSP, you have to put them in your eCommerce and fetch available shipping methods based on that. Then force the user to pick one and update the total price. What's more, there is a possibility that the merchant doesn't ship to provided shipping address - handle it.
- during the shipping methods check, you could also check for price modification (from the second tab) and update it to improve UX
- keep in mind that after Express checkout but before clicking on "CONFIRM AND PLACE AN ORDER" (if shop uses the confirmation-before-order page) user could modify the shipping/billing address, and then you have to either update everything in PSP or switch him to standard flow and forced to recreate a payment
