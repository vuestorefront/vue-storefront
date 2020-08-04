import { _shopifyCustomClient } from '../../index';

const customerQuery: (token: string) => any = (token): any => {
  return _shopifyCustomClient.graphQLClient.query((root) => {
    root.add(
      'customer',
      {
        args: {
          customerAccessToken: token
        }
      },
      (customer) => {
        customer.add('id');
        customer.add('displayName');
        customer.add('email');
        customer.add('firstName');
        customer.add('lastName');
        customer.add('phone');
      }
    );
  });
};

const ordersQuery: (pages: number, token: string) => any = (
  pages,
  token
): any => {
  return _shopifyCustomClient.graphQLClient.query((root) => {
    root.add(
      'customer',
      {
        args: {
          customerAccessToken: token
        }
      },
      (customer) => {
        customer.add('id');
        customer.addConnection(
          'orders',
          { args: { first: pages } },
          (order) => {
            order.add('name');
            order.add('orderNumber');
            order.add('processedAt');
            order.add('financialStatus');
            order.add('totalPriceV2', (price) => {
              price.add('amount');
              price.add('currencyCode');
            });
            order.addConnection(
              'lineItems',
              { args: { first: 100 } },
              (item) => {
                item.add('title');
                item.add('quantity');
                item.add('currentQuantity');
                item.add('originalTotalPrice', (price) => {
                  price.add('amount');
                  price.add('currencyCode');
                });
                item.add('variant', (price) => {
                  price.add('sku');
                  price.add('title');
                });
              }
            );
          }
        );
      }
    );
  });
};

export { customerQuery, ordersQuery };
