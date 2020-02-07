import { ApolloQueryResult } from 'apollo-client'
import { enhanceLineItems } from './enhanceCart'
import { CustomerSignInResult } from './../../types/GraphQL'

interface UserData{
  user: CustomerSignInResult
}

type UserResponse = ApolloQueryResult<UserData>

const enhanceUser = (userResponse: UserResponse): UserResponse => {
  const { lineItems } = userResponse.data.user.cart

  userResponse.data.user.cart.lineItems = enhanceLineItems(lineItems)

  return userResponse
}

export default enhanceUser
