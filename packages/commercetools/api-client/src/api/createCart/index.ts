import { CartDraft } from './../../types/GraphQL';
import { apolloClient, getSettings } from './../../index';
import CreateCartMutation from './defaultMutation';
import { resolveCustomQueryVariables } from '../../helpers/search';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

const createCart = async (cartDraft: CartData = {}, customQuery = async (query = CreateCartMutation, variables = {}) => {
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
    mutation: query,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });
  return {
    query,
    variables: resolvedVariables,
    ...request
  };
}) => {
  return customQuery();
};

export default createCart;
