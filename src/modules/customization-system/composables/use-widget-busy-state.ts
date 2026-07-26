import { onBeforeMount, onBeforeUnmount, Ref, SetupContext } from 'vue';

import { Customization } from '../types/customization.interface';

export function useWidgetBusyState (
  customization: Ref<Customization>,
  busyChangedEventName: string,
  { emit }: Pick<SetupContext, 'emit'>
) {
  function onWidgetBusyChanged (isBusy: boolean): void {
    emit(
      busyChangedEventName,
      {
        isBusy,
        entityId: customization.value.id
      }
    );
  }

  onBeforeMount(() => {
    onWidgetBusyChanged(false);
  });
  onBeforeUnmount(() => {
    onWidgetBusyChanged(false);
  });

  return {
    onWidgetBusyChanged
  };
}
