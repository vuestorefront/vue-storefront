import { apiClientFactory } from '@vue-storefront/core'
import { ContentSearchParams } from './types'
import StoryblokClient from 'storyblok-js-client'

import { getContent } from './api'

const setup = ({ accessToken, cacheProvider }: ContentSearchParams) => {
  return {
    client: StoryblokClient,
    config: {
      accessToken,
      cacheProvider,
    },
  }
}

const { createApiClient } = apiClientFactory({
  tag: 'sb',
  onSetup: setup,
  api: {
    getContent,
  },
} as any)

export default createApiClient
