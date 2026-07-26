import Vue from 'vue';

import ProductCollectionRating from '../../components/product-collection-rating.vue';
import ProductDetailRating from '../../components/product-detail-rating.vue';
import { FeraModule } from '../../index';

jest.mock('@vue-storefront/core/helpers', () => ({
  once: (_key: string, callback: () => void) => callback()
}));

describe('Fera module services', () => {
  it('retains configured head script and rating-component providers', () => {
    const append = jest.fn();
    const mixin = jest.spyOn(Vue, 'mixin');

    FeraModule({
      appConfig: {
        fera: {
          apiPublicKey: ' public-key '
        }
      },
      services: {
        head: {
          append,
          inject: jest.fn()
        }
      }
    } as any);

    expect(append).toHaveBeenCalledTimes(1);
    expect(append.mock.calls[0][0]).toContain('public-key');
    expect(mixin).toHaveBeenCalledWith({
      provide: {
        ProductRatingComponent: ProductDetailRating,
        ProductCollectionRatingComponent: ProductCollectionRating
      }
    });

    mixin.mockRestore();
  });
});
