import { apolloClient, locale } from './../../index'
import { ProfileResponse } from './../../types/Api'
import { basicProfile, fullProfile } from './defaultQuery'

interface Options {
  customer?: boolean
}

const getMe = async (options: Options = {}): Promise<ProfileResponse> => {
  return await apolloClient.query({
    query: options.customer ? fullProfile : basicProfile,
    variables: { locale },
    fetchPolicy: 'no-cache'
  })
}

export default getMe
