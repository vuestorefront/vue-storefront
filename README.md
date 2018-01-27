# Vue Storefront - PWA for eCommerce
Vue Storefront is a standalone PWA storefront for your eCommerce, possible to connect with any eCommerce backend (eg. Magento, [Pimcore](https://github.com/DivanteLtd/pimcore2vuestorefront),  Prestashop or Shopware) through the API.

Sign up for a demo at https://vuestorefront.io/ (Vue Storefront integrated with Magento2).

Vue Storefront is and always will be in the open source. Anyone can use and support the project, we want it to be a tool for the improvement of the shopping experience.
The project is still in the proof of concept phase. **We are looking for Contributors and Designer willing to help us in the solution development.**

## Join the community on Slack
If you have any questions or ideas feel free to join our slack: https://vuestorefront.slack.com  
You can request joining the slack channel by dropping us a line to: *contributors@vuestorefront.io* or via [this link](https://join.slack.com/t/vuestorefront/shared_invite/enQtMjU3NjE4NTI3MTY5LTFhMmRlNGE1ZTJjZWExNGJjNmJhMDA5ZmU5YWMzOGYyMTdiODAyODZlYWE0NGNhZTYxYWYxNTcyMzdjZjYxYzg)

## Documentation + table of contents
The documentation is always THE HARDEST PART of each open source project! But we're trying hard. Please find out what we've already managed to prepare under /doc folder: https://github.com/DivanteLtd/vue-storefront/tree/master/doc

### Basics
* [Installing on Linux/MacOS](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Linux%20and%20MacOS.md)
* [Installing on Windows](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Windows.md)
* [Connecting Prestashop, Sylius as backend ...](https://medium.com/@piotrkarwatka/how-to-connect-3rd-party-platform-to-vue-storefront-df9cb30779f6)
* [Pimcore data connector](https://github.com/DivanteLtd/pimcore2vuestorefront)
* [Data formats specification](https://github.com/magento-engcom/es-indexer/wiki)
* [Common problems](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Common%20problems.md)
* [Working with data](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md)
* [ElasticSearch data formats](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/ElasticSearch%20data%20formats.md)
* [Working with Service Workers](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20service-worker.md)

### Vue Storefront core and themes
* [Introduction to components in Vue Storefront](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Introduction%20to%20components.md)

### 'Default theme' contriribution rules
* [Working with stylesheets (CSS)](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20stylesheets%20(CSS).md)

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
If you like the idea behind Vue Storefront and want to become a contributor - do not hesitate and check our [list of the active issues](https://github.com/DivanteLtd/vue-storefront/issues) or contact us directly via vuestorefront@divante.co.

## Workshops and support
If you like our project and would like to learn more on how to create Progressive Web Apps you can ask us for dedicated workshop at your office! Conducted by Vue Storefront core contributors! All the profits are used for supporting Vue Storefront development. [Learn more](https://products.divante.co/vuestorefront/)

## The screenshots

<img width="880" alt="Vue Storefront - Annimations in the sidebar cart" src="https://user-images.githubusercontent.com/18116406/33559769-2840fb70-d90e-11e7-8f2b-298f35d1b412.gif">

<img width="880" alt="Vue Storefront - Annimations on producy card" src="https://user-images.githubusercontent.com/18116406/33560504-3105dac6-d910-11e7-847d-70ef8e944321.gif">

