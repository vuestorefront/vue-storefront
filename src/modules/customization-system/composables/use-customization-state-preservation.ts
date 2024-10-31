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
  canPersist: Ref<boolean>,
  mergeCustomizationState: (state: CustomizationStateItem[]) => void,
  removeUnavailableOptionValues: () => void,
  beforeCustomizationStateMerge?: (persistedData: PersistedData) => Promise<void>,
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
      canUpdateState.value = true;
      return;
    }

    const mutexRelease = await mutex.acquire();

    try {
      await customizationSystemStorage.removeItem(
        storageItemKey.value
      );
    } finally {
      canUpdateState.value = true;
      mutexRelease();
    }
  }

  async function getPreservedData (): Promise<PersistedData | undefined> {
    if (!storageItemKey.value) {
      canUpdateState.value = true;
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
      canUpdateState.value = true;
      mutexRelease();
    }
  }

  onMounted(async () => {
    await nextTick();

    if (existingCartItem.value || !canPersist) {
      removePreservedState();
      return;
    }

    const persistedData = await getPreservedData();

    if (!persistedData) {
      return;
    }

    if (beforeCustomizationStateMerge) {
      await beforeCustomizationStateMerge(persistedData);
    }

    mergeCustomizationState(persistedData.customizationState);
    removeUnavailableOptionValues();

    if (afterCustomizationStateMerge) {
      afterCustomizationStateMerge(persistedData);
    }
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
