import { CustomerSignMeInDraft } from '../../types/GraphQL';
import CustomerSignMeInMutation from './defaultMutation';
import { SignInResponse } from './../../types/Api';
import createAccessToken from './../../helpers/createAccessToken';
import { apiClientMethodFactory } from './../../configuration';

async function customerSignMeIn(draft: CustomerSignMeInDraft): Promise<SignInResponse> {
  const { locale, acceptLanguage, currentToken, auth, client } = this.$vsf.ct;
  const loginResponse = await client.mutate({
    mutation: CustomerSignMeInMutation,
    variables: { draft, locale, acceptLanguage },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  const customerCredentials = { username: draft.email, password: draft.password };
  const token = await createAccessToken(this.$vsf, { currentToken, customerCredentials });
  auth.onTokenChange(token);

  return loginResponse;
}

export default apiClientMethodFactory(customerSignMeIn);
