import { OrderMyCartCommand } from '../../types/GraphQL';
import { getCustomQuery, CustomQueryFn } from '../../index';
import CreateMyOrderFromCartMutation from './defaultMutation';
import { OrderMutationResponse } from '../../types/Api';
import gql from 'graphql-tag';
import { apiClientMethodFactory } from './../../configuration';

async function createMyOrderFromCart(draft: OrderMyCartCommand, customQueryFn?: CustomQueryFn): Promise<OrderMutationResponse> {
  const { locale, acceptLanguage, client } = this.$vsf.ct;
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
}

export default apiClientMethodFactory(createMyOrderFromCart);
