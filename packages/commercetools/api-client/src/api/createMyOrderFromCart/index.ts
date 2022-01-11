import { OrderMyCartCommand } from '../../types/GraphQL';
import defaultMutation from './defaultMutation';
import { OrderMutationResponse } from '../../types/Api';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
import { getStoreKey } from '../../helpers/utils';

/**
 * @remarks References:
 * {@link OrderMyCartCommand}, {@link OrderMutationResponse}
 */
const createMyOrderFromCart = async (context, draft: OrderMyCartCommand, customQuery?: CustomQuery): Promise<OrderMutationResponse> => {
  const { locale, acceptLanguage, currency, store } = context.config;

  const defaultVariables = {
    locale,
    acceptLanguage,
    currency,
    draft,
    ...getStoreKey(store)
  };

  const { createMyOrderFromCart } = context.extendQuery(
    customQuery, { createMyOrderFromCart: { query: defaultMutation, variables: defaultVariables } }
  );

  return await context.client.mutate({
    mutation: gql`${createMyOrderFromCart.query}`,
    variables: createMyOrderFromCart.variables,
    fetchPolicy: 'no-cache'
  });
};

export default createMyOrderFromCart;
