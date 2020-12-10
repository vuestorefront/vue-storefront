import { CustomQueryFn, MeQueryInterface } from '../../index';
import defaultQuery from './defaultQuery';
import { buildOrderWhere } from '../../helpers/search';
import gql from 'graphql-tag';
import { getCustomQuery } from '../../helpers/queries';
import ApolloClient from 'apollo-client';

interface OrdersData {
  me: Pick<MeQueryInterface, 'orders'>;
}

const getOrders = async ({ config, client }, params, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage } = config;
  const defaultVariables = {
    where: buildOrderWhere(params),
    sort: params.sort,
    limit: params.limit,
    offset: params.offset,
    acceptLanguage,
    locale
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await (client as ApolloClient<any>).query<OrdersData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });
  return request;
};

export default getOrders;
