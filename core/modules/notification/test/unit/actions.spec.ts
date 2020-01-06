import { notificationStore } from '../../store';
import NotificationItem from '../../types/NotificationItem';

jest.useFakeTimers()

describe('Notification actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers()
  });

  describe('spawnNotification', () => {
    it('should add new notification', async () => {
      const contextMock = {
        commit: jest.fn(),
        state: {
          notifications: []
        }
      };
      const notification: NotificationItem = {
        type: 'success',
        message: 'Success text.',
        action1: { label: 'OK' }
      }
      const wrapper = (actions: any) => actions.spawnNotification(contextMock, notification);

      const newNotification = await wrapper(notificationStore.actions);

      expect(contextMock.commit).toBeCalledWith('add', newNotification);
    });

    it('should NOT add new notification if last one has the same message', async () => {
      const notification: NotificationItem = {
        type: 'success',
        message: 'Success text.',
        action1: { label: 'OK' }
      }
      const contextMock = {
        commit: jest.fn(),
        state: {
          notifications: [notification]
        }
      };
      const wrapper = (actions: any) => actions.spawnNotification(contextMock, notification);

      await wrapper(notificationStore.actions);

      expect(contextMock.commit).not.toBeCalledWith('add', notification);
    });

    it('should remove new notification after timeToLive (3000ms)', async () => {
      const dispatch = jest.fn()
      const contextMock = {
        dispatch,
        commit: jest.fn(),
        state: {
          notifications: []
        }
      };
      const notification: NotificationItem = {
        type: 'success',
        message: 'Success text.',
        action1: { label: 'OK' },
        timeToLive: 3000
      }
      const wrapper = (actions: any) => actions.spawnNotification(contextMock, notification);

      const newNotification = await wrapper(notificationStore.actions);

      expect(contextMock.dispatch).not.toHaveBeenLastCalledWith('removeNotificationById');

      jest.advanceTimersByTime(3000);

      expect(contextMock.dispatch).toHaveBeenLastCalledWith('removeNotificationById', newNotification.id);
    });

    it('should NOT remove new notification if hasNoTimeout is set on true', async () => {
      const dispatch = jest.fn()
      const contextMock = {
        dispatch,
        commit: jest.fn(),
        state: {
          notifications: []
        }
      };
      const notification: NotificationItem = {
        type: 'success',
        message: 'Success text.',
        action1: { label: 'OK' },
        hasNoTimeout: true
      }
      const wrapper = (actions: any) => actions.spawnNotification(contextMock, notification);

      await wrapper(notificationStore.actions);

      jest.advanceTimersByTime(5000);

      expect(contextMock.dispatch).not.toHaveBeenLastCalledWith('removeNotificationById');
    });
  });

  describe('removeNotification', () => {
    it('should call \'remove\' commit with specific index', async () => {
      const contextMock = {
        commit: jest.fn(),
        state: {
          notifications: []
        }
      };
      const wrapper = (actions: any) => actions.removeNotification(contextMock, 1);

      await wrapper(notificationStore.actions);

      expect(contextMock.commit).toBeCalledWith('remove', 1);
    });

    it('if there is no index provided then should call \'remove\' commit with last index', async () => {
      const notification: NotificationItem = {
        type: 'success',
        message: 'Success text.',
        action1: { label: 'OK' }
      }
      const contextMock = {
        commit: jest.fn(),
        state: {
          notifications: [notification, notification]
        }
      };
      const wrapper = (actions: any) => actions.removeNotification(contextMock);

      await wrapper(notificationStore.actions);

      expect(contextMock.commit).toBeCalledWith('remove', 1);
    });
  })

  describe('removeNotificationById', () => {
    it('should call \'remove\' commit if id is found', async () => {
      const contextMock = {
        commit: jest.fn(),
        state: {
          notifications: [
            {
              id: 1234,
              type: 'success',
              message: 'Success text.',
              action1: { label: 'OK' }
            }
          ]
        }
      };
      const wrapper = (actions: any) => actions.removeNotificationById(contextMock, 1234);

      await wrapper(notificationStore.actions);

      expect(contextMock.commit).toBeCalledWith('remove', 0);
    });

    it('should not call \'remove\' commit if id is not found', async () => {
      const contextMock = {
        commit: jest.fn(),
        state: {
          notifications: [
            {
              id: 1230,
              type: 'success',
              message: 'Success text.',
              action1: { label: 'OK' }
            }
          ]
        }
      };
      const wrapper = (actions: any) => actions.removeNotificationById(contextMock, 1234);

      await wrapper(notificationStore.actions);

      expect(contextMock.commit).not.toBeCalledWith('remove', 0);
    });
  })
})
