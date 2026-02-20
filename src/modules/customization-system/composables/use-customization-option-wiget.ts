import { computed, Ref, SetupContext } from '@vue/composition-api';

import { CustomizationOptionValue } from '../types/customization-option-value';
import { Customization } from '../types/customization.interface';
import { OptionType } from '../types/option-type';
import { OptionValue } from '../types/option-value.interface';
import { WidgetType } from '../types/widget-type';
import { WidgetOptionAlignment } from '../types/widget-option-alignment.type';
import { WidgetOptionShape } from '../types/widget-option-shape.type';

export function useCustomizationOptionWidget (
  value: Ref<CustomizationOptionValue>,
  customization: Ref<Customization>,
  values: Ref<OptionValue[]>,
  productId: Ref<number>,
  { emit }: SetupContext,
  addedToCartOptionValueId?: Ref<Record<string, boolean> | undefined>,
  expandConfig?: Ref<Record<string, {
    isExpandable: boolean,
    isExpanded: boolean
  }> | undefined>,
  hiddenOptionValues?: Ref<Record<string, boolean> | undefined>
) {
  const selectedOption = computed<CustomizationOptionValue>({
    get: () => {
      return value.value;
    },
    set: (newValue: CustomizationOptionValue) => {
      emit('input', {
        customizationId: customization.value.id,
        value: newValue
      });
    }
  });
  const maxValuesCount = computed<number | undefined>(() => {
    if (!customization.value.optionData) {
      throw new Error("Customization 'optionData' is missing");
    }

    return customization.value.optionData.maxValuesCount;
  });
  const widget = computed<{
    component: string,
    props?: Record<string, any>
  }>(() => {
    if (!customization.value.optionData) {
      throw new Error("Customization 'optionData' is missing");
    }

    const widgetOptions = customization.value.optionData.displayWidgetOptions;
    const displayWidget = customization.value.optionData.displayWidget;

    const listWidgetsProps: {
      alignment?: WidgetOptionAlignment,
      maxValuesCount: number | undefined,
      shape: WidgetOptionShape | undefined,
      values: OptionValue[],
      addedToCartOptionValueId?: Record<string, boolean>
    } = {
      alignment: widgetOptions?.alignment,
      maxValuesCount: maxValuesCount.value,
      shape: widgetOptions?.shape,
      values: values.value,
      addedToCartOptionValueId: addedToCartOptionValueId?.value
    };

    switch (displayWidget) {
      case WidgetType.CARDS_LIST:
        return {
          component: 'CardsListWidget',
          props: {
            maxValuesCount: maxValuesCount.value,
            values: values.value,
            addedToCartOptionValueId: listWidgetsProps.addedToCartOptionValueId,
            expandConfig: expandConfig?.value,
            hiddenOptionValues: hiddenOptionValues?.value
          }
        };
      case WidgetType.CHECKBOX:
        return {
          component: 'CheckboxWidget',
          props: {
            label: customization.value.title || customization.value.name,
            values: values.value
          }
        };
      case WidgetType.COLORS_LIST:
        return {
          component: 'ColorsListWidget',
          props: listWidgetsProps
        };
      case WidgetType.DROPDOWN:
        return {
          component: 'DropdownWidget',
          props: {
            values: values.value,
            placeholder: widgetOptions?.placeholder,
            title: customization.value.title || customization.value.name
          }
        };
      case WidgetType.EMAIL_INPUT:
        return {
          component: 'TextInputWidget',
          props: {
            placeholder: widgetOptions?.placeholder,
            type: 'email'
          }
        };
      case WidgetType.IMAGE_UPLOAD:
        return {
          component: 'ImageUploadWidget',
          props: {
            maxValuesCount: maxValuesCount.value,
            productId: productId.value
          }
        };
      case WidgetType.SEARCH_FIELD:
        return {
          component: 'SearchFieldWidget',
          props: {
            values: values.value,
            placeholder: widgetOptions?.placeholder
          }
        };
      case WidgetType.TEXT_AREA:
        return {
          component: 'TextAreaWidget',
          props: {
            placeholder: widgetOptions?.placeholder
          }
        };
      case WidgetType.TEXT_INPUT:
        return {
          component: 'TextInputWidget',
          props: {
            placeholder: widgetOptions?.placeholder
          }
        };
      case WidgetType.THUMBNAILS_LIST:
        return {
          component: 'ThumbnailsListWidget',
          props: listWidgetsProps
        };
      default:
        throw new Error(`Unknown widget type: ${String(displayWidget)}`);
    }
  });

  return {
    maxValuesCount,
    selectedOption,
    widget
  }
}
