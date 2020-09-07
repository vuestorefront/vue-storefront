import {_shopifyCustomClient} from '../../index';
import { ordersQuery as query} from './buildQueries';

const fetchOrders = async (token): Promise<void> => {
  return await _shopifyCustomClient.graphQLClient.send(query(10, token));
};

export default fetchOrders;
