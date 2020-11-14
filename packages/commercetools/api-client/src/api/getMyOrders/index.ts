import { CustomQueryFn, MeQueryInterface } from '../../index';
import defaultQuery from './defaultQuery';
import { buildOrderWhere } from '../../helpers/search';
import gql from 'graphql-tag';
import { getCustomQuery } from '../../helpers/queries';
import ApolloClient from 'apollo-client';
import { apiClientMethodFactory } from './../../configuration';

interface OrdersData {
  me: Pick<MeQueryInterface, 'orders'>;
}

async function getOrders(params, customQueryFn?: CustomQueryFn) {
  const { locale, acceptLanguage, client } = this.$vsf.ct;
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
}

export default apiClientMethodFactory(getOrders);
