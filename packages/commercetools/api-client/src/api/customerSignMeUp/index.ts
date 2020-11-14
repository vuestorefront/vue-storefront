import { CustomerSignMeUpDraft } from '../../types/GraphQL';
import CustomerSignMeUpMutation from './defaultMutation';
import { SignInResponse } from '../../types/Api';
import createAccessToken from '../../helpers/createAccessToken';
import { apiClientMethodFactory } from './../../configuration';

async function customerSignMeUp(draft: CustomerSignMeUpDraft): Promise<SignInResponse> {
  const { locale, acceptLanguage, currentToken, auth, client } = this.$vsf.ct;
  const registerResponse = await client.mutate({
    mutation: CustomerSignMeUpMutation,
    variables: { draft, locale, acceptLanguage },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  const customerCredentials = { username: draft.email, password: draft.password };
  const token = await createAccessToken(this.$vsf, { currentToken, customerCredentials });
  auth.onTokenChange(token);

  return registerResponse;
}

export default apiClientMethodFactory(customerSignMeUp);
