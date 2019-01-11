# Working with plugins

In Vue Storefront there are two types of plugins:

- **Core plugins** - placed in `core/plugins` and available for any theme and extension. You shouldn't modify these plugins as they are part of upgradable core.
- **Theme plugins** - placed in `src/{theme}/plugins` and available only for specific theme

Each of these plugins works and is registered like a normal Vue.js plugin. You can read about them [here](https://vuejs.org/v2/guide/plugins.html)

## Core plugins

Core plugins are exported in `core/plugins/index.js` file as JavaScript objects

```js
export { EventBusPlugin };
```

and then registered in `core/app.js`

```js
Object.keys(pluginsObject).forEach(function(key) {
  Vue.use(pluginsObject[key]);
});
```

Currently there is only one (depreciated) core plugin:

- **event-bus** - Global Event Bus that can be used in any place of the application via `this.$bus` alias. It also provides some functionalities for intercepting and modifying core events.

## Theme plugins

It's a good practice to register theme plugins under `{theme}/plugins` folder.

```js
import Vuetify from 'vuetify';
// import other plugins

Vue.use(Vuetify);
// other plugins
```

