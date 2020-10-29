import {_shopifyCustomClient} from '../../index';
import { editProfileMutation as mutation} from './buildMutations';

const editProfile = async (token, profile): Promise<void> => {

  /**
     * Update customer password.
     *
     * const token = '772540947fe24a40385bf1bfe5da95b0';
     * const profile = {
     *     email: "",
     *     firstName: "Yogesh",
     *     lastName: "Suhagiya",
     *     phone: "+919724909821"
     * };
     */
  const data = {
    customerAccessToken: token,
    customer: profile
  };

  return await _shopifyCustomClient.graphQLClient.send(mutation, data);
};

export default editProfile;
