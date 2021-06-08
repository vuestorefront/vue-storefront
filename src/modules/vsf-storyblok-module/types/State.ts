export interface StoryblokStories {
  [key: string]: {
    loading: boolean,
    story: Record<string, any>
  }
}

export interface StoryblokState {
  previewToken?: string,
  storeCode: string,
  stories: StoryblokStories,
  supportsWebp: boolean
}
