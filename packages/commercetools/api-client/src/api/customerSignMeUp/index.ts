import { CustomerSignMeUpDraft } from './../../types/GraphQL';
import { apolloClient, getSettings } from './../../index';
import CustomerSignMeUpMutation from './defaultMutation';
import { SignInResponse } from './../../types/Api';
import createAccessToken from './../../helpers/createAccessToken';

const customerSignMeUp = async (draft: CustomerSignMeUpDraft): Promise<SignInResponse> => {
  const { locale, acceptLanguage, currentToken, auth } = getSettings();
  const registerResponse = await apolloClient.mutate({
    mutation: CustomerSignMeUpMutation,
    variables: { draft, locale, acceptLanguage },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  const customerCredentials = { username: draft.email, password: draft.password };
  const token = await createAccessToken({ currentToken, customerCredentials });
  auth.onTokenChange(token);

  return registerResponse;
};

export default customerSignMeUp;
