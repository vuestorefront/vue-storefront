import {
  buildProductWhere,
  buildCategoryWhere,
  buildOrderWhere
} from './../../src/helpers/search';
import { AttributeType, CategoryWhereSearch, OrderWhereSearch, ProductWhereSearch } from '../../src/types/Api';

const settings = {
  locale: 'en',
  acceptLanguage: ['en', 'de'],
  currency: 'USD'
} as any;

describe('[commercetools-api-client] search', () => {
  it('returns empty when parameters are not supported', () => {
    expect(buildProductWhere(settings, null)).toBe('');
  });

  it('returns empty string when parameters are not supported', () => {
    expect(buildCategoryWhere(settings, null)).toBe('');
  });

  it('returns empty string when parameters are not supported', () => {
    expect(buildOrderWhere(null)).toBe('');
  });

  describe('returns product search query by cat id', () => {
    it('single one', () => {
      expect(buildProductWhere(settings, { catId: 'cat id' })).toBe('masterData(current(categories(id in ("cat id"))))');
    });
    it('multiple', () => {
      expect(buildProductWhere(settings, { catId: ['cat id', 'dog id'] })).toBe('masterData(current(categories(id in ("cat id","dog id"))))');
    });
  });

  it('returns category search query by id', () => {
    expect(buildCategoryWhere(settings, { catId: 'cat id' })).toBe('id="cat id"');
  });

  it('returns category search query by key', () => {
    expect(buildCategoryWhere(settings, { key: 'Shoes' })).toBe('key="Shoes"');
  });

  it('returns category search query by slug', () => {
    expect(buildCategoryWhere(settings, { slug: 'cat slug' })).toBe('slug(en="cat slug" or de="cat slug")');
  });

  it('returns product search query by slug', () => {
    expect(buildProductWhere(settings, { slug: 'product-slug' })).toBe('masterData(current(slug(en="product-slug" or de="product-slug")))');
  });

  it('returns product search query by id', () => {
    expect(buildProductWhere(settings, { id: 'product-id' })).toBe('id="product-id"');
  });

  it('returns product search query by key', () => {
    expect(buildProductWhere(settings, { key: 'Shoes' })).toBe('key="Shoes"');
  });

  it('returns order search query by id', () => {
    expect(buildOrderWhere({ id: 'orderid' })).toBe('id="orderid"');
  });

  describe('using filters', () => {
    it('returns empty string for empty filters', () => {
      expect(buildProductWhere(settings, { filters: [] })).toEqual('');
    });

    it(`returns product search query by ${AttributeType.STRING}`, () => {
      const search: ProductWhereSearch = {
        filters: [
          { type: AttributeType.STRING, value: 'stringValue', name: 'whatever' }
        ]
      };

      expect(buildProductWhere(settings, search)).toEqual('masterData(current(masterVariant(attributes(name = "whatever" and value = "stringValue"))))');
    });

    describe(`returns product search query by ${AttributeType.DATE}`, () => {
      it('when single value', () => {
        const search: ProductWhereSearch = {
          filters: [
            { type: AttributeType.STRING, value: 'dateValue', name: 'whatever' }
          ]
        };

        expect(buildProductWhere(settings, search)).toEqual('masterData(current(masterVariant(attributes(name = "whatever" and value = "dateValue"))))');
      });

      it('when multiple value', () => {
        const search: ProductWhereSearch = {
          filters: [
            { type: AttributeType.DATE, value: ['dateValue1', 'dateValue2'], name: 'whatever' }
          ]
        };
        expect(buildProductWhere(settings, search))
          .toEqual('masterData(current(masterVariant(attributes(name = "whatever" and value >= "dateValue1" and value <= "dateValue2"))))');
      });
    });

    describe(`returns product search query by ${AttributeType.NUMBER}`, () => {
      it('when single value', () => {
        const search: ProductWhereSearch = {
          filters: [
            { type: AttributeType.NUMBER, value: 1, name: 'whatever' }
          ]
        };

        expect(buildProductWhere(settings, search)).toEqual('masterData(current(masterVariant(attributes(name = "whatever" and value = 1))))');
      });
      it('when pair of values', () => {
        const search: ProductWhereSearch = {
          filters: [
            { type: AttributeType.NUMBER, value: [100, 200], name: 'whatever' }
          ]
        };
        expect(buildProductWhere(settings, search)).toEqual('masterData(current(masterVariant(attributes(name = "whatever" and value >= 100 and value <= 200))))');
      });
    });

    it(`returns product search query by ${AttributeType.ENUM}`, () => {
      const search: ProductWhereSearch = {
        filters: [
          { type: AttributeType.ENUM, value: 'enumValue', name: 'whatever' }
        ]
      };

      expect(buildProductWhere(settings, search)).toEqual('masterData(current(masterVariant(attributes(name = "whatever" and value(key = "enumValue")))))');
    });

    it(`returns product search query by ${AttributeType.LOCALIZED_STRING}`, () => {
      const search: ProductWhereSearch = {
        filters: [
          { type: AttributeType.LOCALIZED_STRING, value: 'locStringValue', name: 'whatever' }
        ]
      };

      const { locale } = settings;
      expect(buildProductWhere(settings, search)).toEqual(`masterData(current(masterVariant(attributes(name = "whatever" and value(${locale} = "locStringValue")))))`);
    });

    describe(`returns product search query by ${AttributeType.MONEY}`, () => {
      it('when single value', () => {
        const search: ProductWhereSearch = {
          filters: [
            { type: AttributeType.MONEY, value: 200, name: 'whatever' }
          ]
        };

        const { currency } = settings;

        expect(buildProductWhere(settings, search)).toEqual(`masterData(current(masterVariant(attributes(name = "whatever" and value(centAmount = 200 and currencyCode = "${currency.toUpperCase()}")))))`);
      });
      it('when pair of values', () => {
        const search: ProductWhereSearch = {
          filters: [
            { type: AttributeType.MONEY, value: [100, 200], name: 'whatever' }
          ]
        };

        const { currency } = settings;
        expect(buildProductWhere(settings, search))
          .toEqual(`masterData(current(masterVariant(attributes(name = "whatever" and value(centAmount >= 10000 and centAmount <= 20000 and currencyCode = "${currency.toUpperCase()}")))))`);
      });
    });

    it(`returns product search query by ${AttributeType.BOOLEAN}`, () => {

      const search: ProductWhereSearch = {
        filters: [
          { type: AttributeType.BOOLEAN, value: true, name: 'whatever' }
        ]
      };

      expect(buildProductWhere(settings, search)).toEqual('masterData(current(masterVariant(attributes(name = "whatever" and value = true))))');
    });

    it('returns product search query with custom \'where\' param appended', () => {
      const search: ProductWhereSearch = {
        slug: 'product-slug',
        where: 'whatever'
      };
      expect(buildProductWhere(settings, search)).toBe(`masterData(current(slug(en="product-slug" or de="product-slug"))) and ${search.where}`);
    });

    it('returns custom \'where\' param as product search query if no other search params present', () => {
      const search: ProductWhereSearch = { where: 'whatever' };
      expect(buildProductWhere(settings, search)).toBe(search.where);
    });

    it('returns category search query with custom \'where\' param appended', () => {
      const search: CategoryWhereSearch = {
        catId: 'cat id',
        where: 'whatever'
      };
      expect(buildCategoryWhere(settings, search)).toBe(`id="cat id" and ${search.where}`);
    });

    it('returns custom \'where\' param as category search query if no other search params present', () => {
      const search: CategoryWhereSearch = { where: 'whatever' };
      expect(buildCategoryWhere(settings, search)).toBe(search.where);
    });

    it('returns order search query with custom \'where\' param appended', () => {
      const search: OrderWhereSearch = {
        id: 'orderid',
        where: 'whatever'
      };
      expect(buildOrderWhere(search)).toBe(`id="orderid" and ${search.where}`);
    });

    it('returns custom \'where\' param as order search query if no other search params present', () => {
      const search: OrderWhereSearch = { where: 'whatever' };
      expect(buildOrderWhere(search)).toBe(search.where);
    });
  });
});
