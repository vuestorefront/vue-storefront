import { computed, reactive } from '@vue/composition-api';

interface UiNotification {
  message: string;
  action: { text: string; onCLick: Function };
  type: 'danger' | 'success' | 'info';
  icon: string;
  persist: boolean;
}

const state = reactive({
  notifications: []
});

const useUiNotification = () => {
  const removeNotification = (id: symbol) => {
    const index = state.notifications.findIndex(notification => notification.id === id);

    if (index !== -1) state.notifications.splice(index, 1);
  };

  const spawnNotification = (notification: UiNotification) => {
    const id = Symbol();
    const newNotification = { id, ...notification };

    state.notifications.push(newNotification);
    if (state.notifications.length > 3) state.notifications.shift();

    if (!notification.persist) {
      setTimeout(() => {
        removeNotification(id);
      }, 3000);
    }
  };

  return {
    spawnNotification,
    removeNotification,
    notifications: computed(() => state.notifications)
  };
};

export default useUiNotification;
