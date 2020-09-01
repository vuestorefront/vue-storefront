import { apolloClient, getSettings } from './../../index';
import { ProfileResponse } from './../../types/Api';
import { basicProfile, fullProfile } from './defaultQuery';
import { resolveCustomQueryVariables } from '../../helpers/search';
import { ApolloQueryResult } from 'apollo-client';

interface Options {
  customer?: boolean;
}

const getMe = async (params: Options = {}, customQuery = async (query = basicProfile, variables = {}) => {
  const { locale, acceptLanguage } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables({
    locale, acceptLanguage
  }, variables);
  const request = await apolloClient.query<ApolloQueryResult<ProfileResponse>>({
    query: params.customer ? fullProfile : basicProfile,
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
