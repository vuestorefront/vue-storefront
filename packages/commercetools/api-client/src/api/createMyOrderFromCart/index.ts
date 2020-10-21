import { OrderMyCartCommand } from '../../types/GraphQL';
import { apolloClient, CustomQueryFn, getCustomQuery, getSettings } from '../../index';
import CreateMyOrderFromCartMutation from './defaultMutation';
import { OrderMutationResponse } from '../../types/Api';
import gql from 'graphql-tag';

const createMyOrderFromCart = async (draft: OrderMyCartCommand, customQueryFn?: CustomQueryFn): Promise<OrderMutationResponse> => {
  const { locale, acceptLanguage } = getSettings();
  const defaultVariables = { locale,
    acceptLanguage,
    draft
  };
  const { query, variables } = getCustomQuery(customQueryFn, { CreateMyOrderFromCartMutation, defaultVariables });

  return await apolloClient.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });
};

export default createMyOrderFromCart;
