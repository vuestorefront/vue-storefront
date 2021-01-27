import { StoryblokCache } from 'storyblok-js-client'

export interface ContentSearchParams {
  accessToken: string
  cacheProvider: string
  cache: StoryblokCache
  slug: string
}
export interface ApiContext {
  client: any
  config: ContentSearchParams
}
export interface Component {
  component: string
}
