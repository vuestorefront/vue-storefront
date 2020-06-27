import {_shopifyCustomClient} from '../../index';
import { signUpMutation as mutation } from './buildMutations';

const signUp = async (fields): Promise<void> => {

  /**
     * Create a new customer account.
     *
     * const fields = {
     *    email: 'hello@aureatelabs.com',
     *    firstName: 'Web',
     *    lastName: 'Developer',
     *    password: '5AernyH5LQDmZEe6',
     *    phone: '+91987456321'
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
