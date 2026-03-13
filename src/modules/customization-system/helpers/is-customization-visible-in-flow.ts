import { ProductCustomizationMode } from '../types/customizable-product-flow.type';
import {
  normalizeCustomizationAvailabilityFlow,
  normalizeCustomizationAvailabilityFlows
} from '../types/customization-availability-flow.type';
import { Customization } from '../types/customization.interface';
import { getCustomizationAvailabilityFlowByProductPurchaseFlow } from './get-customization-availability-flow-by-product-purchase-flow';
import { ProductPurchaseFlow } from 'src/modules/shared';

export function isCustomizationVisibleInFlow (
  customization: Customization,
  customizationMode: ProductCustomizationMode,
  productPurchaseFlow?: ProductPurchaseFlow
): boolean {
  if (customization.is_hidden) {
    return false;
  }

  const normalizedFlow = normalizeCustomizationAvailabilityFlow(
    getCustomizationAvailabilityFlowByProductPurchaseFlow(customizationMode, productPurchaseFlow)
  );
  const availableFlows = normalizeCustomizationAvailabilityFlows(customization.flow_availability);

  return availableFlows.includes(normalizedFlow);
}
