import { computed, Ref, watch } from '@vue/composition-api';

import { ProductPurchaseFlow } from 'src/modules/shared';

import { isCustomizationAvailableInFlow } from '../helpers/is-customization-available-in-flow';
import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { OptionValue } from '../types/option-value.interface';
import { ProductCustomizationMode } from '../types/customizable-product-flow.type';

const FLOW_CUSTOMIZATION_NAME = 'purchase flow';

const flowToCustomizationValueMap: Record<ProductPurchaseFlow, string> = {
  [ProductPurchaseFlow.CUSTOMIZE_NOW]: 'customize now',
  [ProductPurchaseFlow.CUSTOMIZE_LATER]: 'customize later'
};

function normalizeName (value?: string): string {
  return (value || '').trim().toLowerCase();
}

// TODO: quick fix to make "send later upload method" customization hidden in the CUSTOMIZE flow
const SEND_PHOTOS_LATER_CUSTOMIZATION_NAME = 'send later upload method';
function isSendPhotosLaterCustomization (customization: Customization) {
  const normalizedName = normalizeName(customization.name);

  return normalizedName === SEND_PHOTOS_LATER_CUSTOMIZATION_NAME;
}

function isFlowCustomizationByName (customization: Customization): boolean {
  const normalizedName = normalizeName(customization.name);

  return normalizedName === FLOW_CUSTOMIZATION_NAME;
}

export function usePurchaseFlowCustomizations (
  customizations: Ref<Customization[]>,
  productPurchaseFlow: Ref<ProductPurchaseFlow>,
  onCustomizationOptionInput: (payload: {
    customizationId: string,
    value: CustomizationOptionValue
  }) => void,
  customizationOptionValue: Ref<Record<string, CustomizationOptionValue>>,
  customizationMode: Ref<ProductCustomizationMode>
) {
  const flowAvailableCustomizations = computed<Customization[]>(() => {
    const result: Customization[] = [];

    // TODO: quick fix to make "send later upload method" customization hidden in the CUSTOMIZE flow. Replace with simple filter
    for (const customization of customizations.value) {
      if (!isCustomizationAvailableInFlow(customization, customizationMode.value, productPurchaseFlow.value)) {
        continue;
      }

      if (customizationMode.value !== ProductCustomizationMode.CUSTOMIZE || !isSendPhotosLaterCustomization(customization)) {
        result.push(customization);
        continue;
      }

      result.push({ ...customization, isHidden: true });
    }

    return result;
  });

  const flowCustomization = computed<Customization | undefined>(() => {
    return customizations.value.find((customization: Customization) => {
      return isFlowCustomizationByName(customization);
    });
  });

  const flowOptionValue = computed<OptionValue | undefined>(() => {
    const customization = flowCustomization.value;

    if (!customization?.optionData?.values?.length) {
      return undefined;
    }

    const expectedOptionValueName = flowToCustomizationValueMap[productPurchaseFlow.value];

    return customization.optionData.values.find((optionValue) => {
      return normalizeName(optionValue.name) === expectedOptionValueName;
    });
  });

  function syncHiddenFlowCustomization (): void {
    if (customizationMode.value === ProductCustomizationMode.CUSTOMIZE) {
      return;
    }

    const customization = flowCustomization.value;
    const optionValue = flowOptionValue.value;

    if (!customization || !optionValue) {
      return;
    }

    const currentValue = customizationOptionValue.value[customization.id];

    if (currentValue === optionValue.id) {
      return;
    }

    onCustomizationOptionInput({
      customizationId: customization.id,
      value: optionValue.id
    });
  }

  watch(
    [productPurchaseFlow, customizations, customizationMode],
    () => {
      syncHiddenFlowCustomization();
    },
    { immediate: true }
  );

  return {
    flowAvailableCustomizations
  };
}
