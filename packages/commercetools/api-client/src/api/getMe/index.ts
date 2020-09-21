import { apolloClient, getCustomQuery, getSettings } from './../../index';
import { ProfileResponse } from './../../types/Api';
import { basicProfile, fullProfile } from './defaultQuery';
import { resolveCustomQueryVariables } from '../../helpers/search';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

interface Options {
  customer?: boolean;
}

const getMe = async (params: Options = {}, customQueryFn?) => {
  const { query, variables } = getCustomQuery(customQueryFn, basicProfile);
  const { locale, acceptLanguage } = getSettings();
  const { customer }: Options = params;
  const resolvedVariables = resolveCustomQueryVariables(
    {
      locale,
      acceptLanguage
    },
    variables
  );
  const request = await apolloClient.query<ApolloQueryResult<ProfileResponse>>({
    query: customer
      ? fullProfile
      : query
        ? gql`${query}`
        : basicProfile,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });
  return {
    ...request,
    query: customer ? fullProfile : basicProfile,
    variables: resolvedVariables
  };
};

export default getMe;
