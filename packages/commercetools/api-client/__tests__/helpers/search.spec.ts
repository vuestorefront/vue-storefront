import {
  buildProductWhere,
  buildCategoryWhere,
  buildOrderWhere
} from './../../src/helpers/search';
import { AttributeType, ProductSearch } from '../../src/types/Api';
import { locale, currency } from '../../src';

describe('[commercetools-api-client] search', () => {
  it('returns undefined when parameters are not supported', () => {
    expect(buildProductWhere(null)).toBe('');
  });

  it('returns undefined string when parameters are not supported', () => {
    expect(buildCategoryWhere(null)).toBe('');
  });

  it('returns undefined string when parameters are not supported', () => {
    expect(buildOrderWhere(null)).toBe(null);
  });

  describe('returns product search query by cat id', () => {
    it('single one', () => {
      expect(buildProductWhere({ catId: 'cat id' })).toBe('masterData(current(categories(id in ("cat id"))))');
    });
    it('multiple', () => {
      expect(buildProductWhere({ catId: ['cat id', 'dog id'] })).toBe('masterData(current(categories(id in ("cat id","dog id"))))');
    });
  });

  it('returns category search query by id', () => {
    expect(buildCategoryWhere({ catId: 'cat id' })).toBe('id="cat id"');
  });

  it('returns category search query by slug', () => {
    expect(buildCategoryWhere({ slug: 'cat slug' })).toBe('slug(en="cat slug" or de="cat slug")');
  });

  it('returns product search query by slug', () => {
    expect(buildProductWhere({ slug: 'product-slug' })).toBe('masterData(current(slug(en="product-slug" or de="product-slug")))');
  });

  it('returns product search query by id', () => {
    expect(buildProductWhere({ id: 'product-id' })).toBe('id="product-id"');
  });

  it('returns order search query by id', () => {
    expect(buildOrderWhere({ id: 'orderid' })).toBe('id="orderid"');
  });

  describe('using filters', () => {
    it('returns empty string for empty filters', () => {
      expect(buildProductWhere({ filters: {} })).toEqual('');
    });

    it('returns empty string when no option is selected', () => {
      const search: ProductSearch = {
        filters: {
          attr1: {
            type: AttributeType.STRING,
            options: [
              { value: 'stringValue', selected: false, label: 'whatever' },
              { value: 'notImportant', selected: false, label: 'irrelevant' }
            ]
          }
        }
      };
      expect(buildProductWhere(search)).toEqual('');
    });

    it(`returns product search query by ${AttributeType.STRING}`, () => {
      const search: ProductSearch = {
        filters: {
          attr1: {
            type: AttributeType.STRING,
            options: [
              { value: 'stringValue', selected: true, label: 'whatever' },
              { value: 'notImportant', selected: false, label: 'irrelevant' }
            ]
          }
        }
      };
      expect(buildProductWhere(search)).toEqual('(masterData(current(masterVariant(attributes(name = "attr1" and value = "stringValue")))))');
    });

    describe(`returns product search query by ${AttributeType.DATE}`, () => {
      it('when single value', () => {
        const search: ProductSearch = {
          filters: {
            attr1: {
              type: AttributeType.DATE,
              options: [
                { value: 'dateValue', selected: true, label: 'whatever' }
              ]
            }
          }
        };
        expect(buildProductWhere(search)).toEqual('(masterData(current(masterVariant(attributes(name = "attr1" and value = "dateValue")))))');
      });
      it('', () => {
        const search: ProductSearch = {
          filters: {
            attr1: {
              type: AttributeType.DATE,
              options: [
                { value: ['dateValue1', 'dateValue2'], selected: true, label: 'whatever' }
              ]
            }
          }
        };
        expect(buildProductWhere(search))
          .toEqual('(masterData(current(masterVariant(attributes(name = "attr1" and value >= "dateValue1" and value <= "dateValue2")))))');
      });
    });

    describe(`returns product search query by ${AttributeType.NUMBER}`, () => {
      it('when single value', () => {
        const search: ProductSearch = {
          filters: {
            attr1: {
              type: AttributeType.NUMBER,
              options: [
                { value: 1, selected: true, label: 'whatever' }
              ]
            }
          }
        };
        expect(buildProductWhere(search)).toEqual('(masterData(current(masterVariant(attributes(name = "attr1" and value = 1)))))');
      });
      it('when pair of values', () => {
        const search: ProductSearch = {
          filters: {
            attr1: {
              type: AttributeType.NUMBER,
              options: [
                { value: [100, 200], selected: true, label: 'whatever' }
              ]
            }
          }
        };
        expect(buildProductWhere(search)).toEqual('(masterData(current(masterVariant(attributes(name = "attr1" and value >= 100 and value <= 200)))))');
      });
    });

    it(`returns product search query by ${AttributeType.ENUM}`, () => {
      const search: ProductSearch = {
        filters: {
          attr1: {
            type: AttributeType.ENUM,
            options: [
              { value: 'enumValue', selected: true, label: 'whatever' }
            ]
          }
        }
      };
      expect(buildProductWhere(search)).toEqual('(masterData(current(masterVariant(attributes(name = "attr1" and value(key = "enumValue"))))))');
    });

    it(`returns product search query by ${AttributeType.LOCALIZED_STRING}`, () => {
      const search: ProductSearch = {
        filters: {
          attr1: {
            type: AttributeType.LOCALIZED_STRING,
            options: [
              { value: 'locStringValue', selected: true, label: 'whatever' }
            ]
          }
        }
      };
      expect(buildProductWhere(search)).toEqual(`(masterData(current(masterVariant(attributes(name = "attr1" and value(${locale} = "locStringValue"))))))`);
    });

    describe(`returns product search query by ${AttributeType.MONEY}`, () => {
      it('when single value', () => {
        const search: ProductSearch = {
          filters: {
            attr1: {
              type: AttributeType.MONEY,
              options: [
                { value: 200, selected: true, label: 'whatever' }
              ]
            }
          }
        };
        expect(buildProductWhere(search)).toEqual(`(masterData(current(masterVariant(attributes(name = "attr1" and value(centAmount = 200 and currencyCode = "${currency.toUpperCase()}"))))))`);
      });
      it('when pair of values', () => {
        const search: ProductSearch = {
          filters: {
            attr1: {
              type: AttributeType.MONEY,
              options: [
                { value: [100, 200], selected: true, label: 'whatever' }
              ]
            }
          }
        };
        expect(buildProductWhere(search))
          .toEqual(`(masterData(current(masterVariant(attributes(name = "attr1" and value(centAmount >= 10000 and centAmount <= 20000 and currencyCode = "${currency.toUpperCase()}"))))))`);
      });
    });

    it(`returns product search query by ${AttributeType.BOOLEAN}`, () => {
      const search: ProductSearch = {
        filters: {
          attr1: {
            type: AttributeType.BOOLEAN,
            options: [
              { value: true, selected: true, label: 'whatever' }
            ]
          }
        }
      };
      expect(buildProductWhere(search)).toEqual('(masterData(current(masterVariant(attributes(name = "attr1" and value = true)))))');
    });
  });
});
