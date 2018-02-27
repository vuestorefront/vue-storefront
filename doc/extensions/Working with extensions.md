
# Working with extensions

Vue Storefront Core provides basic eCommerce features. Everything else should be available via extensions.

## How to write your own extension in Vue Storefront
If you would like to extend your Vue Storefront instance with additional functionality you can certainly do that via adding your own extensions.  

All extenstions are located in /src/extensions folder, each in its own directory.  

In each extension folder there need to be an *index.js* file that serves as an entry point of your extension.  

*index.js* file needs to export a default function that receives 4 parameters - references to application instance, global router object, Vuex store and configuration file - like the following:
```
export default function (app, router, store, config) {
  ...
}
```
Inside of this function you can introduce your functionality and also extend application's routes and Vuex store by registering extension's own routes and store object, like the following:
```
  router.addRoutes(extensionRoutes)
  store.registerModule(EXTENSION_KEY, extensionStore)
```
, where  
`extensionRoutes` is a list of routes that can be defined in a separate file in your extension folder;  
`extensionStore` is an object that consists of Vuex store components - state, getters, actions and mutations;  
`EXTENSION_KEY` a string variable that defines a name of your extension's Vuex store enrty in a global Vuex store object.  

`config` parameter that a default function receives refers to a *local.json* file in root /config folder. You can define all your extension settings in that configuration file and access them through this parameter. 

Custom extensions usually do use Events for hooking in some additional actions. If you don't find event that's suitable for your action please don't hesitate to contribute a PR to the core adding this particular event.

The naming convention for the events is: `after-<module>-<action>` for example `after-product-saved`; ofcourse there can be `before-product-saved` event as well :)

If you want to provide some components for the themes please think of them as a mixins (you can add default HTML markup) so they can be styled and modified in themes.

## How to install the extension
The enabled extensions must be declared within `config/local.json` file. Please take a look at the [default config](https://github.com/DivanteLtd/vue-storefront/blob/master/config/default.json) for a reference.

You should just add your extension name to:

```json
    "registeredExtensions": ["custom_extension", "mailchimp-subscribe", "google-analytics"]
```

## Extensions list (docs for it under construction)
* Mailchimp Integration
* Google Analytics Integration
* [Droppoint shipping](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/extensions/droppoint-shipping.md)
* [Example of custom extension](https://github.com/DivanteLtd/vue-storefront/tree/master/src/extensions/custom_extension) - can be used as a boilerplate

# Related
* [Extending Vue Storefront API](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Extending%20vue-storefront-api.md)
