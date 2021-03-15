import { apiClientFactory } from '@vue-storefront/core'
import { ContentSearchParams } from './types'
import StoryblokClient from 'storyblok-js-client'

import { getContent } from './api'

const setup = ({ token, cacheProvider }: ContentSearchParams) => {
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

