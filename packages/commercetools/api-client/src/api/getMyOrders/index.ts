import { apolloClient, CustomQueryFn, getSettings, MeQueryInterface } from './../../index';
import defaultQuery from './defaultQuery';
import { buildOrderWhere } from './../../helpers/search';
import gql from 'graphql-tag';
import { getCustomQuery } from './../../helpers/queries';

interface OrdersData {
  me: Pick<MeQueryInterface, 'orders'>;
}

const getOrders = async (params, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage } = getSettings();
  const defaultVariables = {
    where: buildOrderWhere(params),
    sort: params.sort,
    limit: params.limit,
    offset: params.offset,
    acceptLanguage,
    locale
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await apolloClient.query<OrdersData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });
  return request;
};

export default getOrders;
