# Working with plugins

Plugins usually add global-level functionality to Vue. In Vue Storefront there are two types of plugins.


## Core plugins

Core plugins are located in `core/plugins` folder. There are two core plugins:

* Config - it allows global access to config file (available via `$this.$config`),
* Event Bus - it allows global event bus for the project (available via `$this.$bus`).

To add new core plugin you have to create new file `core/plugins/{plugin-name}/index.js` and write there plugin code. If you want to register it just add it to `core/plugins/index.js`.

## Theme plugins

Theme plugins should be located in `src/themes/{theme_name}/plugins`. To add new theme plugin you have to create new file `plugins/{plugin-name}/index.js` in theme scope and write there plugin code. If you want to register it just add it to `plugins/index.js` in theme scope as well.

