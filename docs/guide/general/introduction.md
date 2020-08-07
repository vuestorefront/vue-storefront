# What is Vue Storefront
_Vue Storefront_ is a ___headless e-commerce frontend framework___ that may work with __any__ backend that you are already using via its API regardless of the platform, be it e-commerce, CMS, ERP, PIM, or anything else. 


![f_b](../images/f_b.png)

We mean by 
 - __headless__ : Your e-commerce platform as a whole system can be built on top of a set of different technologies. No mandatory combination for the platform is required. Manifestation of _low coupling and high cohesion_ is here and will stay with us until the end. 
 - __e-commerce__ : Essentially _Vue Storefront_ was born as the e-commerce framework. By the nature of headless and microservice, however, you might connect it to whatever you set it to, say, a helper service for ERP, or versatile search features for PIM, and portable checkout for 3rd party payment kiosk, and so on. 
 - __frontend__ : When it's _headless_, The framework should be either _frontend_ or _backend_, and _Vue Storefront_ is undoubtedly _frontend_ as the name suggests. The _frontend_ deals with everything related to process of facing customers and handling them gracefully; From displaying products they want to buy without delay, to receiving orders in seamless checkout without any hiccup.
 - __framework__ : Even though _Vue Storefront_ is a set of atomic features, they should be guided as one by the conductor. We do so by gluing them through _interfaces_ and _factories_. We will dig this further later, but one thing to take away, they are quite flexible glues. 


:::tip SALES PITCH : WHY GO WITH PWA
_Vue Storefront_ is the fruit of multiple years of innovation and the furnace of feedbacks from the  battle frontline in which businesses strive to give best online shopping experience to potential customers. _Vue Storefront_  has chosen PWA as a foundation technology which is excellent choice because PWA is designed to give best performance even on laggy mobile devices with native-like features from the beginning in order to satisfy your customers who are curious, rich, and impatient.
:::

Give me 7 minutes and you will grab : 

[[toc]]

## Problems and naturally, solutions

### In a meeting room

I heard a lot of conversation go like this quite often over the last few years :

:::tip ... CONVERSATION CONTINUES
_Client_ : I don't get it, why so many cart abandonment during checkout?

_Agency_ : It seems like mobile phones that customers use bit more than it could chew, so slow. As you know, powerful features come with price. 

_Client_ : Even myself can't take this heavy load time only to see a couple of product photos, let alone multiple products in any category page. How do I fix this fundamentally?

_Agency_ : How _bad_ do you want it?

_Client_ : _Yes_ 
:::

Answers with PWA, particularly with _Vue Storefront_ to situation like above always gave _WOW_ moment to clients without a single exception. They always said in the end; _This is the way_. Even though they couldn't understand a single jargon of developers.

The page load time reduced to less than `20ms` on average including categories, products, and checkout. Major features were cached offline so poor mobile carrier performance wasn't outstanding. When connected back to online, suspended processes returned to work without noticeable hassles for customers. 

Not only page load time but also responsiveness as a whole from the page was instant and seamless just as you would expect from a native app, if not better. 

### Other problems in a galaxy far, far away in the developer's room..
:::warning READERS ADVICE
If you are not a developer, nor work with developers, you are going to read an interesting story but without inspiration.
:::

How painful was it when you had to meticulously fix tremendous amount of changes without patterns while you just want to add/remove a simple feature, or upgrade the framework as they claim security risk is at stake? 

Another memory, how frustrated was it when you learned the other backend platform you didn't choose turned out better solution for your business, a lot better on many levels, but the cost of switching is even greater than the benefit of it you just learned? You were literally locked-in by tentative choices you made while you were naive.

Now, solution comes with _Vue Storefront_. 

 For the best experience when it comes to maintaining the framework, we divided the system into the smallest chunks until it's not meaningful to do so. Technically all parts are wrapped in as individual `npm` packages so switching from one version to another should be as easy as any `npm` command. In short, it has been built on the firm ground of _Mircroservice_ architecture. It also means you can swap a part in the system with other equivalent app or service with a simple command. (or with a few changes in configuration)


## In a nutshell, technically 
_Vue Storefront_ is a frontend framework with the modular approach to its core and parts in the first place. Essentially the framework itself is a set of independent `npm` packages taking various roles of the platform. It's really up to you _how much_ of the platform you will use in your project. You can cherry-pick any combination to your advantage. 

![vsfn_module](../images/vsfn.png)

As of beta version, _Vue Storefront_ consists of modules above. The majority of modules is integration module with 3rd party backend models. 

The core part of _Vue Storefront_ is `core` and `nuxt-theme`. They contain basic structures and business logics implemented within the theme. We will further investigate how they are structured inside and intertwined (and how not) with each other in [Architecture for dummies](architecture). 

_Vue Storefront_ packages are standalone which allows you to use them in __any__ Vue.js enviroment so it's not a must to use Nuxt. You can use _Vue Storefront_ packages with Vue CLI or even within your custom Vue.js codebase. All you need is know how to communicate with _Vue Storefront_, which is done via interfaces over API.


## Benefits you take
- Blazing fast (90+ Lighthouse score for every page)
- Works with any backend, CMS, ERP, PIM, and anything else that has API
- Server Side Rendered
- Progressive Web App
- Huge flexibility in changing third-party services

## Tech stack 
- [Vue.js](https://vuejs.org/v2/guide/)
- [Nuxt.js](https://nuxtjs.org/guide)
- CSS
- [Storefront UI](https://www.storefrontui.io/) (optional)
- [TypeScript](https://www.typescriptlang.org/docs/home) (optional)