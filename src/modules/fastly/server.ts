import { serverHooks } from '@vue-storefront/core/server/hooks'
import fetch from 'isomorphic-fetch'
import config from 'config'

const chunk = require('lodash/chunk')

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
  const tagsChunks = chunk(tags.filter((tag) =>
    config.server.availableCacheTags.indexOf(tag) >= 0 ||
    config.server.availableCacheTags.find(t => tag.indexOf(t) === 0)
  ), 256) // we can send maximum 256 keys per request, more info https://docs.fastly.com/api/purge#purge_db35b293f8a724717fcf25628d713583

  for (const tagsChunk of tagsChunks) {
    const response = await fetch(`https://api.fastly.com/service/${config.get('fastly.serviceId')}/purge`, {
      method: 'POST',
      headers: { 'Fastly-Key': config.get('fastly.token') },
      body: JSON.stringify({ surrogate_keys: tagsChunk })
    })
    const text = await response.text()
    console.log(text)
  }
})
