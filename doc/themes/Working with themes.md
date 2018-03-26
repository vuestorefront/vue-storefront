# Themes in Vue Storefront

Vue Storefront allows you to quickly develop your own themes and use our core business logic. All ecommerce features are implemented in core so you can easily develop fully working online shop only by writing HTML and CSS and inheriting the business logic from the core. Of course, you can easily modify and extend the core logic in your theme.

You can read more about Vue Storefront core components and how to make use of them [here](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md)

All themes are located in `src/themes` folder and you can think about them as a separate vue.js applications that are using Vue Storefront core for out-of-the-box features.

## Switching themes

To use any of the themes located in `src/themes` just change the `theme` property in your config file to folder name of the theme that you want to use. The config files are located in `config` folder. You shouldn't make changes in `config/default.json`. Instead just copy the `default.json` file to the same folder, name it `local.json` and make changes here.

## Creating your own themes

To create your own theme just copy the `theme-starter` folder (it contains all files needed for new theme) located in `src/themes` and change it's name to your new theme's name. Now you can start development of your own theme for Vue Storefront!

Only official themes tested and accepted by the community should be in a `master` branch. Please develop your own themes on separate branches and keep them updated wih `master` to be sure it works with the newest core.

## Important theme files

Each theme is a separate Vue.js application with it's own dependencys which can make use of the core and even modify it.
Below you can find list of files that are essential for your theme to work:

* `filters` - theme-specific filters (extends `core/filters`)
  * `index.js` - here you can register your theme-specific filters
* `mixins` - theme-specific mixins (extends `core/mixins`
  * `index.js` - here you can register your theme-specific mixins
* `pages` - your shop pages
* `plugins` - theme-specific plugins (extends `core/plugins`, see [Working with plugins](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20plugins.md)
* `resoource` - theme-specific resources (extends `core/resorce`)
* `app-extend.js` - The code inside this file will be executed in app's entry file just after registering core plugins, filters and mixins. It takes app's Vue instance as a param so you can make use of it. (extends `core/app.js`)
* `App.vue` - theme's entry component
* `index.js` - theme's routes
* `package.json` - theme-specific dependencys
* `service-worker-ext.js` - you can extend core service worker here (see [Working with Service Workers](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20service-worker.md)
* `webpack.config.js` - you can extend core webpack build in this file (extends `core/build/`, see [Working with webpack](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md))

## Official Vue Storefront themes included with the template:

   - `default` - Default VS theme always with newest features. The easiest way to adopt VS in your shop is taking this one and modifying it to your needs (check [gogetgold.com](https://www.gogetgold.com/) as an example)
   - `theme-starter` - boilerplate for developing VS themes. If you want to create new theme copy and rename this folder.
   - `catalog` - VS catalog theme - currently in alpha

# Related

* [Working with components](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md)
* [Creating themes in Vue Storefront — backend-agnostic eCommerce PWA frontend (part 1 — understanding Vue Storefront core)](https://medium.com/@frakowski/developing-themes-in-vue-storefront-backend-agnostic-ecommerce-pwa-frontend-part-1-72ea3c939593)
