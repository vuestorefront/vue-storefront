import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { Compare as CompareModule } from '..';
import compareMountedMixin from '@vue-storefront/core/modules/compare/mixins/compareMountedMixin';

export const RemoveFromCompare = {
  name: 'RemoveFromCompare',
  mixins: [compareMountedMixin],
  methods: {
    removeFromCompare (product: Product) {
      CompareModule.register();
      this.$store.dispatch('compare/removeItem', product);
    }
  }
};
