import { ApolloQueryResult } from 'apollo-client'
import { enhanceLineItems } from './enhanceCart'
import { Me } from './../../types/GraphQL'

interface ProfileData {
  me: Me
}

type ProfileResponse = ApolloQueryResult<ProfileData>

const enhanceProfile = (profileResponse: ProfileResponse): ProfileResponse => {
  const { lineItems } = profileResponse.data.me.activeCart

  profileResponse.data.me.activeCart.lineItems = enhanceLineItems(lineItems)

  return profileResponse
}

export default enhanceProfile
