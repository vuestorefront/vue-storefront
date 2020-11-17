import { GetMyOrdersQuery, GetMyOrdersQueryVariables } from '../../graphql/types';

import searchProductsQueryDocument from './getMyOrdersQuery';

import { xApiClient, getSettings } from '../../index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getMyOrders(options: any): Promise<any> {
  const {getUserId } = getSettings();
  const { data } = await xApiClient.query<GetMyOrdersQuery, GetMyOrdersQueryVariables>({
    query: searchProductsQueryDocument,
    variables: {
      userId: getUserId(),
      filter: `customerId:${getUserId()}`,
      first: 10,
      after: '0'
    },
    fetchPolicy: 'no-cache'
  });
  return { 
    data: data.orders,
    total: data.orders.totalCount
   };
}
export default getMyOrders;

