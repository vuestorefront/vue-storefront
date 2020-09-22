import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';
import { apolloClient, getCustomQuery, getSettings } from '../../index';
import CreateCartMutation from './defaultMutation';
import { resolveCustomQueryVariables } from '../../helpers/search';
import gql from 'graphql-tag';

interface UpdateCart {
  id: string;
  version: number;
  actions: CartUpdateAction[] | MyCartUpdateAction[];
}

const updateCart = async (params: UpdateCart, customQueryFn?) => {
  const { query, variables } = getCustomQuery(customQueryFn, CreateCartMutation);
  const { locale, acceptLanguage } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables(
    params
      ? {
        locale,
        acceptLanguage,
        ...params
      }
      : { acceptLanguage },
    variables,
    'category'
  );
  const request = await apolloClient.mutate({
    mutation: gql`
      ${query}
    `,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });
  return {
    ...request,
    query,
    variables: resolvedVariables
  };
};

export default updateCart;
