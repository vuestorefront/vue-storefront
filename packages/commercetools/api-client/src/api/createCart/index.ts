import { CartDraft } from '../../types/GraphQL';
import { CustomQueryFn } from '../../index';
import { getCustomQuery } from '../../helpers/queries';
import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';
import { Config } from './../../types/setup';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

const createCart = async (settings: Config, cartDraft: CartData = {}, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage, currency, client } = settings;

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
