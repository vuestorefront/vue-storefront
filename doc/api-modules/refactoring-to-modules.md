# Vue Storefront refactoring plan for modules

We are slowly refactoring Vue Storefront code to modules. You can learn about modules [here](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md) and read about the motivations of this architectural changes [here](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md#motivation)

**tl;dr** For now we are just detaching the features from core components (see cart module as an example). **We are not moving components, stores etc to api modules folder yet**. Please keep it in mind. After we will move all the features then we will proceed with components and stores.

# Refactoring Plan
The refactoring will be splitted into two phases:

1. **Splitting the business logic into standalone pieces (modules) and rewriting it's logic as a small, declaratively used features.**

At this point we need to investigate how many and what modules do we actually need to have whole application logic splitted into standalone, encapsulated modules. What is the easiest way to do it? We can start by opening a random core component from current `core/components` folder and try to split it's logic into small, atomic pieces. Each of this pieces should be treated as a small, almost undividable feature or one user story. Examples of such features are: Adding product to the cart, signing in, signing out, removing product from the wishlist, getting products in a cart etc. Once we split the component into atomic pieces we can start with grouping them into modules. As we can read in [About Modules](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md) doc:
> You can think about each module as a one, independent feature available in Vue Storefront with all it's logic and dependencys inside. This 'one feature' however is a common denominator that links all the features inside. For example common denominator for adding product to the cart, receiving list of items that are in a cart or applying a cart coupon is obviously a `cart` and `cart` is not a feature of anything bigger than itself so it should be a module. Wishlist or Newsletter are also a good examples of modules as we intuitively think about them as a standalone features

So if we end up with `addToCart` `applyCoupon` and `addToWishlist` features after splitting the core component we can divide them into `cart` and `wishlist` modules and put inside it's `/featues` folders. [Here](https://github.com/DivanteLtd/vue-storefront/tree/66b8ed3eff5080b4efa540cc6effb4e5395598fd/core/api/cart) is an example from **older version of modules** with correctly splitted [Microcart](https://github.com/DivanteLtd/vue-storefront/blob/66b8ed3eff5080b4efa540cc6effb4e5395598fd/core/components/blocks/Microcart/Microcart.js) component (please note imports from `core/api/cart`at the top - this is how we repalce the component methods with the ones moved to modules). The folder structure for the module is different from the one in [about modules](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md) but the thing that matters here is the way we splitted components into features

There is a requirement for all features that are moved to modules to be unit tested. You should put this tests inside `/tests` folder inside a module.

After this process we should end up with a following structure of each modified/created module:

 `module_name/`
 
 `--- features` ( can contain files like  `addToCart.ts`, `productsInCart.ts`, `removeFromCart.ts`)
 
 `--- tests`( can contain files like  `addToCart.spec.ts`, `productsInCart.spec.ts`, `removeFromCart.spec.ts`)
 
 `--- types` - folder for TypeScript interfaces associated to this module

At the end we are just using the features that we moved to modules instead of the methods that are directly in component. You can find part of this process for Microcart component. [Here](https://github.com/DivanteLtd/vue-storefront/blob/3a104223416bfe65aa72628844fa94188d6f3cda/core/components/blocks/Microcart/Microcart.js) you can see the component before refactoring it's functionality into small features and [here](https://github.com/DivanteLtd/vue-storefront/blob/66b8ed3eff5080b4efa540cc6effb4e5395598fd/core/components/blocks/Microcart/Microcart.js) after part of the process (we still need to move the rest)

[under construction - next steps will be described soon]

We are splitting the refactoring plan for a few reasons:
- not introduce too many breaking changes at once
- allow developers to slowlya dapt to the new architecture
- have full control over the process 
- remain backward compatible to the moment when we are done with the changes so we introduce breaking changes only once

If you want to better understand the motivations of this process please read about [strangler pattern](https://medium.com/@piotrkarwatka/progressive-web-app-strategies-strangler-pattern-493ce61d4641). We are refactoring our code with the same goals in mind. that you can read about inside this article.

# Perfect! Give me the tasks
You can find currently aligned tasks [here](https://github.com/DivanteLtd/vue-storefront/labels/API%20Module) but there are more to come. We'd be more than happy if you will propose your own ideas for modules ;)
We are open for a discussion about this issues with anyone willing to pick them or improve the idea
