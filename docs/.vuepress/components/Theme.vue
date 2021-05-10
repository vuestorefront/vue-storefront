<template>
  <div>
    <h1>Working with themes</h1>
    <p>
      For core development purposes we aim to have only one default theme.
      Thanks to that we have <b>much</b> less code to maintain, can apply changes faster and maintain same quality across every platform themes.
    </p>
    <Block type="warning" title="Note on core VS project themes">
      Core Development Theme and Project Themes are different things. Core development Theme is a <b>base</b> for a project (client) theme that is generated through CLI.
      CLI concatenates default theme from nuxt module with integration-specific files and outputs a regular Nuxt project conatining all of that files. For client projects there is no inheritance mechanism.
    </Block>
    <p>
      Because of that it's very important to <b>keep the agnostic APIs in default theme</b>. Clients can do whatever they want in their projects but we should keep agnosticity for maintanance purposes.
    </p>
    <p>Default theme is located in <code>core/theme-module</code> folder and recognized as <code>@vue-storefront/nuxt-theme</code> </p>
    <h2>Configuring default theme for your integration</h2>
    <p>
      To inherit from default theme in your integration theme you need to install internal <code>@vue-storefront/comemrcetools-composables</code> package.
    </p>
    <p>
      In <code>nuxt.config.js</code> of your integration theme set <code>apiClient/composables/helpers</code> options to be named as your integration packages.
      For example under <code>composables</code> you can put <code>@vue-storefront/comemrcetools-composables</code>.
      It will be used in lodash templates inside <code>@vue-storefront/nuxt-theme-module</code> as a replacement for variables (like here <code>import { useProduct, useCart } from '<%= options.composables %>'</code> - <code>options.composables</code> is a palceholder for value passed to <code>composables</code> option in <code>nuxt.config.js</code>)
    </p>
    <h2>Overriding default theme files</h2>
    <p>
      Try to keep all templates agnostic. Default theme shouldn't have platform-specific logic but sometimes it's unavoidable. In that cases you can override any of theme pages by putting file with the same dir in <code>app</code> folder of your theme integration.
      For example to override <code>theme/pages/Product.vue</code> from theme module you need to create <code>app/pages/Product.vue</code> in your app.
    </p>
  </div>
</template>
