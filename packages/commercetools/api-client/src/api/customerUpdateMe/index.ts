import gql from 'graphql-tag';
import { changeCustomerEmailAction, setCustomerFirstNameAction, setCustomerLastNameAction } from '../../helpers/actions/customer';
import CustomerUpdateMeMutation from './defaultMutation';

const customerUpdateMe = async ({ client }, currentUser, updatedUserData) => {
  const updateResponse = await client.mutate({
    mutation: gql`${CustomerUpdateMeMutation}`,
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
