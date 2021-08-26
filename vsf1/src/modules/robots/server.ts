import { serverHooks } from '@vue-storefront/core/server/hooks'

serverHooks.afterApplicationInitialized(({ app }) => {
  app.get('/robots.txt', (req, res) => {
    res.end('User-agent: *\nDisallow: ')
  })
})
