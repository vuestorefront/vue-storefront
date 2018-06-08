# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


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

## [0.4.0] - 2018-03-18
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

## [0.3.0] - 2018-03-18
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