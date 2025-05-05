import { ImageHandlerService } from 'src/modules/file-storage';

import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';
import { WidgetType } from '../types/widget-type';
import { CustomizationStateItem } from '../types/customization-state-item.interface';
import { Customization } from '../types/customization.interface';

const THUMBNAIL_SIZE = 320;

export function getCustomizationSystemThumbnail (
  customizations: Customization[] | undefined,
  customizationState: CustomizationStateItem[] | undefined,
  imageHandlerService: ImageHandlerService
): string | undefined {
  if (!customizations || !customizationState) {
    return;
  }

  const imageUploadCustomization = customizations.find((customization) => {
    if (!customization.showInCart) {
      return false;
    }

    return customization.optionData?.displayWidget === WidgetType.IMAGE_UPLOAD;
  });

  if (!imageUploadCustomization) {
    return;
  }

  const customizationStateItem = customizationState.find((item) => {
    return item.customization_id === imageUploadCustomization.id;
  });

  if (!customizationStateItem || !isFileUploadValue(customizationStateItem.value)) {
    return;
  }

  const url = Array.isArray(customizationStateItem.value)
    ? customizationStateItem.value[0].url
    : customizationStateItem.value.url;

  return imageHandlerService.getThumbnailUrl(url, THUMBNAIL_SIZE, THUMBNAIL_SIZE);
}
