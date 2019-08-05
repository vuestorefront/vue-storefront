import prepareShippingInfoForUpdateTotals from '@vue-storefront/core/modules/cart/helpers/prepareShippingInfoForUpdateTotals'
import Totals from '@vue-storefront/core/modules/cart/types/Totals'

describe('Cart prepareShippingInfoForUpdateTotals', () => {
  it('returns shipping info', () => {
    const shippingInfoItems = [
      { item_id: 1, key1: 1, key2: 2 },
      { item_id: 2, key1: 3, key2: 4 },
      { item_id: 3, key1: 5, key2: 6 }
    ] as any as Totals[]

    expect(prepareShippingInfoForUpdateTotals(shippingInfoItems)).toEqual({
      1: { item_id: 1, key1: 1, key2: 2 },
      2: { item_id: 2, key1: 3, key2: 4 },
      3: { item_id: 3, key1: 5, key2: 6 }
    })
  });

  it('returns shipping info with options', () => {
    const shippingInfoItems = [
      { item_id: 1, key1: 1, key2: 2, options: JSON.stringify({ opt1: 1, opt2: 2 }) },
      { item_id: 2, key1: 3, key2: 4, options: JSON.stringify({ opt1: 3, opt2: 4 }) },
      { item_id: 3, key1: 5, key2: 6, options: JSON.stringify({ opt1: 5, opt2: 6 }) }
    ] as any as Totals[]

    expect(prepareShippingInfoForUpdateTotals(shippingInfoItems)).toEqual({
      1: { item_id: 1, key1: 1, key2: 2, options: { opt1: 1, opt2: 2 } },
      2: { item_id: 2, key1: 3, key2: 4, options: { opt1: 3, opt2: 4 } },
      3: { item_id: 3, key1: 5, key2: 6, options: { opt1: 5, opt2: 6 } }
    })
  });
});
