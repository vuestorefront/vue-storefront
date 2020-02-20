import { getVariantByAttributes } from '../src/_utils';

const product = {
  _name: 'variant 1',
  _slug: 'variant-1',
  price: {
    value: { centAmount: 1200 }
  },
  attributeList: [
    {
      name: 'articleNumberManufacturer',
      stringValue: 'H805 C195 85072',
      __typename: 'StringAttribute'
    }
  ],
  images: [{ url: 'imageV11/url.jpg' }, { url: 'imageV12/url.jpg' }]
} as any;

describe('[commercetools-helpers] getVariantByAttribute', () => {
  it('returns configured product', () => {
    const variants = [
      {
        ...product,
        _master: true,
        attributeList: [
          {
            name: 'size',
            stringValue: '36',
            __typename: 'StringAttribute'
          },
          {
            name: 'color',
            stringValue: 'white',
            __typename: 'StringAttribute'
          }
        ]
      },
      {
        ...product,
        attributeList: [
          {
            name: 'size',
            stringValue: '38',
            __typename: 'StringAttribute'
          },
          {
            name: 'color',
            stringValue: 'black',
            __typename: 'StringAttribute'
          }
        ]
      }
    ] as any;

    const configuration = {
      size: '38',
      color: 'black'
    } as any;

    expect(getVariantByAttributes(null, configuration)).toEqual(null);
    expect(getVariantByAttributes(variants, {})).toEqual({
      ...product,
      _master: true,
      attributeList: [
        {
          name: 'size',
          stringValue: '36',
          __typename: 'StringAttribute'
        },
        {
          name: 'color',
          stringValue: 'white',
          __typename: 'StringAttribute'
        }
      ]
    });

    expect(getVariantByAttributes(variants, configuration)).toEqual({
      ...product,
      attributeList: [
        {
          name: 'size',
          stringValue: '38',
          __typename: 'StringAttribute'
        },
        {
          name: 'color',
          stringValue: 'black',
          __typename: 'StringAttribute'
        }
      ]
    });
  });
});
