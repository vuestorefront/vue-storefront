import { CustomerSignMeInDraft } from '../../types/GraphQL';
import CustomerSignMeInMutation from './defaultMutation';
import { SignInResponse } from './../../types/Api';

/**
 * @remarks References:
 * {@link CustomerSignMeInDraft}, {@link SignInResponse}
 */
const customerSignMeIn = async (context, draft: CustomerSignMeInDraft): Promise<SignInResponse> => {
  const { locale, acceptLanguage, currency } = context.config;

  const loginResponse = await context.client.mutate({
    mutation: CustomerSignMeInMutation,
    variables: {
      draft,
      locale,
      acceptLanguage,
      currency
    },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  return loginResponse;
};

export default customerSignMeIn;
