export enum CustomizationAvailabilityFlow {
  CUSTOMIZE_NOW = 'customize-now',
  CUSTOMIZE_LATER_PURCHASE = 'customize-later-purchase',
  CUSTOMIZE_LATER_COMPLETION = 'customize-later-completion'
}

export const DEFAULT_CUSTOMIZATION_AVAILABILITY_FLOW = CustomizationAvailabilityFlow.CUSTOMIZE_NOW;

export const DEFAULT_CUSTOMIZATION_AVAILABILITY_FLOWS = [DEFAULT_CUSTOMIZATION_AVAILABILITY_FLOW];

export function normalizeCustomizationAvailabilityFlow (
  flow?: CustomizationAvailabilityFlow
): CustomizationAvailabilityFlow {
  return flow || DEFAULT_CUSTOMIZATION_AVAILABILITY_FLOW;
}

export function normalizeCustomizationAvailabilityFlows (
  flows?: CustomizationAvailabilityFlow[]
): CustomizationAvailabilityFlow[] {
  return flows && flows.length > 0
    ? flows
    : DEFAULT_CUSTOMIZATION_AVAILABILITY_FLOWS;
}
