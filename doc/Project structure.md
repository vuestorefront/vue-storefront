# Project structure

Below you can find the Vue Storefront project structure. We are using [vue-cli](https://github.com/vuejs/vue-cli) with [webpack template](https://github.com/vuejs-templates/webpack) as out base.

* `build/` -  It contains `config.json` generated from files in `/config` folder and webpack build,. Its made from vue-cli webpack tempate ([see docs](http://vuejs-templates.github.io/webpack/structure.html)).
* `config/` - Config files for vue storefront. They're used to define backend addreses, current theme etc.
  * `default.json` - Default config tempalte which should never be changed. If you want to make some changes in config create `local.json` file in the same folder, copy the content and make changes here. Default `config.json` will be overwritten by `local.json` for your setup.
* `doc` - Project documentation
* `core` - Vue Storefront core (don't update on your project if you want to receive core updates) - now we are moving most from `src` to `core`
  * `api`
  * `components` Vue Storefront core components (see: [Working with core components](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md))
  * `filters` - Global Vue filters for the project
  * `helpers` - Global methods for the project
  * `resource` - Data mocks used to develop new features
  * `router` - Core Vue Router instance - just basic setup
  * `store` - Core Vuex stores (see: [Working with data](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md))
* `src` - Main project folder containing Vue Storefront core and themes. Now we are moving core to `/core` dir.
  * `assets` - Global assets used in project like logo, app icons, placeholders and manifest.json
  * `plugins` - Core plugins (see: [Working with plugins](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20plugins.md))
  * `extensions` - Custom extensions made for Vue Storefront like integration with MailChimp or support for Google Analytics) (docs under construction)
  * `lib` - Core libraries allowing functionalities like theme support, extensions or filters (this one will be moved to other place soon)
  * `mixins` - Global mixins for the project
  * `models` - Data models for things like orders or notifications, eventually will be moved to documentation
  * `pages` - Vue Storefront core pages (see: [Working with core components](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md))
  * `themes` - Vue Storefront core themes. You can change the active theme in `config/` folder. (see: [Working with themes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/Working%20with%20themes.md))
