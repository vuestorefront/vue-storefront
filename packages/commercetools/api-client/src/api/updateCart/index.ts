import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';
import { apolloClient, getSettings } from '../../index';
import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';
import { getCustomQuery } from './../../helpers/queries';

interface UpdateCart {
  id: string;
  version: number;
  actions: CartUpdateAction[] | MyCartUpdateAction[];
}

const updateCart = async (params: UpdateCart, customQueryFn?) => {
  const { locale, acceptLanguage } = getSettings();
  const defaultVariables = params
    ? {
      locale,
      acceptLanguage,
      ...params
    }
    : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await apolloClient.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default updateCart;
