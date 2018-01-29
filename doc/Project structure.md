# Project structure

Below you can find the Vue Storefront project structure. We are using [vue-cli](https://github.com/vuejs/vue-cli) with [webpack template](https://github.com/vuejs-templates/webpack) as out base.

* `build/` -  It contains `config.json` generated from files in `/config` folder and webpack build,. Its made from vue-cli webpack tempate ([see docs](http://vuejs-templates.github.io/webpack/structure.html)).
* `config/` - Config files for vue storefront. They're used to define backend addreses, current theme etc.
  * `default.json` - Default config tempalte which should never be changed. If you want to make some changes in config create `local.json` file in the same folder, copy the content and make changes here. Default `config.json` will be overwritten by `local.json` for your setup.
* `doc` - Project documentation
* `src` - Main project folder containing Vue Storefront core and themes.
  * `api`
  * `assets` - Assets used in project like images, svg's etc. (in the near future assets will be theme-specific)
  * `components` Vue Storefront core components (see: [Working with core components](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md))
  * `config` - Config plugin allowing easier access to config file (will be moved in the near future)
  * `event-bus` - Global event bus for the project (available via `$this.$bus` - docs under construction)
  * `extensions` - Custom extensions made for Vue Storefront like integration with MailChimp or support for Google Alalytics) (docs under construction)
  * `lib` - Core libraries allowing functionalities like theme support, extensions or filters (this one will be moved to other place soon)
  * `models` - Data models for things like orders or notifications, eventually will be moved to documentation
  * `pages` - Vue Storefront core pages (see: [Working with core components](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md))
  * `resource` - Data mocks used to develop new features
  * `router` - Core Vue Router instance - just basic setup
  * `store` - Core Vuex stores (see: [Working with data](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md))
  * `themes` - Vue Storefront core themes. You can change the active theme in `config/` folder. (see: [Working with themes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/Working%20with%20themes.md))
