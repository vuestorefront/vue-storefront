import { apolloClient, getSettings } from './../../index';
import { basicProfile } from './defaultQuery';
import gql from 'graphql-tag';
import { getCustomQuery } from './../../helpers/queries';

const getMyShoppingList = async (customQueryFn?) => {
  const { locale, acceptLanguage } = getSettings();
  const defaultQuery = basicProfile;
  const defaultVariables = {
    locale,
    acceptLanguage
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await apolloClient.query({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getMyShoppingList;
