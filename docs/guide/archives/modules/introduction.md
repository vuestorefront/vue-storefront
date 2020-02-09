# Introduction
## Table of contents

**Introduction and motivation**
- [What are VS Modules](#what-are-vs-modules)
- [Motivation](#motivation)
- [What is the purpose of VS modules?](#what-is-the-purpose-of-vs-modules)

**Technical part**
- [Module config and its capabilities](#module-config-and-capabilities)
- [Module file structure](#module-file-structure)
- [Module registration](#module-registration)

**Patterns and good practices for common use cases**
- [General rules and good practices](#general-rules-and-good-practices)
- [Adding new features as VS modules](#adding-new-features-as-vs-modules)
- [Extending and overriding Vue Storefront modules](#extending-and-overriding-vue-storefront-modules)
- [Creating third party modules](#Creating-3rd-party-modules)
  

## What are VS modules?

You can think about each module as a one, independent feature available in Vue Storefront with all its logic and dependencies inside. This *one feature* however is a common denominator that links all the features inside. For example, the common denominator for adding a product to the cart, receiving a list of items that is in the cart or applying a cart coupon is obviously a `cart` and `cart` is not a feature of anything bigger than itself (its common denominator is the shop) so it should be a module. Wishlist, Reviews or Newsletter are also good examples of the module as we intuitively think about them as standalone features. 

## Motivation

I believe that an obvious metaphor can clearly describe the problem, at the same time, the solution.

To better illustrate the whole concept I'll try to explain it with lego bricks.

Let's say we have a box with 90 lego bricks that we can use to build some fancy things like Towers, Castles, or Helicopters. Unfortunately due to some stupid EU regulations we can only have 3 different colors of bricks in our box. As we all know, not every color is accurate for every structure that can be built so we need to swap one color with another in a shop from time to time in order to have bricks in colors that are best-suited for our next lego project.

Cool, but there is one problem - since we have all our bricks in one box they look more or less as follows :
