import { serverHooks } from '@vue-storefront/core/server/hooks'

const compression = require('compression')
serverHooks.afterApplicationInitialized(({ app, isProd }) => {
  if (isProd) {
    console.log('Output Compression is enabled')
    app.use(compression({ enabled: isProd }))
  }
})
