import { getVariantByAttributes } from './../../src/getters/_utils';

const product = {
  _name: 'variant 1',
  _slug: 'variant-1',
  price: {
    value: { centAmount: 1200 }
  },
  attributesRaw: [
    {
      name: 'articleNumberManufacturer',
      value: 'H805 C195 85072',
      attributeDefinition: { type: { name: 'text'} }
    }
  ],
  images: [{ url: 'imageV11/url.jpg' }, { url: 'imageV12/url.jpg' }]
} as any;

describe('[commercetools-getters] getVariantByAttribute', () => {
  it('returns configured product', () => {
    const variants = [
      {
        ...product,
        _master: true,
        attributesRaw: [
          {
            name: 'size',
            value: '36',
            attributeDefinition: { type: { name: 'text'} }
          },
          {
            name: 'color',
            value: 'white',
            attributeDefinition: { type: { name: 'text'} }
          }
        ]
      },
      {
        ...product,
        attributesRaw: [
          {
            name: 'size',
            value: '38',
            attributeDefinition: { type: { name: 'text'} }
          },
          {
            name: 'color',
            value: 'black',
            attributeDefinition: { type: { name: 'text'} }
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
      attributesRaw: [
        {
          name: 'size',
          value: '36',
          attributeDefinition: { type: { name: 'text'} }
        },
        {
          name: 'color',
          value: 'white',
          attributeDefinition: { type: { name: 'text'} }
        }
      ]
    });

    expect(getVariantByAttributes(variants, configuration)).toEqual({
      ...product,
      attributesRaw: [
        {
          name: 'size',
          value: '38',
          attributeDefinition: { type: { name: 'text'} }
        },
        {
          name: 'color',
          value: 'black',
          attributeDefinition: { type: { name: 'text'} }
        }
      ]
    });
  });
});
