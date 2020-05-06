import { apolloClient, locale } from '../../index';
import UpdateMyCustomerMutation from './defaultMutation';
import { CartMutationResponse } from './../../types/Api';
import { MyCustomerUpdateAction } from '../../types/GraphQL';

interface UpdateMyCustomer {
  version: number;
  actions: MyCustomerUpdateAction[];
}

const updateMyCustomer = async (customerData: UpdateMyCustomer): Promise<CartMutationResponse> => {
  return await apolloClient.mutate({
    mutation: UpdateMyCustomerMutation,
    variables: {
      locale,
      ...customerData
    },
    fetchPolicy: 'no-cache'
  });
};

export default updateMyCustomer;
