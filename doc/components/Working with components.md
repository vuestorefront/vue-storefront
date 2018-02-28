# Vue Storefront component types
In Vue Storefront there are two types of components:

* <strong>Core components</strong> (`core/components`) - In core components we implemented all basic business logic for ecommerce shop so you don't need to write it from scratch by yourself. You can make use of them in your theme's where all you need to do is styling and creating the HTML markup. Every core component provides an interface to interact with which can be extended or overwritten in your theme if you need it. Core components should be injected to themes as mixins. They contain only businness logic - HTML markup and styling should be done in themes.

* <strong>Theme components</strong> (`src/themes/{theme_name}/components`) - The theme component is what you really see in the app. They can inherit business logic from core components or be created as theme-specific components. All CSS and HTML should be placed in theme. A good practice is to created theme components inheriting from specific core components with the same name and in the same path ( e.g components inheriting from (`core/components/ProductTile.vue`) should be placed  (`src/themes/{theme_name}/components/core/ProductTile.vue`) but it's not obligatory and you can structure your theme in any way you want.

# Using core components in your theme

## For components
Inheritance by itself is done by [vue mixins](https://vuejs.org/v2/guide/mixins.html) with default merging strategy.

To inherit from core component:

1. <strong>Create new component in your theme. </strong> 

2. <strong>Import coreComponent module.</strong>
```javascript
import { coreComponent } from 'core/lib/themes'
```
3. <strong>Add core components mixin to your newly created theme component</strong>.
```javascript
export default {
  ...
  mixins: [coreComponent('AddToCart')] // path in components/ folder
}
```
From now you can access and override all methods, data and components from core component like it was declaired in your theme component.


## For pages

Inheritance in pages works exactly like in other components. The only difference is that insted of importing `coreComponent` you shoould import `corePage`:
```javascript
import { corePage } from 'core/lib/themes'

export default {
  ...
  mixins: [corePage('Home')] // path in pages/ folder
}
```
Core pages are placed in `core/pages`.

# Working with core components

First of all: <strong>override core components only when you're adding features to the core</strong>. The correct approach for using core components in your theme is thinking of them as an external API. You can inherit the functionalities and extend them in theme but never change it in a core.

<strong>When you're modifying the core component never change the component's API</strong> (data and methods exposed by component for themes). Such changes would break the themes using this core component.

## The core component's folder structure

* `core/components` - Components that can be used across whole project should be placed in root of this folder. 
* `core/components/blocks` - All other component's specific to pages (e.g Home, Category), other components (e.g Header, Footer) or functionalities (e.g Auth).

## Rules to follow when creating new core components

1. Don't use `<style>` tag in core components.
2. Don't use `<template>` tag in core components. You can add it only when the component's HTML isn't overridable (like in Overlay component).
3. Put only theme-agnostic businnes logic in core components.


# Core components docs (still working on it)
## Pages 
* [Home](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/core/HomePage.md) - [`Home.vue`](https://github.com/DivanteLtd/vue-storefront/blob/master/core/pages/Home.vue)
* [Category](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/core/CategoryPage.md) - [`Category.vue`](https://github.com/DivanteLtd/vue-storefront/blob/master/core/pages/Category.vue)
* [Product](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/core/ProductPage.md) - [`Product.vue`](https://github.com/DivanteLtd/vue-storefront/blob/master/core/pages/Product.vue)
* ...

## Components
* [Modal](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/modal.md) - [`Modal.vue`](https://github.com/DivanteLtd/vue-storefront/blob/master/core/components/Modal.vue)
* ...

# Related 

* [Working with themes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/Working%20with%20themes.md)
* [Creating themes in Vue Storefront -Part 1 ('Using Vue Storefront core in your theme' section)](https://medium.com/@frakowski/developing-themes-in-vue-storefront-backend-agnostic-ecommerce-pwa-frontend-part-1-72ea3c939593)

