import { OrderMyCartCommand } from '../../types/GraphQL';
import { apolloClient, locale, acceptLanguage } from '../../index';
import CreateMyOrderFromCartMutation from './defaultMutation';
import { OrderMutationResponse } from '../../types/Api';

const createMyOrderFromCart = async (draft: OrderMyCartCommand): Promise<OrderMutationResponse> => {
  return await apolloClient.mutate({
    mutation: CreateMyOrderFromCartMutation,
    variables: { locale,
      acceptLanguage,
      draft },
    fetchPolicy: 'no-cache'
  });
};

export default createMyOrderFromCart;
