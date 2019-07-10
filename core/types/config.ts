export interface Config {
  server: Server,
  seo: Seo,
  console: Console,
  redis: Redis,
  graphql: HostPort,
  api: Api,
  elasticsearch: Elasticsearch,
  ssr: Ssr,
  defaultStoreCode: string,
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

interface Server extends HostPort {
  protocol: Protocol, // FIXME:
  api: string,
  devServiceWorker: boolean,
  useOutputCacheTagging: boolean,
  useOutputCache: boolean,
  outputCacheDefaultTtl: number,
  availableCacheTags: string[],
  invalidateCacheKey: string,
  dynamicConfigReload: boolean,
  dynamicConfigContinueOnError: boolean,
  dynamicConfigExclude: string[],
  dynamicConfigInclude: string[], // FIXME: in config empty array
  elasticCacheQuota: number,
  ssrDisabledFor: SsrDisabledFor
}

interface HostPort {
  host: string,
  port: number
}

interface SsrDisabledFor {
  extensions: string[]
}

interface Seo {
  useUrlDispatcher: boolean
}

interface Console {
  showErrorOnProduction: boolean,
  verbosityLevel: string
}

interface Redis extends HostPort {
  db: number
}

interface Api {
  url: string
}

interface Elasticsearch {
  httpAuth?: string,
  host: string,
  index: string,
  min_score?: number,
  csrTimeout?: number,
  ssrTimeout?: number,
  queryMethod?: string, // FIXME: Should it be more precise?
  disableLocalStorageQueriesCache?: boolean,
  searchScoring?: SearchScoring,
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
  templates: Templates,
  executeMixedinAsyncData: boolean,
  initialStateFilter: string[],
  useInitialStateFilter: boolean
}

interface Templates {
  default: string,
  minimal: string,
  basic: string,
  amp: string
}

interface StoreViews {
  multistore: boolean,
  commonCache: boolean,
  mapStoreUrlsFor: string[], // FIXME: Should it be more precise?
  de?: Country,
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
  sourcePriceIncludesTax?: boolean,
  defaultCountry: string,
  defaultRegion?: string,
  calculateServerSide?: boolean
}

interface I18n {
  fullCountryName: string,
  fullLanguageName: string,
  defaultLanguage?: string,
  defaultCountry: string,
  defaultLocale: string,
  currencyCode?: string,
  currencySign?: string,
  dateFormat?: string,
  availableLocale?: string[],
  currencySignPlacement?: string,
  bundleAllStoreviewLanguages: boolean
}

interface Entities {
  optimize: boolean,
  twoStageCaching: boolean,
  optimizeShoppingCart: boolean,
  category: Category,
  attribute: IncludeExcludeFields,
  productList: ProductList,
  productListWithChildren: IncludeExcludeFields,
  review: IncludeExcludeFields,
  product: Product
}

interface IncludeExcludeFields {
  includeFields?: string[],
  excludeFields?: string[]
}
interface Category extends IncludeExcludeFields {
  categoriesRootCategorylId: number,
  categoriesDynamicPrefetchLevel: number,
  categoriesDynamicPrefetch: boolean
}

interface ProductList extends IncludeExcludeFields {
  sort: string
}

interface Product extends IncludeExcludeFields {
  useDynamicAttributeLoader: boolean,
  standardSystemFields: string[]
}

interface Cart {
  thumbnails: Dimensions,
  bypassCartLoaderForAuthorizedUsers: boolean,
  serverMergeByDefault: boolean,
  serverSyncCanRemoveLocalItems: boolean,
  serverSyncCanModifyLocalItems: boolean,
  synchronize: boolean,
  synchronize_totals: boolean,
  setCustomProductOptions: boolean,
  setConfigurableProductOptions: boolean,
  askBeforeRemoveProduct: boolean,
  displayItemDiscounts: boolean,
  minicartCountType: string,
  create_endpoint: string,
  updateitem_endpoint: string,
  deleteitem_endpoint: string,
  pull_endpoint: string,
  totals_endpoint: string,
  paymentmethods_endpoint: string,
  shippingmethods_endpoint: string,
  shippinginfo_endpoint: string,
  collecttotals_endpoint: string,
  deletecoupon_endpoint: string,
  applycoupon_endpoint: string
}

interface Dimensions {
  height: number,
  width: number
}

interface Products {
  useMagentoUrlKeys: boolean,
  setFirstVarianAsDefaultInURL: boolean,
  configurableChildrenStockPrefetchStatic: boolean,
  configurableChildrenStockPrefetchDynamic: boolean,
  configurableChildrenStockPrefetchStaticPrefetchCount: number,
  filterUnavailableVariants: boolean,
  listOutOfStockProducts: boolean,
  preventConfigurableChildrenDirectAccess: boolean,
  alwaysSyncPlatformPricesOver: boolean,
  clearPricesBeforePlatformSync: boolean,
  waitForPlatformSync: boolean,
  setupVariantByAttributeCode: boolean,
  endpoint: string,
  defaultFilters: string[],
  routerFiltersSource: string,
  filterFieldMapping: FilterFieldMapping,
  colorMappings: ColorMappings,
  defaultSortBy: DefaultSortBy,
  sortByAttributes: SortByAttributes,
  gallery: Gallery,
  thumbnails: Dimensions,
  filterAggregationSize: FilterAggregationSize,
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

interface Gallery extends Dimensions {
  mergeConfigurableChildren: boolean,
  imageAttributes: string[]
}

interface FilterAggregationSize {
  default: number,
  size: number,
  color: number
}

interface PriceFilters {
  ranges: Range[]
}

interface Range {
  from?: number,
  to?: number
}

interface Orders {
  directBackendSync: boolean,
  endpoint: string,
  payment_methods_mapping: PaymentMethodsMapping,
  offline_orders: OfflineOrders
}

interface PaymentMethodsMapping {} // FIXME: empty object

interface OfflineOrders {
  automatic_transmission_enabled: boolean,
  notification: Notification
}

interface Notification {
  enabled: boolean,
  title: string,
  message: string,
  icon: string
}

interface LocalForage {
  defaultDrivers: DefaultDrivers
}

interface DefaultDrivers {
  user: Storage,
  cmspage: Storage,
  cmsblock: Storage,
  carts: Storage,
  orders: Storage,
  wishlist: Storage,
  categories: Storage,
  attributes: Storage,
  products: Storage,
  elasticCache: Storage,
  claims: Storage,
  syncTasks: Storage,
  ordersHistory: Storage,
  checkoutFieldValues: Storage
}

interface Reviews {
  create_endpoint: string
}

interface Users {
  autoRefreshTokens: boolean,
  endpoint: string,
  history_endpoint: string,
  resetPassword_endpoint: string,
  changePassword_endpoint: string,
  login_endpoint: string,
  create_endpoint: string,
  me_endpoint: string,
  refresh_endpoint: string
}

interface Stock {
  synchronize: boolean,
  allowOutOfStockInCart: boolean,
  endpoint: string
}

interface Images {
  useExactUrlsNoProxy: boolean,
  baseUrl: string,
  productPlaceholder: string
}

interface Install {
  is_local_backend: boolean,
  backend_dir: string
}

interface Shipping {
  methods: ShippingMethods[]
}

interface ShippingMethods {
  method_title: string,
  method_code: string,
  carrier_code: string,
  amount: number,
  price_incl_tax: number,
  default: boolean,
  offline: boolean
}

interface Newsletter {
  endpoint: string
}

interface Mailer {
  endpoint: Endpoint
}

interface Endpoint {
  send: string,
  token: string,
  contactAddress: string,
  sendConfirmation: boolean
}

interface Analytics {
  id: boolean
}

interface GoogleTagManager {
  id: boolean,
  debug: boolean
}

interface Hotjar {
  id: boolean
}

interface Cms {
  endpoint: string,
  endpointIdentifier: string
}

interface CmsBlock {
  max_count: number
}
interface CmsPage {
  max_count: number
}

interface Query {
  inspirations: FilterArray,
  newProducts: FilterArray,
  coolBags: FilterArray,
  bestSellers: FilterArray
}

interface FilterArray {
  filter: Filter[]
}

interface Filter {
  key: string,
  value: FilterValue
}

interface FilterValue {
  eq: string
}
