# Integrating eCommerce platform


::: warning Want to build an integration?
If you want to integrate any eCommerce platform with Vue Storefront please **contact the core team** first. We are eager to help you with building it and ensuring its high quality! Building the integration together with core team is the best way to keep its quality high and make it officially recommended once its done.
:::

Integrating any eCommerce platform with Vue Storefront is a relatively simple process. The only requirement that the eCommerce platform needs to fulfill to be integrated is having a fully functional REST/GraphQL API.

This documentation will guide you through integrating your eCommerce platform with Vue Storefront.

During the process you will make use of two tools:

- **Core** - business logic that is shared between every Vue Storefront integration. It contains utilities and factories for composabless that are ensuring common high-level APIs for each platform.
- **Boilerplate** - boilerplate code of working integration that has hardcoded sample data. It uses core APIs under the hood.

Integration requires three pieces to work:

- **API Client** - a data layer of your application, not used directly in the UI.
- **Composition API functions (aka Composables)** - functions using [Vue Composition API](https://vue-composition-api-rfc.netlify.com/). This is the actual business logic of the integration. It's a mixed logic of core APIs with platform-specific code.
- **Theme** - This is basically a platform-specific part of yout theme that is using agnostic default theme under the hood.
One of the most important requirements for any Vue Storefront integration is to work with a common default theme. This is our way of ensuring that the quality of UI layer, as well as developer experience, remains the same for every integration. Another reason why we are keeping a single theme is that it's much easier to maintain it and keep high quality. You can read more about the default theme [here](/contributing/themes.html). You shouldn't put there anything except plugins and modifications of `nuxt.config.js`

We recommend starting the integration with the API Client. Once you have the required methods and types to interact with eCommerce logic you will have all the tools needed to start building Composition Functions.

:::warning Don't assume someone is using Nuxt!

API Client and Composition API functions should work out of the box in any Vue.js environment (like Vue CLI), you should **never** require Nuxt for them to work
:::

## Scope

Vue Storefront will require **at least** the following features from your eCommerce platform:

**Product**

- fetch single/multiple products based on uuid/sku/catId/query
- fetch product variants

**Category**

- fetch single category
- fetch category tree

**Cart**

- create cart
- add to cart
- remove from cart
- change quantity of item in the cart
- change configuration of item in the cart
- clear cart
- add promo coupon
- remove promo coupon

**User**

- log in
- log out
- register
- forgot password
- add/remove shipping address
- set default shipping address
- add/remove billing address
- set default billing address
- see past orders

**Wishlist**

- add/remove product
- associate with logged in user

**Checkout**

- get shipping methods
- get payment methods
- place order

**i18n**

- change currency
- change locale
- change language

**Additional features (optional)**
- facet filtering
- order notifications

