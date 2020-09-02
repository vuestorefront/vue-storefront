import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';
import { apolloClient, getSettings } from '../../index';
import CreateCartMutation from './defaultMutation';
import { CartMutationResponse } from './../../types/Api';

interface UpdateCart {
  id: string;
  version: number;
  actions: CartUpdateAction[] | MyCartUpdateAction[];
}

const updateCart = async (cartData: UpdateCart): Promise<CartMutationResponse> => {
  const { locale, acceptLanguage } = getSettings();
  return await apolloClient.mutate({
    mutation: CreateCartMutation,
    variables: {
      locale,
      acceptLanguage,
      ...cartData
    },
    fetchPolicy: 'no-cache'
  });
};

export default updateCart;
