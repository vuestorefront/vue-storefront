# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.9.2] - 2019.06.10

### Fixed
- Instant Checkout visible on  Safari - @przspa (#2991)
- Search Sidebar on Safari - @przspa (#2990)
- Country label style - @przspa (#2989)
- BaseInputNumber for qty of the product in the cart can change by using arrows - @przspa (#2988)
- Category load depending on zoom level - @przspa (#2704)
- Add yarn.lock to dockerfile build - @Flyingmana (#3006)
- Inconsistent behaviour of picture slider on PDP - @przspa (#2757)

## [1.9.1] - 2019.05.27

### Fixed
- Remove security vulnerabilities by updating project dependencies - @patzick (#2942)
- Fix Configurable Products not accessible in CSR when children visibility is set to "not visible individually" - @revlis-x (#2933)
- ProductTile placeholders are visible on SSR - @patzick (#2939)

## [1.9.0] - 2019.05.06

### Added
- The Url Dispatcher feature added for friendly URLs. When `config.seo.useUrlDispatcher` set to true the `product.url_path` and `category.url_path` fields are used as absolute URL addresses (no `/c` and `/p` prefixes anymore). Check the latest `mage2vuestorefront` snapshot and reimport Your products to properly set `url_path` fields - #2010 - @pkarw
- Unit tests of cart module written in jest - @lukeromanowicz (#2305)
- validation for UTF8 alpha and alphanumeric characters in most checkout fields - @lromanowicz (#2653)
- helper to process config urls with default endpoint host `config.api.host` - @patzick (#2858)

### Changed / Improved
- The `core/helpers` parsing URL methods exchanged to `query-string` package - @pkarw (#2446)
- Unit tests in Karma are now removed in favor of jest - @lukeromanowicz (#2305)
- Material Icons are loaded asynchronously - @JKrupinski, @filrak (#2060)
- Update to babel 7 - @lukeromanowicz (#2554)

### Fixed
- For first time setup of the SSR Cache, a local cache-version.json file is required. The path has been removed from .gitignore and a template has been added. - @rio-vps
- Gallery low quality image in offline mode when high quality already cached - @patzick (#2557)
- Payment issue when no address set - @szafran89 (#2593)
- Search component result message when search term is less than 3 letters - @robwozniak (#2561)
- Removed childSku parameter in url for non-configurable products when using urlDispatcher - @Aekal (#2605)
- Image lazy loading after SSR reload - @pkarw (#2641)
- Modules can add custom URL - @pkarw (#2601)
- Url routes fixes - @pkarw (#2598, #2645, #2614)
- Fix for shopping cart actions when the `cartId` has been cleared out - @pkarw (#2567)
- Fixed always common cache issue for multistore - @filrak (#2595)
- Checkout copy address data will sync on later change - @haukebri (#2661)
- Fixed Safari style for sort-by select - @haukebri (#2642)
- fixed My orders in My Profile not refreshed after putting an order - @filrak (#2559)
- Refreshing product page on mobile device - @patzick (#2484)
- ESlint throwing errors about undefined jest globals in tests - @lukeromanowicz (#2702)
- Fixed changing the country when entering shipping address in checkout not updating shipping costs - @revlis-x (#2691)
- Instant Checkout fix - @qiqqq (#2750)
- Infinite loop on multistore page after reload - @patzick (#2713)
- Refreshing MyAccount page on multistore - @patzick (#2780)
- "Toggle password visible" button in password fields works the right way - @lromanowicz (#2772)
- Range queries to elasticsearch - @oskar1233 (#2746)
- BaseInput has min height now to avoid jumping on forms - @patzick (#2771)
- Orders with invalid address don't stack anymore in the queue and have proper notification popup - @AndreiBelokopytov, @lukeromanowicz (#2663)
- Offline orders with out of stock products don't stack anymore and get canceled after going back to online - @lukeromanowicz (#2740)
- Build ServiceWorker on Docker - @patzick (#2793)
- Product image load after comming back to online - @patzick (#2573)
- Insufficent validation for city field in checkout address - @lromanowicz (#2653)
- Incorrect hover activity on the 'filter by categories' in the search view on mobile - @idodidodi (#2783)
- Unit tests written in JavaScript now support async/await functions and dynamic import - @michaelKurowski, @lukeromanowicz (#2851)

## [1.8.5] - 2019.04.17

### Fixed
- Memory leaks on SSR with Vue.use - @patzick (#2745)

## [1.8.4] - 2019.03.26

### Fixed
- Problem with incomplete category products load for offline use - @patzick (#2543)
- Category products view crash on scrolling down in offline mode - @patzick (#2569)
- Default propery issue for the col-xs-* classes - @cnviradiya (#2558)
- Wishlist and compare list not cached properly - @filrak (#2580)

### Changed / Improved
- Category and Homepage products are now cached for offline use on SSR entry - @patzick (@1698)

## [1.8.3] - 2019.03.03

### Added
- Payment Request API integration - @qiqqq (#2306)
- New reactive helper to check online state. Usage: `import { onlineHelper } from '@vue-storefront/core/helpers'` and then `onlineHelper.isOnline` - @patzick (#2510)
- Cart count config, allows you to display the item count instead of a sum of the item quantities - @pauluse (#2483)
- Video support in Product Gallery component. - @rain2o (#2433)

### Fixed
- Problem with placing second order (unbinding payment methods after first order) - @patzick (#2195, #2503)
- Remaking order on user orders page - @patzick (#2480)
- Images blinking on category page - @pkarw (#2523)
- state.ts not bound in the module-template - @pkarw (#2496)
- Validation in the Myprofile section for postcode field - @pkarw (#1317)
- Non-integer qty of product added to the cart - @pkarw (#2517)

### Changed / Improved
- Fixed an issue where the correct image for a product configuration wasn't set on the product page image carousel. Also added the fix on the productcarousel in the zoom component - @DaanKouters (#2419)
- Way of creating VS Modules was changed to use factory method instead of explict object creation. - @filrak (#2434)
- Added clear filters button on desktop also and only show if filters are applied - @DaanKouters (#2342)
- Improved docs at contributing.md and configuration.md (spelling etc.) - @ruthgeridema (#2421, #2422, #2423, #2425, #2426)
- Fixed design issue of Country label on Edge 17 & Firefox - @ananth-iyer (#2390, #2399)
- Wishlist and compare items are loaded from local cache only once, instead of every time when module component is rendered - @patzick (#2431)
- Country field is filled by first counry from the list in cart in paymen section - @RakowskiPrzemyslaw (#2428)
- Improved product quantity change component in product and cart - @patzick (#2398, #2437)
- Updated to Vue 2.6.6 - @filrak (#2456)
- Null sidebar menu data on static page fixed - @filrak (#2449, #2441)
- Fix cannot edit previous steps in checkout - @filrak, @patzick (#2438)
- Fixed route guard ssr problem - @vue-kacper (#2364)
- Fix links in footer to static pages bug - @filrak (#2452)
- Fix links at docs, Basics/Configuration file explained - @daksamit (#2490)
- Improve images loading on category page, corrected alt view and blinking problem - @patzick (#2465)
- Improve tsconfig for better IDE paths support - @patzick, @filrak (#2474)
- fix breadcrumbs changing too early - @filrak, @pkarw (#2469, #2529)
- improved product gallery load view, shows correct image on reload - @patzick (#2481, #2482, #2488, #2501)
- Fix an issue where the index.html template within a theme is ignored - @EnthrallRecords (#2489)
- Added async sidebar component with async off-screen components error handling and fetch retrying after coming back online - @filrak (#2408, #2451)
- Inconsistent filters behaviour - clear filters on page load - @patzick (#2435)
- fix price is never below 0 and user can't add 0 or below 0 products to cart - @RakowskiPrzemyslaw (#2437)
- Check for placing single order in case of error in any payment module - @patzick (#2409)
- Display prices in products added in offline mode. - @patzick (#2450)
- Updated cypress dependency for e2e tests - @lukeromanowicz (#2518)
- Improved styles on recommendation filters, product tile and numeric input - @patzick (#2458)

### Deprecated / Removed
- `@vue-storefront/store` package deprecated - @filrak

## [1.8.2] - 2019.02.11
- Fixed docker-compose configuration for network_mode and TS build config - @lukeromanowicz (#2415)

## [1.8.1] - 2019.02.10
This is hot-fix release for fixing the payment methods switching issue when both: `payments-cash-on-delivery` and `payments-backend-methods` modules enabled.

### Changed / Improved
 - Fixed doubled invlication of `placeOrder` when both: `payments-cash-on-delivery` and `payments-backend-methods` modules enabled - #2405

## [1.8.0] - 2019.02.07
Additional migration tips are available [here](https://github.com/DivanteLtd/vue-storefront/blob/master/docs/guide/upgrade-notes/README.md).

### Added
- Chinese translation added - @wadereye (#2265)
- Categories filter in search view - @kjugi, @patzick (#1710)
- AsyncDataLoader feature - @pkarw (#2300)
- Events list page in docs - @jablpiotrek (#776)
- Keyboard support for account and cookie close buttons - @anqaka (#2258)
- Support typescript in build scripts - @marlass, @patzick (#2260, #2273, #2324)
- Possibility to have sticky notifications - @phoenixdev-kl (#2307)
- Added a scss to manage global form style - @lorenaramonda (#2316)
- Manage products with zero price - @MarcoGrecoBitbull (#2327)
- Hotjar integration - @lukeromanowicz (#840)

### Changed / Improved
- Theme structure improvements - @filrak (#2223)
- Type interfaces and refactor - @filrak (#2227, #2267)
- Changed beforeRegistration and afterRegistration hooks signature. Now it contains only one object VSF. The subfields are the same as before so changing `beforeRegistration( Vue, config, store, isServer )` to `beforeRegistration({ Vue, config, store, isServer })`(and same with `afterRegistration`) is enough to make a proper migration to new API. - @filrak (#2330)
- Typo fixes - @youanden, Micheledinocera (#2229, #2329)
- Bundle products price calculation fix - @pkarw (#2371)
- Fixed isServer flag in module registration hooks - @lukeromanowicz (#840)
- Location of type files - @kruchy8 (#2226)
- Improved theme registration - @lukeromanowicz (#2233)
- SSR renderings for logged in users - @vue-kacper (#2234)
- ElasticSearch fuzzy search - @qbo-tech (#2340, #2354)
- Documentation improvements - @martaradziszewska, @wilfriedwolf, @fvillata, @pkarw (#2210, #2244, #2289, #2369)
- Support regional characters in urls - @Aekal (#2243)
- `store/lib/search` has been moved to `core/lib/search` - @lukeromanowicz (#2225)
- `store/lib/multistore` has been moved to `core/lib/multistore` - @lukeromanowicz (#2224)
- BaseSelect syntax improvements - @jszczech (#2237)
- Optional cart discounts display on  side cart - @mcspronko (#1758)
- Special price dates checking - backport of @igloczek's (#2245)
- Category filters reset functionality on mobile - @vue-kacper, @patzick, @renatocason (#2262)
- Improve sortBy mobile view - @martaradziszewska (#2251)
- Slide animations to menu, search, wishlist and minicart components - @Aekal (#2256)
- Fixed wishlist store module to not be lazy loaded - @vue-kacper (#2249)
- Share webpack typescript config with Docker container - @lukeromanowicz (#2269)
- After checkout create logged-in cart for logged-in users if using order Direct Backend Sync - @grimasod (#2302)
- Output cache clearing supports versioning - @igloczek (#2333, #2359)
- Cash on delivery + Shipping addresses fixed for virtual products - @pkarw (#2366)
- Improved static pages caching strategy - @pkarw (#2281)
- Magento 2.3 MSI work-around (it's still not supported fully) - @pkarw (#2366)
- Product zoom picture centered - @ptylek (#2178)
- Fixed tracking in analytics module - @jahvi (#2278)
- Improved merge the store modules array with extended module config - @DaanKouters (#2274)
- ElasticSearch fuzzy search, scoring, boosting + other improvements - @qbo-tech (#2340)
- Turned off compression plugin, nginx serves brotli compression  — @patzick (#2254)
- Improved user account menu UX on desktop - @vue-kacper (#2363)
- Added About us missing route - @lorenaramonda (#2320)
- Fixed used variable for products count in category - @renatocason (#2304)
- Override console with logger - @daaru00 (#2235)
- Fixed variable call about feedback email - @PhantomDraven (#2318)
- Output cache clearing versioning - @igloczek (#2333)
- Improved paddings on select fields - @patzick (#2361)
- Fixed lack of modal backdrop - @vue-kacper, @giuliachiola (#2319)
- Form validations and improvements - @vue-kacper (#2348, #2349, #2347)
- Changing product quantity in catr - @mdanilowicz (#2345)
- Product attribute values as array - @afirlejczyk (#2379)
- Improved fetching customAttributes - @afirlejczyk (#2107)
- Removed compare button from product mobile view - @patzick (#2370)
- Configurable options attribute descriptor - @pkarw (#2384)

## [1.7.3] - 2019.01.31
### Fixed
- Output cache between build, cache versioning added - @igloczek (#2309)
- Missing `no-ssr` wrapper around user specific content, which leads to broken app in production mode - @igloczek (#2314)

## [1.7.2] - 2019.01.28
### Fixed
- clear search filters on mobile - @patzick (#2282)
- SSR problem on checkout page on reload - @vue-kacper (#2220)
- Improved offline mode handlers - @pkarw (#2217)
- url_key adjustment after m2vs fix - @pkarw (#2215)
- Service worker removed from dev mode because of the side effects - @pkarw
- `networkFirst` first caching strategy for /api/catalog - @pkarw
- SSR detection in components - @patzick (#2173)

### Added
- Hotjar extension (#840)

### Changed
- compress banner images - @patzick (#2280)
- Dynamic attributes loader (#2137)
- Dynamic categories prefetching (#2076)
- New payment's module architecture (#2135)
- Support regional characters in urls - Backport of @aekal's (#2243)

### Added
- Translations of banners - @patzick (#2276)
- Banners title background on mobile - @patzick (#2272)
- New main site look - @patzick (#2266)

## [1.7.1] - 2019.01.15
### Fixed
- Corrected scrolled sidebar menu position

## [1.7.0] - 2019.01.15
### Added
- Dynamic categories prefetching — @pkarw #2100
- Per-route codesplitting for SSR pages — @patzick #2068
- async/await support — @patzick #2092
- IndexedDB replacement and new caching mechanism — @pkarw #2112
- Web Share module — @filrak #2143
- Backward compatibility option for dynamic attribute loader — @pkarw #2137
- Japanese translation — @moksahero #2150
- Dutch translation — @StefGeraets #2163
- Using meta_title and meta_description fields from Magento on product/category page — @qiqqq #2158
- Color mapping feature — @pkarw #2175
- Out of the box GZIP compression and sourcemap removal in prod mode — @patzick #2186

### Changed / Improved
- Invalidate output cache using POST - @Cyclonecode #2084
- NGNIX installation improvements for docs — @janmyszkier #2080
- HTML semantics improvements — @patzick #2094
- Lazy loading of non-critical third party libs and vendor optimization — @patzick @filrak @qiqqq
- Extra NL translation keys — @nlekv #2104
- Optimization for the number of attributes to be stored in Vuex store — @pkarw #1654
- Service Worker registration from any route — @patzick #2070
- Production setup docs improvements — @janmyszkier #2126
- Various changes and additions to our docs by @NataliaTepluhina
- Payment docs update — @pkarw #2135
- Added bash command for collecting i18n phrases to docs — @qbo-tech #2149
- SEO and scrolling performance fixes — @filrak #2066
- Established Vuex naming conventions. TLDR - we strongly recommend to use vuex getters instead of mapping state itself (#2069)
- IndexedDb changed to LocalStorage + ServiceWorker native caching (#2112)

### Fixed
- Fix Notification.vue compiling issue on prod - @ladrua #2079
- Fix wishlist toggle bug — @shkodasv #2086
- findConfigurableChildAsync — fix checking stock for configurable child — @afirlejczyk #2097
- Fix cart synchronization — @valeriish #2106
- Fix hydration issue for lazy loaded chunks — @patzick #2115
- Clear missing fields after user logout — @sniffy1988 #2117
- Fix AMP naming ( ^^ ) for docs -@pgol #2118
- Fix Cart Configurable Item pulled from Magento — @valeriish #2119
- Fix product configuration after cart items server pull — @valeriish #2122
- Fix gallery switching when entering product — @vue-kacper #2123
- Fix multiple placing order invocation after changing payment methods — @patzick #2133
- Remove extra space after every comma for non-(multi)select product attributes — @patzick #2133
- Fix side-menu scrolling — @patzick #2140
- Fix back button not properly working from a configurable product page — @qiqqq #2151
- Fix submenu not visible on a deeper level — @patzick #2152
- vue-carousel removed from homepage - @patzick #2153 #2154
- Use localized routes for redirects to home page and account page — @grimasod #2157
- ProductLinks fixed in Related products component — @pkarw #2168
- Fix Cart Configurable Item pulled from Magento loaded as Simple — @pkarw @valeriish #2169 #2181

### Depreciated
- extendStore depreciation - @filrak #2143
- ValidationError class depreciation - @filrak #2143

## [1.6.0] - 2018.12.05
### Added
- Lazy loading for SSR and non-SSR routes
- app splitted into modules

### Removed
- `vsf-payment-stripe` module integration removed from core

### Changed
- There is new config option `config.orders.directBackendSync` that changes the behavior of placing an order. Please do read  [more on this change](https://github.com/DivanteLtd/vue-storefront/commit/e73f2ca19a5d33a39f8b0fd6346543eced24167e) and [more on vue-storefront-api change](https://github.com/DivanteLtd/vue-storefront-api/commit/80c497f72362c72983db4fdcac14c8ba6f8729a8)
- ProductSlider, ProductLinks, ProductListing moved to theme.
- Many theme-related logic moved to theme (+ deleted empty core components just with `name`)
- Components required for backward compatibility moved to `compatibility` folder. For all this files you just need to add `compatibility` after `core` in import path to make them work like before.
- Better Vuex extensibility with modules
- VSModule `store` object changed to fulfil need of multiple vuex modules (see modules docs)
- UI Store logic for Microcart moved to cart module
- Extensions are now depreciated, theme-level extensions removed and src-level extension to be depreciated in 1.7
- Theme-starter depreciated and removed (will be replaced with theme 2.0)
- Header, Form components, (baseCheckbox, BaseInput, BaseRadioButton, BaseSelect, Basetextarea) Loader, MainSlider, Footer, SearchIcon, ForgotPass, SignUp and Modal core components moved to theme
- extendStore deprecaiated and moved to compatibility folder

## [1.5.0] - 2018.10.22

### Added
- Contact form mailer - #1875 - Akbar Abdrakhmanov @akbarik
- oauth2 configuration in setup - #1865 - Krister Andersson @Cyclonecode
- GraphQL schema extendibility in the API - Yoann Vié
- A lot of new docs - Natalia Tepluhina @NataliTepluhina
- Magento2 integrated importer
- 'Apply' filters button on mobile category - #1709 - Damian Fiałkiewicz @Aekal

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
- TypeScript support - please check [TypeScript Action Plan](https://github.com/DivanteLtd/vue-storefront/blob/master/docs/guide/basics/typescript.md) for details
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
