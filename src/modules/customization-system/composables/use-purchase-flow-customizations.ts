import { computed, Ref, watch } from '@vue/composition-api';

import { isCustomizationVisibleInFlow } from '../helpers/is-customization-visible-in-flow';
import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { OptionValue } from '../types/option-value.interface';
import { ProductCustomizationMode } from '../types/customizable-product-flow.type';
import { normalizeProductPurchaseFlow, ProductPurchaseFlow } from 'src/modules/shared';

const FLOW_CUSTOMIZATION_NAME = 'flow';

function normalizeName (value?: string): string {
  return (value || '').trim().toLowerCase();
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
  const flowFilteredCustomizations = computed<Customization[]>(() => {
    return customizations.value.filter((customization: Customization) => {
      return isCustomizationVisibleInFlow(customization, customizationMode.value, productPurchaseFlow.value);
    });
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

    const expectedOptionValueName = normalizeProductPurchaseFlow(productPurchaseFlow.value);

    return customization.optionData.values.find((optionValue) => {
      return normalizeName(optionValue.name) === expectedOptionValueName;
    });
  });

  function syncHiddenFlowCustomization (): void {
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
    flowFilteredCustomizations
  };
}
