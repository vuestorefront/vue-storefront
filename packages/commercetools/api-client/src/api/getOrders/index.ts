import { MeQueryInterface } from '../../index';
import defaultQuery from './defaultQuery';
import { buildOrderWhere } from '../../helpers/search';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';

interface OrdersData {
  me: Pick<MeQueryInterface, 'orders'>;
}

const getOrders = async (context, params, customQuery?: CustomQuery) => {
  const { locale, acceptLanguage } = context.config;
  const defaultVariables = {
    where: buildOrderWhere(params),
    sort: params.sort,
    limit: params.limit,
    offset: params.offset,
    acceptLanguage,
    locale
  };

  const { getMyOrders } = context.extendQuery(
    customQuery, { getMyOrders: { query: defaultQuery, variables: defaultVariables } }
  );

  const request = await (context.client as ApolloClient<any>).query<OrdersData>({
    query: gql`${getMyOrders.query}`,
    variables: getMyOrders.variables,
    fetchPolicy: 'no-cache'
  });
  return request;
};

export default getOrders;
