import {
  CustomizationAvailabilityFlow,
  normalizeCustomizationAvailabilityFlow,
  normalizeCustomizationAvailabilityFlows
} from '../types/customization-availability-flow.type';
import { Customization } from '../types/customization.interface';

export function isCustomizationVisibleInFlow (
  customization: Customization,
  flow?: CustomizationAvailabilityFlow
): boolean {
  if (customization.is_hidden) {
    return false;
  }

  const normalizedFlow = normalizeCustomizationAvailabilityFlow(flow);
  const availableFlows = normalizeCustomizationAvailabilityFlows(customization.flow_availability);

  return availableFlows.includes(normalizedFlow);
}
