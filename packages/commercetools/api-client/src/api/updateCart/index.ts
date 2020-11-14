import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';
import { CustomQueryFn } from './../../types/Api';
import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';
import { getCustomQuery } from './../../helpers/queries';
import { apiClientMethodFactory } from './../../configuration';

interface UpdateCart {
  id: string;
  version: number;
  actions: CartUpdateAction[] | MyCartUpdateAction[];
}

async function updateCart(params: UpdateCart, customQueryFn?: CustomQueryFn) {
  const { locale, acceptLanguage, client } = this.$vsf.ct;

  const defaultVariables = params
    ? {
      locale,
      acceptLanguage,
      ...params
    }
    : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
}

export default apiClientMethodFactory(updateCart);
