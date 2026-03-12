import { computed, Ref } from '@vue/composition-api';

import { isCustomizationVisibleInFlow } from '../helpers/is-customization-visible-in-flow';
import { CustomizationAvailabilityFlow } from '../types/customization-availability-flow.type';
import { Customization } from '../types/customization.interface';

export function useCustomizationAvailabilityFlowFilter (
  customizations: Ref<Customization[]>,
  flow: Ref<CustomizationAvailabilityFlow>
) {
  const flowFilteredCustomizations = computed<Customization[]>(() => {
    return customizations.value.filter((customization: Customization) => {
      return isCustomizationVisibleInFlow(customization, flow.value);
    });
  });

  return { flowFilteredCustomizations };
}
