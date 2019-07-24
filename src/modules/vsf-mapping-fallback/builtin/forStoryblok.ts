import { Payload } from '../types/Payload'

export const forStoryblok = async ({ dispatch }, { url: fullSlug }: Payload) => {
  fullSlug = fullSlug || 'home'
  const story = await dispatch(`storyblok/loadStory`, { fullSlug }, { root: true })
  if (story) {
    return {
      name: 'storyblok',
      params: {
        // TODO: Why does this need to be here?
        slug: 'storyblok'
      }
    }
  }
}
