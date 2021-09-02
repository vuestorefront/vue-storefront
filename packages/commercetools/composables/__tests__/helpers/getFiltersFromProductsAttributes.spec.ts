import getFiltersFromProductsAttributes from '../../src/helpers/internals/getFiltersFromProductsAttributes';
import { ProductVariant, Attribute } from '../../src/types/GraphQL';

describe('[commercetools-composables] getFiltersFromProductsAttributes', () => {
  describe('returns epmty object in case of', () => {
    it('empty products list', () => {
      expect(getFiltersFromProductsAttributes([])).toEqual({});
    });

    it('no products list given', () => {
      expect(getFiltersFromProductsAttributes(null)).toEqual({});
    });
  });

  it('returns filters based on attributes', () => {
    const products: ProductVariant[] = [
      {
        attributesRaw: [
          {
            name: 'someAttribute',
            attributeDefinition: { type: { name: 'text' } },
            value: 'value'
          } as Attribute,
          {
            name: 'someAttribute',
            attributeDefinition: { type: { name: 'text' } },
            value: 'value2',
            label: 'valueLabel'
          } as Attribute,
          {
            name: 'someNumberAttribute',
            attributeDefinition: { type: { name: 'number' } },
            value: 1
          } as Attribute
        ]
      } as ProductVariant
    ];
    expect(getFiltersFromProductsAttributes(products)).toEqual({
      someAttribute: {
        type: 'text',
        options: [
          { label: 'value', value: 'value', selected: false },
          { label: 'valueLabel', value: 'value2', selected: false }
        ]
      },
      someNumberAttribute: {
        type: 'number',
        options: [
          { label: null, value: 1, selected: false }
        ]
      }
    });
  });
});
