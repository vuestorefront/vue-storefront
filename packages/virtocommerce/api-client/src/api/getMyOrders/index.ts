import { GetMyOrdersQuery, GetMyOrdersQueryVariables } from '../../graphql/types';

import searchProductsQueryDocument from './getMyOrdersQuery';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getMyOrders({ config, client }, options: any): Promise<any> {
  const { getUserId } = config;
  const { data } = await client.query({
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

