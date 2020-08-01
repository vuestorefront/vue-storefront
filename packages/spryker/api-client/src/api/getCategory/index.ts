import { Category } from '../../types';

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
          slug: 'women-jackets',
          items: [
            {
              id: 9,
              name: 'Winter jackets',
              slug: 'winter-jackets',
              items: []
            },
            {
              id: 10,
              name: 'Autumn jackets',
              slug: 'autmun-jackets',
              items: []
            }
          ]
        },
        {
          id: 5,
          name: 'Skirts',
          slug: 'skirts',
          items: []
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
          slug: 'men-tshirts',
          items: []
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
              slug: 'toy-cars',
              items: []
            },
            {
              id: 8,
              name: 'Dolls',
              slug: 'dolls',
              items: []
            }
          ]
        }
      ]
    }
  ]);
}
