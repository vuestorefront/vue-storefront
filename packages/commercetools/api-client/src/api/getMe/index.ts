import { apolloClient, getSettings } from './../../index';
import { ProfileResponse } from './../../types/Api';
import defaultQuery from '../getProduct/defaultQuery';
import { resolveCustomQueryVariables } from '../../helpers/search';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

interface Options {
  customer?: boolean;
}

const getMe = async (customQuery = async (query = defaultQuery, variables = {}) => {
  const { locale, acceptLanguage } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables({
    locale, acceptLanguage
  }, variables);
  const request = await apolloClient.query<ApolloQueryResult<ProfileResponse>>({
    query: gql`${query}`,
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

export default getMe;
