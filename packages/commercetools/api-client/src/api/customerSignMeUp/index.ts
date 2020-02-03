import { CustomerSignMeUpDraft, CustomerSignInResult } from './../../types/GraphQL'
import { apolloClient } from './../../index'
import CustomerSignMeUpMutation from './defaultMutation'
import { ApolloQueryResult } from 'apollo-client'

const customerSignMeUp = async (draft: CustomerSignMeUpDraft): Promise<ApolloQueryResult<CustomerSignInResult>> => {
  return await apolloClient.mutate({
    mutation: CustomerSignMeUpMutation,
    variables: { draft }
  }) as ApolloQueryResult<CustomerSignInResult>
}

export default customerSignMeUp
