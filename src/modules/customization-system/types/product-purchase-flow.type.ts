import { CustomizationAvailabilityFlow } from './customization-availability-flow.type';

export enum ProductPurchaseFlow {
  CUSTOMIZE_NOW = 'customize-now',
  CUSTOMIZE_LATER = 'customize-later'
}

export const DEFAULT_PRODUCT_PURCHASE_FLOW = ProductPurchaseFlow.CUSTOMIZE_NOW;

export function normalizeProductPurchaseFlow (
  flow?: ProductPurchaseFlow
): ProductPurchaseFlow {
  return flow || DEFAULT_PRODUCT_PURCHASE_FLOW;
}

export function getCustomizationAvailabilityFlowByProductPurchaseFlow (
  flow?: ProductPurchaseFlow
): CustomizationAvailabilityFlow {
  switch (normalizeProductPurchaseFlow(flow)) {
    case ProductPurchaseFlow.CUSTOMIZE_LATER:
      return CustomizationAvailabilityFlow.CUSTOMIZE_LATER_PURCHASE;
    case ProductPurchaseFlow.CUSTOMIZE_NOW:
    default:
      return CustomizationAvailabilityFlow.CUSTOMIZE_NOW;
  }
}
