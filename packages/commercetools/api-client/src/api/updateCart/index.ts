import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL'
import { apolloClient, locale } from '../../index'
import CreateCartMutation from './defaultMutation'
import { CartMutationResponse } from './../../types/Api'

interface UpdateCart {
  id: string
  version: number
  actions: CartUpdateAction[] | MyCartUpdateAction[]
}

const updateCart = async (cartData: UpdateCart): Promise<CartMutationResponse> => {
  return await apolloClient.mutate({
    mutation: CreateCartMutation,
    variables: {
      locale,
      ...cartData
    },
    fetchPolicy: 'no-cache'
  })
}

export default updateCart
