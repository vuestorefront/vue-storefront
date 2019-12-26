# Working with core components

## Vue Storefront component types

In Vue Storefront there are two types of components:

- In Vue Storefront there are two types of components:

- **Core components:** In core components, we implemented all basic business logic for an eCommerce shop, so you don't need to write it from scratch by yourself. You can make use of them in your themes, where all you need to do is styling and creating the HTML markup. Every core component provides an interface to interact with. This interface can be extended or overwritten in your theme if you need to. Core components should be injected to themes as mixins.They contain only business logic—HTML markup and styling should be done in themes. You can usually find core components inside the `components` folder of every module.

- **Theme components:** Theme components are what you really see in the app. They can inherit business logic from core components or be created as theme-specific components. All CSS, HTML, and ui-specific logic should be placed in theme.

## Working with core components

First, **override core components only when you're adding ui-agnostic features to the core.** The correct approach for using core components in your theme is thinking of them as an external API. You can inherit the functionalities and extend them in theme but never change it in core.

**When you're modifying the core component, never change the component's API** (data and methods exposed by the component for themes). Such changes would break the themes using this core component.

## Using core components in your theme

### For components

Inheritance by itself is done by [vue mixins](https://vuejs.org/v2/guide/mixins.html) with default merging strategy.

To inherit from core component:

1. **Create new component in your theme.**

2. **Import the core component that you want to inherit from:**

```js
import YourCoreComponent from '@vue-storefront/core/modules/{module_name}/YourCoreComponent';
```

3. **Add the core components mixin to your newly created theme component:**

```js
export default {
  ...
  mixins: [YourCoreComponent]
}
```

From now on, you can access and override all methods, data, and components from core component like it was declared in your own theme component.

### For pages

Inheritance in pages works exactly like in other components. The only difference is the importing alias. Instead of `core/components` we need to start with `core/pages` alias.

```js
import YourCorePage from '@vue-storefront/core/pages/YourCorePage'

export default {
  ...
  mixins: [YourCorePage]
}
```

Core pages are placed in `core/pages` folder.

## Overriding and extending core components and pages

Since core components are just plain JavaScript objects, you can easily modify them before mixing in your theme.

```js
import YourCorePage from '@vue-storefront/core/pages/YourCorePage'

YourCorePage.methods.foo = function () { Logger.log('Overrided method foo')() }

export default {
  ...
  mixins: [YourCorePage]
}
```
