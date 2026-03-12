import { computed, Ref } from '@vue/composition-api';

import { isCustomizationVisibleInFlow } from '../helpers/is-customization-visible-in-flow';
import { Customization } from '../types/customization.interface';
import { ProductPurchaseFlow } from '../types/product-purchase-flow.type';

export function useCustomizationAvailabilityFlowFilter (
  customizations: Ref<Customization[]>,
  productPurchaseFlow: Ref<ProductPurchaseFlow>
) {
  const flowFilteredCustomizations = computed<Customization[]>(() => {
    return customizations.value.filter((customization: Customization) => {
      return isCustomizationVisibleInFlow(customization, productPurchaseFlow.value);
    });
  });

  return { flowFilteredCustomizations };
}
