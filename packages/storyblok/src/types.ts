import { StoryblokCache } from 'storyblok-js-client';

export interface ContentSearchParams {
  token: string
  cacheProvider: StoryblokCache
  cache?: boolean
  version?: Version
  id?: string
  url?: string
  custom?: {} | CustomSearch
  locale?: string
  relations?: string
}
export type Version = 'draft' | 'published'
export interface CustomSearch {
  field: string
  value: string
}
export interface ApiContext {
  client: any
  config: ContentSearchParams
}
export interface Content {
  content: any
  component: string
}
export interface ApiResponse {
  story?: Content
  stories?: Content[]
  cv: string
  rels: {}[]
  links: {}[]
}
export interface Component {
  _editable?: {}
  component: string
}
export interface Image {
  image: string
}
