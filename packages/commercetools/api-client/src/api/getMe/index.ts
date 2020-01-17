import { apolloClient, locale } from './../../index'
import { ProfileResponse } from './../../types/Api'
import defaultQuery from './defaultQuery'

const getMe = async (): Promise<ProfileResponse> => {
  return await apolloClient.query({
    query: defaultQuery,
    variables: { locale },
    fetchPolicy: 'no-cache'
  })
}

export default getMe
