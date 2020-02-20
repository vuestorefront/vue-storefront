import { getCategoryProducts, getCategoryTree } from './../src/index';

const category = {
  id: '6e6d2ca4-2431-42f9-ba5d-747bdb499786',
  slug: 'men-clothing-jackets',
  name: 'Jackets',
  description: null,
  childCount: 0,
  parent: {
    id: '4f69311e-a78a-42c1-8d50-0af562e60113',
    slug: 'men-clothing',
    name: 'Clothing',
    childCount: 8,
    children: [
      {
        id: '6e6d2ca4-2431-42f9-ba5d-747bdb499786',
        slug: 'men-clothing-jackets',
        name: 'Jackets',
        childCount: 0,
        __typename: 'Category',
        children: []
      },
      {
        id: '5d640bc0-b726-448d-a160-fa08456794ed',
        slug: 'men-clothing-tops',
        name: 'Tops',
        childCount: 0,
        __typename: 'Category',
        children: []
      },
      {
        id: 'dbce6736-5ead-4bbb-876f-51774d2fe7ee',
        slug: 'men-clothing-shirts',
        name: 'Shirts',
        childCount: 0,
        __typename: 'Category',
        children: []
      },
      {
        id: '8525f590-2174-4afb-9f5a-7044727267bb',
        slug: 'men-clothing-trousers',
        name: 'Trousers',
        childCount: 0,
        __typename: 'Category',
        children: []
      },
      {
        id: 'c78aaa0c-e73c-445d-9db5-b17b6bc1b6a8',
        slug: 'men-clothing-jeans',
        name: 'Jeans',
        childCount: 0,
        __typename: 'Category',
        children: []
      },
      {
        id: '6f2cef09-cd76-4da2-b7cd-f06e5ebda052',
        slug: 'men-clothing-blazer',
        name: 'Blazer',
        childCount: 0,
        __typename: 'Category',
        children: []
      },
      {
        id: '5ef717b0-1b49-4e93-b2fe-7e6f274e5b78',
        slug: 'men-clothing-suits',
        name: 'Suits',
        childCount: 0,
        __typename: 'Category',
        children: []
      },
      {
        id: '7209d360-2c20-4b70-996e-f90b22676f24',
        slug: 'men-clothing-t-shirts',
        name: 'T-shirts',
        childCount: 0,
        __typename: 'Category',
        children: []
      }
    ],
    __typename: 'Category',
    parent: {
      id: '724b250d-9805-4657-ae73-3c02a63a9a13',
      slug: 'men',
      name: 'Men',
      childCount: 4,
      children: [
        {
          id: '4f69311e-a78a-42c1-8d50-0af562e60113',
          slug: 'men-clothing',
          name: 'Clothing',
          childCount: 8,
          __typename: 'Category',
          children: [
            {
              id: '6e6d2ca4-2431-42f9-ba5d-747bdb499786',
              slug: 'men-clothing-jackets',
              name: 'Jackets',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: '5d640bc0-b726-448d-a160-fa08456794ed',
              slug: 'men-clothing-tops',
              name: 'Tops',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: 'dbce6736-5ead-4bbb-876f-51774d2fe7ee',
              slug: 'men-clothing-shirts',
              name: 'Shirts',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: '8525f590-2174-4afb-9f5a-7044727267bb',
              slug: 'men-clothing-trousers',
              name: 'Trousers',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: 'c78aaa0c-e73c-445d-9db5-b17b6bc1b6a8',
              slug: 'men-clothing-jeans',
              name: 'Jeans',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: '6f2cef09-cd76-4da2-b7cd-f06e5ebda052',
              slug: 'men-clothing-blazer',
              name: 'Blazer',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: '5ef717b0-1b49-4e93-b2fe-7e6f274e5b78',
              slug: 'men-clothing-suits',
              name: 'Suits',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: '7209d360-2c20-4b70-996e-f90b22676f24',
              slug: 'men-clothing-t-shirts',
              name: 'T-shirts',
              childCount: 0,
              __typename: 'Category',
              children: []
            }
          ]
        },
        {
          id: 'b4fd559b-d1a9-4f94-8ff0-c741b40ce48b',
          slug: 'men-shoes',
          name: 'Shoes',
          childCount: 5,
          __typename: 'Category',
          children: [
            {
              id: '5a6fcbc9-754a-438d-92c0-dd0828897657',
              slug: 'men-shoes-sneakers',
              name: 'Sneakers',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: '8013f3cd-87b8-4d35-a6f3-66a544c949a4',
              slug: 'men-shoes-boots',
              name: 'Boots',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: 'ff66a557-173c-4a79-b010-bbcf31c3ca66',
              slug: 'men-shoes-lace-up-shoes',
              name: 'Lace-up shoes',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: 'ddb8df67-7d2b-4db0-823f-3fc00b1fc0aa',
              slug: 'men-shoes-loafers',
              name: 'Loafers',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: '384efe63-2ce8-4a39-9de8-d278de273b71',
              slug: 'men-shoes-sandals',
              name: 'Sandals',
              childCount: 0,
              __typename: 'Category',
              children: []
            }
          ]
        },
        {
          id: '3be0d588-34ea-4098-b850-e14148ebd70e',
          slug: 'men-bags',
          name: 'Bags',
          childCount: 6,
          __typename: 'Category',
          children: [
            {
              id: 'b0207792-2d58-4fb7-aac9-81081034ddeb',
              slug: 'men-bags-clutches',
              name: 'Clutches',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: 'eb1a1863-c693-4ce0-a37a-c4785769556c',
              slug: 'men-bags-shoulder-bags',
              name: 'Shoulder bags',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: 'b110f9a2-e3a2-493b-933b-5a4555ad7338',
              slug: 'men-bags-shopper',
              name: 'Shopper',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: '033170ad-2414-452f-974c-c891760cef18',
              slug: 'men-bags-handbag',
              name: 'Handbag',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: 'd25a0ca0-1fba-4087-a2ba-f7f13ad45145',
              slug: 'men-bags-wallets',
              name: 'Wallets',
              childCount: 0,
              __typename: 'Category',
              children: []
            },
            {
              id: '4567129a-0564-4e37-8d5c-fe98c32c5959',
              slug: 'men-bags-bucket-and-packbag',
              name: 'Bucketbag & packbag',
              childCount: 0,
              __typename: 'Category',
              children: []
            }
          ]
        },
        {
          id: '80a0a3ae-9a2a-4895-a9c6-07416c94ac97',
          slug: 'men-looks',
          name: 'Looks',
          childCount: 0,
          __typename: 'Category',
          children: []
        }
      ],
      __typename: 'Category',
      parent: null
    }
  },
  children: [],
  __typename: 'Category',
  _products: [
    { _name: 'prod1',
      _master: true },
    { _name: 'prod2',
      _master: false },
    { _name: 'prod3',
      _master: false },
    { _name: 'prod4',
      _master: false },
    { _name: 'prod5',
      _master: true },
    { _name: 'prod6',
      _master: false }
  ]
} as any;

describe('[commercetools-helpers] category helpers', () => {
  it('returns empty array when there are no _products', () => {
    expect(getCategoryProducts(null)).toEqual([]);
  });

  it('returns all products', () => {
    expect(getCategoryProducts(category)).toEqual(category._products);
  });

  it('returns master products', () => {
    expect(getCategoryProducts(category, { master: true })).toEqual([
      { _name: 'prod1',
        _master: true },
      { _name: 'prod5',
        _master: true }
    ]);
  });

  it('returns null when there is no category', () => {
    expect(getCategoryTree(null)).toBe(null);
  });

  it('returns category tree', () => {
    const categoryRoot = getCategoryTree(category);
    expect(categoryRoot.slug).toBe('men');
  });
});
