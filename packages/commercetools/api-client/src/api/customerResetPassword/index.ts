import defaultQuery from './defaultMutation';
import { ResetPasswordResponse } from 'src/types/Api';
import { CustomQuery, Logger } from '@vue-storefront/core';
import gql from 'graphql-tag';

/**
 * @remarks References:
 * {@link ResetPasswordResponse}
 */
const customerResetPassword = async (context, tokenValue: string, newPassword: string, customQuery?: CustomQuery): Promise<ResetPasswordResponse> => {
  const { locale, acceptLanguage } = context.config;
  const defaultVariables = tokenValue && newPassword
    ? {
      locale,
      acceptLanguage,
      tokenValue,
      newPassword
    }
    : { acceptLanguage };

  const { customerResetPassword } = context.extendQuery(
    customQuery, { customerResetPassword: { query: defaultQuery, variables: defaultVariables } }
  );

  try {
    return await context.client.mutate({
      mutation: gql`${customerResetPassword.query}`,
      variables: customerResetPassword.variables,
      fetchPolicy: 'no-cache'
    }) as ResetPasswordResponse;
  } catch (error) {
    Logger.error(`Cannot set new password after reset. Error: ${error}`);
    throw error;
  }
};

export default customerResetPassword;
