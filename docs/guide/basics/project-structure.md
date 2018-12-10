# Project structure

## Using git for custom development

One of the options is to do kind of a fork - or just to get the whole repo to your Git service. Then if you like to do some VS updates, you will probably need to just pull the changes from our origins. Another option will be available as soon as we manage to separate the core as a npm module

## Structure details

Below you can find the Vue Storefront project structure with explanations and corresponding docs. This is a good place to start with the project.

- `config` - Config files for vue storefront. They're used to define backend addresses, current theme etc.
  - `default.json` - Default config template which should never be changed. If you want to make some changes in config create `local.json` file in the same folder, copy the content and make changes here. Default `config.json` will be overwritten by `local.json` for your setup.
  - `local.json` (optional) - your custom Vue Storefront config. You can find a detailed description of all config file properties in the [Vue Storefront configuration chapter](configuration.md).
- `core` - Vue Storefront core
  :::warning
  Don't modify `core` directory on your project if you want to receive core updates
  :::


  - `build` - It contains `config.json` generated from files in `/config` folder and webpack build. It's made from vue-cli webpack template. You can extend core webpack build in `{themeroot}/webpack.config.js` (related: [Working with Webpack](../core-themes/webpack.md)).
  - `compatibility` - API port for old components after 1.6 release. Don't use it in new projects
  - `filters` - Core Vue filters
  - `helpers` - Global helpers 
  - `lib` - Core libraries allowing functionalities like theme support, modules etc
  - `mixins` - Core Vue mixins 
  - `modules` - core VSModules. Read more about modules [here](https://divanteltd.github.io/vue-storefront/guide/modules/introduction.html)
  - `pages` - Vue Storefront core pages 
  - `plugins` - Core Vue plugins 
  - `scripts` - scripts like installer
  - `service-worker` - Core service worker. It's merged with `sw-precache` data from `build` and `{theme}/service-worker-ext.js`
  - `store` - Core Vuex stores (related: [Working with Vuex](../vuex/introduction.md), [Working with data](../core-themes/data.md)). **This part is depreciated and will be slowly migrated to modules and lib folder**

- `src` - Main project folder containing Vue Storefront core and themes. This is your app playground so you can modify this folder.
  - `modules` - project-specific VSModules and extensions
  - `themes` - Vue Storefront core theme along with amp-theme. You can change the active theme in `config/` folder.
  - `server` - additional Express routes that you can add to the folder
 
