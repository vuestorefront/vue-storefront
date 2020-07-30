# Themes in Vue Storefront

:::tip REMINDER
This guide is based on `default` theme before `1.12` version release. General idea and structure addressed here were created based on the pre-`1.12` `default` theme. 
:::


Vue Storefront allows you to quickly develop your own themes and use our core business logic. All e-commerce features are implemented in core, so you can easily develop fully working online shop only by writing HTML and CSS and inheriting the business logic from the core. Of course, you can easily modify and extend the core logic in your theme.

You can read more about Vue Storefront core components and how to make use of them [here](core-components.md)

All themes are located in `src/themes` folder and you can think about them as separate Vue.js applications that are using Vue Storefront core for out-of-the-box features.

## Switching themes

To use any of the themes located in `src/themes`, just change the `theme` property in your config file to `name` property from package.json file sitting in your theme's root dir. Config files are located in the `config` folder. You shouldn't make changes in `config/default.json`. Instead just copy the `default.json` file to the same folder, name it `local.json` and make changes there.

## Creating your own themes

To create your own Vue Storefront theme, you can copy and modify the default theme which is fully-styled and ready to work out of the box (it's the one that you can find on our demo).

To do so:

1. Copy the `default` folder located in `src/themes` and change its name to your new theme's name.
2. Change the `name` property in your theme's `package.json` file.
3. Insert this name in the `theme` property of your config file in `config/local.json`.
4. Run `yarn install` so _lerna_ can detect a new theme.
5. Start developing your own theme for Vue Storefront!

Only official themes tested and accepted by the community should be in a `master` branch. Please develop your own themes on separate branches and keep them updated with `master` to be sure it works with the newest core.

## Important theme files

Each theme is a separate Vue.js application with its own dependencies, which can make use of the core or even modify it.
Below you can find the list of files that are essential for your theme to work:

- `assets` - theme-specific assets
- `components` - theme-specific components
- `css` - theme-specific css files
- `helpers` - helper methods
- `layouts` - layout files
- `mixins` - theme-specific mixins (extends `core/mixins`)
  - `index.js` - here you can register your theme-specific mixins
- `pages` - your shop pages
- `resource` - theme-specific resources (extends `core/resource`)
- `router` - theme router
- `store` - theme-specific stores (extends `core/store`)
  - `ui-store.js` - here you can extend core `ui-store`
  - `index.js` - here you can register theme-specific stores
- `App.vue` - theme's entry component
- `index.js` - theme initialization
- `package.json` - theme-specific dependencies
- `service-worker`
  - `index.js` you can extend core service worker here (see [Working with Service Workers](service-workers.md)
- `webpack.config.js` - you can extend core webpack build in this file (extends `core/build/`, see [Working with webpack](webpack.md))

## Official Vue Storefront themes:

- [Capybara](https://github.com/DivanteLtd/vsf-capybara) - Capybara is a Storefront UI based theme for Vue Storefront.
- [Default](https://github.com/DivanteLtd/vsf-default) - Default VS theme always with the newest features. The easiest way to adopt VS in your shop is taking this one and modifying it to your needs (check [gogetgold.com](https://www.gogetgold.com/) as an example)

## Related

- [Working with components](core-components.md)
- [Creating themes in Vue Storefront — backend-agnostic eCommerce PWA frontend (part 1  - understanding Vue Storefront core)](https://medium.com/@frakowski/developing-themes-in-vue-storefront-backend-agnostic-ecommerce-pwa-frontend-part-1-72ea3c939593)
