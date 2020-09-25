import { CartDraft } from './../../types/GraphQL';
import { apolloClient, getCustomQuery, getSettings } from './../../index';
import CreateCartMutation from './defaultMutation';
import { resolveCustomQueryVariables } from '../../helpers/search';
import gql from 'graphql-tag';

interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

const createCart = async (cartDraft: CartData = {}, customQueryFn?) => {
  const { query, variables } = getCustomQuery(customQueryFn, CreateCartMutation);
  const { locale, acceptLanguage, currency } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables(
    {
      acceptLanguage,
      locale,
      draft: {
        currency,
        ...cartDraft
      }
    },
    variables
  );
  const request = await apolloClient.mutate({
    mutation: gql`
      ${query}
    `,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });
  return {
    variables: resolvedVariables,
    ...request
  };
};

export default createCart;
