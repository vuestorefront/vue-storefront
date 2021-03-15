import { ApiContext, ContentSearchParams } from './types'
import { Logger } from '@vue-storefront/core'

export const getContent = async (
  { client, config }: ApiContext,
  { slug }: ContentSearchParams,
): Promise<any> => {
  const { token, cacheProvider } = config
  const Storyblok = new client({
    accessToken: token,
    cache: {
      clear: 'auto',
      type: cacheProvider,
    },
  })
  let response = null
  try {
    const { data } = await Storyblok.get(`cdn/stories/${slug}`)
    response = data?.story
  } catch (error) {
    Logger.error("Can't get data from Storyblok.", error)
  }
  return response
}
