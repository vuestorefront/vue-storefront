import config from './config.json'
import { deepFreeze } from '@vue-storefront/core/helpers/deepFreeze'

const freezedConfig = deepFreeze(config)

export const {
  server,
  staticPages,
  seo,
  console,
  redis,
  graphql,
  api,
  elasticsearch,
  ssr,
  queues,
  defaultStoreCode,
  storeViews,
  entities,
  cart,
  attributes,
  products,
  orders,
  localForage,
  reviews,
  users,
  stock,
  images,
  install,
  demomode,
  tax,
  shipping,
  syncTasks,
  i18n,
  expireHeaders,
  newsletter,
  mailer,
  theme,
  analytics,
  googleTagManager,
  hotjar,
  cms,
  cms_block,
  cms_page,
  usePriceTiers,
  useZeroPriceProduct,
  query
} = freezedConfig
export default freezedConfig
