import { computed, reactive } from '@vue/composition-api';

interface Options {
  persist: boolean;
  timeToLive?: number;
  icon?: string;
  iconColor?: string;
}

interface Action {
  text: string;
  onClick?: Function;
}

interface Notification {
  type: string;
  title?: string;
  message: string;
  action: Action;
  options?: Options;
}

const state = reactive({
  notifications: []
});

const useUINotification = () => {
  const removeNotification = (id: symbol) => {
    const index = state.notifications.findIndex(notification => notification.id === id);

    if (index !== -1) state.notifications.splice(index, 1);
  };

  const spawnNotification = (notification: Notification) => {
    const id = Symbol();
    const newNotification = { id, ...notification };

    state.notifications.push(newNotification);
    if (state.notifications.length > 3) state.notifications.shift();

    if (!notification.options?.persist) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.options?.timeToLive || 3000);
    }
  };

  return {
    spawnNotification,
    removeNotification,
    notifications: computed(() => state.notifications)
  };
};

export default useUINotification;
