# Payment
Each eCommerce has a different approach to solve payments issue.

## Analyze
### Learn how your eCommerce approaches payments 

### Find the best way for integration with your Payment Service Provider

## Edge cases
### Check for Second tab total price modifiaction during each step (and coupon code too! just any way!)

### Support Payment's status update via webhook

### Authorize when you are placing an order or after

### Gain knowledge about payment handling in your eCommerce
You need to know what approach selected eCommerce is using:
- Commercetools requires to write some server-side code and operator on it's Payment object
- Magento2 requires to write PHP plugin and communicate with it from VSF2
- BigCommerce uses checkout in iframe so probably plugin would do the job

- Check documentation of the payment service provider you want to integrate.
- You don't want only to put components in the frontend
- You also need 


## Integrating PSP with certain eCommerce

### commercetools
Create `Payment` object. Keep it up-to-date. Add payment to the cart. Create an order. Update payment status (and transactions), and order status based on Webhook calls (you need to create an endpoint for that - and we recommend using VSF2's integrations - middleware.config.js)

### Magento2
You need a PHP plugin for an integration that is Headless-ready. So it shares API/GQL endpoints. Then you have to communicate with the plugin from VSF2 frontend or middleware. 

# Integrator checklist
My integration:
- [ ] Handles modifying total price in the second tab/during payment
- [ ] Updates Payment&Transaction status from webhook calls, so it shares some endpoint
- [ ] Supports 3DS1 and 3DS2 if it contains Credit Cards because it's required in EEA

