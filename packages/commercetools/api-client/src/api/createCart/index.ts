import { CartDraft } from './../../types/GraphQL';
import { apolloClient, getSettings } from './../../index';
import CreateCartMutation from './defaultMutation';
import { resolveCustomQueryVariables } from '../../helpers/search';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

const createCart = async (cartDraft: CartData = {}) => {
  const { locale, acceptLanguage, currency } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables({
    acceptLanguage,
    locale,
    draft: {
      currency,
      ...cartDraft
    }
  }, {});
  const request = await apolloClient.mutate({
    mutation: CreateCartMutation,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });
  return {
    variables: resolvedVariables,
    ...request
  };
};

export default createCart;
