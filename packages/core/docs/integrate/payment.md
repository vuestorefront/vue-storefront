# Integrating payment service provider
:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, don't hesitate to get in touch with the core team on our [Discord](https://discord.vuestorefront.io/) server. We are eager to help you to ensure its high quality and maybe even officially recommend it 😉
:::

## Introduction

Integrating an Payment Service Provider with Vue Storefront is a task that requires a wider overview of the theory of payments and your e-commerce platform's approach to them.

This document will guide you through the process of creating integration and explain the concepts behind Vue Storefront.

## Learn theory

The first step is to learn the theory behind payments.

### What's PCI Compilance?
The Payment Card Industry Data Security Standard (PCI DSS) is a set of requirements intended to ensure that all companies that process, store, or transmit credit card information maintain a secure environment. It was launched on September 7, 2006, to manage PCI security standards and improve account security throughout the transaction process. An independent body created by Visa, MasterCard, American Express, Discover, and JCB, the PCI Security Standards Council (PCI SSC) administers and manages the PCI DSS. Interestingly, the payment brands and acquirers are responsible for enforcing compliance, rather than the PCI SSC. (COPIED) Do we have to fulfill PCI DSS for each integration? Mostly payment service providers handle it for us and we use their API and components to integrate!

### What's Payment Service Provider (PSP)?
It is a third-party company that assists businesses to accept a wide range of online payment methods, such as online banking, credit cards, debit cards, e-wallets, cash cards, and more. (COPIED) Examples of PSPs are Adyen, Checkout.com, MultiSafepay. PSPs fulfill PCI DSS criteria.

### Credit card data
Mostly, you won't be able to touch Credit Card (or different payment method's) data. But if so, you cannot send it to VSF2 middleware or store in user's browser. The component provided by PSP should be able to comunicate with PSP's API and hash this data. Operating on hashed data it's totally fine.

### Saving cards (recurring payments)
PSPs like Adyen allows to store user credit card for next payments. They are storing it inside own Database. All we have to do is, create unique user identifier and make sure no one can use other's user identifier. So for example - send customer's token to VSF2 Middleware - inside endpoint fetch User ID based on provide token and use it for reference in the PSP. NEVER send user ID directly from the frontend because it is so easy to put there a different ID.

### Can anyone pay via my card by knowing it's details?
In European Economic Area, each bank has to perform [Strong Customer Authentication](https://en.wikipedia.org/wiki/Strong_customer_authentication) - it means it has to perform 3DS1 or 3DS2 check - which might require to provide SMS Code from our bank, accept it in the bank or something like that. That's why you always have to make sure you are supporting both 3DS1 and 3DS2 Auth when creating a PSP integration. It's not that obvious in the sandbox mode. But it's essential to make it work correclty.

### What's the difference between Authorization and Capture?
Authorization means that money for transaction is reserved on user's account and waiting for capture - mostly capture will happen after some time or manually. Capture means that money has been transferred from user's account to the merchant.

### Universal PSP integration for every eCommerce
Don't try to create an universal PSP integration with every eCommerce at once. It's rather impossible.

## Analyze
After getting theoretical foundations, it's time to analyze.

### Check for already existing solution
Check if there is a already existing headless-ready integration with your eCommerce and PSP. If you found one, be careful with estimations. Headless-ready is very popular term nowadays. Developers tend to publish not well-tested integrations. You might encounter integrations marked as headless-ready but without key functionalities like 3DS1/3DS2 support or not fully working through API.

If everything is fine, in most cases, you will have to create VSF2 middleware integration to access new eCommerce endpoints. Most integrations don't support accessing directly from the frontend. This is the perfect situation when work to do is lesser.

Examples of already existing eCommerce and PSP integrations:
- [commercetools and Adyen](https://github.com/commercetools/commercetools-adyen-integration),
- [Magento2 and Adyen](https://github.com/adyen/adyen-magento2).

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


### Support Payment's status update via webhook
Creating a payment and an order is not all. PSP will send asynchronous notifications about modifications of payment status. You should prepare an endpoint to receive them and update status of payment and order based on the information.

You can use `ngrok` or `localtunnel` to test them locally.

### Authorize when you are placing an order or after

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

## Integrating PSP with certain eCommerce

### commercetools
Create `Payment` object. Keep it up-to-date. Add payment to the cart. Create an order. Update payment status (and transactions), and order status based on Webhook calls (you need to create an endpoint for that - and we recommend using VSF2's integrations - middleware.config.js). This is a good reference of desired flow in PSP & commercetools integration: https://github.com/commercetools/commercetools-adyen-integration/blob/master/extension/docs/WebComponentsIntegrationGuide.md

### Magento2
You need a PHP plugin for an integration that is Headless-ready. So it shares API/GQL endpoints. Then you have to communicate with the plugin from VSF2 frontend or middleware. 

### BigCommerce
Checkout is the iframe so it is all on BigCommerce(?).

# Integration checklist
My integration:
- [ ] handles modifying total price in the second tab/during payment
- [ ] updates Payment&Transaction status from webhook calls, so it shares some endpoint
- [ ] webhook authorizes request siganture if available
- [ ] remember PSP will queue failed request from webhook
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
