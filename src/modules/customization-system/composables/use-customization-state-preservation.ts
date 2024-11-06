import { computed, nextTick, onMounted, ref, Ref, watch } from '@vue/composition-api';
import { Mutex } from 'async-mutex';

import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import CartItem from 'core/modules/cart/types/CartItem';

import { CustomizationStateItem } from '../types/customization-state-item.interface';
import { STORAGE_NAME } from '../types/storage-name';
import { PersistedData } from '../types/persisted-data.interface';

const STORAGE_BASE_KEY = 'form-state';

export function useCustomizationStatePreservation (
  productSku: Ref<string | undefined>,
  customizationState: Ref<CustomizationStateItem[]>,
  existingCartItem: Ref<CartItem | undefined>,
  unhandledCustomizationsFilters: ((customizationId: string) => boolean)[] = [],
  canRestorePreservedData: Ref<boolean>,
  mergeCustomizationState: (state: CustomizationStateItem[]) => void,
  removeUnavailableOptionValues: () => void,
  beforeCustomizationStateMerge?: (persistedData: PersistedData) => Promise<boolean>,
  afterCustomizationStateMerge?: (persistedData: PersistedData) => void,
  additionalData?: Ref<Record<string, any>> | undefined
) {
  const mutex = new Mutex();
  const customizationSystemStorage = StorageManager.get(STORAGE_NAME);
  const canUpdateState = ref(false);

  const storageItemKey = computed<string>(() => {
    return `${STORAGE_BASE_KEY}/${productSku.value}`;
  });

  const filterCustomizationState = (item: CustomizationStateItem): boolean => {
    return unhandledCustomizationsFilters.every(
      (filter) => !filter(item.customization_id)
    );
  }

  const filteredCustomizationState = computed<CustomizationStateItem[]>(() => {
    return customizationState.value.filter(filterCustomizationState);
  });

  async function preserveState (state: CustomizationStateItem[]): Promise<void> {
    if (!storageItemKey.value) {
      return;
    }

    const mutexRelease = await mutex.acquire();

    const data: PersistedData = {
      customizationState: state
    }

    if (additionalData && additionalData.value) {
      data.additionalData = additionalData.value;
    }

    try {
      await customizationSystemStorage.setItem(
        storageItemKey.value,
        data
      );
    } finally {
      mutexRelease();
    }
  }

  async function removePreservedState (): Promise<void> {
    if (!storageItemKey.value) {
      return;
    }

    const mutexRelease = await mutex.acquire();

    try {
      await customizationSystemStorage.removeItem(
        storageItemKey.value
      );
    } finally {
      mutexRelease();
    }
  }

  async function getPreservedData (): Promise<PersistedData | undefined> {
    if (!storageItemKey.value) {
      return;
    }

    const mutexRelease = await mutex.acquire();

    try {
      const data: PersistedData | undefined = await customizationSystemStorage.getItem(storageItemKey.value);

      if (data?.customizationState) {
        data.customizationState = data.customizationState.filter(filterCustomizationState);
      }

      return data;
    } finally {
      mutexRelease();
    }
  }

  onMounted(async () => {
    await nextTick();

    if (existingCartItem.value || !canRestorePreservedData.value) {
      removePreservedState();
      canUpdateState.value = true;
      return;
    }

    const persistedData = await getPreservedData();

    if (!persistedData) {
      canUpdateState.value = true;
      return;
    }

    if (beforeCustomizationStateMerge) {
      const isSuccess = await beforeCustomizationStateMerge(persistedData);

      if (!isSuccess) {
        removePreservedState();
        canUpdateState.value = true;
        return;
      }
    }

    mergeCustomizationState(persistedData.customizationState);
    removeUnavailableOptionValues();

    if (afterCustomizationStateMerge) {
      afterCustomizationStateMerge(persistedData);
    }

    canUpdateState.value = true;
  });

  const watchProperties: Ref<any>[] = [filteredCustomizationState];

  if (additionalData) {
    watchProperties.push(additionalData);
  }

  watch(watchProperties, () => {
    if (existingCartItem.value || !canUpdateState.value) {
      return;
    }

    preserveState(filteredCustomizationState.value);
  });

  return {
    getPreservedData,
    removePreservedState
  }
}
