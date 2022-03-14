# Payment
Each eCommerce has a different approach to solve payments issue.

## Learn theory
- PSP - Payment Service Provider
- You can't process card data if you are not PCI Compilant. And you are probably not - so you should shift liability to the PSP and send only hased data through VSF2 Middleware. Not hashed data can be only sent to the PSP directly from the component provided by PSP.
- The purpose of PSP is to provide easy way of processing payments. They are PCI Compilant so we shift liability on them and then we benefit from payments in our online shop.
- Make sure you are not sending plain cart data over the VSF2 Middleware! It would break the law and bring huge financial penalties
- Saving cards (recurring payments) - PSPs like Adyen allows to store user credit card for next payments. They are storing it on own Database. All we have to do is, create unique user identifier and make sure no one can use other's user identifier. So for example - send customer's token to VSF2 Middleware - inside endpoint fetch User ID based on provide token and use it for reference in the PSP. NEVER send user ID directly from the frontend because it is so easy to put there a different ID.
- Can someone pay with my card just by having it's details? In EEA, each bank has to perform Strong Customer Authentication - it means it has to perform some 3DS1 or 3DS2 check - which might require to provide SMS Code from our bank, accept it in the bank or something like that. That's why you always have to make sure you are supporting both 3DS1 and 3DS2 Auth when creating PSP integration. It's not that obvious in the sandbox mode. But it's essential for make it work efficiently.
- Authorization vs Capture: authorization means that money for transaction is reserved on user's account and waiting for capture - mostly capture will happen after some time or manually. Capture means that money has been transferred from user's account to the merchant.
- Don't try to create universal PSP integration with every eCommerce at once. It's rather impossible.

## Analyze
### Learn how your eCommerce approaches payments 

### Find the best way for integration with your Payment Service Provider

## Edge cases
### Check for Second tab total price modifiaction during each step (and coupon code too! just any way!)

### Support Payment's status update via webhook

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
