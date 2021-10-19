import { CustomerSignMeUpDraft } from '../../types/GraphQL';
import CustomerSignMeUpMutation from './defaultMutation';
import { SignInResponse } from '../../types/Api';

/**
 * @remarks References:
 * {@link CustomerSignMeUpDraft}, {@link SignInResponse}
 */
const customerSignMeUp = async (context, draft: CustomerSignMeUpDraft): Promise<SignInResponse> => {
  const { locale, acceptLanguage, currency } = context.config;

  return await context.client.mutate({
    mutation: CustomerSignMeUpMutation,
    variables: {
      draft,
      locale,
      acceptLanguage,
      currency
    },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;
};

export default customerSignMeUp;
