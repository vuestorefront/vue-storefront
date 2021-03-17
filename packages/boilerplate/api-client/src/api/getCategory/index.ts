import { CustomQuery } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getCategory(context, params, customQuery?: CustomQuery) {
  return Promise.resolve([
    {
      id: 1,
      name: 'New',
      slug: 'new',
      childCount: 2,
      children: [
        {
          id: 15,
          name: 'Women',
          slug: 'new-women',
          childCount: 2,
          children: [
            {
              id: 16,
              name: 'Clothing',
              slug: 'new-women-clothing',
              childCount: 0,
              children: []
            },
            {
              id: 17,
              name: 'Shoes',
              slug: 'new-women-shoes',
              childCount: 0,
              children: []
            }
          ]
        },
        {
          id: 11,
          name: 'Men',
          slug: 'new-men',
          childCount: 1,
          children: [
            {
              id: 18,
              name: 'Clothing',
              slug: 'new-men-clothing',
              childCount: 0,
              children: []
            },
            {
              id: 19,
              name: 'Shoes',
              slug: 'new-men-shoes',
              childCount: 0,
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
      childCount: 2,
      children: [
        {
          id: 4,
          name: 'Women jackets',
          slug: 'women-jackets',
          childCount: 2,
          children: [
            {
              id: 9,
              name: 'Winter jackets',
              slug: 'winter-jackets',
              childCount: 0,
              children: []
            },
            {
              id: 10,
              name: 'Autumn jackets',
              slug: 'autmun-jackets',
              childCount: 0,
              children: []
            }
          ]
        },
        {
          id: 5,
          name: 'Skirts',
          slug: 'skirts',
          childCount: 0,
          children: []
        }
      ]
    },
    {
      id: 3,
      name: 'Men',
      slug: 'men',
      childCount: 1,
      children: [
        {
          id: 6,
          name: 'Men T-shirts',
          slug: 'men-tshirts',
          childCount: 0,
          children: []
        }
      ]
    },
    {
      id: 4,
      name: 'Kids',
      slug: 'kids',
      childCount: 1,
      children: [
        {
          id: 7,
          name: 'Toys',
          slug: 'toys',
          childCount: 2,
          children: [
            {
              id: 8,
              name: 'Toy Cars',
              slug: 'toy-cars',
              childCount: 0,
              children: []
            },
            {
              id: 8,
              name: 'Dolls',
              slug: 'dolls',
              childCount: 0,
              children: []
            }
          ]
        }
      ]
    }
  ]);
}
