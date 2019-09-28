import { serverHooks } from '@vue-storefront/core/server/hooks'
const isProd = process.env.NODE_ENV === 'production'

serverHooks.onLoad(() => {
  /**
   * example usage
   * require('./google-cloud-trace')
   */
})

export const serverModules = [
  'src/modules/robots'
  // ['src/modules/compress', { enabled: isProd }]
]
