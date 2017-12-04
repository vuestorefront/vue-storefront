The page is under construction

# Introudction

In Vue storefront there are two types of components:

* <strong>Core components</strong> (`src/components`) - In core components we implemented all basic business logic for ecommerce shop so you don't need to write it from scratch by yourself. All you need to do is inherit from them in theme components where you can override, style or extend each one of them. Core component's shouldn't be used directly in theme's (only via inheritance as mixins. They also shouldn't include styling since they are designed to be theme-agnostic. Think of it as a inheritable javascript code.

* <strong>Theme components</strong> (`src/themes/{theme_name}components`) - The theme component is what you really see in the app. They can inherit from core components (`src/themes/{theme_name}components/core`) or be created as theme-specific components (`src/themes/{theme_name}components/theme`). All CDD and HTML should be placed in theme components.

# Using the core components in your theme

First of all: <strong>NEVER override core components</strong> as they are part of Vue Storefront core and are updatad with whole core from time to time. The correct approach for using core components in your theme is thinking of them as an external API. You can inherit the functionalities and extend them in theme but never change it in a core.

Inheritance by itself is be done by [vue mixins](https://vuejs.org/v2/guide/mixins.html).


To inherit from core component:

1. <strong>Create new component in your theme. </strong> The theme component's path and name in `src/themes/{theme_name}components`should be the same as component's which it inherits from in `src/components` e.g Lets say we have core component AddToCart in `src/components/core/AddToCart.vue` which we want to use for our theme's AddToCart component. Following the rules the path for theme's component should be `src/themes/{theme_name}component/core/AddToCart.vue`). 

2. <strong>Import coreComponent module.</strong>
```javascript
import { coreComponent } from 'lib/themes'
```
3. <strong>Add core components mixin to your newly created theme component</strong>.
```javascript
export default {
  ...
  mixins: [coreComponent('core/AddToCart')]
}
```
From now you can access and override all methods, data and components from core component like it was declaired in your theme component.


# Creating your own components for theme

# Creating your own components for core

# Components list (data & usage)

