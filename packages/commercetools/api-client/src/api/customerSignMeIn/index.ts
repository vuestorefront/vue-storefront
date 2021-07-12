import { CustomerSignMeInDraft } from '../../types/GraphQL';
import CustomerSignMeInMutation from './defaultMutation';
import { SignInResponse } from './../../types/Api';

const customerSignMeIn = async (context, draft: CustomerSignMeInDraft): Promise<SignInResponse> => {
  const { locale, acceptLanguage, currency, store } = context.config;

  const loginResponse = await context.client.mutate({
    mutation: CustomerSignMeInMutation,
    variables: {
      draft,
      locale,
      acceptLanguage,
      currency,
      storeKey: store
    },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  return loginResponse;
};

export default customerSignMeIn;
