import { CustomerSignMeInDraft } from '../../types/GraphQL';
import { getSettings } from '../../index';
import CustomerSignMeInMutation from './defaultMutation';
import { SignInResponse } from './../../types/Api';
import createAccessToken from './../../helpers/createAccessToken';

const customerSignMeIn = async (draft: CustomerSignMeInDraft): Promise<SignInResponse> => {
  const { locale, acceptLanguage, currentToken, auth, client } = getSettings();
  const loginResponse = await client.mutate({
    mutation: CustomerSignMeInMutation,
    variables: { draft, locale, acceptLanguage },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  const customerCredentials = { username: draft.email, password: draft.password };
  const token = await createAccessToken({ currentToken, customerCredentials });
  auth.onTokenChange(token);

  return loginResponse;
};

export default customerSignMeIn;
