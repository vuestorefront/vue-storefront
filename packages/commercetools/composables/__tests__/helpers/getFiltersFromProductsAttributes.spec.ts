import getFiltersFromProductsAttributes from '../../src/helpers/internals/getFiltersFromProductsAttributes';
import { ProductVariant, Attribute } from '@vue-storefront/commercetools-api/lib/types/GraphQL';

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
        attributeList: [
          {
            name: 'someAttribute',
            __typename: 'StringAttribute',
            stringValue: 'value'
          } as Attribute,
          {
            name: 'someAttribute',
            __typename: 'StringAttribute',
            stringValue: 'value2',
            label: 'valueLabel'
          } as Attribute,
          {
            name: 'someNumberAttribute',
            __typename: 'NumberAttribute',
            numberValue: 1
          } as Attribute
        ]
      } as ProductVariant
    ];
    expect(getFiltersFromProductsAttributes(products)).toEqual({
      someAttribute: {
        type: 'StringAttribute',
        options: [
          { label: 'value', value: 'value', selected: false },
          { label: 'valueLabel', value: 'value2', selected: false }
        ]
      },
      someNumberAttribute: {
        type: 'NumberAttribute',
        options: [
          { label: null, value: 1, selected: false }
        ]
      }
    });
  });
});
