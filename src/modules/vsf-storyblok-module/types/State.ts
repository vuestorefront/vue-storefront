export interface StoryblokStories {
  [key: string]: {
    loading: boolean,
    loadingPromise?: Promise<Record<string, any>>,
    story: Record<string, any>
  }
}

export interface StoryblokState {
  previewToken?: string,
  storeCode: string,
  stories: StoryblokStories,
  supportsWebp: boolean
}
