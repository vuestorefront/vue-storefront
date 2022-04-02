# Integrating payment service provider
:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, don't hesitate to get in touch with the core team on our [Discord](https://discord.vuestorefront.io/) server. We are eager to help you to ensure its high quality and maybe even officially recommend it 😉
:::

## Introduction

Integrating a Payment Service Provider with Vue Storefront is a task that requires a wider overview of the theory of payments and your e-commerce platform's approach to them.

This document will guide you through it.

## Learn theory

The first step is to learn the theory behind payments:
- [What's PCI Compliance?](https://docs.adyen.com/development-resources/pci-dss-compliance-guide)
- [What's Payment Service Provider (PSP)?](https://en.wikipedia.org/wiki/Payment_service_provider)

### Handling credit card data
Payment service providers often share a [component](https://docs.adyen.com/online-payments/prebuilt-ui#drop-in) that handles payments and allows you to inject into certain events via callback functions. From these, you have access to hashed payment data and you can communicate with the eCommerce backend. What's important, you don't have an access to the plain payment data here.

It's totally fine to send hashed data through your server (middleware) but it isn't legal to send plain payment data without being PCI compliant!

### Can I store user's payment data in browser storage?
No, it's a bad practice. You shouldn't use any browser storage for that purpose.

### Saving cards (recurring payments)
Payment service providers like Adyen allows storing user credit card for the next payments. They are storing it inside their own database. All we have to do is, create a unique user identifier and make sure no one can use another's user identifier. So for example - send a customer's token to VSF2 Middleware - inside the endpoint, fetch the User ID based on provided token, and use it for reference in the PSP. NEVER send user ID directly from the frontend because it is so easy to put there a different ID, especially in relational databases. 

### Can anyone pay via my card by knowing it's details?
In [European Economic Area](https://en.wikipedia.org/wiki/European_Economic_Area), each bank has to perform [Strong Customer Authentication](https://en.wikipedia.org/wiki/Strong_customer_authentication) - which means it has to perform [3DS1 or 3DS2](https://www.tokenex.com/blog/what-is-3-d-secure-authentication-and-why-do-i-need-it) authentication - which might require providing SMS Code from our bank, accepting it in the bank's application, or something like that. That's why you always have to make sure you support both 3DS1 and 3DS2 when creating a PSP integration. It's not that obvious case during testing in the sandbox mode. But it's essential to make it work correctly for the production environment.

### What's the difference between Authorization and Capture?
Authorization means that money for transaction is reserved on the user's account and waiting for capture - mostly capture will happen after some time or manually. Capture means that money has been transferred from the user's account to the merchant.

### Can I make an universal PSP integration for every eCommerce?
It's impossible to have one codebase for the integration of PSP with every eCommerce. It would be very hard for 2-3 eCommerce and really painful in maintenance. 

## Analysis
After getting theoretical foundations, it's time to start the analysis.

### Check for already existing solution
Check if there is a already existing headless-ready integration with your eCommerce and PSP. If you found one, be careful with estsimations. Headless-ready is very popular term nowadays. Developers tend to publish not well-tested integrations. You might encounter integrations marked as headless-ready but without key functionalities like 3DS1/3DS2 fully working through API.

If everything is fine, in most cases, you will have to create VSF2 middleware integration to access new eCommerce endpoints. This is the easiest scenario because you don't have to write additional code for PSP and eCommerce communication. 

Examples of already existing eCommerce and PSP integrations:
- [commercetools and Adyen](https://github.com/commercetools/commercetools-adyen-integration),
- [Magento2 and Adyen](https://github.com/adyen/adyen-magento2),
- [commercetools and mollie](https://github.com/mollie/commercetools).

### If there isn't already existing integration
In that particular case, you have to write additional code in VSF2 Middleware to communicate with PSP and eCommerce. In some cases, it is possible to do - commercetools. But in some cases you still need to write code in a different place - e.g. Magento2 Plugin in PHP.

#### Learn how your eCommerce approaches payments 
Different eCommerces have a different approach for payments. You have to analyze how your one approaches them, make sure you:
- create a payment object,
- update a payment object (after authorization, capture, refund),
- payment object is attached to the order,
- order status is updated after successful payment,
- prepared a webhook for async updates.

#### Find the best way for integration with your Payment Service Provider
Browse possible ways of integrating with the PSP and imagine how you could use it to bring essential data to eCommerce and give the best possible UX to the VSF2 frontend. Plan what user will have on frontend, how will comunication look like, describe requests, responses and their paths. 

You will have to create VSF2 Middleware endpoints to act like the core of communication between VSF2 Frontend, PSP, and eCommerce.

## Edge cases
Creating the integration is not all. Now let's have a look at edge cases which should be handled. Otherwise, they would make us troubles!

### Check for Second tab total price modifiaction during each step (and coupon code too! just any way!)
User can open a second tab and modificate cart's total price during the payment process. To prevent mismatch you should compare current cart's total price with payment amount 

### Support Payment's status update via webhook
Creating a payment and an order is not all. PSP will send asynchronous notifications about modifications of payment status. You should prepare an endpoint to receive them and update status of payment and order based on the information.

You can use `ngrok` or `localtunnel` to test them locally.

### Authorize when you are placing an order or after
Don't authorize or capture to early! It's the best to do it as late as possible. Recommended approach is to create endpoint in VSF2 Middleware that both authorizes a payment and creates an order a line after. Desired situation is to authorize payment and create an order at once.

<!-- ### Gain knowledge about payment handling in your eCommerce
You need to know what approach selected eCommerce is using:
- Commercetools requires to write some server-side code and operator on it's Payment object
- Magento2 requires to write PHP plugin and communicate with it from VSF2
- BigCommerce uses checkout in iframe so probably plugin would do the job

- Check documentation of the payment service provider you want to integrate.
- You don't want only to put components in the frontend
- You also need  -->

## Architecture
- API Endpoints in VSF2 Middleware for communication with the eCommerce and PSP
- API Endpoint for PSP's Webhook
- Composable for comunication with endpoints and storing some data
- Vue component that uses composable and implements visual part and view's logic
- Separate build for client (component, composable, types, and constants), and for server (endpoints, types)
- Nuxt plugin that registers PSP with provided configuration, and Nuxt module that registers the plugin
- It's worth to use monorepo and separate packages per eCommerce. If you would want to create integration for same PSP with a different eCommerce one day - then you could create additional package with shared things like types or some constants.

## Integrating PSP with certain eCommerce

### commercetools
Create `Payment` object. Keep it up-to-date. Add payment to the cart. Create an order. Update payment status (and transactions), and order status based on Webhook calls (you need to create an endpoint for that - and we recommend using VSF2's integrations - middleware.config.js). This is a good reference of desired flow in PSP & commercetools integration: https://github.com/commercetools/commercetools-adyen-integration/blob/master/extension/docs/WebComponentsIntegrationGuide.md

### Magento2
You need a PHP plugin for an integration that is Headless-ready. So it shares API/GQL endpoints. Then you have to communicate with the plugin from VSF2 frontend or middleware. 

### BigCommerce
Checkout is the iframe so it is all on BigCommerce(?).

# Integration checklist
Use bullets below to check if your integration has everything what's necessary.

My integration:
- [ ] handles modifying total price in the second tab/during payment
- [ ] updates Payment&Transaction status from webhook calls, so it shares some endpoint
- [ ] webhook validates request siganture if available
- [ ] PSP will queue failed request from webhook, handle it to prevent duplicates
- [ ] Use `ngrok` or `localtunnel` to test webhook locally
- [ ] supports 3DS1 and 3DS2 if it contains Credit Cards because it's required in EEA
- [ ] write a list of manual tests to make before each release and use it
- [ ] do not assume that currency has 2 decimals. Respect other values too: https://docs.adyen.com/development-resources/currency-codes
- [ ] delay authorization of payment as far as possible. Probably you should make it together with placing an order https://github.com/commercetools/commercetools-adyen-integration/blob/master/docs/FAQ.md#when-i-should-create-commercetools-order-
- [ ] describe how to capture and refund in the documentation or put a link to how2

Additional for Express Flow:
- [ ] if shipping & billing information are being brought from PSP then you have to put them in your eCommerce and fetch available shipping methods based on that. Then force user to pick one and update the total price. What's more, there is a possibility that merchant doesn't ship to provided shipping address - handle it.
- [ ] during shipping methods check, you could also check for price modification (from the second tab) and update it to improve UX
- [ ] keep in mind that after Express checkout but before click on "CONFIRM AND PLACE AN ORDER" user could modify shipping/billing address and then you have to either update everything in PSP or switch him to standard flow and force to recreate a payment
