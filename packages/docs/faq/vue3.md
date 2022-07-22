# FAQ: Does Vue Storefront use Vue 3/Nuxt 3?

No, at this moment, Vue Storefront runs on Nuxt 2 and Vue 2. We will upgrade our ecosystem to Nuxt 3 (which runs on Vue 3) when:

- Nuxt 3 is stable and has a proven record of big websites successfully using it in production,
- the ecosystem catches up — including the most popular official and unofficial plugins and modules.

## Rationale

We made this decision because there are already several big projects using Vue Storefront 2 in production, and upgrading them to an unstable framework with a still immature ecosystem would be risky, if not impossible. We prefer to wait and provide an excellent development experience than work around the bugs.

## Composition API

Don't worry if you only have experience with Vue 3 or want to use Composition API. From the very beginning, we are using Composition API thanks to the [@vue/composition-api](https://github.com/vuejs/composition-api) plugin (and soon, the native support added in [Vue 2.7](https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01)). It offers great features and will make upgrading to Nuxt 3 easier.

## Is there a way around this?

The short answer is "Yes".

Although we **highly** recommend using Nuxt 2, which powers the projects generated when following our [Installation](/getting-started/installation.html) guide, it's possible to use the [Server Middleware](/architecture/server-middleware.html) — which handles communication with platforms — without it. This allows you to use the backend part of our application with any frameworks, even those not using Vue. However, if you go this route, we might not be able to support you if you face any issues.

See the [Separating Server Middleware from Nuxt.js](/architecture/server-middleware.html#separating-server-middleware-from-nuxt-js) guide for more details.
