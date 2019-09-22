# Security notes

This document is very Work in Progress. Please feel free to contribute additional information on Vue Storefront security.

Vue Storefront Security rules:

- Vue Storefront is not processing / storing any sensitive information (no user account data, no payment's data). All this information just gets from the Magento/or another 3rd party backend thru API,
- We're using JWT tokens for authorization, the tokens are stored in the `localStorage` and passed via `GET` parameter to `vue-storefront-api` and then decoded + authorized on the API layer,
- We're not using classical session PLUS not using any cookies,
- All communication is over SSL and it's our very basic assumption (VS doesn't work over plain HTTP - with the distinction for localhost development mode),
- We're using Vue.js - so all information from a database are automatically escaped to prevent the XSS attacks, however as we're not using the cookies any CSRF / XSS is probably low-risk.