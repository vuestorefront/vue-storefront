import { CustomQueryFn } from '../../index';
import { basicProfile, fullProfile } from './defaultQuery';
import gql from 'graphql-tag';
import { getCustomQuery } from '../../helpers/queries';
import ApolloClient from 'apollo-client';

export interface GetMeParams {
  customer?: boolean;
}

export interface OrdersData {
  // TODO: When https://github.com/DivanteLtd/vue-storefront/issues/4900 is finished, please change "me: any" to "me: Pick<MeQueryInterface, "activeCart" | "customer">"
  me: any;
}

const getMe = async ({ config, client }, params: GetMeParams = {}, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage } = config;

  const { customer }: GetMeParams = params;
  const defaultQuery = customer ? fullProfile : basicProfile;
  const defaultVariables = {
    locale,
    acceptLanguage
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await (client as ApolloClient<any>).query<OrdersData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getMe;
