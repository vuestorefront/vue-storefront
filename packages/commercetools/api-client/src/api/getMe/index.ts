import { basicProfile, fullProfile } from './defaultQuery';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';

export interface GetMeParams {
  customer?: boolean;
}

export interface OrdersData {
  // TODO: When https://github.com/DivanteLtd/vue-storefront/issues/4900 is finished, please change "me: any" to "me: Pick<MeQueryInterface, "activeCart" | "customer">"
  me: any;
}

/**
 * @remarks References:
 * {@link GetMeParams}, {@link OrdersData}
 */
const getMe = async (context, params: GetMeParams = {}, customQuery?: CustomQuery) => {
  const { locale, acceptLanguage, currency } = context.config;
  const { customer }: GetMeParams = params;

  const defaultVariables = {
    locale,
    acceptLanguage,
    currency
  };

  const { getBasicProfile, getFullProfile } = context.extendQuery(customQuery, {
    getBasicProfile: { query: basicProfile, variables: defaultVariables },
    getFullProfile: { query: fullProfile, variables: defaultVariables }
  });

  const profile = customer ? getFullProfile : getBasicProfile;

  const request = await (context.client as ApolloClient<any>).query<OrdersData>({
    query: gql`${profile.query}`,
    variables: profile.variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getMe;
