/* istanbul ignore file */

import { useUserOrdersFactory, UseUserOrdersFactoryParams, OrdersSearchResult } from '@vue-storefront/core';
import { Order, OrderSearchParams } from '../../types';

// @todo userOrders

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (params: OrderSearchParams = {}): Promise<OrdersSearchResult<Order>> => {
    return Promise.resolve({
      data: [
        {
          date: '12/12/2012',
          id: 1,
          status: 'Processing',
          price: 32.00,
          items: [
            {
              _id: 1,
              _description: 'Some description',
              _categoriesRef: [
                '1',
                '2'
              ],
              name: 'Black jacket',
              sku: 'black-jacket',
              images: [
                'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
              ],
              price: {
                original: 12.34,
                current: 10.00
              },
              qty: 1
            },
            {
              _id: 2,
              _description: 'Some different description',
              _categoriesRef: [
                '1',
                '2',
                '3'
              ],
              name: 'White shirt',
              sku: 'white-shirt',
              images: [
                'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
              ],
              price: {
                original: 15.11,
                current: 11.00
              },
              qty: 2
            }
          ]
        },
        {
          date: '09/01/2014',
          id: 2,
          status: 'Suspected Fraud',
          price: 31.00,
          items: [
            {
              _id: 1,
              _description: 'Some description',
              _categoriesRef: [
                '1',
                '2'
              ],
              name: 'Black jacket',
              sku: 'black-jacket',
              images: [
                'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
              ],
              price: {
                original: 12.34,
                current: 10.00
              },
              qty: 2
            },
            {
              _id: 2,
              _description: 'Some different description',
              _categoriesRef: [
                '1',
                '2',
                '3'
              ],
              name: 'White shirt',
              sku: 'white-shirt',
              images: [
                'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
              ],
              price: {
                original: 15.11,
                current: 11.00
              },
              qty: 1
            }
          ]
        }
      ],
      total: 2
    });
  }
};

const useUserOrders: () => any = useUserOrdersFactory<Order, OrderSearchParams>(params);

export default useUserOrders;
