import { apolloClient, getCustomQuery, getSettings, MeQueryInterface } from './../../index';
import defaultQuery from './defaultQuery';
import { buildOrderWhere, resolveCustomQueryVariables } from './../../helpers/search';
import gql from 'graphql-tag';

interface OrdersData {
  me: Pick<MeQueryInterface, 'orders'>;
}

const getOrders = async (params, customQueryFn?) => {
  const { query, variables } = getCustomQuery(customQueryFn, defaultQuery);
  const { locale, acceptLanguage } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables({
    where: buildOrderWhere(params),
    sort: params.sort,
    limit: params.limit,
    offset: params.offset,
    acceptLanguage,
    locale
  }, variables, 'order');
  const request = await apolloClient.query<OrdersData>({
    query: gql`${query}`,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });
  return {
    ...request,
    query,
    variables: resolvedVariables
  };
};

export default getOrders;
