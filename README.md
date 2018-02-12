# Vue Storefront - PWA for eCommerce
Vue Storefront is a standalone PWA storefront for your eCommerce, possible to connect with any eCommerce backend (eg. Magento, [Pimcore](https://github.com/DivanteLtd/pimcore2vuestorefront),  Prestashop or Shopware) through the API.

Sign up for a demo at https://vuestorefront.io/ (Vue Storefront integrated with Magento2).

Vue Storefront is and always will be in the open source. Anyone can use and support the project, we want it to be a tool for the improvement of the shopping experience.
The project is still in the proof of concept phase. **We are looking for Contributors and Designer willing to help us in the solution development.**

## Join the community on Slack
If you have any questions or ideas feel free to join our slack: https://vuestorefront.slack.com via [invitation link](https://join.slack.com/t/vuestorefront/shared_invite/enQtMzA4MTM2NTE5NjM2LTI1M2RmOWIyOTk0MzFlMDU3YzJlYzcyYzNiNjUyZWJiMTZjZjc3MjRlYmE5ZWQ1YWRhNTQyM2ZjN2ZkMzZlNTg)

## Documentation + table of contents
The documentation is always THE HARDEST PART of each open source project! But we're trying hard. Please find out what we've already managed to prepare under /doc folder: https://github.com/DivanteLtd/vue-storefront/tree/master/doc

### Installation
* [Installing on Linux/MacOS](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Linux%20and%20MacOS.md)
* [Installing on Windows](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Windows.md)
* [How to install and integrate with Magento2](https://medium.com/@piotrkarwatka/vue-storefront-how-to-install-and-integrate-with-magento2-227767dd65b2)

### Basics
* [Project structure](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Project%20structure.md)
* [Working with Service Workers](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20service-worker.md)
* [Contribution and issue reporting guideness](https://github.com/DivanteLtd/vue-storefront/blob/master/CONTRIBUTING.md)
* [Common problems](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Common%20problems.md)

### Vue Storefront core and themes
* [Wotking with themes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/Working%20with%20themes.md)
* [Working with Vue Storefront core components](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md)
* [Working with UI Store (interface state)](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20UI%20Store%20(interface%20state).md)
* [Working with translations](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/i18n/Working%20with%20translations.md)

Tutorial series on creating themes for Vue Storefront:
* [Creating themes in Vue Storefront (part 1 — understanding Vue Storefront core)](https://medium.com/@frakowski/developing-themes-in-vue-storefront-backend-agnostic-ecommerce-pwa-frontend-part-1-72ea3c939593)

### Data in Vue Storefront
* [Working with data](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md)
* [ElasticSearch data formats](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/ElasticSearch%20data%20formats.md)
* [Data formats specification](https://github.com/magento-engcom/es-indexer/wiki)

### Integrations
* [Vue Storefront + Magento](https://github.com/DivanteLtd/mage2vuestorefront)
* [Vue Storefront + Pimcore](https://github.com/DivanteLtd/pimcore2vuestorefront)
* [Direct prices sync with Magento](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Direct%20Prices.md)
* [How to connect 3rd party platform to Vue Storefront?](https://medium.com/@piotrkarwatka/how-to-connect-3rd-party-platform-to-vue-storefront-df9cb30779f6)

### 'Default theme' contriribution rules
* [Working with stylesheets (CSS)](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/default/Working%20with%20stylesheets.md)

## The business challenges
Vue Storefront was created to solve a set of key business challenges from the world of shopping experience. Our goal for the application is to provide the solution with:
* The ultrafast front-end for the store - with the PWA approach we can now render the catalog of products within milliseconds;
* The endurance for traffic overloads on the store;
* The off-line shopping capabilities;
* The smooth shopping experience close to the user experience from the native mobile applications;
* The all-in-one front-end for desktop and mobile screens with no necessity for maintaining 3 or more applications for different touchpoints (web browser, Android, iOS etc.).
* Rapid development wothout architecture limitations.

## The technology
Vue Storefront was build as a all-in-one front-end for eCommerce. For providing the best performance we decided to use Vue.js as a front-end library, Node.js + Express (and maybe GraphQL support) as a server-API, Elastic Search as a database of products and full PWA/off-line support.
Here you can read more about the proof of concept for [Vue Storefront connected with Magento2](https://www.linkedin.com/pulse/magento2-nosql-database-pwa-support-piotr-karwatka).

Besides a big improvement for the shopping experience, we also want to create a great code base for every developer who needs to work on a front-end application for the eCommerce.

## The architecture
![Architecture diagram](doc/media/Vue-storefront-architecture.png)

## The design
The application is prepared to be fully customized in design through theming system.
With the current version we work on raw, basic template of typical eCommerce for a fashion industry.
In the project we used [Material Icons](https://github.com/google/material-design-icons).

<img width="880" alt="Vue Storefront - Annimations in sidebar menu" src="https://user-images.githubusercontent.com/18116406/33559404-ed674bcc-d90c-11e7-864a-91e42d1c92cd.gif">

<img width="880" alt="Vue Storefront - Annimations in featured products box" src="https://user-images.githubusercontent.com/18116406/33559277-920deb00-d90c-11e7-95e6-ffd55a36a5c6.gif">

Here you can read more about the process of [designing PWA for eCommerce](https://www.linkedin.com/pulse/designing-pwa-ecommerce-karl-bzik/).

The design is available in open source in the Figma file format under the URL https://www.figma.com/file/VKyqbHFI55TKIKcQlFLiVpVF/Vue-Storefront-Open-Source.

## Other platforms
Vue Storefront is platform agnostic which mean - it can be connected to virtually any CMS. Please take a look at [Pimcore bridge](https://github.com/DivanteLtd/pimcore2vuestorefront) to give you an idea how other platforms can be connected. Any support for integrating Prestashop, Shopify ... - much appreciated.

## The license
Vue Storefront source code is completely free and released under the [MIT License](https://github.com/DivanteLtd/vue-storefront/blob/master/LICENSE).

## Contributing
If you like the idea behind Vue Storefront and want to become a contributor - do not hesitate and check our [list of the active issues](https://github.com/DivanteLtd/vue-storefront/issues) or contact us directly via contributors@vuestorefront.io.

If you have discovered a 🐜 or have a feature suggestion, feel free to create an issue on Github.

## Workshops
If you like our project and would like to learn more on how to create Progressive Web Apps you can ask us for dedicated workshop at your office! Conducted by Vue Storefront core contributors! All the profits are used for supporting Vue Storefront development. [Learn more](https://products.divante.co/vuestorefront/)

## Support us!
**Vue Storefront is and always will be Open Source, released under MIT Licence.**
Most of the core team members, VS contributors and contributors in the ecosystem do this open source work in their free time. If you use Vue Storefront for a serious task, and you'd like us to invest more time on it, you can donate the project! You can support us in various ways:
- **Contribute** - this how the Core Team is supporting the project!
- **Evangelize** - tweet about us, take some speaking slot at tech conference etc.
- **Sponsor** - if you're doing seroius business on VS maybe You would like to donate the project and put your logo in here?

This is how we will the donations:

- Allow the core team to work on VS
- Thank contributors if they invested a large amount of time in contributing
- Support projects in the ecosystem that are of great value for users
- Infrastructure cost
- Fees for money handling

**If you like to support us please just let us know: contributors@vuestorefront.io** 

## Partners
Vue Storefront is a Community effort brought to You by our great Core Team and supported by the following companies.

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" alt="Snow.dog" align="left" src="https://snow.dog/wp-content/themes/snowwptheme/assets/images/logo.png">
      </td>
      <td align="center" valign="top">    
        <img width="150" alt="Wagento" align="left" src="https://www.wagento.com/media/wysiwyg/logo-stacked-color-tagline_4x.png">
      </td>
      <td align="center" valign="top">        
        <img width="150" alt="Summa Solutions" align="left" src="http://www.summasolutions.net/sites/all/themes/summa2015/images/logo-tablet.jpg">
      </td>
      <td align="center" valign="top">        
        <img width="150" alt="Acid Green" align="left" src="https://cdn.dribbble.com/users/469310/screenshots/3865916/acidgreen_logo.jpg">
      </td>
    </tr>
  </tbody>
 </table>
Partners are encourage to support the project by various ways - mostly by contributing the source code, marketing activities, evangelizing and of course - implementing the production projects. We do support our partner by dedicated contact channels, workshops and by **sharing the leads** from merchants interested in implementations.

If you like to become our Partner just let us know via contributors@vuestorefront.io.

## The screenshots

<img width="880" alt="Vue Storefront - Annimations in the sidebar cart" src="https://user-images.githubusercontent.com/18116406/33559769-2840fb70-d90e-11e7-8f2b-298f35d1b412.gif">

<img width="880" alt="Vue Storefront - Annimations on producy card" src="https://user-images.githubusercontent.com/18116406/33560504-3105dac6-d910-11e7-847d-70ef8e944321.gif">

