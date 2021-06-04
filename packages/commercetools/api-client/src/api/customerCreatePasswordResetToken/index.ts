import defaultQuery from './defaultMutation';
import { CreatePasswordResetTokenResponse } from 'src/types/Api';
import { Context, CustomQuery, Logger } from '@vue-storefront/core';
import gql from 'graphql-tag';

const customerCreatePasswordResetToken = async (context: Context, email: string, customQuery?: CustomQuery): Promise<CreatePasswordResetTokenResponse> => {
  const { locale, acceptLanguage } = context.config;
  const defaultVariables = email
    ? {
      locale,
      acceptLanguage,
      email
    }
    : { acceptLanguage };

  const { customerCreatePasswordResetToken } = context.extendQuery(
    customQuery, { customerCreatePasswordResetToken: { query: defaultQuery, variables: defaultVariables } }
  );

  try {
    const result = await context.client.mutate({
      mutation: gql`${customerCreatePasswordResetToken.query}`,
      variables: customerCreatePasswordResetToken.variables,
      fetchPolicy: 'no-cache'
    }) as CreatePasswordResetTokenResponse;

    return result;
  } catch (error) {
    Logger.error(`Cannot create password reset token. Error: ${error}`);
    throw error;
  }

};

export default customerCreatePasswordResetToken;
