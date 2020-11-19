import { CustomerSignMeUpDraft } from '../../types/GraphQL';
import CustomerSignMeUpMutation from './defaultMutation';
import { SignInResponse } from '../../types/Api';
import createAccessToken from '../../helpers/createAccessToken';
import { Config } from './../../types/setup';

const customerSignMeUp = async (settings: Config, draft: CustomerSignMeUpDraft): Promise<SignInResponse> => {
  const { locale, acceptLanguage, currentToken, auth, client } = settings;
  const registerResponse = await client.mutate({
    mutation: CustomerSignMeUpMutation,
    variables: { draft, locale, acceptLanguage },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  const customerCredentials = { username: draft.email, password: draft.password };
  const token = await createAccessToken(settings, { currentToken, customerCredentials });
  auth.onTokenChange(token);

  return registerResponse;
};

export default customerSignMeUp;
