# What is Vue Storefront?


_Vue Storefront_ is a ___platform-agnostic headless e-commerce PWA frontend framework___ that may work with __any__ backend that you are already using via its API regardless of the platform, be it e-commerce, CMS, ERP, PIM, or anything else.



<center>
<img src="./images/diagram-general.png" />
</center>



We mean by
 - __platform-agnostic__ : _Vue Storefront_ will work with any platform and service that you're using as long as it's exposing some kind of REST or GraphQL API. 
 - __headless__ : Your e-commerce platform as a whole system can be built on top of a set of different technologies. No mandatory combination for the platform is required. Manifestation of _low coupling and high cohesion_ is here and will stay with us until the end.
 - __e-commerce__ : Essentially _Vue Storefront_ was born as the e-commerce framework. By the nature of headless and microservice, however, you might connect it to whatever you set it to, say, a helper service for ERP, or versatile search features for PIM, and portable checkout for 3rd party payment kiosk, and so on. Limit is your imagination.
 - __PWA__ : _PWA_ is the thing of future, it is designed to give best performance even on laggy mobile devices with native-like features from the beginning in order to satisfy your customers who are curious, rich, and impatient.
 - __framework__ : Even though _Vue Storefront_ is a set of atomic features, they should be guided as one by the conductor. We do so by gluing them through _interfaces_ and _factories_. We will dig this further later, but one thing to take away, they are quite flexible glues.

Give me 7 minutes and you will grab :

[[toc]]

## Problems Vue Storefront will solve from you

The main purpose of any software is to solve problems. Vue Storefront is no different. We're doing our best to find common issues in eCommerce space (and in our software!) and find viable solutions to them. Below you can find just a few of them that Vue Storefront will solve for you.

### Slow, unresponsive online shop

No matter how great your products are slow and unresponsive shop will make your conversion significantly lower lower. **Some estimates say up to 1% users will leave your website for every 100ms delay in page load time.**

**Solution**  _Vue Storefront_ solves slow, unresponsive online shop problems as follows :

- The page load time is reduced significantly on average thanks to small bundle size, code splitting, lazy loading and a bunch of other web performance techniques that we used to make sure your shop will load as fast as possible.
- Pages that were already visited are cached so next time user enters them they will load instantly.
- Resources that might be needed in the future are precached so when the user clicks the link it loads immediately.
- When network connectivity is slow or temporarily lost you can stil browse the product catalog. In many cases its unnoticeable for the user.

Not only page load time but also __responsiveness as a whole from the page is almost instant and seamless__ just as you would expect from a native app, if not better.


### Unwieldy architectural decisions

How painful was it when you had to meticulously fix tremendous amount of changes without patterns while you just want to add/remove a simple feature, or upgrade the framework as they claim security risk is at stake?

**Solution** Vue Storefront is promoting good architectural decisions by design. We're providing an opinionated way of building eCommerce frontends based on years of experience. Whatever troubles you could run into we made sure that our architecture and flexibility will got you covered.

### Painful migrations

How frustrated was it when you learned the other backend platform you didn't choose turned out better solution for your business, a lot better on many levels, but the cost of switching is even greater than the benefit of it you just learned? You were literally locked-in by tentative choices you made while you were naive.

**Solution** Vue storefront is backend-agnostic which means all eCommerce backends are integrated on the frontend under common interfaces. All these technologies are completely different on the backend but they're very similar from the frotnend perspective. We just made use of that fact and came up with abstractians that will make your migrations painless and almost instantaneous.

### Lack of platform-specific competences

So your Magento department is not doing very well but the commercetools one is growing like crazy? If only could you move developers from one department to another... 

**Solution** ...wait! With Vue Storefront you can! We have the same interfaces for all integrations of the same type (eCommerce, CMS, Loyalty etc) so once a developer learns Vue Storefront he/she can be confident with any tech stack that works with it.

### Lack of flexibility

Do you recall the frustration when implementing your dream design is not possible within your backend platform, adding a single modal window takes 2 days or adding some specific feature is just not possible with the framework you're using? 


**Solution** You will forget about these issues with Vue Storefront! For the best experience when it comes to maintaining the framework, we divided the system into the smallest chunks until it's not meaningful to do so. ___Technically all parts are wrapped in as individual `npm` packages so switching from one version to another should be as easy as any `npm` command.___ In short, it has been built on the firm ground of _Mircroservice_ architecture. Each of these packages is independent and optional so its up to you how much of the framework you want to utilize. Moreover **there are absolutely no limitations in terms of UI customization**. Your theme is just a regular Nuxt.js project which you can customize to any degree.

<!-- ## Architecture in a nutshell

_Vue Storefront_ is made up of 4 layers as follows :

![templates_d](./images/templates.png)

_Data Layer_ : __API Client__ - This provides a friendly abstraction layer for your e-commerce backend over network.

_Service Layer_ : __Composables__ - This contains business logic in _Vue.js_ framework

_Presentation Layer_ : __UI Components__ - _Vue Storefront_ has already launched its sister project [Storefront UI](https://www.storefrontui.io/) helping you build your UI and theme hands down.

_Framework Layer_ : __Nuxt__ - _Nuxt_ works as a glue for all the framework components even though it's not a must-use.

_Vue Storefront_ is a set of independent `npm` packages taking various roles of the framework. It's really up to you _how much_ of the framework you will use in your project. You can cherry-pick any combination to your advantage.

:::tip
_Vue Storefront_ packages are standalone which allows you to use them in __any__ Vue.js enviroment so it's not a must to use Nuxt. You can use _Vue Storefront_ packages with Vue CLI or even within your custom Vue.js codebase. All you need is know how to communicate with _Vue Storefront_, which is done via interfaces over API.
::: -->

## eCommerce Integrations

_Vue Storefront_ is a frontend framework undoubtedly. It needs an e-commerce backend to fully function in its glory.
Here is the list of e-commerce platform integrations already out in the field.

- Commercetools 
- Shopify (Developers Preview)
- About You Cloud (Developers Preview)
- Salesforce Commerce Cloud (WIP)
- BigCommerce (WIP)

We will walk you with details of each integration in its dedicated guide.

## Benefits you take
- Blazingly fast frontend
- Ability to work with any eCommerce platform, CMS, ERP, PIM **under common, agnostic API**
- Server Side Rendereing
- Progressive Web App features
- Huge flexibility in changing third-party services thanks to agnostic data formats

## Tech stack
- [Vue.js](https://vuejs.org/v2/guide/)
- [Nuxt.js](https://nuxtjs.org/guide)
- SCSS
- [Storefront UI](https://www.storefrontui.io/) (optional)
- [TypeScript](https://www.typescriptlang.org/docs/home) (optional)
