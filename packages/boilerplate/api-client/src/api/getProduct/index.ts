import {ProductVariant} from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(options: {}): Promise<ProductVariant[]> {
  return Promise.resolve([
    {
      _id: 1,
      _description: 'Some description',
      _categoriesRef: [
        '1',
        '2'
      ],
      categories: [1],
      name: 'Black jacket',
      sku: 'black-jacket',
      images: [
        'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
      ],
      price: {
        original: 12.34,
        current: 10.00
      }
    }
  ]);
}

