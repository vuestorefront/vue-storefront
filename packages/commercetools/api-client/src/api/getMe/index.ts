import { apolloClient, getCustomQuery, getSettings } from './../../index';
import { basicProfile, fullProfile } from './defaultQuery';
import { resolveCustomQueryVariables } from '../../helpers/search';
import gql from 'graphql-tag';

interface Options {
  customer?: boolean;
}

interface OrdersData {
  // TODO: When https://github.com/DivanteLtd/vue-storefront/issues/4900 is finished, please change "me: any" to "me: Pick<MeQueryInterface, "activeCart" | "customer">"
  me: any;
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

  const request = await apolloClient.query<OrdersData>({
    query: customer
      ? fullProfile
      : query ? gql`${query}` : basicProfile,
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
