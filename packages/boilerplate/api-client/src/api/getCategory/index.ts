import { CustomQuery } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getCategory(context, params, customQuery?: CustomQuery) {
  return Promise.resolve([
    {
      id: 1,
      name: 'New',
      slug: 'new',
      children: [
        {
          id: 15,
          name: 'Women',
          slug: 'new-women',
          children: [
            {
              id: 16,
              name: 'Clothing',
              slug: 'new-women-clothing',
              children: []
            },
            {
              id: 17,
              name: 'Shoes',
              slug: 'new-women-shoes',
              children: []
            }
          ]
        },
        {
          id: 11,
          name: 'Men',
          slug: 'new-men',
          children: [
            {
              id: 18,
              name: 'Clothing',
              slug: 'new-men-clothing',
              children: []
            },
            {
              id: 19,
              name: 'Shoes',
              slug: 'new-men-shoes',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Women',
      slug: 'women',
      children: [
        {
          id: 4,
          name: 'Women jackets',
          slug: 'women-jackets',
          children: [
            {
              id: 9,
              name: 'Winter jackets',
              slug: 'winter-jackets',
              children: []
            },
            {
              id: 10,
              name: 'Autumn jackets',
              slug: 'autmun-jackets',
              children: []
            }
          ]
        },
        {
          id: 5,
          name: 'Skirts',
          slug: 'skirts',
          children: []
        }
      ]
    },
    {
      id: 3,
      name: 'Men',
      slug: 'men',
      children: [
        {
          id: 6,
          name: 'Men T-shirts',
          slug: 'men-tshirts',
          children: []
        }
      ]
    },
    {
      id: 4,
      name: 'Kids',
      slug: 'kids',
      children: [
        {
          id: 7,
          name: 'Toys',
          slug: 'toys',
          children: [
            {
              id: 8,
              name: 'Toy Cars',
              slug: 'toy-cars',
              children: []
            },
            {
              id: 8,
              name: 'Dolls',
              slug: 'dolls',
              children: []
            }
          ]
        }
      ]
    }
  ]);
}
