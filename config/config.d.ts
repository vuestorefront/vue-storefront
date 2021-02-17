
declare module 'config' {
  import baseConfig = require('config/index')
  import Logger from 'core/lib/logger'
  // Merging config types with VSF config types
  var coreConfig: CoreConfig
  export default coreConfig

  interface CoreConfig extends baseConfig.IConfig {
    server: Server,
    initialResources: InitialResource[],
    staticPages: StaticPages,
    seo: Seo,
    console: Partial<Logger>,
    redis: Redis,
    graphql: Graphql,
    api: Api,
    elasticsearch: Elasticsearch,
    ssr: Ssr,
    queues: Queues,
    defaultStoreCode: string,
    storeViews: StoreViews,
    entities: Entities,
    cart: Cart,
    attributes: Attributes2,
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
    syncTasks: SyncTasks,
    i18n: I18N,
    expireHeaders: ExpireHeaders,
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
    query: Query,
    urlModule: UrlModule,
    fastly: Fastly,
    nginx: Nginx,
    varnish: Varnish,
    purgeConfig: string[]
  }

  interface Server {
    host: string,
    port: number,
    protocol: string,
    api: string,
    devServiceWorker: boolean,
    useHtmlMinifier: boolean,
    htmlMinifierOptions: HtmlMinifierOptions,
    http2ServerPush: boolean,
    compression: boolean,
    useOutputCacheTagging: boolean,
    useOutputCache: boolean,
    outputCacheDefaultTtl: number,
    availableCacheTags: string[],
    invalidateCacheKey: string,
    invalidateCacheForwarding: boolean,
    invalidateCacheForwardUrl: string,
    dynamicConfigReload: boolean,
    dynamicConfigContinueOnError: boolean,
    dynamicConfigExclude: string[],
    dynamicConfigInclude: any[],
    elasticCacheQuota: number,
    ssrDisabledFor: SsrDisabledFor,
    trace: Trace,
    helmet: Helmet
  }

  interface HtmlMinifierOptions {
    minifyJS: boolean,
    minifyCSS: boolean
  }

  interface SsrDisabledFor {
    extensions: string[]
  }

  interface Trace {
    enabled: boolean,
    config: Config
  }

  type Config = object

  interface Helmet {
    enabled: boolean
  }

  interface InitialResource {
    filters: string[],
    onload: boolean,
    type?: string,
    rel?: string
  }

  interface StaticPages {
    updateOnRequest: boolean,
    destPath: string
  }

  interface Seo {
    useUrlDispatcher: boolean,
    disableUrlRoutesPersistentCache: boolean,
    defaultTitle: string
  }

  interface Redis {
    host: string,
    port: number,
    db: number
  }

  interface Graphql {
    host: string,
    port: number
  }

  interface Api {
    url: string,
    saveBandwidthOverCache: boolean
  }

  interface Elasticsearch {
    httpAuth: string,
    host: string,
    index: string,
    min_score: number,
    csrTimeout: number,
    ssrTimeout: number,
    queryMethod: string,
    disablePersistentQueriesCache: boolean,
    searchScoring: SearchScoring,
    searchableAttributes: SearchableAttributes
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
    name: Name,
    sku: Sku,
    'category.name': CategoryName
  }

  interface Name {
    boost: number
  }

  interface Sku {
    boost: number
  }

  interface CategoryName {
    boost: number
  }

  interface Ssr {
    templates: Templates,
    lazyHydrateFor: string[],
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

  interface Queues {
    maxNetworkTaskAttempts: number,
    maxCartBypassAttempts: number
  }

  interface StoreViews {
    multistore: boolean,
    commonCache: boolean
  }

  interface Entities {
    optimize: boolean,
    twoStageCaching: boolean,
    optimizeShoppingCart: boolean,
    optimizeShoppingCartOmitFields: string[],
    category: Category,
    attribute: Attribute,
    productList: ProductList,
    productListWithChildren: ProductListWithChildren,
    review: Review,
    product: Product
  }

  interface Category {
    includeFields: string[],
    excludeFields: string[],
    filterFields: FilterFields,
    breadcrumbFilterFields: BreadcrumbFilterFields,
    categoriesRootCategorylId: number,
    categoriesDynamicPrefetchLevel: number,
    categoriesDynamicPrefetch: boolean,
    validSearchOptionsFromRouteParams: string[]
  }

  type FilterFields = object

  type BreadcrumbFilterFields = object

  interface Attribute {
    includeFields: string[],
    loadByAttributeMetadata: boolean
  }

  interface ProductList {
    sort: string,
    includeFields: string[],
    excludeFields: string[]
  }

  interface ProductListWithChildren {
    includeFields: string[],
    excludeFields: string[]
  }

  interface Review {
    excludeFields: string[]
  }

  interface Product {
    excludeFields: string[],
    includeFields: any,
    useDynamicAttributeLoader: boolean,
    standardSystemFields: string[]
  }

  interface Cart {
    thumbnails: Thumbnails,
    serverMergeByDefault: boolean,
    serverSyncCanRemoveLocalItems: boolean,
    serverSyncCanModifyLocalItems: boolean,
    synchronize: boolean,
    synchronize_totals: boolean,
    setCustomProductOptions: boolean,
    setConfigurableProductOptions: boolean,
    askBeforeRemoveProduct: boolean,
    displayItemDiscounts: boolean,
    productsAreReconfigurable: boolean,
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

  interface Thumbnails {
    width: number,
    height: number
  }

  interface Attributes2 {
    disablePersistentAttributesCache: boolean
  }

  interface Products {
    fieldsToCompress: string[],
    fieldsToCompact: FieldsToCompact,
    disablePersistentProductsCache: boolean,
    useMagentoUrlKeys: boolean,
    setFirstVarianAsDefaultInURL: boolean,
    configurableChildrenStockPrefetchStatic: boolean,
    configurableChildrenStockPrefetchDynamic: boolean,
    configurableChildrenStockPrefetchStaticPrefetchCount: number,
    filterUnavailableVariants: boolean,
    listOutOfStockProducts: boolean,
    preventConfigurableChildrenDirectAccess: boolean,
    alwaysSyncPlatformPricesOver: boolean,
    alwaysSyncPricesClientSide: boolean,
    clearPricesBeforePlatformSync: boolean,
    waitForPlatformSync: boolean,
    setupVariantByAttributeCode: boolean,
    calculateBundlePriceByOptions: boolean,
    endpoint: string,
    defaultFilters: string[],
    systemFilterNames: string[],
    maxFiltersQuerySize: number,
    routerFiltersSource: string,
    filterFieldMapping: FilterFieldMapping,
    colorMappings: ColorMappings,
    defaultSortBy: DefaultSortBy,
    sortByAttributes: SortByAttributes,
    gallery: Gallery,
    thumbnails: Thumbnails2,
    filterAggregationSize: FilterAggregationSize,
    priceFilterKey: string,
    priceFilters: PriceFilters
  }

  interface FieldsToCompact {
    minimal_price: string,
    has_options: string,
    url_key: string,
    status: string,
    required_options: string,
    name: string,
    tax_class_id: string,
    description: string,
    minimal_regular_price: string,
    final_price: string,
    price: string,
    special_price: string,
    original_final_price: string,
    original_price: string,
    original_special_price: string,
    final_price_incl_tax: string,
    original_price_incl_tax: string,
    price_incl_tax: string,
    special_price_incl_tax: string,
    final_price_tax: string,
    price_tax: string,
    special_price_tax: string,
    original_price_tax: string,
    image: string,
    small_image: string,
    thumbnail: string
  }

  interface FilterFieldMapping {
    'category.name': string
  }

  interface ColorMappings {
    'Melange graphite': string
  }

  interface DefaultSortBy {
    attribute: string,
    order: string
  }

  interface SortByAttributes {
    Latest: string,
    'Price: Low to high': string,
    'Price: High to low': string
  }

  interface Gallery {
    mergeConfigurableChildren: boolean,
    imageAttributes: string[],
    width: number,
    height: number
  }

  interface Thumbnails2 {
    width: number,
    height: number
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
    from: number,
    to?: number
  }

  interface Orders {
    directBackendSync: boolean,
    endpoint: string,
    payment_methods_mapping: PaymentMethodsMapping,
    offline_orders: OfflineOrders
  }

  type PaymentMethodsMapping = object

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
    defaultDrivers: DefaultDrivers,
    preserveCollections: string[]
  }

  interface DefaultDrivers {
    user: string,
    cmspage: string,
    cmsblock: string,
    carts: string,
    orders: string,
    wishlist: string,
    categories: string,
    attributes: string,
    elasticCache: string,
    claims: string,
    syncTasks: string,
    ordersHistory: string,
    checkout: string
  }

  interface Reviews {
    create_endpoint: string
  }

  interface Users {
    autoRefreshTokens: boolean,
    loginAfterCreatePassword: boolean,
    endpoint: string,
    history_endpoint: string,
    resetPassword_endpoint: string,
    createPassword_endpoint: string,
    changePassword_endpoint: string,
    login_endpoint: string,
    create_endpoint: string,
    me_endpoint: string,
    refresh_endpoint: string,
    allowModification: string[],
    tokenInHeader: boolean,
    tokenHeaderName: string,
    tokenAuthScheme: string
  }

  interface Stock {
    synchronize: boolean,
    allowOutOfStockInCart: boolean,
    endpoint: string
  }

  interface Images {
    useExactUrlsNoProxy: boolean,
    baseUrl: string,
    useSpecificImagePaths: boolean,
    paths: Paths,
    productPlaceholder: string
  }

  interface Paths {
    product: string
  }

  interface Install {
    is_local_backend: boolean,
    backend_dir: string
  }

  interface Tax {
    defaultCountry: string,
    defaultRegion: string,
    sourcePriceIncludesTax: boolean,
    calculateServerSide: boolean,
    userGroupId: any,
    useOnlyDefaultUserGroupId: boolean,
    deprecatedPriceFieldsSupport: boolean,
    finalPriceIncludesTax: boolean
  }

  interface Shipping {
    methods: Method[]
  }

  interface Method {
    method_title: string,
    method_code: string,
    carrier_code: string,
    amount: number,
    price_incl_tax: number,
    default: boolean,
    offline: boolean
  }

  interface SyncTasks {
    disablePersistentTaskQueue: boolean
  }

  interface I18N {
    defaultCountry: string,
    defaultLanguage: string,
    availableLocale: string[],
    defaultLocale: string,
    currencyCode: string,
    currencySign: string,
    currencyDecimal: string,
    currencyGroup: string,
    fractionDigits: number,
    priceFormat: string,
    dateFormat: string,
    fullCountryName: string,
    fullLanguageName: string,
    bundleAllStoreviewLanguages: boolean
  }

  interface ExpireHeaders {
    default: string,
    'application/json': string,
    'image/png': string
  }

  interface Newsletter {
    endpoint: string
  }

  interface Mailer {
    endpoint: Endpoint,
    contactAddress: string,
    sendConfirmation: boolean
  }

  interface Endpoint {
    send: string,
    token: string
  }

  interface Analytics {
    id: boolean
  }

  interface GoogleTagManager {
    id: boolean,
    debug: boolean,
    product_attributes: [
      string,
      string,
      string,
      ProductAttributes,
      ProductAttributes2
    ]
  }

  interface ProductAttributes {
    priceInclTax: string
  }

  interface ProductAttributes2 {
    qty: string
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
    inspirations: Inspirations,
    newProducts: NewProducts,
    bestSellers: BestSellers
  }

  interface Inspirations {
    filter: Filter[]
  }

  interface Filter {
    key: string,
    value: Value
  }

  interface Value {
    eq: string
  }

  interface NewProducts {
    filter: Filter2[]
  }

  interface Filter2 {
    key: string,
    value: Value2
  }

  interface Value2 {
    eq: number
  }

  interface BestSellers {
    filter: Filter3[]
  }

  interface Filter3 {
    key: string,
    value: Value3
  }

  interface Value3 {
    eq: string
  }

  interface UrlModule {
    enableMapFallbackUrl: boolean,
    endpoint: string,
    map_endpoint: string
  }

  interface Fastly {
    enabled: boolean
  }

  interface Nginx {
    enabled: boolean
  }

  interface Varnish {
    enabled: boolean
  }
}
