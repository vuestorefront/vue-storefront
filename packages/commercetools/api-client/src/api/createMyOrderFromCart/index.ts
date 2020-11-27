import { OrderMyCartCommand } from '../../types/GraphQL';
import { getCustomQuery, CustomQueryFn } from '../../index';
import CreateMyOrderFromCartMutation from './defaultMutation';
import { OrderMutationResponse } from '../../types/Api';
import gql from 'graphql-tag';

const createMyOrderFromCart = async ({ config, client }, draft: OrderMyCartCommand, customQueryFn?: CustomQueryFn): Promise<OrderMutationResponse> => {
  const { locale, acceptLanguage } = config;
  const defaultVariables = { locale,
    acceptLanguage,
    draft
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery: CreateMyOrderFromCartMutation, defaultVariables });
  return await client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });
};

export default createMyOrderFromCart;
