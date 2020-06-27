import {_shopifyCustomClient} from '../../index';
import { signUpMutation as mutation } from './buildMutations';

const signUp = async (fields): Promise<void> => {

  /**
     * Create a new customer account.
     *
     * const fields = {
     *    email: 'yogesh.suhagiya@aureatelabs.com',
     *    firstName: 'Yogesh',
     *    lastName: 'Suhagiya',
     *    password: '5AernyH5LQDmZEe6',
     *    phone: '+919724909821'
     *  };
     */
  const data = {
    input: fields
  };

  return await _shopifyCustomClient.graphQLClient.send(mutation, data).then(({model}) => {
    return model;
  });
};

export default signUp;
