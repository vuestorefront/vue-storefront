# Project structure

## Using git for custom development

One of the options is to do kind of a fork - or just to get the whole repo to your Git service. Then if you like to do some VS updates, you will probably need to just pull the changes from our origins. Another option will be available as soon as we manage to separate the core as a npm module

## Structure details

Below you can find the Vue Storefront project structure with explanations and corresponding docs. This is a good place to start with the project.

- `config` - Config files for vue storefront. They're used to define backend addresses, current theme etc.
  - `default.json` - Default config template which should never be changed. If you want to make some changes in config create `local.json` file in the same folder, copy the content and make changes here. Default `config.json` will be overwritten by `local.json` for your setup.
  - `local.json` (optional) - your custom Vue Storefront config. You can find a detailed description of all config file properties in the [Vue Storefront configuration chapter](configuration.md).
- `docs` - Project documentation
- `core` - Vue Storefront core
  :::warning
  Don't modify `core` directory on your project if you want to receive core updates
  :::

  - `assets` - Global assets used in project like logo, app icons, placeholders and `manifest.json`, eventually will be removed and moved to themes. You can place your theme-specific assets in `{themeroot}/assets`
  - `build` - It contains `config.json` generated from files in `/config` folder and webpack build. It's made from vue-cli webpack template. You can extend core webpack build in `{themeroot}/webpack.config.js` (related: [Working with Webpack](../core-themes/webpack.md)).
  - `components` Vue Storefront core components (related: [Working with core components](../core-themes/core-components.md))
  - `filters` - Global Vue filters for the project. You can add your own filters in `{themeroot}/filters`
  - `helpers` - Global methods for the project.
  - `lib` - Core libraries allowing functionalities like theme support, extensions or filters
  - `mixins` - Global mixins for the project. You can add your own mixins in `{themeroot}/mixins`
  - `models` - Data models for things like orders or notifications, eventually will be moved to documentation
  - `pages` - Vue Storefront core pages (related: [Working with core components](../core-themes/core-components.md))
  - `plugins` - Core plugins (related: [Working with plugins](../core-themes/plugins.md))
  - `resource` - Data mocks used to develop new features
  - `router` - Core Vue Router setup. The definition of routes happens in `{themeroot}/index.js`
  - `scripts` - Core scripts like app installer, extension installer etc.
  - `service-worker` - Core service worker. It's merged with `sw-precache` data from `build` and `{theme}/service-worker-ext.js`
  - `store` - Core Vuex stores (related: [Working with Vuex](../vuex/introduction.md), [Working with data](../core-themes/data.md))

- `src` - Main project folder containing Vue Storefront core and themes. This is your app playground so you can modify this folder.
  - `extensions` - Custom extensions made for Vue Storefront like integration with MailChimp or support for Google Analytics) (see: [Working with extensions](../core-themes/extensions.md))
  - `themes` - Vue Storefront core themes. You can change the active theme in `config/` folder. (see: [Working with themes](../core-themes/themes.md)).
