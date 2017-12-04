The page is under construction

# Introudction

In Vue storefront there are two types of components:

* Core components (`src/components`) - In core components we implemented all basic business logic for ecommerce shop so you don't need to write it from scratch by yourself. All you need to do is inherit from them in theme components where you can override, style or extend each one of them. Core component's shouldn't be used directly in theme's (only via inheritance as mixins. They also shouldn't include styling since they are designed to be theme-agnostic. Think of it as a inheritable javascript code.

* Theme components - (`src/themes/{theme_name}components`) - The theme component is what you really see in the app. They can inherit from core components (`src/themes/{theme_name}components/core`) or be created as theme-specific components (`src/themes/{theme_name}components/theme`). All CDD and HTML should be placed in theme components.

# Using the core components in your theme

First of all: NEVER override core components as they are part of Vue Storefront core and are updatad with whole core from time to time. The correct approach for using core components in your theme is thinking of them as external API. You can inherit the functionalities and extend them in theme but never change it in a core.

Inheritance by itself should be done by [vue mixins](https://vuejs.org/v2/guide/mixins.html)
To inherit from core component:

1. <strong>Create new component in your theme. </strong> The theme component's path and name in `src/themes/{theme_name}components`should be the same as component's which it inherits from in `src/components` e.g Lets say we have core component AddToCart in `src/components/core/AddToCart.vue` which we want to use for our theme's AddToCart component. Following the rules the path for theme's component should be `src/themes/{theme_name}component/core/AddToCart.vue`). 

2. Import coreComponent module. Just add the below code in the top of `<script>` tag in your components.
```javascript
import { coreComponent } from 'lib/themes'
```
3. Add core components mixin to your newly created core component instalce.
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

