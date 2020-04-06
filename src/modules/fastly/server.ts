import { serverHooks } from '@vue-storefront/core/server/hooks'
import fetch from 'isomorphic-fetch'
import config from 'config'

serverHooks.beforeOutputRenderedResponse(({ output, res, context }) => {
  if (!config.get('fastly.enabled')) {
    return output
  }

  const tagsArray = Array.from(context.output.cacheTags)
  const cacheTags = tagsArray.join(' ')
  res.setHeader('Surrogate-Key', cacheTags)

  return output
})

serverHooks.beforeCacheInvalidated(async ({ tags }) => {
  if (!config.get('fastly.enabled') || !config.get('server.useOutputCache') || !config.get('server.useOutputCacheTagging')) {
    return
  }

  console.log('Invalidating Fastly Surrogate-Key')
  const surrogate_keys = tags.filter((tag) =>
    config.server.availableCacheTags.indexOf(tag) >= 0 ||
    config.server.availableCacheTags.find(t => tag.indexOf(t) === 0)
  )

  const response = await fetch(`https://api.fastly.com/service/${config.get('fastly.serviceId')}/purge`, {
    method: 'POST',
    headers: { 'Fastly-Key': config.get('fastly.token') },
    body: JSON.stringify({ surrogate_keys })
  })
  const text = await response.text()
  console.log(text)
})
