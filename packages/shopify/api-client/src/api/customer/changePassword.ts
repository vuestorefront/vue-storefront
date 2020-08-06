import {_shopifyCustomClient} from '../../index';
import { changePasswordMutation as mutation } from './buildMutations';

const changePassword = async (token, password): Promise<void> => {

  /**
     * Update customer password.
     *
     * const token = '772540947fe24a40385bf1bfe5da95b0';
     * const password = 'HiZqFuDvDdQ7';
     */
  const data = {
    customerAccessToken: token,
    customer: {
      password: password
    }
  };

  return await _shopifyCustomClient.graphQLClient.send(mutation, data).then(({model}) => {
    return model;
  });
};

export default changePassword;
