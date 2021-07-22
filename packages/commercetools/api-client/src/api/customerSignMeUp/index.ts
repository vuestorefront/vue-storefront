import { CustomerSignMeUpDraft } from '../../types/GraphQL';
import CustomerSignMeUpMutation from './defaultMutation';
import { SignInResponse } from '../../types/Api';
import { getStoreKey } from '../../helpers/utils';

const customerSignMeUp = async (context, draft: CustomerSignMeUpDraft): Promise<SignInResponse> => {
  const { locale, acceptLanguage, currency, store } = context.config;

  const registerResponse = await context.client.mutate({
    mutation: CustomerSignMeUpMutation,
    variables: {
      draft,
      locale,
      acceptLanguage,
      currency,
      storeKey: getStoreKey(store)
    },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  return registerResponse;
};

export default customerSignMeUp;
