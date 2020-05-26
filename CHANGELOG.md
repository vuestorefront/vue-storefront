# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.11.4] - 2020.05.26

### Added


### Changed / Improved

- use yarn in cli installer - @gibkigonzo (#4292)
- disable out of stock notification when config.stock.allowOutOfStockInCart is true - @gibigonzo (#4340)


### Fixed

- Use LRU as object contructor based on newest changes in module - @gibkigonzo (#4242)
- Fixed ESC button action (minicart, wishlist) - @mdanilowicz (#4393)
- Fixes problems related to tax calculation and price filter in multistore setup - @juho-jaakkola (#4376)
- Blank order details page - @mdanilowicz (#4382)
- upadate cart hash after sync with backend - @gibkigonzo (#4387)
- exit from errorHandler after redirection - @gibkigonzo (#4246)
- add redirection in component for simple product related to configurable product - @gibkigonzo (#4359)
- disable sending carrier_code or method_code for virtual products,
  adjust vue-carousel and vuelidate to newest versions api,
  add aplha validators for register fields - @gibkigonzo (#4455, #4461)

## [1.11.3] - 2020.04.27

### Changed / Improved

- The default config file is now in more human-readable format - @juho-jaakkola (#4197)
- Create only once aside async component - @gibkigonzo (#4229, #4268)

### Fixed
- Fixes when having multiple custom options with overlapping option_type_id values, selecting 1 changes the others - @carlokok (#4196)
- Update eslint and fix code style. - @gibkigonzo (#4179 #4181)
- Fixes bug that caused addToCart action not to display messages to user - @juho-jaakkola (#4185)
- add missing cache tags for category and product - @gibkigonzo (#4173)
- add ssrAppId to avoid second meta render on csr - @gibkigonzo (#4203)
- take control over default broswer behavior and use saved category page size to load prev products - @gibkigonzo (#4201)
- update getCurrentCartHash after add/remove coupon - @gibkigonzo (#4220)
- update replaceNumberToString, so it will change ONLY numbers to string - @gibkigonzo (#4217)
- allow empty shipping methods in checkout - @gibkigozno (#4192)
- configure products before price update - this is needed to have variant sku as product sku - @gibkigonzo (#4053)
- omit stock and totals when creating cart hash, it is not needed to compare products - @gibkigozno (#4235, #4273)

## [1.11.2] - 2020.03.10

### Added

- Add `isBackRoute` that informs if user returns to route, skip loading products for category if he does - @gibkigonzo (#4066)
- Add server context to async data loader - @gibkigonzo (#4113)
- Add preload and preconnect for google font - @gibkigonzo (#4121)

### Changed / Improved

- optimizations - improved prefetch strategy - @gibkigonzo (#4080)
- improvements to Finnish translations - @evktalo (#4116)
- Radio button now allows separate checked, value and name attributes - @EndPositive (#4098)
- Update backwards compatible dependencies - @simonmaass (#4126)

### Fixed

- add disconnect and sync options for cart/clear - @gibkigonzo (#4062)
- add '1' as searched value for 'is_user_defined' and 'is_visible' (createAttributesListQuery) - @gibkigonzo (#4075)
- Fix possibility to add same SKU with different custom options to the cart - @Michal-Dziedzinski (#3595)
- Fix `calculateProductTax` to find matching tax rules from ES for current product - @DylannCordel (#4056)
- Set `totals` in products in cart always in reactive way - @psmyrek (#4079)
- Fix sync cart between tabs - @Michal-Dziedzinski (#3838)
- Add currentRoute to url module and return cached requests - @gibkigonzo (#4077, #4066)
- Hide original radio button behind built label - @EndPositive (#4098)
- Disable overriding `route` state in **INITIAL_STATE** - @gibkigonzo (#4095)
- Fix gtm order placement event when user was guest - @Michal-Dziedzinski (#4064)
- Fix gtm event switched properties - @Michal-Dziedzinski (#4106)
- Group 'productChecksum' and 'productsEquals' logic for all supported products types. Remove 'checksum' when editing product.
  Remove and add coupon when user login Remove 'NA' as default company. Show qty in microcart for all types of product.
  Remove preload font - it gives good performance, but vue-meta refresh page, because there is script onload. - @gibkigonzo (#4128)
- Keep old category before route is resolved - @gibkigonzo (#4124)
- Added comments in 'productsEqual' and change logic for different types of products. Remove login user after order in Checkout. Allow changing qty for 'group' and 'bundle'.products - @gibkigonzo (#4144)
- Fix incorrect root categories when extending includeFields - @Michal-Dziedzinski (#4090)
- Add onlyPositive prop to BaseInputNumber to not allow user type negative value - @Michal-Dziedzinski (#4136)
- Await for cart/authorize while login user - @gibkigonzo (#4133)
- Fixed `NOT_ALLOWED_SSR_EXTENSIONS_REGEX` to only match with file extensions having a dot - @haelbichalex (#4100)
- Add lazy load for vue-carousel - @gibkigonzo (#4157)

## [1.11.1] - 2020.02.05

### Added

- Add `ProductPrice` component with bundleOptions and customOptions prices - @gibkigonzo (#3978)
- Add lazy create cart token - @gibkigonzo (#3994)

### Changed / Improved

- Set cache tag when loading a category - @haelbichalex (#3940)
- In development build `webpack.config.js` in theme folder is now called without the `default` key - @psmyrek

### Fixed

- Added Finnish translations - @mattiteraslahti and @alphpkeemik
- Updated Estonian translations to match 1.11 - @alphpkeemik
- CookieNotification CSR&SSR mismatch fixed - @Fifciu (#3922)
- The attribute filter in `attribute/list` was not filtering the already loaded attributes properly - @pkarw (#3964)
- Update `hasProductErrors` in Product component and support additional sku in custom options - @gibkigonzo (#3976)
- Fixed logic for generating \${lang}.json files in multi-store setup - @jpkempf
- Fixed logic for collecting valid locales in single-store, multi-lang setup - @jpkempf
- Make initial custom option value reactive - @gibkigonzo
- Fixed No image thumbnails leaded on 404 page - @andrzejewsky (#3955)
- Fixed Stock logic not working with manage_stock set to false - @andrzejewsky - (#3957)
- Support old price format in `ProductPrice` - @gibkigonzo (#3978)
- Fixed product bundle comparison condition - @gk-daniel (#4004)
- Add event callback for checkout load initial data - @gibkigonzo(#3985)
- Fixed `Processing order...` modal closing too early - @grimasod (#4021)
- Keep registered payment methods after `syncTotals` - @grimasod (#4020)
- Added status code to the cache content and use it in cache response - @resubaka (#4014)
- Fixed sku attribute is missing on compare page - @gibkigonzo (#4036)
- Fixed z-index for aside in compare list - @gibkigonzo (#4037)
- Disable checking max quantity when manage stock is set to false - @gibkigonzo (#4038)
- Add products quantity only when token is created - @gibkigonzo (#4017)
- Revert init filters in Vue app - add storeView to global/store and pass it to filters - @gibkigonzo (#3929)
- Fix v-model not working in BaseRadioButton - @lukeromanowicz (#4035)
- always keep filters values as array of object - @gibkigonzo (#4045)
- Fix ecosystem config to work with ts-node - @andrzejewsky (#3981)

## [1.11.0] - 2019.12.20

### Added

- Add unit tests for `core/modules/url` - @dz3n (#3469)
- Add unit test for `core/modules/checkout` - @psmyrek (#3460)
- Add defense against incomplete config in ssr renderer - @oskar1233 (#3774)
- Add unit tests for `core/modules/order` - @dz3n (#3466)
- Add unit tests for `core/modules/user` - @dz3n (#3470)
- Add to cart from Wishlist and Product listing for simple products - @Dnd-Dboy, @dz3n (#2637)
- Add global Category and Breadcrumb filters, defined in local.json - @grimasod (#3691)
- Add constant which conditions the number of products loading per page - @AdKamil (#3630)
- Added price filtering key as config - @roywcm

### Fixed

- Fixed missing parameter to query function from cms/store/block/actions - @georgiev-ivan (#3909)
- Always close zoom overlay after changing product - @psmyrek (#3818)
- Fixed problem with cutting image height in category page on 1024px+ screen res - @AdKamil (#3781)
- Fixed null value of search input - @AdKamil (#3778)
- Fixed product sorting - @AdKamil (#3785)
- Fixed displaying `sale` and `new` mark - @andrzejewsky (#3800)
- Fixed sorting on category page and product tile sizing - @andrzejewsky (#3817)
- Redirect from simple product using url_path - @benjick (#3804)
- Mount app in 'beforeResolve' if it's not dispatched in 'onReady' - @gibkigonzo (#3669)
- Fixed AMP pages - @andrzejewsky (#3799)
- Fixed Product page breadcrumbs problem when products are in multiple categories in different branches of the category tree - @grimasod (#3691)
- Change translation from jp-JP to ja-JP - @gibkigonzo (#3824)
- Fixed ecosystem config for pm2 - @andrzejewsky (#3842)
- Fixed `mappingFallback` for extending modules - @andrzejewsky (#3822)
- Fixed adding products search results to category-next product store - @grimasod (#3877)
- Use `defaultSortBy` for sorting category products by default @haelbichalex (#3873)
- Fixed some potential mutations of Config object in `catalog` and `catalog-next` - @grimasod (#3843)
- Set `null` as default value for custom option in product page - @gibkigonzo (#3885)
- Fixed Breadcrumb filters - apply to second category fetch - @grimasod (#3887)
- Fixed `config.storeViews.commonCache` being ignored - @grimasod (#3895)
- Fixed static pages, password notification, offline mode #3902 - @andrzejewsky (#3902)
- Fixed error page display with enabled multistore - @gibkigonzo (#3890)
- Fixed edit shipping address in my account - @gibkigonzo (#3921)
- Fetch cms_block content in serverPrefetch method - @gibkigonzo (#3910)
- Fixed saving invalidated user token - @andrzejewsky (#3923)
- Keep category products objects on ssr - @gibkigonzo (#3924)
- product breadcrumbs - check if current category is not highest one - @gibkigonzo (#3933)

### Changed / Improved

- Changed pre commit hook to use NODE_ENV production to check for debugger statements - @resubaka (#3686)
- Improve the readability of 'getShippingDetails()' and 'updateDetails()' method of UserShippingDetails component - @adityasharma7 (#3770)
- Keep git after yarn install in dockerfile - @ddanier (#3826)
- Update the Storage Manager shipping details cache immediately when then Vuex checkout store is updated - @grimasod (#3894)

## [1.11.0-rc.2] - 2019.10.31

### Added

- Add defense for incomplete config in preferchCachedAttributes helper
- Add unit test for \`core/modules/cms\` - @krskibin (#3738)

### Fixed

- Fixed deprecated getter in cmsBlock store - @resubaka (#3683)
- Fixed problem around dynamic urls when default storeView is set with appendStoreCode false and url set to / . @resubaka (#3685)
- Fixed three problems you can run into when you have bundle products - @resubaka (#3692)
- Reset nested menu after logout - @gibkigonzo (#3680)
- Fixed handling checkbox custom option - @gibkigonzo (#2781)
- Fixed typos in docs - @afozbek (#3709)
- Fixed VSF build fails for some people due to lack of dependencies in the container - @krskibin (#3699)
- Fixed two graphql problems, one with cms_blocks and the other with default sort order - @resubaka (#3718)
- Allow falsy value for `parent_id` when searching category - @gibkigonzo (#3732)
- Remove including .map files in service worker cache - @gibkigonzo (#3734)
- Changed notification message object to factory fn - @gibkigozno (#3716)
- Load recently viewed module in my account page - @gibkigonzo (#3722)
- Added validation message for city field on checkout page - @dz3n (#3723)
- Make price calculation based on saved original prices - @gibkigonzo (#3740)
- Improving is_comparable to work with booleans and digits - @dz3n (#3697)
- Fixed displaying categories on search menu - @andrzejewsky (#3758)
- Fixed broken link for store locator - @andrzejewsky (#3754)
- Fixed instant checkout functionality - @andrzejewsky (#3765)
- Fixed links to the promoted banners - @andrzejewsky (#3753)
- Fixed missing parameter in the compare list - @andrzejewsky (#3757)
- Fixed product link on mobile - @andrzejewsky (#3772)
- Custom module `ConfigProvider` aren't called anymore - @cewald (#3797)

### Added

- Added Estonian translations - @alphpkeemik
- Added support for ES7 - @andrzejewsky (#3690)
- Added unit tests for `core/modules/mailer` - @krskibin (#3710)
- Get payment methods with billing address data - @rain2o (#2878)
- Added custom page-size parameter for `category-next/loadCategoryProducts` action - @cewald (#3713, #3714)
- Remove unused dayjs locales - @gibkigonzo (#3498)
- check max quantity in microcart - @gibkigonzo (#3314)
- Add unit tests for `core/modules/newsletter` - @psmyrek (#3464)
- Add unit test for `core/modules/wishlist` - @psmyrek (#3471)

### Changed / Improved

- Use `encodeURIComponent` to encode get parameters in `multimatch.js` - @adityasharma7 (#3736)

## [1.11.0-rc.1] - 2019.10.03

### Added

- Add unit testing to Husky on pre-push hook - @mattheo-geoffray (#3475)
- Add unit testing on breadcrumbs feature - @mattheo-geoffray (#3457)
- HTML Minifier has been added, to enable it please switch the `config.server.useHtmlMinifier` - @pkarw (#2182)
- Output compression module has been added; it's enabled by default on production builds; to disable it please switch the `src/modules/serrver.ts` configuration - @pkarw (#2182)
- Sort CSV i18n files alphabetically in pre-commit Git hook - @defudef (#2657)
- Cache invalidate requests forwarding support - @pkarw (#3367)
- Extend storeview config after another storeview in multistore mode - @lukeromanowicz (#3057, #3270)
- Default storeview settings are now overridden by specific storeview settings - @lukeromanowicz (#3057)
- Apache2 proxy header support for store based on host - @resubaka (#3143)
- Items count badges for Compare products and wishlist icons at header - @vishal-7037 (#3047)
- Added product image in order summary - @obsceniczny (#2544)
- Add icons on the product tiles that allow to add to the wish list and to the list to compare products from the list of products - @Michal-Dziedzinski (#2773)
- Get also none product image thumbnails via API - @cewald, @resubaka (#3207)
- Added a config option `optimizeShoppingCartOmitFields` - @EmilsM (#3222)
- Added information on the number of available products - @Michal-Dziedzinski (#2733)
- Added possibility to change color or size of the product that is already in the cart - @andrzejewsky (#2346)
- Experimental static files generator - @pkarw (#3246)
- Added price formatting based on locales in multistore - @andrzejewsky (#3060)
- Added support for tax calculation where the values from customer_tax_class_ids is used - @resubaka (#3245)
- Added loading product attributes (`entities.productListWithChildren.includeFields`) on category page - @andrzejewsky (#3220)
- Added config to set Cache-Control header for static assets based on mime type - @phoenix-bjoern (#3268)
- Improve `category-next/getCategoryFrom` and `category-next/getCurrentCategory` to be more flexible - @cewald (#3295)
- Added test:unit:watch with a workaround of a jest problem with template strings - @resubaka (#3351)
- Added test to multistore.ts so it is nearly fully unit tested - @resubaka (#3352)
- Added test:unit:watch with a workaround of a jest problem with template strings - @resubaka (#3351, #3354)
- Added test to helpers/index.ts so it is partly tested - @resubaka (#3376, 3377)
- Added hooks in cart module - @andrzejewsky (#3388)
- Added config for the defaultTitle compitable with multistore - @cnviradiya (#3282)
- Added husky package to manage lint check only for staged files in git @lorenaramonda (#3444)
- Change text from "is out of the stock" to "is out of stock" - @indiebytes (#3452)
- Added general purpose hooks - @andrzejewsky (#3389)
- Added loading of your own searchAdaptor - @resubaka (#3405K)
- Added lazy hydration for home page - @filrak (#3496, #3565)
- Added i18n support for modules - @dz3n (#3369)
- Added support for creating localized child routes - @gibkigonzo (#3489)
- Added tests for actions and mutations in 'core/modules/recently-viewed' - @gibkigonzo (#3467)
- Added tests for actions, mutations and components in 'core/modules/compare' - @gibkigonzo (#3467)
- Added support to load tracing libs at the start of the app - @resubaka (#3514, #3566)
- Added tests for actions and mutations in 'core/modules/notification' - @gibkigonzo (#3465)
- Added tests for actions, mutations and helpers in 'core/modules/review' - @gibkigonzo (#3468)
- Add new Google-Tag-Manager module using new module registration - @cewald (#3524, #3509)
- Exclude GTM product attributes setup into config json - @dlandmann, @cewald (#3509, #3524)
- Add configuration option to format currency sign placement and space in price - @cewald (#3574)
- Add ability to pass `pageSize` and `currentPage` to order history API call for pagination - @rain2o
- Added italian translations - @lorenaramonda (3076)
- Route Manager Queue for adding routes efficiently and with an optional priority - @grimasod (#3540)
- Added tests for cart module actions - @andrzejewsky (#3023)
- Fixed a problem with type changes in the state when extending a store - @resubaka (#3618)

### Fixed

- Attributes loader, breadcrumbs loader fixes - @pkarw (#3636)
- Fix for the product attribute labels displayedd on the PDP - @pkarw (#3530)
- Fix the mix of informal and polite personal pronouns for German translations - @nhp (#3533)
- Fix for comparison list being not preserved between page reloads - @vue-kacper (#3508)
- Fix 'fist' typos - @jakubmakielkowski (#3491)
- Fix for wrong breadcrumb urls in the multistore mode - @pkarw (#3359)
- Fix for displaying gallery images for unavaialble product variants - @pkarw (#3436)
- Fix for `null` in search query input - @pkarw (#3474)
- Unable to place order has been fixed; the `entities` module was wrongly imported - @pkarw (#3453)
- Fixed product link in wishlist and microcart - @michasik (#2987)
- Fixed naming strategy for product prices - `special_priceInclTax` -> `special_price_incl_tax`, `priceInclTax` -> `price_incl_tax`, `priceTax` -> `price_tax`; old names have been kept as @deprecated - @pkarw (#2918)
- The `final_price` field is now being used for setting the `special_price` or `price` of the product (depending on the value); `final_price` might been used along with `special_price` with Magento for the products with activated catalog pricing rules - @pkarw (#3099)
- Resolve problem with getting CMS block from cache - @qiqqq (#2499)
- Make image proxy url work with relative base url - @cewald (#3158)
- Fixed memory leak with enabled dynamicConfigReload - @dimasch (#3075)
- Fixed error for the orderhistory null for google-tag-manager extension - @cnviradiya (#3195)
- Fixed swatches not rendering properly at product detail page issue - @vishal-7037 (#3206)
- Fixed label of configurable options in cart after product just added - @cheeerd (#3164)
- Fixed eslint warning in Product Page, removed v-if from v-for node - @przspa (#3181)
- Fixed aspect ratio in ProductImage component - @przspa (#3187)
- Fixed AMP Product page - @przspa (#3227)
- Fixed when store has updated, but plugin didn't called - @serzilo (#3238)
- Fixed first call of prepareStoreView when SSR - @resubaka (#3244)
- Add ./packages as volume to docker-compose.yml - @cewald (#3251)
- Fixed mail sending and add error logger - @Michal-Dziedzinski (#3265)
- Fixed page not found http status code - @phoenix-bjoern (#3243)
- Fixed missing coupon code after user logged in - @andrzejewsky (#3153)
- Fixed bug around appendStoreCode in formatCategoryLink. - @resubaka (#3306)
- Fixed static category links in cms contents on homepage and MinimalFooter - @MariaKern (#3292)
- Fixed tax calulaction where products was send as parameter but products.items where the right paramater - @resubaka (#3308)
- Fixed module extendStore for array property inside store - @przspa (#3311)
- Fixed ordering of the categories and subcategories in sidebar - @andrzejewsky (#2665)
- Some SSR problems with urlDispatcher during multireloading page - @patzick (#3323)
- Fixed two bugs in `category-next/getCategoryFrom` (#3286) and `category-next/getCurrentCategory` (#3332) - @cewald (#3295)
- Fixed login popup close icon position - @przspa (#3393)
- Fixed styles for original price on Wishlist sidebar - @przspa (#3392)
- Redirect loop on dispatching dynamic routes in CSR running multistore mode - @cewald, @lukeromanowicz, @resubaka (#3396)
- Adjusted ProductVideo props to right names - @przspa (#3263)
- Fixed Doubled SKU row in compare tab - @manvendra-singh1506 (#3447)
- Fixed warning in product details because of duplicate `product` property in `AddToCompare` mixin - @cewald (#3428)
- Fixed adding unconfigured product to cart from homepage - @lukeromanowicz (#3512)
- Fixed "Clear Wishlist" Button - @dz3n (#3522)
- Fixed hash in dynamically resolved urls causing resolving issues - @lukeromanowicz (#3515)
- Fix invalid routes in ButtonOutline and ButtonFull - @lukeromanowicz (#3541, #3545)
- Fix adding notification with 'hasNoTimeout' after normal notification - @gibkigonzo (#3465)
- Logged-in user's shipping address on checkout page - @przspa (#2636)
- Fix for the "add to cart" test
- Fixed error with dayjs when locale is 2-digit (without a '-') @rain2o (#3581)
- Fix applying coupon - @andrzejewsky (#3578)
- Prevent caching storage instance in plugin module scope - @gibkigonzo (#3571)
- Fixed incorrect image sizes in related section on product page - @andrzejewsky (#3590)
- Fix typo on default language - @lorenaramonda (#3076)
- Remove race condition while loading locale messages - @gibkigonzo (#3602)
- Fix displaying same country twice in the in the country switcher - @andrzejewsky (#3587)
- Fixed resolving store code on SSR - @andrzejewsky (#3576)
- Clear user data if error occurs while login - @gibkigonzo (#3588)
- Fix loading bestsellers on 404 error page - @andrzejewsky (#3540)
- Remove modifying config by reference in multistore - @gibkigonzo (#3617)
- Add translation key for add review - @gibkigonzo (#3611)
- Add product name prop to reviews component - @gibkigonzo (#3607)
- Show default cms pages when current store code is not equals to default - @andrzejewsky (#3579)
- Fix login errors with mailchimp - @gibkigonzo (#3612)
- Hydration error on homepage - @patzick (#3609)
- Fix adding products with custom options - @andrzejewsky (#3597)
- check silentMode in errors on the same level as task.silent - @gibkigonzo (#3621)
- Add missing parameters (`size`,`start`) to `quickSearchByQuery()` in `attribute/list` action - @cewald (#3627)
- Fix breadcrumb homepage link in cms static pages - @andrzejewsky (#3631)
- Fixed special price that can break when you change pages (browser navigation for/back) or just go from category to product page - @resubaka (#3638)
- Fixed problem with losing browser history - @andrzejewsky (#3642)
- Fixed wrong links on the static pages - @andrzejewsky (#3659)
- Fixed problem with changing quantity in offline mode on product page - @andrzejewsky (#3662)
- Fixed problem with extending storeView configuration - @andrzejewsky (#3655)
- Removed infinite loop when changing checkbox in shipping details - @gibkigonzo (#3656)
- Fixed displaying single order in the profile - @andrzejewsky (#3663)
- Make microcart ui consistent for all types of products - @gibkigonzo (#3673)
- Fixed missing storeCode in metaInfo - @andrzejewsky (#3674)
- Removed showing popup when you have just logged out - @andrzejewsky (#3680)

### Changed / Improved

- Change Product quantity field validation - @jakubmakielkowski (#3560)
- Update confirmation page in offline mode - @jakubmakielkowski (#3100)
- Removed server order id from ThankYouPage - @federivo (#3480)
- Shipping address is saved as default when not logged in user chooses to create account during checkout - @iwonapiotrowska (#2636)
- The `attribute.list_by_id` and `attribute.list_by_code` from the `window.__INITIAL_STATE__` which could be even up to 50% of the product page size. - @pkarw (#3281)
- Can set transition style for Modal content - @grimasod (#3146)
- Added stock to cart items - @cheeerd (#3166)
- Moves theme specific stores and components into themes - @michasik (#3139)
- Decreased the `localStorage` quota usage + error handling by introducing new config variables: `config.products.disablePersistentProductsCache` to not store products by SKU (by default it's on). Products are cached in ServiceWorker cache anyway so the `product/list` will populate the in-memory cache (`cache.setItem(..., memoryOnly = true)`); `config.seo.disableUrlRoutesPersistentCache` - to not store the url mappings; they're stored in in-memory cache anyway so no additional requests will be made to the backend for url mapping; however it might cause some issues with url routing in the offline mode (when the offline mode PWA installed on homescreen got reloaded, the in-memory cache will be cleared so there won't potentially be the url mappings; however the same like with `product/list` the ServiceWorker cache SHOULD populate url mappings anyway); `config.syncTasks.disablePersistentTaskQueue` to not store the network requests queue in service worker. Currently only the stock-check and user-data changes were using this queue. The only downside it introuces can be related to the offline mode and these tasks will not be re-executed after connectivity established, but just in a case when the page got reloaded while offline (yeah it might happen using ServiceWorker; `syncTasks` can't be re-populated in cache from SW) - @pkarw (#3180)
- Translation file improvements - @vishal-7037 (#3198)
- Added configuration for max attempt task & cart by pass - @cnviradiya (#3193)
- Added catching of errors when ES is down - @qiqqq
- Added debounce for updating quantity method in the cart - @andrzejewsky (#3191)
- New modules API and rewrite - @filrak, @JCown (#3144)
- Refactored the vuex user module - @andrzejewsky (#3095)
- Brazilian Portuguese (pt_BR) translation improved - @pxfm (#3288)
- Moved store/lib to /lib - @pxfm (#3253)
- Corrected usage of "configurableChildrenStockPrefetchStatic" setting, refactored logic to tested helper - @philippsander (#859)
- Improved some of the german translations in spelling and wording - @MariaKern (#3297)
- Added lazy-hydrate for category products - @andrzejewsky (#3327)
- Refactored vuex order module - @andrzejewsky (#3337)
- Changed body no-scroll behavior for overlapped element - @przspa (#3363)
- `config.dynamicConfigReload` option should use deep copy for `Object.assign()` - @cewald (#3372)
- Add translation for the defaultTitle - @cnviradiya (#3282)
- Refactored vuex tax module - @andrzejewsky (#3337)
- Refactored vuex stock module - @andrzejewsky (#3337)
- Removed extra unnecessary code from BaseInputNumber - @cnviradiya (#3410)
- Refactored vuex checkout module - @andrzejewsky (#3337)
- Moved my-account authentication guard to MyAccount core page - @przspa (#3325)
- Refactored vuex compare module - @andrzejewsky (#3337)
- Refactored vuex whishlist module - @andrzejewsky (#3337)
- Refactored vuex cms module - @andrzejewsky (#3337)
- Refactored vuex review module - @andrzejewsky (#3337)
- Refactored vuex newsletter module - @andrzejewsky (#3337)
- Changed type of Id fields related to product, category and attribute to support numeric as well as string - @adityasharma7 (#3456)
- Optimized fetching product data on homepage - @lukeromanowicz (#3512)
- `localizedRoute()` now supports path (and prefers over fullPath) in LocalizedRoute objects - @lukeromanowicz (#3515)
- Move setting review_status from VSF to VSF-API - @afirlejczyk
- `localizedRoute()` doesn't return urlDispatcher routes anymore. Use localizedDispatcherRoute instead - @lukeromanowicz (#3548)
- Improved scrolling in Safari on iOS devices (sidebars) - @phoenixdev-kl (#3551)
- Improved cookie and offline badges (z-index, overflow) - @phoenixdev-kl (#3552)
- Improved translations: Replaced concatenations with "named formatting" (see http://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting) - @phoenixdev-kl (#3550)
- Added `filterMinimumShouldMatch` to ES queries in order to support ES7 - @pkarw (#1692)
- Pass `RouteManager` as proxy for router.addRoutes - @gibkigonzo (#3479)
- Added generic types to hooks - @gibkigonzo
- Change sku to string when checking products equality - @gibkigonzo (#3606)
- Pass to `registerModule` all parameters as one object - @gibkigonzo (#3634)
- Include shipping address data in request for shipping methods for more accurate filtering - @rain2o (#2515)
- remove 'disabled' flag in storeViews config - @gibkigonzo (#3659)

## [1.10.5] - 28.11.2019

### Fixed

- Disable product mutation when assigning product variant - @gibkigonzo (#3735)
- Fix issue with Cannot assign to read only property 'storeCode' - @yuriboyko (#3748)
- Render correct category links when multistore is active - @gibkigonzo (#3753)
- Disable product mutation when assigning product variant - @gibkigonzo (#3735)
- Fixed null value of search input - @AdKamil (#3778)
- Sorting fixed on category page - @AdKamil (#3785)
- Mount app in 'beforeResolve' if it's not dispatched in 'onReady' - @gibkigonzo (#3669)
- change translation from jp-JP to ja-JP - @gibkigonzo (#3824)
- Fix product images, my account link, warnings in console - @andrzejewsky (#3850)

## [1.10.4] - 18.10.2019

### Fixed

- Added try/catch for fetching single product in cart synchronization - @gibkigonzo (#3632)
- Removed infinite loop when changing checkbox in shipping details - @gibkigonzo (#3656)
- Remove modifying config by reference in multistore - @gibkigonzo (#3617)
- Fix displaying same country twice in the in the country switcher - @andrzejewsky (#3587)
- Remove race condition while loading locale messages - @gibkigonzo (#3602)
- Fixed special price that can break when you change pages (browser navigation for/back) or just go from category to product page - @resubaka (#3638)
- Change sku to string when checking products equality - @gibkigonzo (#3606)
- Fixed problem with losing browser history - @andrzejewsky (#3642)
- Fixed resolving store code on SSR - @andrzejewsky (#3576)
- Fixed styles for original price on Wishlist sidebar - @przspa (#3392)
- Added debounce for updating quantity method in the cart - @andrzejewsky (#3191)
- Improved scrolling in Safari on iOS devices (sidebars) - @phoenixdev-kl (#3551)
- Improved cookie and offline badges (z-index, overflow) - @phoenixdev-kl (#3552)
- Added config to set Cache-Control header for static assets based on mime type - @phoenix-bjoern (#3268)
- Added catching of errors when ES is down - @qiqqq
- `localizedRoute()` doesn't return urlDispatcher routes anymore. Use localizedDispatcherRoute instead - @lukeromanowicz (#3548)
- Fixed hash in dynamically resolved urls causing resolving issues - @lukeromanowicz (#3515)
- `localizedRoute()` now supports path (and prefers over fullPath) in LocalizedRoute objects - @lukeromanowicz (#3515)
- Decreased the `localStorage` quota usage + error handling by introducing new config variables: `config.products.disablePersistentProductsCache` to not store products by SKU (by default it's on). Products are cached in ServiceWorker cache anyway so the `product/list` will populate the in-memory cache (`cache.setItem(..., memoryOnly = true)`); `config.seo.disableUrlRoutesPersistentCache` - to not store the url mappings; they're stored in in-memory cache anyway so no additional requests will be made to the backend for url mapping; however it might cause some issues with url routing in the offline mode (when the offline mode PWA installed on homescreen got reloaded, the in-memory cache will be cleared so there won't potentially be the url mappings; however the same like with `product/list` the ServiceWorker cache SHOULD populate url mappings anyway); `config.syncTasks.disablePersistentTaskQueue` to not store the network requests queue in service worker. Currently only the stock-check and user-data changes were using this queue. The only downside it introuces can be related to the offline mode and these tasks will not be re-executed after connectivity established, but just in a case when the page got reloaded while offline (yeah it might happen using ServiceWorker; `syncTasks` can't be re-populated in cache from SW) - @pkarw (#2985)
- Fixed evaluate detailsLink in the cookie notification - @benjick (#3689)

## Added

- Added german translations - @schwerdt-ke (3076)

## [1.10.3] - 2019.09.18

### Fixed

- Broken sidebar menu in mobile view - @przspa (#3549)
- UrlDispatcher issues with multistore routes - @pkarw (#3568)

## [1.10.2] - 2019.09.06

### Fixed

- Product image is missing on PDP - @przspa, @NavaneethVijay (#3483)
- Mounting app when routes are resolved, should completly remove recent SSR errors - patzick (#3499)
- Fixed `categoriesDynamicPrefetchLevel` that now can be equal to 0 - @pkarw (#3495)

## [1.10.1] - 2019.09.03

### Fixed

- Invalid Discount code error handled by theme - @grimasod (#3385)
- Fallback for empty value or no_selection child image - @ngongoll (#3397)
- `order.order_id` was not assigned in the `orders.directBackendSync` mode - @pkarw (#3398)
- Hydration problems with UrlDispatcher :rocket: - @patzick (#3412)
- if condition of quoteId from the `_serverDeleteItem` method on core/modules/cart/store/action.ts - @AshishSuhane (#3415)
- Router beforeEach hooks running many times - @grimasod (#3443)
- test:unit:watch with a workaround of a jest problem with template strings - @resubaka (#3450, #3351)
- changed the theme test path so test in theme are going to work - @resubaka (#3455)

## [1.10.0] - 2019.08.10

### Added

- Cast cart_id as string - Order schema expects string, Magento does not generate a string as cart id in every case - @DaanKouters (#3097)
- Make installer work for windows - @Flyingmana (#2616)
- "Clear cart" button in the cart - @jablpiotrek (#2587)
- Global config api path under `api.url` - @BartoszLiburski (#2622)
- Google Tag Manager integration - @talalus (#841)
- Portuguese (pt-PT) translation - @xlcnd (#2695)
- Module Mailchimp is removed in favor of more generic Newsletter - @mdesmet (#2558)
- `syncTasks` cleanup, `elasticCacheQuota` lowered to 3096KB - @pkarw (#2729)
- Back-button on orde detail page [#2819]
- Elastic Search Suggestions in the Search Response - @jpetar (#2853)
- Linting for typescript files @ResuBaka (#2843)
- Back to top functionality - @vishal-7037 (#2866)
- Thumbnail sizes are now configurable within the `config.products.thumbnails` and `config.cart.thumbnails` - @pkarw (#2897)
- In multistore mode it's now possible to configure multiple instances with different hosts, not only the paths - @lukeromanowicz (#3048, #3052).
- In multistore mode now there is a possibility to skip appending storecode to url with `appendStoreCode` config option - @lukeromanowicz (#3048, #3052, #3074).
- Add support for api.url in the Task module - @basvanpoppel (#3011)
- Products column change functionality - @vishal-7037 (#3017)
- New Module order-history this provides the pagination via lazy laod - @hackbard (#2810)
- OrderNumber on ThankYouPage - @Flyingmana (#2743)

### Removed

- The getter `cart/totals` has ben replaced with `cart/getTotals` - @pkarw (#2522)
- The getter `cart/coupon` has ben replaced with `cart/getCoupon` - @pkarw (#2522)
- The getter `cart/totalQuantity` has ben replaced with `cart/getItemsTotalQuantity` - @pkarw (#2522)
- The event `cart-before-save` has been removed - @pkarw (#2522)
- The action `cart/save` has been removed - @pkarw - (#2522)
- Some deprecated config options: `useShortCatalogUrls` and `setupVariantByAttributeCode` have been removed - @pkarw (#2915)
- Button for filters acceptance added with new styles for clear filters button - @965750 (#2811)
- Added "Clear wishlist" button - @aniamusial (#2806)
- Make all links with the primary color - @hackbard (#2932)

### Fixed

- Back button on the Error page has been fixed - @pkarw (#3077)
- Special price got zeroed - @pkarw (#2940)
- Microcart tax + discount totals fix - @pkarw (#2892)
- Microcart offline prices now forced down to original prices - @pkarw (#3012)
- Login/Register errorr message added in case of FetchError (no network connectivity) - @pkarw
- Products removed from the cart are no longer add back on the conectivity return - @pkarw (#2898)
- Sidebar menu wasn't possible to scroll - @PanMisza (#2627)
- Confirmation popup 'Product has beed added to cart' is displayed only once - @JKrupinski (#2610)
- Moved My Account options from Categories - @bartdominiak (#2612)
- Fix displaying (and adding) reviews for configurable products - @afirlejczyk (#2660)
- Image switching fix - @pkarw (#2709)
- Respect store code on order/PROCESS_QUEUE for shop store - @zulcom (#2727)
- Unexpected `window.localStorage` use in user module actions - @zulcom (#2735)
- Fix handling state of same address checkbox in the checkout - @lukeromanowicz (#2730)
- Fix for `everythingNew` collection on home page - @vishal-7037 (#2761)
- Fixed display of chevron arrows when there is only one product image - RGijsberts - (#2911)
- Fixed `Clear cart` option as it previously was not syncing the changes with server - therefore when the user was logged in and cleard the cart all the products were restored - @pkarw (#2587)
- Fixed the cart sync for a rare case that current cart token was empty - @pkarw (#2592)
- Use event bus to emit 'application-after-init' event (#2852)
- Validation of fields 'company name' and 'tax' in checkout doesn't work correctly - @dimasch (#2741)
- Fixed wrong price displayed in instant checkout module - @vishal-7037 (#2884)
- Incorrect working of checkboxes in checkout - @dimasch (#2730)
- Fixed ios input zoom on category page - @victorkadup (#2815)
- Fixed Load more in Search Results not working when typed to fast - @Flyingmana (#2659, #2946)
- Subscribe button responsive - @exlo89, @webdiver, @przemyslawspaczek (#2886)
- Multiple instances for searchAdapter invocations - @bratok (#2960)
- Fixed issue with login popup state not resetting on mobile devices - @aniamusial (#2699)
- Fix sortBy for the category page - @Jensderond (#2868)
- Fixed incorrect prices in Instant Checkout (PR API) - @qiqqq (#2874)
- Fixed placeholders in gallery in offline mode - @przspa (#2863)
- Incorrect `user_id` set on the order object - @pkarw (#2966)
- Problem with SSR render on product page with logged in user - @patzick (#2888)
- NaN displayed as shipping method - button disabled - @aniamusial (#2881)
- Logo on the Error page has been fixed - @przspa (#3077)
- No placeholders / no photos for Get Inspire section in offline - @przspa (#3072)
- Back icon on product page causing inconsistent behavior - @patzick (#3056)
- Remove static definition of `cashondelivery` in payment module - @danielmaier42 (#2983)
- Fixed wrong meta description attribute by page overwrite - @przspa (#3091)
- Fixed the `AddToCart` button behavior in case of synchronization errors - @pkarw (#3150)
- User token re-validation fixed to use proper HTTP codes - @pkarw (#3151, #3178)
- Fixed undefined id of color swatches issue for simple product - @vishal-7037 (#3239)
- Date filter ignoring format param and locales - @grimasod, @patzick (#3102)
- Problem with placing an order if shipping method is different than default one - @patzick (#3203)
- Fixed product video embed on PDP - @juho-jaakkola (#3263)
- Fixed memory leak with loading DayJS in SSR - @lukeromanowicz (#3310)
- Fixed invalid localized routes in SSR content of multistore configuration - @lukeromanowicz (#3262)
- Fixed startSession which loaded from the wrong place the user when multistore was active - @resubaka (#3322)
- Login after registration - @patzick (#3343)
- Clear compare list after logout - @patzick (#3348)

### Changed / Improved

- The `cart/sync`, `cart/addItems`, `cart/removeItem` and `cart/updateQuantity` now returns the `diffLog` object with all the notifications, server statuses and items changed during the shopping cart sync
- The `cart/addItem` is no longer displaying the error messages - please use the `diffLog.clientNorifications` to update the UI instead (take a look at the `AddToCart.ts` for a reference)
- The action `cart/userAfterLoggedin` got renamed to `cart/authorize` - @pkarw (#2522)
- The action `cart/refreshTotals` got renamed to `cart/syncTotals` - @pkarw (#2522)
- The action `cart/serverPull` got renamed to `cart/sync` - @pkarw - (#2522)
- The way we're getting the user and cart tokens got refactored - @pkarw (#2513)
- Changed the way to access the configuration. Currently the `rootStore.state.config` is deprecated. Please do use the `import config from 'config'` > `config` instead - @pkarw (#2649)
- Changed the order number (from `entity_id` to `increment_id`) on MyOrders and MyOrder pages - @pkarw (#2743)
- Disabled the server cart sync in case user is in the checkout - @pkarw (#2749)
- Improved ProductGalleryCarousel component to handle nonnumeric options id’s - @danieldomurad (#2586)
- Number of displayed products is now visible on PLP on desktop - @awierzbiak (#2504)
- Improved visibility of product SKU in wishlist - @PanMisza (#2606)
- Instant focus to search input field after click on search icon in navbar - @ca1zr (#2608)
- Login flow from authorized pages after session expired, show the modal with new error message and redirect after login - @gdomiciano, @natalledm (#2674)
- Added support for the newest node version - @gdomiciano (#2669)
- Default storeId from `0` to `1` for multistore and cmsdata logic - @janmyszkier (#2590)
- Used `$bus` plugin instead of EventBus import - @szafran89 (#2630)
- BaseCheckbox now uses v-model. @click is not needed anymore - @haukebri (#2630)
- Image selection supporting multiple configurable options - @mdesmet (#2599)
- Product video - retrieve video id from 'video_id' field (if set) instead of 'id' - @afirlejczyk
- Webpack config improvement - @yogeshsuhagiya (#2689)
- BaseSelect input event - @ResuBaka (#2683)
- Fixed static file handler to immediately return 404 status for missing files - @grimasod (#2685)
- Fixed maxAge Response Header for static files and Content-Type for Service Worker - @grimasod (#2686)
- Default log verbosity is changed to show only errors - @lromanowicz (#2717)
- Remembering last search query - @webdiver, @patzick (#2787)
- Extracted ProductImage component to support faster images loading - @przemyslawspaczek (#2925)
- Improve performace with preventing render 404 page on the server side if some of static content is missed, simple 404 response uses instead - [PHOENIX MEDIA](https://www.phoenix-media.eu/) - Yuri Boyko @yuriboyko, Anton Lobodenko @sniffy1988 (#3002)
- Logger refactor + now it takes `showErrorOnProduction` into account - @lromanowicz - (#2717)
- Jest updated from 24.1 to 24.7 along with typings - @lromanowicz - (#2717)
- Jest globals added to .eslint - @lromanowicz (#2717)
- The default storeId is taken from the configurations - @nuovecode (#2718)
- Multitab cart sync - @BartoszLiburski (#2547)
- Back to login button now shows the Login modal window instead of closing it - @RGijsberts (#2882)
- Status filter in Related Products query (#2805)
- The "Apply button was too big, I have reduced its size - @idodidodi (#2807)
- Added return to shopping button on ThenkYou page - @ZeevGerstner (#2818)
- Added optional attributes to catalog/product.ts - @ZeevGerstner (#2792)
- Formatted dates in CHANGELOG.md to match ISO standard - @phoenixdev-kl (#2839)
- Moved Filter Price Ranges (used for ES aggregations and UI Filter) to the config - @jpetar (#2873)
- Extra space if not found products in everything new section home page - @cnviradiya (#2846)
- Load custom fonts without webfont.js - @jahvi (#2944)
- Added some structured data to product page - @cewald (#2910)
- Improved the Size Guide feature so it opens in a modal popup instead of a new page - @RGijsberts - (#2913)
- Refactored Travis config - @Tjitse-E (#3035)
- Renamed the `stock/check` to `stock/queueCheck` to better emphasize it's async nature; added `stock/check` which does exactly what name suggests - returning the true stock values - @pkarw (#3150)
- Cart unit tests throwing lots of type warnings - @lukeromanowicz (#3185)
- Lack of possibility to mock src modules and theme components - @lukeromanowicz (#3185)
- Outdated signature of Registration hooks for google-tag-manager - @vishal-7037 (#3208)
- Added serveral missing german translations and fixed german language file structure - @unherz (#3202)
- Refactored the informal way of adressing to formal in german translation files - @unherz (#3213)

## [1.9.2] - 2019.06.10

### Fixed

- Instant Checkout visible on Safari - @przspa (#2991)
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

## [1.8.5] - 2019-04-17

### Fixed

- Memory leaks on SSR with Vue.use - @patzick (#2745)

## [1.8.4] - 2019-03-26

### Fixed

- Problem with incomplete category products load for offline use - @patzick (#2543)
- Category products view crash on scrolling down in offline mode - @patzick (#2569)
- Default propery issue for the col-xs-\* classes - @cnviradiya (#2558)
- Wishlist and compare list not cached properly - @filrak (#2580)

### Changed / Improved

- Category and Homepage products are now cached for offline use on SSR entry - @patzick (@1698)

## [1.8.3] - 2019-03-03

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
- Removed editing mode from My Newsletter section - @aniamusial (#2766)
- Clicking Remake order now adds your items and redirects you to the checkout - @mikesheward (#2710)

### Deprecated / Removed

- `@vue-storefront/store` package deprecated - @filrak

## [1.8.2] - 2019-02-11

- Fixed docker-compose configuration for network_mode and TS build config - @lukeromanowicz (#2415)

## [1.8.1] - 2019-02-10

This is hot-fix release for fixing the payment methods switching issue when both: `payments-cash-on-delivery` and `payments-backend-methods` modules enabled.

### Changed / Improved

- Fixed doubled invlication of `placeOrder` when both: `payments-cash-on-delivery` and `payments-backend-methods` modules enabled - #2405

## [1.8.0] - 2019-02-07

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
- Optional cart discounts display on side cart - @mcspronko (#1758)
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

## [1.7.3] - 2019-01-31

### Fixed

- Output cache between build, cache versioning added - @igloczek (#2309)
- Missing `no-ssr` wrapper around user specific content, which leads to broken app in production mode - @igloczek (#2314)

## [1.7.2] - 2019-01-28

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

## [1.7.1] - 2019-01-15

### Fixed

- Corrected scrolled sidebar menu position

## [1.7.0] - 2019-01-15

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

## [1.6.0] - 2018-12-05

### Added

- Lazy loading for SSR and non-SSR routes
- app splitted into modules

### Removed

- `vsf-payment-stripe` module integration removed from core

### Changed

- There is new config option `config.orders.directBackendSync` that changes the behavior of placing an order. Please do read [more on this change](https://github.com/DivanteLtd/vue-storefront/commit/e73f2ca19a5d33a39f8b0fd6346543eced24167e) and [more on vue-storefront-api change](https://github.com/DivanteLtd/vue-storefront-api/commit/80c497f72362c72983db4fdcac14c8ba6f8729a8)
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

## [1.5.0] - 2018-10-22

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

## [1.4.0] - 2018-10-05

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

## [1.3.0] - 2018-08-31

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

- **Multistore** - now it's possible to manage the store views with all the features like translations, custom category, and products content, shipping rates - basically all Magento2 features are supported! You can read more on how to setup Multistore here.
- **Bundle products** - support for the Magento-like bundle products with all the custom options, pricing rules etc.
- **Configurable options** - that allows users to select radio/checkbox options + put some custom notes (textboxes) on the products they like to order,
- **Crossell, Upsell, Related products** - are now synchronized with Magento2,
- **Webpack4 support** - we've migrated from Webpack2 -> Webpack4 and now the build process takes much less time while providing some cool new features,
- **Core components refactor** - without changing APIs, we've stripped the core components from s to improve the performance and improve the code readability,
- **PWA Manifest fixes** - iOS PWA support required us to adjust some settings,
- **Improved translations** - we're constantly tweaking the translation files :) We've just added it-IT and pl-PL (finally!) support recently
- **Improved Travis-CI pipeline** - and added support for end-2-end testing,
- **Lot of bugfixes + UX fixes** - countless hours spent on improving the code and UI quality!
- **Please check it out:** visit: https://demo.vuestorefront.io/

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
