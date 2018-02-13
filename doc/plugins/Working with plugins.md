# Working with plugins

Plugins usually add global-level functionality to Vue. In Vue Storefront there are two types of plugins.

## Core plugins

Core plugins are located in `src/plugins` folder. There are two core plugins:

* Config - it allows global access to config file (available via `$this.$config`),
* Event Bus - it allows global event bus for the project (available via `$this.$bus`).

## Theme plugins

Theme plugins should be located in `src/themes/{theme_name}/plugins`. To add new plugin you have to keep the same structure as in core plugins.




