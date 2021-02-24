import { MeQueryInterface } from '../../index';
import defaultQuery from './defaultQuery';
import { buildOrderWhere } from '../../helpers/search';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';

interface OrdersData {
  me: Pick<MeQueryInterface, 'orders'>;
}

const getOrders = async (context, params) => {
  const { locale, acceptLanguage } = context.config;
  const defaultVariables = {
    where: buildOrderWhere(params),
    sort: params.sort,
    limit: params.limit,
    offset: params.offset,
    acceptLanguage,
    locale
  };

  const { getMyOrders } = context.createQuery({ getMyOrders: { query: defaultQuery, variables: defaultVariables } });

  const request = await (context.client as ApolloClient<any>).query<OrdersData>({
    query: gql`${getMyOrders.query}`,
    variables: getMyOrders.variables,
    fetchPolicy: 'no-cache'
  });
  return request;
};

export default getOrders;
