import {_shopifyCustomClient} from '../../index';
import { forgotPasswordMutation as mutation} from './buildMutations';

const forgotPassword = async (customer): Promise<void> => {

  /**
     * Reset customer password.
     *
     * const email = 'hello@aureatelabs.com';
     */
  const data = {
    email: customer.email
  };

  return await _shopifyCustomClient.graphQLClient.send(mutation, data).then(({model}) => {
    return model;
  });
};

export default forgotPassword;
