export interface Config {
  /** Vue Storefront starts an HTTP server to deliver the SSR (server-side rendered) pages and static assets. Its node.js server is located in the core/scripts/server.js. This is the hostname and TCP port which Vue Storefront is binding */
  server: Server,
  seo: Seo,
  console: Console,
  /** This is the Redis configuration for the output cache. */
  redis: Redis,
  /** This is an optional GraphQL endpoint. We're now supporting graphQL for the catalog and this section is being used when server.api is set to graphql (default is "api") */
  graphql: Graphql,
  api: Api,
  /** Vue Storefront uses the Elasticsearch Query Language to query for data. However, here you're putting the Vue Storefront API /api/catalog endpoint, which is a kind of Elasticsearch Proxy (dealing with the taxes, security itd.).

  If your vue-storefront-api instance is running on the localhost, port 8080 then the correct elasticsearch endpoint is as presented here.

  Starting from Vue Storefront v1.6, user may set the: config.elasticsearch.queryMethod o either "POST" (default) / "GET". When "GET" is set, the Elasticsearch Query object is passed to vue-storefront-api as a request parameter named "request". By doing so, Service Worker will now be able to cache the results from Elasticsearch. Service Workers cannot cache any POST requests currently. */
  elasticsearch: Elasticsearch,
  /** By default, Vue Storefront themes are created by building a set of components that "mixins" the core-components. For example, you have /src/themes/default/pages/Product.vue which inherits the /core/pages/Product.js by having this core component included in the "mixins": [Product] section.

  The SSR data is being completed in the asyncData static method. If this configuration parameter is set to true (which is default) Vue Storefront will run the asyncData methods in the following sequence: core/pages/Product.js -> asyncData src/themes/default/pages/Product.vue -> asyncData

  If it's set to false, then just the src/themes/default/pages/Product.vue -> asyncData will be executed. This option is referenced in the core/client-entry.ts line: 85 */
  ssr: Ssr,
  /** This option is used only in the Multistore setup. By default it's '' but if you're running, for example, a multi-instance Vue Storefront setup and the current instance shall be connected to the en store on the backend, please just set it so. This config variable is referenced in the core/lib/multistore.ts */
  defaultStoreCode: string,
  /** If the storeViews.multistore is set to true you'll see the LanguageSwitcher.vue included in the footer and all the multistore operations will be included in the request flow.

  You should add all the multistore codes to the mapStoreUrlsFor as this property is used by core/lib/multistore.ts -> setupMultistoreRoutes method to add the /<store_code>/p/.... and other standard routes. By accessing them you're instructing Vue Storefront to switch the current store settings (i18n, API requests with specific storeCode etc...)

  commonCache is refering to llocal browser cache. If it's set to false (default) the cache of cart, catalog, user data etc is shared between storeViews with default prefix (shop). Otherwise each of them is stored separately (storecode-shop prefix).

  storeViews section contains one or more additional store views configured to serve proper i18n translations, tax settings etc. */
  storeViews: StoreViews,
  entities: Entities,
  cart: Cart,
  products: Products,
  orders: Orders,
  localForage: LocalForage,
  reviews: Reviews,
  users: Users,
  stock: Stock,
  images: Images,
  install: Install,
  demomode: boolean,
  tax: Tax,
  shipping: Shipping,
  i18n: I18n,
  newsletter: Newsletter,
  mailer: Mailer,
  theme: string,
  analytics: Analytics,
  googleTagManager: GoogleTagManager,
  hotjar: Hotjar,
  cms: Cms,
  cms_block: CmsBlock,
  cms_page: CmsPage,
  usePriceTiers: boolean,
  useZeroPriceProduct: boolean,
  query: Query
}

type Protocol = 'http' | 'https';
type Storage = 'LOCALSTORAGE' | 'INDEXEDDB';

interface Server {
  /** Default value: "localhost" */
  host: string,
  /** Default value: 3000 */
  port: number,
  /** Default value: "http" */
  protocol: Protocol, // FIXME:
  /** Default value: "api" */
  api: string,
  /** Default value: false */
  devServiceWorker: boolean,
  /** Default value: false */
  useOutputCacheTagging: boolean,
  /** Default value: false */
  useOutputCache: boolean,
  /** Default value: 86400 */
  outputCacheDefaultTtl: number,
  /** Default value: ["product", "category", "home", "checkout", "page-not-found", "compare", "my-account", "P", "C", "error"] */
  availableCacheTags: string[],
  /** Default value: "aeSu7aip" */
  invalidateCacheKey: string,
  /** Default value: false */
  dynamicConfigReload: boolean,
  /** Default value: false */
  dynamicConfigContinueOnError: boolean,
  /** Default value: ["ssr", "storeViews", "entities", "localForage", "shipping", "boost", "query"] */
  dynamicConfigExclude: string[],
  /** Default value: [] */
  dynamicConfigInclude: string[], // FIXME: in config empty array
  /** Default value: [] */
  elasticCacheQuota: number,
  /** Default value: extensions: [".png", ".gif", ".jpg", ".jpeg", ".woff", ".eot", ".woff2", ".ttf", ".svg", ".css", ".js", ".json", ".ico", ".tiff", ".tif", ".raw"] */
  ssrDisabledFor: SsrDisabledFor
}

interface SsrDisabledFor {
  extensions: string[]
}

interface Seo {
  /** Default value: true */
  useUrlDispatcher: boolean
}

interface Console {
  /** Default value: false */
  showErrorOnProduction: boolean,
  /** Default value: "display-everything" */
  verbosityLevel: string
}

interface Redis {
  /** Default value: "localhost" */
  host: string,
  /** Default value: 6379 */
  port: number,
  /** Default value: 0 */
  db: number
}

interface Graphql {
  /** Default value: "localhost" */
  host: string,
  /** Default value: 8080 */
  port: number
}

interface Api {
  /** Default value: "http://localhost:8080" */
  url: string
}

interface Elasticsearch {
  /** Default value: "" */
  httpAuth?: string,
  /** Default value: "/api/catalog" */
  host: string,
  /** Default value: "vue_storefront_catalog" */
  index: string,
  /** Default value: 0.02 */
  min_score?: number,
  /** Default value: 5000 */
  csrTimeout?: number,
  /** Default value: 1000 */
  ssrTimeout?: number,
  /** Default value: "GET" */
  queryMethod?: string, // FIXME: Should it be more precise?
  /** Default value: true */
  disableLocalStorageQueriesCache?: boolean,
  /** Default value: {
        "attributes": {
          "attribute_code": {
            "scoreValues": { "attribute_value": { "weight": 1 } }
          }
        }, */
  searchScoring?: SearchScoring,
  /** Default value: {
        "name": {
          "boost": 4
        },
        "sku": {
          "boost": 2
        },
        "category.name": {
          "boost": 1
        }
      } */
  searchableAttributes?: SearchableAttributes
}

interface SearchScoring {
  attributes: Attributes,
  fuzziness: number,
  cutoff_frequency: number,
  max_expansions: number,
  minimum_should_match: string,
  prefix_length: number,
  boost_mode: string,
  score_mode: string,
  max_boost: number,
  function_min_score: number
}

interface Attributes {
  attribute_code: AttributeCode
}

interface AttributeCode {
  scoreValues: ScoreValues
}

interface ScoreValues {
  attribute_value: AttributeValue
}

interface AttributeValue {
  weight: number
}

interface SearchableAttributes {
  name: Boost,
  sku: Boost,
  [category: string]: Boost // FIXME: is it correct?
}

interface Boost {
  boost: number
}

interface Ssr {
  /** Default value: {
        "default": "dist/index.html",
        "minimal": "dist/index.minimal.html",
        "basic": "dist/index.basic.html",
        "amp": "dist/index.amp.html"
      }, */
  templates: Templates,
  /** Default value: true */
  executeMixedinAsyncData: boolean,
  /** Default value: ["__DEMO_MODE__", "version", "storeView"] */
  initialStateFilter: string[],
  /** Default value: true */
  useInitialStateFilter: boolean
}

interface Templates {
  default: string,
  minimal: string,
  basic: string,
  amp: string
}

interface StoreViews {
  /** Default value: false */
  multistore: boolean,
  /** Default value: true */
  commonCache: boolean,
  /** Default value: ["de", "it"] */
  mapStoreUrlsFor: string[], // FIXME: Should it be more precise?
  /** Default value: {
        "storeCode": "de",
        "disabled": true,
        "storeId": 3,
        "name": "German Store",
        "url": "/de",
        "appendStoreCode": true,
        "elasticsearch": {
          "host": "/api/catalog",
          "index": "vue_storefront_catalog_de"
        },
        "tax": {
          "sourcePriceIncludesTax": false,
          "defaultCountry": "DE",
          "defaultRegion": "",
          "calculateServerSide": true
        },
        "i18n": {
          "fullCountryName": "Germany",
          "fullLanguageName": "German",
          "defaultLanguage": "DE",
          "defaultCountry": "DE",
          "defaultLocale": "de-DE",
          "currencyCode": "EUR",
          "currencySign": "EUR",
          "dateFormat": "HH:mm D-M-YYYY"
        }
      }, */
  de?: Country,
  /** Default value:  {
        "extend": "de",
        "storeCode": "it",
        "disabled": true,
        "storeId": 4,
        "name": "Italian Store",
        "url": "/it",
        "elasticsearch": {
          "host": "/api/catalog",
          "index": "vue_storefront_catalog_it"
        },
        "tax": {
          "defaultCountry": "IT"
        },
        "i18n": {
          "fullCountryName": "Italy",
          "fullLanguageName": "Italian",
          "defaultCountry": "IT",
          "defaultLanguage": "IT",
          "defaultLocale": "it-IT"
        }
      } */
  it?: Country
}

interface Country {
  extend?: string,
  storeCode: string,
  disabled: boolean,
  storeId: number,
  name: string,
  url: string,
  appendStoreCode: boolean,
  elasticsearch: Elasticsearch,
  tax: Tax,
  i18n: I18n
}

interface Tax {
  /** Default value: api */
  sourcePriceIncludesTax?: boolean,
  /** Default value: api */
  defaultCountry: string,
  /** Default value: api */
  defaultRegion?: string,
  /** Default value: api */
  calculateServerSide?: boolean
}

interface I18n {
  /** Default value: api */
  fullCountryName: string,
  /** Default value: api */
  fullLanguageName: string,
  /** Default value: api */
  defaultLanguage?: string,
  /** Default value: api */
  defaultCountry: string,
  /** Default value: api */
  defaultLocale: string,
  /** Default value: api */
  currencyCode?: string,
  /** Default value: api */
  currencySign?: string,
  /** Default value: api */
  dateFormat?: string,
  /** Default value: api */
  availableLocale?: string[],
  /** Default value: api */
  currencySignPlacement?: string,
  /** Default value: api */
  bundleAllStoreviewLanguages: boolean
}

interface Entities {
  /** Default value: true */
  optimize: boolean,
  /** Default value: true */
  twoStageCaching: boolean,
  /** Default value: true */
  optimizeShoppingCart: boolean,
  /** Default value: {
        "includeFields": [ "id", "*.children_data.id", "*.id", "children_count", "sku", "name", "is_active", "parent_id", "level", "url_key", "url_path", "product_count", "path"],
        "excludeFields": [ "sgn" ],
        "categoriesRootCategorylId": 2,
        "categoriesDynamicPrefetchLevel": 2,
        "categoriesDynamicPrefetch": true
      } */
  category: Category,
  /** Default value: {
        "includeFields": [ "attribute_code", "id", "entity_type_id", "options", "default_value", "is_user_defined", "frontend_label", "attribute_id", "default_frontend_label", "is_visible_on_front", "is_visible", "is_comparable", "tier_prices", "frontend_input" ]
      } */
  attribute: IncludeExcludeFields,
  /** Default value: {
        "sort": "updated_at:desc",
        "includeFields": [ "type_id", "sku", "product_links", "tax_class_id", "special_price", "special_to_date", "special_from_date", "name", "price", "priceInclTax", "originalPriceInclTax", "originalPrice", "specialPriceInclTax", "id", "image", "sale", "new", "url_path", "url_key", "status", "tier_prices", "configurable_children.sku", "configurable_children.price", "configurable_children.special_price", "configurable_children.priceInclTax", "configurable_children.specialPriceInclTax", "configurable_children.originalPrice", "configurable_children.originalPriceInclTax" ],
        "excludeFields": [ "description", "configurable_options", "sgn", "*.sgn", "msrp_display_actual_price_type", "*.msrp_display_actual_price_type", "required_options" ]
      }, */
  productList: ProductList,
  /** Default value: {
        "includeFields": [ "type_id", "sku", "name", "tax_class_id", "special_price", "special_to_date", "special_from_date", "price", "priceInclTax", "originalPriceInclTax", "originalPrice", "specialPriceInclTax", "id", "image", "sale", "new", "configurable_children.image", "configurable_children.sku", "configurable_children.price", "configurable_children.special_price", "configurable_children.priceInclTax", "configurable_children.specialPriceInclTax", "configurable_children.originalPrice", "configurable_children.originalPriceInclTax", "configurable_children.color", "configurable_children.size", "configurable_children.id", "configurable_children.tier_prices", "product_links", "url_path", "url_key", "status", "tier_prices"],
        "excludeFields": [ "description", "sgn", "*.sgn", "msrp_display_actual_price_type", "*.msrp_display_actual_price_type", "required_options"]
      } */
  productListWithChildren: IncludeExcludeFields,
  /** Default value: {
        "excludeFields": ["review_entity", "review_status"]
      }, */
  review: IncludeExcludeFields,
  /** Default value: {
        "excludeFields": [ "*.msrp_display_actual_price_type", "required_options", "updated_at", "created_at", "attribute_set_id", "options_container", "msrp_display_actual_price_type", "has_options", "stock.manage_stock", "stock.use_config_min_qty", "stock.use_config_notify_stock_qty", "stock.stock_id",  "stock.use_config_backorders", "stock.use_config_enable_qty_inc", "stock.enable_qty_increments", "stock.use_config_manage_stock", "stock.use_config_min_sale_qty", "stock.notify_stock_qty", "stock.use_config_max_sale_qty", "stock.use_config_max_sale_qty", "stock.qty_increments", "small_image", "sgn", "*.sgn"],
        "includeFields": null,
        "useDynamicAttributeLoader": true,
        "standardSystemFields": [
          "description",
          "configurable_options",
          "tsk",
          "custom_attributes",
          "size_options",
          "regular_price",
          "final_price",
          "price",
          "color_options",
          "id",
          "links",
          "gift_message_available",
          "category_ids",
          "sku",
          "stock",
          "image",
          "thumbnail",
          "visibility",
          "type_id",
          "tax_class_id",
          "media_gallery",
          "url_key",
          "url_path",
          "max_price",
          "minimal_regular_price",
          "special_price",
          "minimal_price",
          "name",
          "configurable_children",
          "max_regular_price",
          "category",
          "status",
          "priceTax",
          "priceInclTax",
          "specialPriceTax",
          "specialPriceInclTax",
          "_score",
          "slug",
          "errors",
          "info",
          "erin_recommends",
          "special_from_date",
          "news_from_date",
          "custom_design_from",
          "originalPrice",
          "originalPriceInclTax",
          "parentSku",
          "options",
          "product_option",
          "qty",
          "is_configured"
        ]
      } */
  product: Product
}

interface IncludeExcludeFields {
  includeFields?: string[],
  excludeFields?: string[]
}
interface Category {
  includeFields?: string[],
  excludeFields?: string[],
  categoriesRootCategorylId: number,
  categoriesDynamicPrefetchLevel: number,
  categoriesDynamicPrefetch: boolean
}

interface ProductList {
  includeFields?: string[],
  excludeFields?: string[],
  sort: string
}

interface Product {
  includeFields?: string[],
  excludeFields?: string[],
  useDynamicAttributeLoader: boolean,
  standardSystemFields: string[]
}

interface Cart {
  /** Default value: {
        "width": 150,
        "height": 150
      }, */
  thumbnails: Dimensions,
  /** Default value: true */
  bypassCartLoaderForAuthorizedUsers: boolean,
  /** Default value: true */
  serverMergeByDefault: boolean,
  /** Default value: false */
  serverSyncCanRemoveLocalItems: boolean,
  /** Default value: false */
  serverSyncCanModifyLocalItems: boolean,
  /** Default value: true */
  synchronize: boolean,
  /** Default value: true */
  synchronize_totals: boolean,
  /** Default value: true */
  setCustomProductOptions: boolean,
  /** Default value: true */
  setConfigurableProductOptions: boolean,
  /** Default value: true */
  askBeforeRemoveProduct: boolean,
  /** Default value: true */
  displayItemDiscounts: boolean,
  /** Default value: "quantities" */
  minicartCountType: string,
  /** Default value: "/api/cart/create?token={{token}}" */
  create_endpoint: string,
  /** Default value: "/api/cart/update?token={{token}}&cartId={{cartId}}" */
  updateitem_endpoint: string,
  /** Default value: "/api/cart/delete?token={{token}}&cartId={{cartId}}" */
  deleteitem_endpoint: string,
  /** Default value: "/api/cart/pull?token={{token}}&cartId={{cartId}}" */
  pull_endpoint: string,
  /** Default value: "/api/cart/totals?token={{token}}&cartId={{cartId}}" */
  totals_endpoint: string,
  /** Default value: "/api/cart/payment-methods?token={{token}}&cartId={{cartId}}" */
  paymentmethods_endpoint: string,
  /** Default value: "/api/cart/shipping-methods?token={{token}}&cartId={{cartId}}" */
  shippingmethods_endpoint: string,
  /** Default value: "/api/cart/shipping-information?token={{token}}&cartId={{cartId}}" */
  shippinginfo_endpoint: string,
  /** Default value: "/api/cart/collect-totals?token={{token}}&cartId={{cartId}}" */
  collecttotals_endpoint: string,
  /** Default value: "/api/cart/delete-coupon?token={{token}}&cartId={{cartId}}" */
  deletecoupon_endpoint: string,
  /** Default value: "/api/cart/apply-coupon?token={{token}}&cartId={{cartId}}&coupon={{coupon}}" */
  applycoupon_endpoint: string
}

interface Dimensions {
  height: number,
  width: number
}

interface Products {
  /** Default value: true */
  useMagentoUrlKeys: boolean,
  /** Default value: false */
  setFirstVarianAsDefaultInURL: boolean,
  /** Default value: false */
  configurableChildrenStockPrefetchStatic: boolean,
  /** Default value: false */
  configurableChildrenStockPrefetchDynamic: boolean,
  /** Default value: false */
  configurableChildrenStockPrefetchStaticPrefetchCount: number,
  /** Default value: false */
  filterUnavailableVariants: boolean,
  /** Default value: true */
  listOutOfStockProducts: boolean,
  /** Default value: true */
  preventConfigurableChildrenDirectAccess: boolean,
  /** Default value: false */
  alwaysSyncPlatformPricesOver: boolean,
  /** Default value: false */
  clearPricesBeforePlatformSync: boolean,
  /** Default value: false */
  waitForPlatformSync: boolean,
  /** Default value: true */
  setupVariantByAttributeCode: boolean,
  /** Default value: "/api/product" */
  endpoint: string,
  /** Default value: ["color", "size", "price", "erin_recommends"] */
  defaultFilters: string[],
  /** Default value: "query" */
  routerFiltersSource: string,
  /** Default value: {
        "category.name": "category.name.keyword"
      } */
  filterFieldMapping: FilterFieldMapping,
  /** Default value: {
        "Melange graphite": "#eeeeee"
      } */
  colorMappings: ColorMappings,
  /** Default value:  {
        "attribute": "updated_at",
        "order": "desc"
      } */
  defaultSortBy: DefaultSortBy,
  /** Default value: {
        "Latest": "updated_at",
        "Price: Low to high":"final_price",
        "Price: High to low":"final_price:desc"
      } */
  sortByAttributes: SortByAttributes,
  /** Default value: {
        "mergeConfigurableChildren": true,
        "imageAttributes": ["image","thumbnail","small_image"],
        "width": 600,
        "height": 744
      } */
  gallery: Gallery,
  /** Default value: {
        "width": 310,
        "height": 300
      } */
  thumbnails: Dimensions,
  /** Default value: {
        "default": 10,
        "size": 10,
        "color": 10
      } */
  filterAggregationSize: FilterAggregationSize,
  /** Default value: {
        "ranges": [
          { "from": 0, "to": 50 },
          { "from": 50, "to": 100 },
          { "from": 100, "to": 150 },
          { "from": 150 }
        ]
      } */
  priceFilters: PriceFilters
}

interface FilterFieldMapping {
  [category: string]: string
} // FIXME: is it correct?

interface ColorMappings {
  [melagne: string]: string
} // FIXME:

interface DefaultSortBy {
  attribute: string,
  order: string
}

interface SortByAttributes {
  Latest: string,
  [price: string]: string
} // FIXME:

interface Gallery {
  height: number,
  width: number,
  mergeConfigurableChildren: boolean,
  imageAttributes: string[]
}

interface FilterAggregationSize {
  /** Default value: api */
  default: number,
  /** Default value: api */
  size: number,
  /** Default value: api */
  color: number
}

interface PriceFilters {
  /** Default value: api */
  ranges: Range[]
}

interface Range {
  /** Default value: api */
  from?: number,
  /** Default value: api */
  to?: number
}

interface Orders {
  /** Default value: api */
  directBackendSync: boolean,
  /** Default value: api */
  endpoint: string,
  /** Default value: api */
  payment_methods_mapping: PaymentMethodsMapping,
  /** Default value: api */
  offline_orders: OfflineOrders
}

interface PaymentMethodsMapping {} // FIXME: empty object

interface OfflineOrders {
  /** Default value: api */
  automatic_transmission_enabled: boolean,
  /** Default value: api */
  notification: Notification
}

interface Notification {
  /** Default value: api */
  enabled: boolean,
  /** Default value: api */
  title: string,
  /** Default value: api */
  message: string,
  /** Default value: api */
  icon: string
}

interface LocalForage {
  /** Default value: api */
  defaultDrivers: DefaultDrivers
}

interface DefaultDrivers {
  /** Default value: api */
  user: Storage,
  /** Default value: api */
  cmspage: Storage,
  /** Default value: api */
  cmsblock: Storage,
  /** Default value: api */
  carts: Storage,
  /** Default value: api */
  orders: Storage,
  /** Default value: api */
  wishlist: Storage,
  /** Default value: api */
  categories: Storage,
  /** Default value: api */
  attributes: Storage,
  /** Default value: api */
  products: Storage,
  /** Default value: api */
  elasticCache: Storage,
  /** Default value: api */
  claims: Storage,
  /** Default value: api */
  syncTasks: Storage,
  /** Default value: api */
  ordersHistory: Storage,
  /** Default value: api */
  checkoutFieldValues: Storage
}

interface Reviews {
  /** Default value: api */
  create_endpoint: string
}

interface Users {
  /** Default value: api */
  autoRefreshTokens: boolean,
  /** Default value: api */
  endpoint: string,
  /** Default value: api */
  history_endpoint: string,
  /** Default value: api */
  resetPassword_endpoint: string,
  /** Default value: api */
  changePassword_endpoint: string,
  /** Default value: api */
  login_endpoint: string,
  /** Default value: api */
  create_endpoint: string,
  /** Default value: api */
  me_endpoint: string,
  /** Default value: api */
  refresh_endpoint: string
}

interface Stock {
  /** Default value: api */
  synchronize: boolean,
  /** Default value: api */
  allowOutOfStockInCart: boolean,
  /** Default value: api */
  endpoint: string
}

interface Images {
  /** Default value: api */
  useExactUrlsNoProxy: boolean,
  /** Default value: api */
  baseUrl: string,
  /** Default value: api */
  productPlaceholder: string
}

interface Install {
  /** Default value: api */
  is_local_backend: boolean,
  /** Default value: api */
  backend_dir: string
}

interface Shipping {
  /** Default value: api */
  methods: ShippingMethods[]
}

interface ShippingMethods {
  /** Default value: api */
  method_title: string,
  /** Default value: api */
  method_code: string,
  /** Default value: api */
  carrier_code: string,
  /** Default value: api */
  amount: number,
  /** Default value: api */
  price_incl_tax: number,
  /** Default value: api */
  default: boolean,
  /** Default value: api */
  offline: boolean
}

interface Newsletter {
  /** Default value: api */
  endpoint: string
}

interface Mailer {
  /** Default value: api */
  endpoint: Endpoint
}

interface Endpoint {
  /** Default value: api */
  send: string,
  /** Default value: api */
  token: string,
  /** Default value: api */
  contactAddress: string,
  /** Default value: api */
  sendConfirmation: boolean
}

interface Analytics {
  /** Default value: api */
  id: boolean
}

interface GoogleTagManager {
  /** Default value: api */
  id: boolean,
  /** Default value: api */
  debug: boolean
}

interface Hotjar {
  /** Default value: api */
  id: boolean
}

interface Cms {
  /** Default value: api */
  endpoint: string,
  /** Default value: api */
  endpointIdentifier: string
}

interface CmsBlock {
  /** Default value: api */
  max_count: number
}
interface CmsPage {
  /** Default value: api */
  max_count: number
}

interface Query {
  /** Default value: api */
  inspirations: FilterArray,
  /** Default value: api */
  newProducts: FilterArray,
  /** Default value: api */
  coolBags: FilterArray,
  /** Default value: api */
  bestSellers: FilterArray
}

interface FilterArray {
  /** Default value: api */

  filter: Filter[]
}

interface Filter {
  /** Default value: api */
  key: string,
  /** Default value: api */
  value: FilterValue
}

interface FilterValue {
  /** Default value: api */
  eq: string
}
