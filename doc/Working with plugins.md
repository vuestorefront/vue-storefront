# Working with plugins
## Introduction
In Vue Storefront there are two types of plugins:
* <b>Core plugins</b> - placed in `core/plugins` available for any theme and extension. You shouldn't modify this plugins as they are part of upgradable core.
* <b>Theme plugins</b> - placed in `src/{theme}/plugins` available only for specific theme

Each of this plugins works and is registered like a normal Vue.js plugin. You can read about them [here](https://vuejs.org/v2/guide/plugins.html)
## Core plugins

Core plugins are exported in `core/plugins/index.js` file as JavaScript objects 
````js
export {
  EventBusPlugin,
  ConfigPlugin
}
````
and then registered in 'core/app.js
````js
Object.keys(pluginsObject).forEach(function (key) {
  Vue.use(pluginsObject[key])
})
````

Currently there are two core plugins:
* <b>config</b> This plugin is esponsible for easy access to your storefront config. It can be accessed via 'this.$config' alias
* <b>event-bus</b> - Global Event Bus that can be used in any place of the application via 'this.$bus' alias. It also provides some functionalities for intercepting and modifying core events.

## Theme plugins

Theme plugins works exactly like core plugins and are merged with them during webpack build process. 

If you want to add new 3rd party plugin (e.g Vuetify) you need to export it in `src/{theme}/plugins/index.js` so it will be proceeded with `Vue.use()` in `core/app.js` file. Here is an example of `index.js` file with Vuetify registration:

````js
import Vuetify from 'vuetify'

export {
  Vuetify
}
 ````
 
 If you want to make custom plugin for your theme create a directory for it in 'src/{theme}/plugins' (eg. `src/{theme}/plugins/custom_plugin`) and import it in `src/{theme}/plugins/index.js` like a 3rd party plugin in example above.
