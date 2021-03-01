import { reactive } from '@vue/composition-api';

interface UseUiNotification {
  message: string;
  type: 'danger' | 'success' | 'info';
  action?: { text: string; onClick: () => void };
  icon?: string;
  persist?: boolean;
  id?: symbol;
  dismiss?: () => void;
}

type SendUiNotificationParams = Omit<UseUiNotification, 'id'>;

const notifications = reactive<Array<UseUiNotification>>([]);
const maxVisibleNotifications = 3;
const timeToLive = 3000;

const useUiNotification = () => {
  const send = (notification: SendUiNotificationParams) => {
    const id = Symbol();

    const dismiss = () => {
      const index = notifications.findIndex(notification => notification.id === id);

      if (index !== -1) notifications.splice(index, 1);
    };

    const newNotification = {
      ...notification,
      id,
      dismiss
    };

    notifications.push(newNotification);
    if (notifications.length > maxVisibleNotifications) notifications.shift();

    if (!notification.persist) {
      setTimeout(dismiss, timeToLive);
    }
  };

  return {
    send,
    notifications
  };
};

export default useUiNotification;
