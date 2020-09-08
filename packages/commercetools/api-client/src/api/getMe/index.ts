import {apolloClient, getCustomQuery, getSettings} from './../../index';
import { ProfileResponse } from './../../types/Api';
import { basicProfile, fullProfile } from './defaultQuery';
import { resolveCustomQueryVariables } from '../../helpers/search';
import { ApolloQueryResult } from 'apollo-client';
import defaultQuery from '../getMyOrders/defaultQuery';

interface Options {
  customer?: boolean;
}

const getMe = async (params: Options = {}, customQueryFn?) => {
  const { variables } = getCustomQuery(customQueryFn, defaultQuery);
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
    query: customer ? fullProfile : basicProfile,
    variables: resolvedVariables
  };
};

export default getMe;
