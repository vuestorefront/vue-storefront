import {ProductVariant} from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(options: any): Promise<ProductVariant[]> {
  const products = [
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
      }
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
      }
    }
  ];

  if (options && options.sort) {
    return Promise.resolve(products.sort((productA, productB) => {
      switch (options.sort) {
        case 'price-desc':
          return productB.price.current - productA.price.current;
        case 'price-asc':
          return productA.price.current - productB.price.current;
      }
    }));
  }
  return Promise.resolve(products);
}

