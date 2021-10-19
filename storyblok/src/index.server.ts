import { apiClientFactory } from '@vue-storefront/core'
import { ApiContext, ContentSearchParams } from './types'
import StoryblokClient from 'storyblok-js-client'

import { getContent } from './api'

const setup = ({ token, cacheProvider }: ContentSearchParams): ApiContext => {
  return {
    client: StoryblokClient,
    config: {
      token,
      cacheProvider,
    },
  }
}

const { createApiClient } = apiClientFactory({
  onCreate: setup,
  api: {
    getContent,
  },
} as any)

export { createApiClient }
