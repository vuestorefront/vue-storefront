export interface StoryblokStories {
  [key: string]: {
    loading: boolean;
    story: Object;
  }
}

export interface StoryblokState {
  previewToken?: string;
  storeCode: string;
  stories: StoryblokStories;
  supportsWebp: boolean;
}
