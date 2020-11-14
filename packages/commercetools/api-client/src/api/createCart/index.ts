import { CartDraft } from '../../types/GraphQL';
import { CustomQueryFn } from '../../index';
import { getCustomQuery } from '../../helpers/queries';
import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';
import { apiClientMethodFactory } from './../../configuration';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

async function createCart (cartDraft: CartData = {}, customQueryFn?: CustomQueryFn) {
  const { locale, acceptLanguage, currency, client } = this.$vsf.ct;

  const defaultVariables = {
    acceptLanguage,
    locale,
    draft: {
      currency,
      ...cartDraft
    }
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
}

export default apiClientMethodFactory(createCart);
