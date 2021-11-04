import defaultMutation from './defaultMutation';
import { CartDetails } from './../../types/Api';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';

/**
 * @remarks References:
 * {@link CartDetails}
 */
const deleteCart = async (context, { id, version }: CartDetails, customQuery?: CustomQuery) => {
  const { locale, acceptLanguage, currency } = context.config;

  const defaultVariables = {
    id,
    version,
    acceptLanguage,
    locale,
    currency
  };

  const { deleteCart: deleteCartGql } = context.extendQuery(
    customQuery, { deleteCart: { query: defaultMutation, variables: defaultVariables } }
  );

  return await context.client.mutate({
    mutation: gql`${deleteCartGql.query}`,
    variables: deleteCartGql.variables,
    fetchPolicy: 'no-cache'
  });
};

export default deleteCart;
