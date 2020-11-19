import { CustomQueryFn, MeQueryInterface } from '../../index';
import defaultQuery from './defaultQuery';
import { buildOrderWhere } from '../../helpers/search';
import gql from 'graphql-tag';
import { getCustomQuery } from '../../helpers/queries';
import { Config } from './../../types/setup';

interface OrdersData {
  me: Pick<MeQueryInterface, 'orders'>;
}

const getOrders = async (settings: Config, params, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage, client } = settings;
  const defaultVariables = {
    where: buildOrderWhere(params),
    sort: params.sort,
    limit: params.limit,
    offset: params.offset,
    acceptLanguage,
    locale
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await client.query<OrdersData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });
  return request;
};

export default getOrders;
