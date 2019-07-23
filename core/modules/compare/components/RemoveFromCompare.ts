import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { CompareModule } from '..';
import compareMountedMixin from '@vue-storefront/core/modules/compare/mixins/compareMountedMixin';
import { registerModule } from '@vue-storefront/core/lib/modules';

export const RemoveFromCompare = {
  name: 'RemoveFromCompare',
  mixins: [compareMountedMixin],
  methods: {
    removeFromCompare (product: Product) {
      registerModule(CompareModule)
      this.$store.dispatch('compare/removeItem', product);
    }
  }
};
