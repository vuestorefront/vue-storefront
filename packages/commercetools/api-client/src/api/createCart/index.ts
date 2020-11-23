import { CartDraft } from '../../types/GraphQL';
import { CustomQueryFn } from '../../index';
import { getCustomQuery } from '../../helpers/queries';
import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

const createCart = async ({ config, client }, cartDraft: CartData = {}, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage, currency } = config;

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
};

export default createCart;
