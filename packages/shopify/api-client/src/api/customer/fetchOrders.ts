import {_shopifyCustomClient} from '../../index';
import { ordersQuery as query} from './buildQueries';

const fetchOrders = async (token): Promise<void> => {

  const orders = await _shopifyCustomClient.graphQLClient
    .send(query(10, token))
    .then(({ model }) => {
      return model;
    });
  return orders;
};

export default fetchOrders;
