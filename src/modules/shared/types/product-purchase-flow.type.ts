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
