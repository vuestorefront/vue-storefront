# Types of components

In Vue Storefront there are two types of components:

* <strong>Core components</strong> (`src/components`) - In core components we implemented all basic business logic for ecommerce shop so you don't need to write it from scratch by yourself. All you need to do is inherit from them in theme components where all you need to do is styling and creating te HTML markup. Every core component provides an interface to interact with once included which can be extended or overwritten in your theme if you need it. Core component's should be injected to themes as mixins. Core components provides only businness logic. HTML markup and styling is done in themes.

* <strong>Theme components</strong> (`src/themes/{theme_name}/components`) - The theme component is what you really see in the app. They can inherit business logic from core components or be created as theme-specific components. All CSS and HTML should be placed in theme components. A good practice is to created theme components inheriting from specific core components with the same name and in the same path ( e.g components inheriting from (`src/themes/{theme_name}/components/core/ProductTile.vue`) should be placed  (`src/themes/{theme_name}/components/core/ProductTile.vue`) but it'ss not obligatory and you can structure your theme in any way you like.

# Working with core components

First of all: <strong>override core components only when you're adding features to the core</strong>. The correct approach for using core components in your theme is thinking of them as an external API. You can inherit the functionalities and extend them in theme but never change it in a core.

When you're changing the core component the API (data and methods exposed for themes) shouldn't be changed . Such changes would break the themes using this core component.

Inheritance by itself is done by [vue mixins](https://vuejs.org/v2/guide/mixins.html) with default merging strategy.

To inherit from core component:

1. <strong>Create new component in your theme. </strong> 

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

# The core component's folder structure

* `core` - Components thet can be used across whole project should be placed in root of this folder. 
* `core/blocks` - All other component's specific to pages (e.g Home, Category), other components (e.g Header, Footer) or functionalities (e.g Auth).
* `theme` (theme components only) - Components that are theme-specific and doesn't override core component's

# Pages

Inheritance in pages works exactly like in other components. The only difference is that insted of importing `coreComponent` you shoould import `corePage`:
```javascript
import { corePage } from 'lib/themes'

export default {
  ...
  mixins: [coreComponent('core/Home')]
}
```
Core pages are placed in `src/pages`.

# Rules to follow when creating new core components

1. Don't use `<style>` tag in core components.
2. Don't use `<template>` tag in core components. You can add it only when the component's HTML isn't overridable (like in Overlay component).
3. Put only theme-agnostic businnes logic in core components.


