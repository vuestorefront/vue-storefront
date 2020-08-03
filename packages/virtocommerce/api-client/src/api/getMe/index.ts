import { apolloClient } from '../../index';
import { ProfileResponse } from '../../types/Api';
import { basicProfile } from './defaultQuery';

const getMe = async (): Promise<ProfileResponse> => {
  console.warn('getMe started');
  console.warn(`CLIENT: ${apolloClient}`);
  return await apolloClient.query({
    query: basicProfile,
    variables: 'vitaly.tartynov',
    fetchPolicy: 'no-cache'
  });
};

export default getMe;
