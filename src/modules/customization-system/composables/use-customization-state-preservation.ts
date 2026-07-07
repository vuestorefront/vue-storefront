import { computed, nextTick, onMounted, ref, Ref, watch } from '@vue/composition-api';
import { Mutex } from 'async-mutex';

import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import CartItem from 'core/modules/cart/types/CartItem';

import { CustomizationStateItem } from '../types/customization-state-item.interface';
import { STORAGE_NAME } from '../types/storage-name';
import { PersistedData } from '../types/persisted-data.interface';
import { CustomizationOptionValue } from '../types/customization-option-value';

const STORAGE_BASE_KEY = 'form-state';

export function useCustomizationStatePreservation (
  productSku: Ref<string | undefined>,
  customizationState: Ref<CustomizationStateItem[]>,
  existingCartItem: Ref<CartItem | undefined>,
  unhandledCustomizationsFilters: ((customizationId: string) => boolean)[] = [],
  canRestorePreservedData: Ref<boolean>,
  mergeCustomizationState: (state: CustomizationStateItem[]) => void,
  removeUnavailableOptionValues: () => Record<string, CustomizationOptionValue>,
  beforeCustomizationStateMerge?: (persistedData: PersistedData) => Promise<boolean>,
  afterCustomizationStateMerge?: (persistedData: PersistedData) => void,
  additionalData?: Ref<Record<string, any>> | undefined,
  onPreservedStateUnavailable?: () => void,
  resetCustomizationState?: () => void
) {
  const mutex = new Mutex();
  const customizationSystemStorage = StorageManager.get(STORAGE_NAME);
  const canUpdateState = ref(false);
  const restorationId = ref(0);

  function isStaleRestoration (id: number): boolean {
    return id !== restorationId.value;
  }

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

  async function restorePreservedState (shouldResetState: boolean = false): Promise<void> {
    const currentRestorationId = ++restorationId.value;

    canUpdateState.value = false;
    await nextTick();

    if (isStaleRestoration(currentRestorationId)) {
      return;
    }

    if (shouldResetState && resetCustomizationState) {
      resetCustomizationState();
    }

    if (existingCartItem.value || !canRestorePreservedData.value) {
      await removePreservedState();

      if (isStaleRestoration(currentRestorationId)) {
        return;
      }

      canUpdateState.value = true;

      if (onPreservedStateUnavailable) {
        onPreservedStateUnavailable();
      }

      return;
    }

    const persistedData = await getPreservedData();

    if (isStaleRestoration(currentRestorationId)) {
      return;
    }

    if (!persistedData) {
      canUpdateState.value = true;

      if (onPreservedStateUnavailable) {
        onPreservedStateUnavailable();
      }

      return;
    }

    if (beforeCustomizationStateMerge) {
      const isSuccess = await beforeCustomizationStateMerge(persistedData);

      if (isStaleRestoration(currentRestorationId)) {
        return;
      }

      if (!isSuccess) {
        await removePreservedState();
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
  }

  onMounted(async () => {
    await restorePreservedState();
  });

  watch(storageItemKey, (newValue, oldValue) => {
    if (!oldValue || newValue === oldValue) {
      return;
    }

    void restorePreservedState(true);
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
