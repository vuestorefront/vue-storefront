import { CartDraft } from './../../types/GraphQL';
import { apolloClient, getCartCustomQuery, getSettings } from './../../index';
import CreateCartMutation from './defaultMutation';
import { resolveCustomQueryVariables } from '../../helpers/search';
import gql from 'graphql-tag';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

const createCart = async (cartDraft: CartData = {}, customQueryFn?) => {
  const { cart } = getCartCustomQuery(customQueryFn, { cart: { query: CreateCartMutation } });
  const { query, variables } = cart;
  const { locale, acceptLanguage, currency } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables({
    acceptLanguage,
    locale,
    draft: {
      currency,
      ...cartDraft
    }
  }, variables);
  const request = await apolloClient.mutate({
    mutation: gql`${query}`,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });
  return {
    variables: resolvedVariables,
    ...request
  };
};

export default createCart;
