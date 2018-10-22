# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2018.10.22

### Added
- Contact form mailer - #1875 - Akbar Abdrakhmanov @akbarik
- oauth2 configuration in setup - #1865 - Krister Andersson @Cyclonecode
- GraphQL schema extendibility in the API - Yoann Vié
- A lot of new docs - Natalia Tepluhina @NataliTepluhina
- Magento2 integrated importer 

### Changed
- New Modules API, and base modules (cart, wishlist, newsletter ...) refactored [read more...](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md) - Filip Rakowski @filrak

### Fixed
- The `regionId` field added to Order interface - #1258 - Jim Hil @jimcreate78
- SSR Memory leaks fixed - #1882 Tomasz Duda @tomasz-duda
- E2E tests fixed - #1861 - Patryk Tomczyk @patzik
- UI animations - #1857 - Javier Villanueva @jahvi
- Disabled buttons fixed - #1852 - Patryk Tomczyk @patzik
- Mailchimp / Newsletter modules rebuilt - Filip Rakowski @filrak
- Search component UX fixes - #1862 - Adrian Cagaanan @diboy2

## [1.4.0] - 2018.10.05

### Added
- GraphQL support - #1616 - Yuri Boyko @yuriboyko, Vladimir Plastovets @VladimirPlastovets => [PHOENIX MEDIA](https://www.phoenix-media.eu/)
- Layout switching + Advanced output mechanisms - #1787 - Piotr Karwatka @pkarw
- Dynamic config reload - #1800 - Piotr Karwatka @pkarw
- VuePress based docs - #1728 - Natalia Tepluhina - @NataliaTepluhina
- Output Cache - #1664, #1641 - Piotr Karwatka - @pkarw
- Instalation docs improvements - #1735 - Aleksander Grygier - @allozaur
- Magento Product Reviews support - Agata Firlejczyk @afirlejczyk, Tomek Kikowski @qiqqq
- Console silent mode (disabled by default) - #1752 - Piotr Karwatka - @pkarw

### Changed
- Please check the [Upgrade notes](https://github.com/DivanteLtd/vue-storefront/blob/develop/doc/Upgrade%20notes.md) for the full list

### Fixed
- `docker-compose.yml` files updated - @kovinka
- Non-core translations moved to theme resource files (i18n) - #1747 - David Rouyer @DavidRouyer
- Non-core assets moved to the theme - #1739, #1740 - David Rouyer @DavidRouyer
- Bug fixes: #1715, #1718, #1670
- NPM packages cleanup - #1748 - David Rouyer @DavidRouyer
- Filters were not updating - #1649 - Kacper Wierzbicki @vue-kacper
- Breadcrumbs on the product page - #1745 - Agata Firlejczyk @afirlejczyk
- Infinite scroll on mobile browsers - #1755 - Kacper Wierzbicki @vue-kacper
- Coupon codes - #1759 - Tomek Kikowski @qiqqq

## [1.3.0] - 2018.08.31

### Added
- TypeScript support - please check [TypeScript Action Plan](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/TypeScript%20Action%20Plan.md) for details
- New `core/modules` added regarding the [Refactor to modules plan](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/refactoring-to-modules.md)
- Price tier's support #1625
- Qty field on product page #1617
- Offline orders confirmation dialog has been added #1430
- `pwa-compat` library has been added to support fully PWA manifests on legacy browsers
- dynamic port allocation #1511

### Removed
- unused `libs`, `components`, `core/api/cart` webpack aliases
- `global.$VS` has been replaced with `rootStore` #1624

### Changed
- `core` directory is now a `@vue-storefront/core` package, webpack alias and all related imports reflect this change [#1513]
- `core/api` renamed to `core/modules`, mixin features moved to `core/modules/module_name/features`
- `core/lib/i18n` moved into separate `@vue-storefront/i18n` package

### Fixed
- installer paths are now normalized (to support paths including spaces) #1645
- status check added to the configurable_children products #1639
- product info update when clicking the related products #1601
- media gallery issues + mobile view
- product slider fixes #1561
- shipping carrier code is now passed with order #1520
- SEO support fixes #1514
- UX fixes
- bundle size optimizations (translations)
- password validation rules are now aligned (server/client) #1476

## [1.2.0] - 2018-08-01

### Fixed
- Improved integration tests [#1471]
- Minor taxcalc.js improvements [#1467]
- Search by SKU fixed [#1455]
- ProductList dbl click fix [#1438]

### Added
- Docker support for vue-storefront
- Production config docs added [#1450]
- Integration tests for Compare products added [#1422]
- Wishlist module refactored to the new core/api standard + unit tests [#1434]
- Dropdown components in MyProfile replaced with the base-select [#1463]
- Magento2/CMS integration by block/page identifiers [#1452]

## [1.1.0] - 2018-07-02

Please keep an eye on the **[UPGRADE NOTES](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Upgrade%20notes.md)**

### Fixed
- Zip Code validation [#1372]
- Get inpspired block [#968]
- Favicon [#836]
- Webpack config + refactoring [#1250]
- Account page updates [#1323]
- UI fixes [#901]
- Vuex Store extensions fixes [#1028, #1102]
- MS Edge + IE10 fixes [#1266]
- IndexedDB locking issue

### Added
- Added PM2 process manager [#1162]
- Added billing data phone number support [#1338]
- Added validation labels + generic control for CountrySelector [#1227]
- Offline mode Push Notification support [#1348, #1122, #1317]
- Added billing data phone number support [#1338]
- PoC of API refactoring for the cart module [#1316]
- Sort feature added [#671]
- Page loader [#1240]
- Production ready Docker config for vue-storefront-api

## [1.0.5] - 2018-06-04
### Fixed
- Shipping region fix
- Hotfix for missing config.storeViews.multistore check
- Minor fixes

## [1.0.4] - 2018-06-02
### Fixed
- defaultCountry fix for IT
- Tax classes hotfix
- tax_class_id is required by taxcalc - restored along with version inc
- Minor fixes

## [1.0.3] - 2018-06-02
### Fixed
- Minor fixes

## [1.0.2] - 2018-06-02
### Fixed
- vue-storefront-stripe renamed to vsf-payment-stripe hotfix
- Minor fixes

## [1.0.1] - 2018-05-31
### Fixed
- Minor fixes

## [1.0.0] - 2018-05-30
### Added
- __Multistore__ - now it's possible to manage the store views with all the features like translations, custom category, and products content, shipping rates - basically all Magento2 features are supported! You can read more on how to setup Multistore here.
- __Bundle products__ - support for the Magento-like bundle products with all the custom options, pricing rules etc.
- __Configurable options__ - that allows users to select radio/checkbox options + put some custom notes (textboxes) on the products they like to order,
- __Crossell, Upsell, Related products__ - are now synchronized with Magento2,
- __Webpack4 support__ - we've migrated from Webpack2 -> Webpack4 and now the build process takes much less time while providing some cool new features,
- __Core components refactor__ - without changing APIs, we've stripped the core components from s to improve the performance and improve the code readability,
- __PWA Manifest fixes__ - iOS PWA support required us to adjust some settings,
- __Improved translations__ - we're constantly tweaking the translation files :) We've just added it-IT and pl-PL (finally!) support recently
- __Improved Travis-CI pipeline__ - and added support for end-2-end testing,
- __Lot of bugfixes + UX fixes__ - countless hours spent on improving the code and UI quality!
- __Please check it out:__ visit: https://demo.vuestorefront.io/

## [1.0.0-rc.3] - 2018-04-29
### Added
- Performance tweaks: improved service worker config, reduced JSONs, two-stage caching,
- User token auto refresh,
- My Account fixes
- Translations: RU, IT
- UX fixes: navigation, notifications, product compare, product page
- Host and port setup in the config,
- Refactored Vuex store - prepared to be separated as the npm module which will give the Vue.js developers access to Magento backend
- Product Gallery,
- Infinite scroll,
- Product and Category page refactoring

## [1.0.0-rc.2] - 2018-03-29
### Added
- Basic Magento 1.9 support,
- Translations: ES, DE, NL, FR
- Lerna support for managing the npm packages within the one repository,
- Installer fixes (Linux support),
- Orders history,
- Discount codes support,
- Stripe Payments support,
- External Checkout support for Magento 2.x,
- Basic Travis checks,
- Other fixes.

## [1.0.0-rc.0] - 2018-03-01
### Added
- i18n (internationalization) support for the UI,
- Support for Magento2 dynamic cart totals - which enables the shopping cart rules mechanism of Magento to work with VS,
- ESlint-plugin-vue installed,
- CSS properties moved to atomic classes
- New SASS structure,
- Architectural change: core extracted from src - preparation for publishing the official npm package,
- Refactored vuex stores - we separated actions, getters and the state for better maintainability,
- UI improvements: look & feel, accessibility, color palette normalization,
- Assets can be now managed by theme developers,
- Service-workers and webpack config can be now extended by theme developers,
- Droppoints shipping methods (NL support) added.

## [0.4.0] - 2018-01-28
### Added
- Improved theming support + B2B product catalog theme included (original github repo); it's PoC made in just one week! Isn't it amazing that you can customize VS in just one week to this extent? :)
- Pimcore support (more on this, github repo)
- Customer's dashboard + address book, integration with Checkout
- Adjustments on product card on mobile
- Adjustments on home page on mobile
- Rebuilt checkout - UI + customer accounts support
- Google Analytics eCommerce extension
- order_2_magento rebuilt from scratch, supporting customer accounts and authorized carts
- Real-time cart synchronization with Magento - (last step before synchronizing the checkout promo rules with Magento!)
- Product comparison
- Themes refactor
- Lot of smaller tweaks

## [0.3.0] - 2017-12-21
### Added
- Bundle products support,
- Tax calculation regarding the Magento's logic for different rates per countries, states.
- User registration, log-in, password reset
- Refactor of Product and Category pages with support for updating product photos regarding selected filters (red t-shirts are now red on the list etc)
- MailChimp support,
- Stock Quantity check support
- Special prices for products (catalog rules) are now fully supported for simple, bundled and configurable products,
- 404 page,
- Checkout tweaks and refactor,
- Offline notification badge,
- Wishlist,
- Cookie notification bar
- Security improvements (checksums for client-side processed data)
- Lot of UI tweaks and refactors,
- Updated installer with support for Linux and MacOSX

## [0.2.1-alpha.0] - 2017-11-16
### Added
- Homepage
- Category page
- Product page
- Cart
- Checkout + validation
- Basic Search
- Magento2 synchronization: products, attributes, media, categories, orders
- Offline support using service workers + indexedDb
- PWA manifest + basic optimizations
- SSR support
- Filters + Configurable products
- RWD (except some checkout issues to be fixed)

## [0.2.0-alpha.0] - 2017-11-15
### Fixed
- Lazy loaded blocks size fixed


[Unreleased]: https://github.com/DivanteLtd/vue-storefront/compare/v1.0.5...HEAD

[1.0.5]: https://github.com/DivanteLtd/vue-storefront/compare/v1.0.4...v1.0.5

[1.0.4]: https://github.com/DivanteLtd/vue-storefront/compare/v1.0.3...v1.0.4

[1.0.3]: https://github.com/DivanteLtd/vue-storefront/compare/v1.0.2...v1.0.3

[1.0.2]: https://github.com/DivanteLtd/vue-storefront/compare/v1.0.1...v1.0.2

[1.0.1]: https://github.com/DivanteLtd/vue-storefront/compare/v1.0.0...v1.0.1

[1.0.0]: https://github.com/DivanteLtd/vue-storefront/compare/v1.0.0-rc.3...v1.0.0

[1.0.0-rc.3]: https://github.com/DivanteLtd/vue-storefront/compare/v1.0.0-rc.2...v1.0.0-rc.3

[1.0.0-rc.2]: https://github.com/DivanteLtd/vue-storefront/compare/v1.0.0-rc.0...v1.0.0-rc.2

[1.0.0-rc.0]: https://github.com/DivanteLtd/vue-storefront/compare/v0.4.0...v1.0.0-rc.0

[0.4.0]: https://github.com/DivanteLtd/vue-storefront/compare/v0.3.0...v0.4.0

[0.3.0]: https://github.com/DivanteLtd/vue-storefront/compare/v0.2.1-alpha.0...v0.0.3

[0.2.1-alpha.0]: https://github.com/DivanteLtd/vue-storefront/compare/v0.2.0-alpha.0...v0.2.1-alpha.0
