import { OrderMyCartCommand } from '../../types/GraphQL';
import defaultMutation from './defaultMutation';
import { OrderMutationResponse } from '../../types/Api';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';

const createMyOrderFromCart = async (context, draft: OrderMyCartCommand, customQuery?: CustomQuery): Promise<OrderMutationResponse> => {
  const { locale, acceptLanguage } = context.config;
  const defaultVariables = { locale,
    acceptLanguage,
    draft
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
