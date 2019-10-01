# Ch 6. Theming in depth

In this chapter, we are going to cover : 
[[toc]]


## 0. Introduction
Theme is what customers get first impression from your shop. You will be majorly discouraged if your customers underestimate your shop by looks and feels of the first impression due to poorly designed theme when you had pearls and golds in value for your customers on your shop. Great products, meticulously calibrated technology backing your store, are abysmally depreciated which impact your sales in result. We are here to help you get away with such disasters by guiding you in wrapping your head around how to deal with `theme` in _Vue Storefront_ context. Are you ready? a _Picaso_?


## 1. How `default` theme works
_Theme_ is the face of your store. Face is what makes people recognize you as you. That works just the same for your store. However, your _theme_ shows not only looks and feels of your store's identity, but also represents how features such as _UI_, _widgets_ and _components_ are arranged and interconnected just the same as your face helps connect _eyes_, _nose_, _ears_ and _brain_ under the skin.

Online stores should demand many features in common and they deal with similar types of requests from their customers to fulfill their desire : _Purchase_. They are divided and placed under the `core` folder to be dealt with.

We already got our hands dirty to place all the core business logic in place and created the `default` theme as the best practice to show how they are intertwined behind the scene and make it work seamlessly out of the box. 

In this recipe, we will walk through how `default` theme works in cooperation with other core parts of the `app` such as `modules`, `filters`, `stores` and so on. 
<br />
Among methodologies for this recipe, we will use the one inspired by [_Chaos Monkey_](https://en.wikipedia.org/wiki/Chaos_engineering); One that creates various errors on purpose, and ___see___ why it was needed to prevent such errors in the first place.

#### Sidetalk (If you are busy dev, please skip this)
Why we don't make a recipe for solution to a problem, but a recipe for a problem itself? Read this quote from _Aristotle_ and ask me again
:::tip QUOTE
_He who sees things grow from their beginning will have the best view of them_

___- Aristotle___
:::
You are not the core developers who built the ___Vue Storefront___ from its beginning so you don't know the _why_ and _how_ and the history of what happened to each corner of the code base. (even if you are core developers, I bet you really don't know _every_ detail ;)) Yet, that's fine until you just take advantage of the platform and things work as `docs` dictates. It becomes, however, problems when things get in unexpected ways. 
<br/>
In attempts to reduce such frustration, one might need to simulate _How things grew from the beginning_. Creating problems on purpose and an attempt to solve them may help you understand why things were there in the first place. Think of it as _Hadron Collider_ of ___Vue Storefront___. Now time's up, Let's turn on the _particle accelerator_. 

### 1. Preparation
- You need [Vue Storefront](https://github.com/DivanteLtd/vue-storefront) app [working](/guide/cookbook/setup.html). 

### 2. Recipe
1. Open your editor and go to `./src/themes/default/index.js`
 


### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
#### Secret 1. What is `amp` here and there?
#### Secret 2. 

<br />
<br />
<br />

## 2. Start building your own theme
### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />
<br />

## 3. How to upgrade theme one from another
When you are already running your _Vue Storefront_ shop on production, chances are that you have made at least a few changes for your _theme_ even if you don't have developers resource. Hope you have made such changes to your child theme based on `default` theme so that normal upgrade won't make a huge impact in negative way for your shop. Sometimes, however, an upgrade so huge that you can't make a smooth conversion from one to another may take place. Helping you in such a case keep headaches at bay, we will show you the example where `1.10` to `1.11` upgrade affects how a theme works and fix broken pieces.

### 1. Preparation
 - You have a [Vue Storefront App]() running
 - You have a child theme [running](/guide/cookbook/theme.html#_2-start-building-your-own-theme) on top of _Vue Storefront_ app. (In this recipe, we start with _degi_ child theme based on `1.10` version (1b53bd2a829f7cab571dbd3c2a4021ea46857da7) of `default` theme) 

### 2. Recipe

### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />
<br />

## 4. Execuse me, but can I use your theme if I may?
### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />
<br />
