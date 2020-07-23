import {Category} from '../../types';

export default async function getCategory(): Promise<Category[]> {
  return Promise.resolve([
    {
      id: 1,
      name: 'Women',
      slug: 'women',
      items: [
        {
          id: 4,
          name: 'Women jackets',
          slug: 'women-jackets'
        },
        {
          id: 5,
          name: 'Skirts',
          slug: 'skirts'
        }
      ]
    },
    {
      id: 2,
      name: 'Men',
      slug: 'men',
      items: [
        {
          id: 6,
          name: 'Men T-shirts',
          slug: 'men-tshirts'
        }
      ]
    },
    {
      id: 3,
      name: 'Kids',
      slug: 'kids',
      items: [
        {
          id: 7,
          name: 'Toys',
          slug: 'toys',
          items: [
            {
              id: 8,
              name: 'Toy Cars',
              slug: 'toy-cars'
            },
            {
              id: 8,
              name: 'Dolls',
              slug: 'dolls'
            }
          ]
        }
      ]
    }
  ]);
}
