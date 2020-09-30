import { apolloClient, getSettings } from './../../index';
import { basicProfile, fullProfile } from './defaultQuery';
import gql from 'graphql-tag';
import { getCustomQuery } from './../../helpers/queries';

interface Options {
  customer?: boolean;
}

interface OrdersData {
  // TODO: When https://github.com/DivanteLtd/vue-storefront/issues/4900 is finished, please change "me: any" to "me: Pick<MeQueryInterface, "activeCart" | "customer">"
  me: any;
}

const getMe = async (params: Options = {}, customQueryFn?) => {
  const { locale, acceptLanguage } = getSettings();
  const { customer }: Options = params;
  const defaultQuery = customer ? fullProfile : basicProfile;
  const defaultVariables = {
    locale,
    acceptLanguage
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await apolloClient.query<OrdersData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getMe;
