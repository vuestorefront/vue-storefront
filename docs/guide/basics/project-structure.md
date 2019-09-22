# Project structure

## Using git for custom development

One option is to do kind of a fork, or just get the whole repo to your git service. Then, if you want to do some VS updates, you will probably need to pull the changes from our origins. Another option will be available as soon as we manage to separate the core as an npm module.

## Structure details

Below, you can find the Vue Storefront project structure with explanations and corresponding docs. This is a good place to start with the project.

- `config` -  Config files for Vue Storefront. They're used to define backend addresses, current theme, etc.
  - `default.json` - Default config template which should never be changed. If you want to make some changes in config, create a `local.json` file in the same folder, copy the content and make changes there. The default `config.json` will be overwritten by `local.json` for your setup.
  - `local.json` (optional) - Our custom Vue Storefront config. You can find a detailed description of all config file properties in the [Vue Storefront configuration chapter](configuration.md).
- `core` - Vue Storefront core
  :::warning Caution !
  
  Don't modify the `core` directory on your project if you want to receive core updates.
  :::
  - `build` - It contains `config.json` generated from files in `/config` folder and webpack build. It's made from vue-cli webpack template. You can extend the core webpack build in `{themeroot}/webpack.config.js` (related: [Working with Webpack](../core-themes/webpack.md)).
  - `compatibility` - API port for old components after the 1.6 release. Don't use it in new projects.
  - `filters` - Core Vue filters
  - `helpers` - Global helpers
  - `lib` - Core libraries allowing functionalities like theme support, modules, etc.
  - `mixins` - Core Vue mixins
  - `i18n` - Internationalization plugin
  - `modules` - core VSModules. Read more about modules [here](https://divanteltd.github.io/vue-storefront/guide/modules/introduction.html)
  - `pages` - Vue Storefront core pages
  - `scripts` - scripts like installer
  - `service-worker` - Core Service Worker. It's merged with `sw-precache` data from `build` and `{theme}/service-worker-ext.js`
  - `store` - Core Vuex stores (related: [Working with Vuex](../vuex/introduction.md), [Working with data](../data/data.md)). **This part is deprecated and will be slowly migrated to modules and lib folder**
  - `types` - Core TypeScript typings

- `src` -  Main project folder containing Vue Storefront core and themes. This is your app playground so you can modify this folder.
  - `modules` - project-specific VSModules and extensions
  - `themes` - Vue Storefront core theme along with amp-theme. You can change the active theme in `config/` folder.
  - `server` - Additional Express routes

