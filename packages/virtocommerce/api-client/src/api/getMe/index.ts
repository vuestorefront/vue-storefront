import { apolloClient } from '../../index';
import { ProfileResponse } from '../../types/Api';
import { basicProfile } from './defaultQuery';

const getMe = async (): Promise<ProfileResponse> => {
  return await apolloClient.query({
    query: basicProfile,
    variables: {username: 'vitaly.tartynov' },
    fetchPolicy: 'no-cache'
  });
};

export default getMe;
