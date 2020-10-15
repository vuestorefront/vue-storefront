import { apolloClient, getSettings } from '../../index';
import { getCustomQuery } from '../../helpers/queries';
import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';

const deleteCart = async (id: string, version: number, customQueryFn?) => {
  const { locale, acceptLanguage } = getSettings();

  const defaultVariables = {
    acceptLanguage,
    locale,
    id,
    version
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

export default deleteCart;
