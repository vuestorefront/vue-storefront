import { computed, reactive } from '@vue/composition-api';

interface UiNotification {
  message: string;
  action: { text: string; onClick: Function };
  type: 'danger' | 'success' | 'info';
  icon: string;
  persist: boolean;
  id: symbol;
  dismiss: () => void;
}

interface Notifications {
  notifications: Array<UiNotification>;
}

const state = reactive<Notifications>({
  notifications: []
});

const useUiNotification = () => {
  const send = (notification: UiNotification) => {
    const id = Symbol();

    const dismiss = () => {
      const index = state.notifications.findIndex(notification => notification.id === id);

      if (index !== -1) state.notifications.splice(index, 1);
    };

    const newNotification = {
      ...notification,
      id,
      dismiss
    };

    state.notifications.push(newNotification);
    if (state.notifications.length > 3) state.notifications.shift();

    if (!notification.persist) {
      setTimeout(() => {
        dismiss();
      }, 3000);
    }
  };

  return {
    send,
    notifications: computed(() => state.notifications)
  };
};

export default useUiNotification;
