import { Ref } from '@vue/composition-api';

import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';

import { Customization } from '../types/customization.interface';
import { CustomizationOptionValue } from '../types/customization-option-value';

const IMAGE_UPLOAD_CUSTOMIZATION_NAME = 'Customer Image';

export function useExistingOrderItemImage (
  imageUrl: Ref<string | undefined>,
  existingCartItem: Ref<CartItem | undefined>,
  customizations: Ref<Customization[]>,
  customizationOptionValue: Ref<Record<string, CustomizationOptionValue>>,
  customizationOptionComponents: Ref<any[] | null>
) {
  async function uploadExistingImage (): Promise<void> {
    if (!imageUrl.value || existingCartItem.value || !customizationOptionComponents.value) {
      return;
    }

    const customerImageCustomization = customizations.value.find(
      (customization: Customization) => customization.name === IMAGE_UPLOAD_CUSTOMIZATION_NAME
    );

    if (!customerImageCustomization) {
      return;
    }

    const customerImageCustomizationId = customerImageCustomization.id;
    const existingValue = customizationOptionValue.value[customerImageCustomizationId];

    if (existingValue) {
      return;
    }

    const customerImageOptionComponent = customizationOptionComponents.value.find(
      (comp: any) => comp.customization.id === customerImageCustomizationId
    );

    if (!customerImageOptionComponent) {
      return;
    }

    const widgetComponent = customerImageOptionComponent.widgetComponent;

    if (!widgetComponent || !('uploadImage' in widgetComponent)) {
      return;
    }

    await widgetComponent.uploadImage(imageUrl.value);
  }

  return {
    uploadExistingImage
  };
}
