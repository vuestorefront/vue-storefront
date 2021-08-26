import { notificationStore } from '../../store';
import NotificationItem from '../../types/NotificationItem';

describe('Notification actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('add', () => {
    it('should add new notification to state', async () => {
      const stateMock = {
        notifications: []
      }
      const notification: NotificationItem = {
        type: 'success',
        message: 'Success text.',
        action1: { label: 'OK' }
      }
      const expectedState = {
        notifications: [notification]
      }
      const wrapper = (mutations: any) => mutations['add'](stateMock, notification)

      wrapper(notificationStore.mutations)

      expect(stateMock).toEqual(expectedState)
    });
  })

  describe('remove', () => {
    it('should remove notification from state with provided index', async () => {
      const notification: NotificationItem = {
        type: 'success',
        message: 'Success text.',
        action1: { label: 'OK' }
      }
      const notification2: NotificationItem = {
        type: 'success',
        message: 'Success text2.',
        action1: { label: 'OK' }
      }
      const stateMock = {
        notifications: [notification, notification2]
      }
      const expectedState = {
        notifications: [notification2]
      }
      const wrapper = (mutations: any) => mutations['remove'](stateMock, 0)

      wrapper(notificationStore.mutations)

      expect(stateMock).toEqual(expectedState)
    });
  })
})
