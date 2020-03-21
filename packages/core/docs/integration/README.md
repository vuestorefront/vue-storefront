# Integrating eCommerce platform 


::: warning Want to build an integration?
If you want to integrate any eCommerce platform with Vue Storefront please **contact the core team** first. We are eager to help you with building it and ensuring its high quality! Building the integration together with core team is the best way to keep its quality high and make it officialy recommended once its done.
:::

Integrating any eCommerce platform with Vue Storefront is a relatively simple process. The only requirement that the eCommerce platform needs to fulfill to be integrated is having a fully functional REST/GraphQL API.

This documentation will guide you through integrating your eCommerce platform with Vue Storefront. At the end of every document you will find a **To do** section that will describe you exactly what needs to be done for this part of the integration

During the process you will make use of two tools:

- **Core API packages** - shared business logic for every Vue Storefront integration. You can think about that as a __core__ of Vue Storefront. Those packages are `factories` and `utils`.
- **Boilerplate** - boilerplate code of working integration that has hardcoded example data. It uses core APIs under the hood.

Integration requires three pieces to work:

- **API Client** - a data layer of your application, not used directly in the UI. To learn more about API Client concept [watch a video](https://www.youtube.com/watch?v=vsibXtu4GAA&t=59s) about it on our YouTube channel.
- **Composition API functions (aka Composables)** - functions using [Vue Composition API](https://vue-composition-api-rfc.netlify.com/). This is the actuall business logic of the integration. It's a mixed logic of core APIs with platform-specific code. Vue Storefront is providing following composables: `useProduct`, `useCategory`,`useCart`,`useUser`,`useWishlist`,`useLocale` and `useCheckout`. Making an integration is all about providing those functions for your eCommerce platform.
- **Theme** - This is basically a platform-specific part of yout theme that is using agnostic default theme under the hood.
One of the most important requirements for any Vue Storefront integration is to work with common default theme. This is our way of ensuring that the quality of UI layer, as well as developer experience, remains the same for every integration. Another reason why we are keeping a single theme is that it's much easier to maintain it and keep high quality. You can read more about default theme [here](./contributing/themes.html). You shouldn't put there anything except plugins and modifications of `nuxt.config.js`

We recommend starting the integration with the API Client. Once you have the required methods and types to interact with eCommerce logic you will have all the tools needed to start building Composition Functions.

## To do

1. Copy `packages/boilerplate` folder and replace all `boilerplate` strings with the name of your platform (for example `commercetools` `about-you`). The strings can be found in imports and `package.json` of every package. 

::: tip Test with default theme
Default theme is working out of the box with mocked data from boilerplate so it's a perfect test environment for your integration. Be sure to test it every time you make some changes
:::

Once you copied and renamed the boilerplate run `yarn dev` in your `theme` folder to see if everything works.