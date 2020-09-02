import { apolloClient, getSettings } from './../../index';
import { ProfileResponse } from './../../types/Api';
import { basicProfile, fullProfile } from './defaultQuery';

interface Options {
  customer?: boolean;
}

const getMe = async (options: Options = {}): Promise<ProfileResponse> => {
  const { locale, acceptLanguage } = getSettings();
  return await apolloClient.query({
    query: options.customer ? fullProfile : basicProfile,
    variables: { locale, acceptLanguage },
    fetchPolicy: 'no-cache'
  });
};

export default getMe;
