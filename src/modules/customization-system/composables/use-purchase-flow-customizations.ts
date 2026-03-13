import { computed, Ref, watch } from '@vue/composition-api';

import { isCustomizationVisibleInFlow } from '../helpers/is-customization-visible-in-flow';
import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { OptionValue } from '../types/option-value.interface';
import { normalizeProductPurchaseFlow, ProductPurchaseFlow } from '../types/product-purchase-flow.type';
import { CustomizableProductFlowType } from '../types/customizable-product-flow.type';

const FLOW_CUSTOMIZATION_NAME = 'flow';

function normalizeName (value?: string): string {
  return (value || '').trim().toLowerCase();
}

function isFlowCustomizationByName (customization: Customization): boolean {
  const normalizedTitle = normalizeName(customization.title);
  const normalizedName = normalizeName(customization.name);

  return normalizedTitle === FLOW_CUSTOMIZATION_NAME ||
    normalizedName === FLOW_CUSTOMIZATION_NAME;
}

export function usePurchaseFlowCustomizations (
  customizations: Ref<Customization[]>,
  productPurchaseFlow: Ref<ProductPurchaseFlow>,
  onCustomizationOptionInput: (payload: {
    customizationId: string,
    value: CustomizationOptionValue
  }) => void,
  customizationOptionValue: Ref<Record<string, CustomizationOptionValue>>,
  flow: CustomizableProductFlowType
) {
  const flowFilteredCustomizations = computed<Customization[]>(() => {
    return customizations.value.filter((customization: Customization) => {
      return isCustomizationVisibleInFlow(customization, productPurchaseFlow.value);
    });
  });

  const hiddenFlowCustomization = computed<Customization | undefined>(() => {
    return customizations.value.find((customization: Customization) => {
      return customization.is_hidden && isFlowCustomizationByName(customization);
    });
  });

  const hiddenFlowOptionValue = computed<OptionValue | undefined>(() => {
    const customization = hiddenFlowCustomization.value;

    if (!customization?.optionData?.values?.length) {
      return undefined;
    }

    const expectedOptionValueName = normalizeProductPurchaseFlow(productPurchaseFlow.value);

    return customization.optionData.values.find((optionValue) => {
      return normalizeName(optionValue.name) === expectedOptionValueName;
    });
  });

  function syncHiddenFlowCustomization (): void {
    const customization = hiddenFlowCustomization.value;
    const optionValue = hiddenFlowOptionValue.value;

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
    [productPurchaseFlow, customizations],
    () => {
      syncHiddenFlowCustomization();
    },
    { immediate: true }
  );

  return {
    flowFilteredCustomizations,
    hiddenFlowCustomization,
    hiddenFlowOptionValue,
    syncHiddenFlowCustomization
  };
}
