import { serverHooks } from '@vue-storefront/core/server/hooks'

serverHooks.extend(({ app }) => {
  app.get('/robots.txt', (req, res) => {
    res.end('User-agent: *\nDisallow: ')
  })
})
