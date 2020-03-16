import { CustomerSignMeInDraft } from '../../types/GraphQL';
import { apolloClient, locale } from '../../index';
import CustomerSignMeInMutation from './defaultMutation';
import { SignInResponse } from './../../types/Api';

const customerSignMeIn = async (draft: CustomerSignMeInDraft): Promise<SignInResponse> => {
  return await apolloClient.mutate({
    mutation: CustomerSignMeInMutation,
    variables: { draft, locale },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;
};

export default customerSignMeIn;
