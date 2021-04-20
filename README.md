![Vue Storefront](https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067)
# Vue Storefront 2 (previously known as Next)


[![Coverage Status](https://coveralls.io/repos/github/DivanteLtd/next/badge.svg?branch=master) ](https://coveralls.io/github/DivanteLtd/next?branch=master)<a href="https://discord.vuestorefront.io">![Discord](https://img.shields.io/discord/770285988244750366?label=join%20discord&logo=Discord&logoColor=white)</a>

Vue Storefront is the most popular and most advanced Frontend Platform for eCommerce
- [Documentation](https://docs.vuestorefront.io/v2/)
- [Demo](https://vsf-next-demo.storefrontcloud.io/)

![Screenshots](https://blog.vuestorefront.io/wp-content/uploads/2020/03/3-views-Vue-Storefront-.png)
**Supported platforms**
- [Magento 1.9/2](https://github.com/vuestorefront/magento)
- [Spryker](
- Spree (VSF1)
- Sylius (VSF1)
- Shopware 6
- Commercetools
- [Shopify](https://github.com/vuestorefront/shopify) [WIP]
- AboutYou Cloud [WIP]
- Salesforce Commerce Cloud [WIP]
- ...more coming!


## What you need
* [yarn](https://yarnpkg.com/getting-started) - Dependency manager
* [Lerna](https://github.com/lerna/lerna) - Monorepo manager
* [Typescript](https://www.typescriptlang.org/docs/home.html) - JavaScript superset

## Installation (Commercetools)
```sh
$ yarn install
```
```sh
yarn build:ct:tools
```
then run the app
```sh
yarn dev:ct
```


## Links

-   📘  Documentation:  [docs.vuestorefront.io](https://docs.vuestorefront.io)
-   👥  Discord Community:  [discord.vuestorefront.io](https://discord.vuestorefront.io/)
-   🐦  Twitter:  [@VueStorefront](https://twitter.com/VueStorefront)
-   💬  Forum:  [forum.vuestorefront.io](https://forum.vuestorefront.io/)
-   🌟  [Live Projects List](https://www.vuestorefront.io/live-projects/?utm_source=github.com&utm_medium=referral&utm_campaign=readme)

## How to start?

Which Vue Storefront should I choose for my next project?  

 - If you’re on **Magento 1 or Magento 2** choose Vue Storefront 1.x
   with vsf-capybara theme,  [Install it using CLI](https://docs.vuestorefront.io/guide/cookbook/setup.html)
   
  -  If you’re on **commercetools / About You Cloud** choose Vue Storefront Next clone it from [`next`](https://github.com/DivanteLtd/vue-storefront/tree/next) 
   
  -  If you’re on **Shopware 6** go to  [`shopware-pwa`](https://github.com/DivanteLtd/shopware-pwa)   sub-project and use the Shopware PWA powered by Vue Storefront

Check our Rodmap -> link do  [https://github.com/DivanteLtd/vue-storefront#roadmap](https://github.com/DivanteLtd/vue-storefront#roadmap)


## About Vue Storefront Next

We're developing a next version of Vue Storefront on the  [`next`  branch](https://github.com/DivanteLtd/vue-storefront/tree/next).

We're building the following integrations within Next architecture:

-   Shopware 6 (developer preview)
-   Commercetools (developer preview)
-   AboutYou Cloud
-   Shopify
-   Salesforce Commerce Cloud

You can learn more about Vue Storefront Next from the README on the  `next`  branch and  [this](https://www.youtube.com/watch?v=0e2wyhR0ZyQ&t=3s)  video
<table>
  <tbody>
    <tr>
      <td><img src="https://user-images.githubusercontent.com/15185752/93322154-4beb4b80-f813-11ea-9e94-1666141ba4a6.png" width="160" />
</td>
      <td>If you want to learn more about Vue Storefront Next, contribute or build an integration reach to <b>Filip Rakowski</b> on our <a href="https://slack.vuestorefront.io/">Slack</a></td>
    </tr>
  </tbody>
  </table>
  

**We are looking for Contributors and Designer willing to help us in the solution development.**

**Read [contribution rules](https://github.com/DivanteLtd/vue-storefront/blob/master/CONTRIBUTING.md) before making any pull request. Pull request that doesn't meet these requirements will not be merged**

PS: Check [Storefront UI](https://github.com/DivanteLtd/storefront-ui/) - our UI library for eCommerce.



## Awesome projects on Vue Storefront

Check [**Vue Storefront Live Projects**](https://www.vuestorefront.io/live-projects/?utm_source=github.com&utm_medium=referral&utm_campaign=readme)

![Vue Storefront Live Projects](https://uploads-ssl.webflow.com/5e7cf661c23ac9df156d9c3d/5eff4e5149334a10bb672790_GitHub_Live%20Projects.png)



## The business challenges

Vue Storefront was created to solve a set of key business challenges from the world of the shopping experience. Our goal for the application is to provide the solution with:

- The ultrafast front-end for the store - with the PWA approach we can now render the catalog of products within milliseconds;
- The endurance for traffic overloads on the store;
- The off-line shopping capabilities;
- The smooth shopping experience close to the user experience from the native mobile applications;
- The all-in-one front-end for desktop and mobile screens with no necessity for maintaining 3 or more applications for different touchpoints (web browser, Android, iOS etc.).
- Rapid development without architecture limitations.


## The headless architecture

![Vue Storefront - Headless Architecture](https://uploads-ssl.webflow.com/5e7cf661c23ac9df156d9c3d/5eff4a2497a1546ca057dcca_github_headless_architecture.png)


## Concerns when hosting
When hosting NodeJS applications there are some differences compared to, for example, hosting PHP or Java applications.
Server Side Rendering via NodeJS can have memory leaks because of suboptimal code. Although core code is optimized, project specific features or misaligned hosting configuration can introduce this. More on how to avoid these for VueJS can be ready in [this article](https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html). We also recommend reading about [VueJS best practices](https://blog.usejournal.com/vue-js-best-practices-c5da8d7af48d).

 On the server we advice to run [PM2](http://pm2.keymetrics.io/) which offers features to keep your NodeJS application stable. When hosting on Kubernetes the checks and memory limits can be leveraged to kill unhealthy containers.
More on hosting can be found in [the documentation](https://docs.vuestorefront.io/guide/installation/production-setup.html#production-setup-bare-vps).

## Other platforms
Vue Storefront is platform agnostic which means it can be connected to virtually any CMS. Please take a look at [Pimcore bridge](https://github.com/DivanteLtd/coreshop-vsbridge) to give you an idea of how other platforms can be connected. Any support for integrating Prestashop, Shopify ... - much appreciated.

## Contributing

If you like the idea behind Vue Storefront and want to become a contributor - do not hesitate and check our [list of the active issues](https://github.com/DivanteLtd/vue-storefront/issues) or contact us directly via contributors@vuestorefront.io.

If you have discovered a 🐜 or have a feature suggestion, feel free to create an issue on Github.

## Workshops

If you like our project and would like to learn more on how to create Progressive Web Apps you can ask us for a dedicated workshop at your office! Conducted by Vue Storefront core contributors! All the profits are used for supporting Vue Storefront development. [Learn more]([https://divante.com/products/vue-storefront](https://divante.com/products/vue-storefront))

## Support us!

**Vue Storefront is and always will be Open Source, released under MIT Licence.**

Most of the core team members, VS contributors and contributors in the ecosystem do this open source work in their free time. If you use Vue Storefront for a serious task, and you'd like us to invest more time on it, you can donate the project! You can support us in various ways:

- **Contribute** - this is how the Core Team is supporting the project!
- **Evangelize** - tweet about us, take some speaking slot at tech conference etc.
- **Sponsor** - if you're doing serious business on VS maybe You would like to donate the project and put your logo in here?

This is how we will use the donations:

- Allow the core team to work on VS
- Thank contributors if they invested a large amount of time in contributing
- Support projects in the ecosystem that are of great value for users
- Infrastructure cost
- Fees for money handling

**If you would like to support us please just let us know: contributors@vuestorefront.io**

## Partners

Vue Storefront is a Community effort brought to You by our great Core Team and supported by the following companies. 

[**See Vue Storefront partners directory**](https://www.vuestorefront.io/partner-agencies?utm_source=github.com&utm_medium=referral&utm_campaign=readme)

![enter image description here](https://uploads-ssl.webflow.com/5e7cf661c23ac9df156d9c3d/5eff4e56262af66301c950e4_github_partner_agencies.png)


Partners are encouraged to support the project in various ways - mostly by contributing the source code, marketing activities, evangelizing and of course - implementing the production projects. We do support our partners by dedicated contact channels, workshops and by sharing the leads from merchants interested in implementations.

If you like to become our Partner just let us know via contributors@vuestorefront.io.

## The screenshots

<img width="880" alt="Vue Storefront - Annimations in the sidebar cart" src="https://user-images.githubusercontent.com/18116406/33559769-2840fb70-d90e-11e7-8f2b-298f35d1b412.gif">



## The license

Vue Storefront source code is completely free and released under the [MIT License](https://github.com/DivanteLtd/vue-storefront/blob/master/LICENSE).

[![analytics](http://www.google-analytics.com/collect?v=1&t=pageview&_s=1&dl=https%3A%2F%2Fgithub.com%2FDivanteLtd%2Fvue-storefront&_u=MAC~&cid=1757014354.1393964045&tid=UA-108235765-10)]()

