import { apolloClient, getSettings } from './../../index';
import { ProfileResponse } from './../../types/Api';
import { basicProfile, fullProfile } from './defaultQuery';
import { resolveCustomQueryVariables } from '../../helpers/search';
import { ApolloQueryResult } from 'apollo-client';

interface Options {
  customer?: boolean;
}

const getMe = async (params: Options = {}, customQuery = (query = basicProfile, variables = {}) => ({ query, variables })) => {
  const { query, variables } = customQuery();
  const { locale, acceptLanguage } = getSettings();
  const { customer }: Options = params;
  const resolvedVariables = resolveCustomQueryVariables({
    locale, acceptLanguage
  }, variables);
  const request = await apolloClient.query<ApolloQueryResult<ProfileResponse>>({
    query: customer ? fullProfile : basicProfile,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });
  return {
    ...request,
    query,
    variables: resolvedVariables
  };
};

export default getMe;
