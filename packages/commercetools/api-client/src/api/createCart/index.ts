import { CartDraft } from './../../types/GraphQL';
import { apolloClient, getSettings } from './../../index';
import { getCustomQuery } from './../../helpers/queries';
import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

const createCart = async (cartDraft: CartData = {}, customQueryFn?) => {
  const { locale, acceptLanguage, currency } = getSettings();

  const defaultVariables = {
    acceptLanguage,
    locale,
    draft: {
      currency,
      ...cartDraft
    }
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await apolloClient.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default createCart;
