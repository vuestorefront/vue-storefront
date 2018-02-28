# Working with mixins

Mixins are a flexible way to distribute reusable functionalities for Vue components. In Vue Storefront there are two types of mixins.


## Core mixins

Core mixins are located in `core/mixins` folder. There is one core mixin:

* thumbnail - it allows global method `getThumbnail` which return thumbnail url for specific base url.

To add new core mixin you have to create new file `core/mixins/{mixin-name}/index.js` and write there mixin code. If you want to register it just add it to `core/mixins/index.js`.

## Theme mixins

Theme mixins should be located in `src/themes/{theme_name}/mixins`. To add new theme mixin you have to create new file `mixins/{mixin-name}/index.js` in theme scope and write there mixin code. If you want to register it just add it to `mixins/index.js` in theme scope as well.
