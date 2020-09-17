import {apolloClient, getSettings} from './../../index';
import { ProfileResponse, getCartCustomQuery } from './../../types/Api';
import { basicProfile, fullProfile } from './defaultQuery';
import { resolveCustomQueryVariables } from '../../helpers/search';
import { ApolloQueryResult } from 'apollo-client';
import defaultQuery from '../getMyOrders/defaultQuery';
import gql from 'graphql-tag';

interface Options {
  customer?: boolean;
}

const getMe = async (params: Options = {}, customQueryFn?) => {
  const { user } = getCartCustomQuery(customQueryFn, { user: { query: defaultQuery } });
  const { query, variables } = user;
  const { locale, acceptLanguage } = getSettings();
  const { customer }: Options = params;
  const resolvedVariables = resolveCustomQueryVariables({
    locale, acceptLanguage
  }, variables);
  const request = await apolloClient.query<ApolloQueryResult<ProfileResponse>>({
    query: query ? gql`${query}` : customer ? fullProfile : basicProfile,
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
