
import { apolloClient, getSettings } from './../../index';
import defaultQuery from './defaultMutation';
import { getCustomQuery } from './../../helpers/queries';
import gql from 'graphql-tag';

const createMyShoppingList = async(myShoppingListDraft: any, customQueryFn?) => {
  const { locale, acceptLanguage, currency } = getSettings();

  const defaultVariables = {
    draft: {
      acceptLanguage,
      locale,
      currency,
      ...myShoppingListDraft
    }
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await apolloClient.mutate({
    mutation: gql`
      ${query}
    `,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default createMyShoppingList;
