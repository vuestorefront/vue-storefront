import { CustomerSignMeInDraft } from '../../types/GraphQL';
import CustomerSignMeInMutation from './defaultMutation';
import { SignInResponse } from './../../types/Api';
import createAccessToken from './../../helpers/createAccessToken';

const customerSignMeIn = async (context, draft: CustomerSignMeInDraft): Promise<SignInResponse> => {
  const { locale, acceptLanguage, currentToken, auth } = context.config;
  const loginResponse = await context.client.mutate({
    mutation: CustomerSignMeInMutation,
    variables: { draft, locale, acceptLanguage },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  const customerCredentials = { username: draft.email, password: draft.password };
  const token = await createAccessToken(context.config, { currentToken, customerCredentials });
  auth.onTokenChange(token);

  return loginResponse;
};

export default customerSignMeIn;
