import { CustomerSignMeUpDraft } from '../../types/GraphQL';
import CustomerSignMeUpMutation from './defaultMutation';
import { SignInResponse } from '../../types/Api';

const customerSignMeUp = async (context, draft: CustomerSignMeUpDraft): Promise<SignInResponse> => {
  const { locale, acceptLanguage } = context.config;
  const registerResponse = await context.client.mutate({
    mutation: CustomerSignMeUpMutation,
    variables: { draft, locale, acceptLanguage },
    fetchPolicy: 'no-cache'
  }) as SignInResponse;

  return registerResponse;
};

export default customerSignMeUp;
