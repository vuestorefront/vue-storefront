import {_shopifyCustomClient} from '../../index';
import { signOutMutation as mutation} from './buildMutations';

const signOut = async (token): Promise<void> => {

  /**
   * Remove customer access token.
   *
   * const token = 'd8fc3e53df109ca402e89fdddf9572be';
   */
  const data = {
    customerAccessToken: token
  };

  return await _shopifyCustomClient.graphQLClient.send(mutation, data);
};

export default signOut;
