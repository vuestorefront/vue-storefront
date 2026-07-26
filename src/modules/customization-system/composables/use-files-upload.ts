import { inject, computed, Ref, SetupContext, ref, watch, set, del } from 'vue';

import { ImageHandlerService, Item } from 'src/modules/file-storage';
import { CustomerImage } from 'src/modules/shared';
import { FileUploadValue } from '../types/file-upload-value';

function getCustomerImageByStorageItemId (
  fileUploadValue: FileUploadValue,
  imageHandlerService: ImageHandlerService
): CustomerImage {
  return {
    id: fileUploadValue.id,
    url: imageHandlerService.getOriginalImageUrl(fileUploadValue.url)
  };
}

function getInitialItems (
  value: FileUploadValue | FileUploadValue[] | undefined,
  imageHandlerService: ImageHandlerService
): CustomerImage[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => getCustomerImageByStorageItemId(item, imageHandlerService));
  }

  return [getCustomerImageByStorageItemId(value, imageHandlerService)]
}

export function useFilesUpload (
  value: Ref<FileUploadValue | FileUploadValue[] | undefined>,
  maxValuesCount: Ref<number | undefined>,
  { emit }: Pick<SetupContext, 'emit'>
) {
  const imageHandlerService = inject<ImageHandlerService>('ImageHandlerService');

  if (!imageHandlerService) {
    throw new Error('ImageHandlerService is not defined');
  }

  let initialItems = ref<CustomerImage[]>([]);
  let addedFiles = ref<Record<string, Item>>({});

  const allowMultiple = computed<boolean>(() => {
    return !maxValuesCount.value || maxValuesCount.value > 1;
  });
  const maxFiles = computed<number | null>(() => {
    return maxValuesCount.value || null;
  });

  function onFileAdded (item: Item): void {
    set(addedFiles.value, item.id, item);
  }

  function onFileProcessed (storageItemId: string) {
    const item = addedFiles.value[storageItemId];

    if (!item) {
      return;
    }

    const fileUploadValue: FileUploadValue = {
      id: item.id,
      url: item.url
    };

    if (!allowMultiple.value) {
      emit('input', fileUploadValue);
      return;
    }

    if (!value.value) {
      return emit('input', [fileUploadValue]);
    }

    if (!Array.isArray(value.value)) {
      return emit('input', [value.value, fileUploadValue]);
    }

    emit('input', [...value.value, fileUploadValue]);
  }

  function onFileRemoved (storageItemId: string) {
    del(addedFiles.value, storageItemId);

    if (!allowMultiple.value) {
      return emit('input', undefined);
    }

    if (!Array.isArray(value.value)) {
      return emit('input', []);
    }

    emit(
      'input',
      value.value.filter((item) => item.id !== storageItemId)
    );
  }

  watch(
    value,
    () => {
      (initialItems as any).value = getInitialItems(value.value, imageHandlerService);
    },
    {
      immediate: true
    }
  );

  return {
    allowMultiple,
    initialItems,
    maxFiles,
    onFileAdded,
    onFileProcessed,
    onFileRemoved
  }
}
