# Project structure

## Using git for custom development

One of the options is to do kind of fork - or just to get the whole repo to your Git service. Then if you like to do some VS updates you probably need to just pull the changes from our origins. Another option will be available as soon as we manage to separate the core as a npm module

## Structure details

Below you can find the Vue Storefront project structure with explainations and corresponding docs. This is a good place to start with the project.

* `config/` - Config files for vue storefront. They're used to define backend addreses, current theme etc.
  * `default.json` - Default config tempalte which should never be changed. If you want to make some changes in config create `local.json` file in the same folder, copy the content and make changes here. Default `config.json` will be overwritten by `local.json` for your setup.
  * `local.json` (optional) - your custom Vue Storefront config
* `doc` - Project documentation
* `core` - Vue Storefront core <b>(don't modify this directory on your project if you want to receive core updates)</b>
  * `assets` - Global assets used in project like logo, app icons, placeholders and manifest.json, eventually will be removed and moved to themes. You can place your theme-specific assets in `{themeroot}/assets`
  * `build/` -  It contains `config.json` generated from files in `/config` folder and webpack build,. Its made from vue-cli webpack tempate. You can extend core webpack build in '{themeroot}/webpack.config.js' (related: [Working with Webpack](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md)).
  * `components` Vue Storefront core components (related: [Working with core components](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md))
  * `filters` - Global Vue filters for the project. You can add your own filters in `{themeroot}/filters`
  * `helpers` - Global methods for the project.
  * `lib` - Core libraries allowing functionalities like theme support, extensions or filters
  * `mixins` - Global mixins for the project. You can add your own mixins in `{themeroot}/mixins`
  * `models` - Data models for things like orders or notifications, eventually will be moved to documentation
  * `pages` - Vue Storefront core pages (related: [Working with core components](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md))
  * `plugins` - Core plugins (related: [Working with plugins](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20plugins.md))
  * `resource` - Data mocks used to develop new features
  * `router` - Core Vue Router setup. The definition of routes happens in `{themeroot}/index.js`
  * `scripts` - Core scripts like app installer, extension installer etc.
  * `store` - Core Vuex stores (related: [Working with Vuex](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/data/Working%20with%20Vuex.md), [Working with data](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md))
* `src` - Main project folder containing Vue Storefront core and themes. This is your app playground so you can modify this folder.
  * `extensions` - Custom extensions made for Vue Storefront like integration with MailChimp or support for Google Analytics) (see: [Working with extensions](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/extensions/Working%20with%20extensions.md))
  * `themes` - Vue Storefront core themes. You can change the active theme in `config/` folder. (see: [Working with themes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/Working%20with%20themes.md)).

