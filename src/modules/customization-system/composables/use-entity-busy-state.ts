import { computed, ref, set } from '@vue/composition-api';

export function useEntityBusyState () {
  const entityBusyState = ref<Record<string, boolean>>({});
  const isSomeEntityBusy = computed<boolean>(() => {
    return Object.values(entityBusyState.value).some((isBusy) => isBusy);
  });

  function onEntityBusyChanged (
    {
      isBusy,
      entityId
    }: {
      isBusy: boolean,
      entityId: string
    }
  ): void {
    set(entityBusyState.value, entityId, isBusy);
  }

  return {
    isSomeEntityBusy,
    onEntityBusyChanged
  }
}
