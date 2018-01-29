# Themes in Vue Storefront

Vue Storefront allows you to quickly develop your own themes and use our core business logic. All ecommerce features are implemented in core so you can easly develop fully working online shop only by writing HTML and CSS and inheriting the business logic from core. Of course you can easly modify and extend the core logic in your theme.

You can read more about Vue Storefront core components and how to make use of them [here](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md)

All themes are located in `src/themes` folder.

## Switching themes

To use any of the themes located in `src/themes` just change the `theme` property in your config file to folder name of the theme that you want to use. The config files are located in `config` folder. You shouldn't make changes in `config/default.json`. Instead just copy the `default.json` file to the same folder, name it `local.json` and make changes here.

## Creating your own themes

To create your own theme just copy the `theme-starter` folder (it contains all files needed for new theme) located in `src/themes` and change it's name to your new theme's name. Now you can start development of your own theme for Vue Storefront!

Only official themes tested and accepted by the community should be in a `master` branch. Please develop your own themes on separate branches and keep them updated wih `master` to be sure it works with the newest core.
