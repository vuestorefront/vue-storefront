import { mapProductSearchBySingleProductParams } from '../../../src/helpers/product/mapProductSearchBySingleProductParams';

describe('[about-you-helpers] mapProductSearchBySingleProductParmas', () => {
  it('returns product query with default attrs when given no params', async () => {
    const params = {} as any;
    const expectedQuery = {
      with: {
        attributes: 'all',
        advancedAttributes: 'all',
        variants: {
          attributes: 'all',
          advancedAttributes: 'all'
        },
        priceRange: true
      }
    };

    const result = mapProductSearchBySingleProductParams(params);
    expect(result).toEqual(expectedQuery);
  });

  it('returns mapped products query for given params', async () => {
    const params = {
      withParams: {
        advancedAttributes: {
          withKey: ['productName']
        },
        attributes: 'all',
        priceRange: true
      },
      where: {}
    } as any;
    const expectedQuery = {
      with: {
        advancedAttributes: {
          withKey: ['productName']
        },
        attributes: 'all',
        priceRange: true
      },
      where: {}
    };

    const result = mapProductSearchBySingleProductParams(params);
    expect(result).toEqual(expectedQuery);
  });
});
