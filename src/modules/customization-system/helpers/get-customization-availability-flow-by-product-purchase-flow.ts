import {
  normalizeProductPurchaseFlow,
  ProductPurchaseFlow
} from 'src/modules/shared';

import { CustomizationAvailabilityFlow } from '../types/customization-availability-flow.type';
import { ProductCustomizationMode } from '../types/customizable-product-flow.type';

export function getCustomizationAvailabilityFlowByProductPurchaseFlow (
  customizationMode: ProductCustomizationMode,
  flow?: ProductPurchaseFlow
): CustomizationAvailabilityFlow {
  if (customizationMode === ProductCustomizationMode.CUSTOMIZE) {
    return CustomizationAvailabilityFlow.CUSTOMIZE_LATER_COMPLETION;
  }

  switch (normalizeProductPurchaseFlow(flow)) {
    case ProductPurchaseFlow.CUSTOMIZE_LATER:
      return CustomizationAvailabilityFlow.CUSTOMIZE_LATER_PURCHASE;
    case ProductPurchaseFlow.CUSTOMIZE_NOW:
    default:
      return CustomizationAvailabilityFlow.CUSTOMIZE_NOW;
  }
}
