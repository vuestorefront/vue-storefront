import { changeCustomerEmailAction, setCustomerFirstNameAction, setCustomerLastNameAction } from '../../helpers/customer';
import { apolloClient } from '../../index';
import CustomerUpdateMeMutation from './defaultMutation';

const customerUpdateMe = async (currentUser, updatedUserData) => {
  const updateResponse = await apolloClient.mutate({
    mutation: CustomerUpdateMeMutation,
    variables: {
      version: currentUser.version,
      actions: [
        changeCustomerEmailAction(updatedUserData.email),
        setCustomerFirstNameAction(updatedUserData.firstName),
        setCustomerLastNameAction(updatedUserData.lastName)
      ]
    },
    fetchPolicy: 'no-cache'
  });

  return updateResponse.data;
};

export default customerUpdateMe;
