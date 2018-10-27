import NotificationItem from '../types/NotificationItem'

export const Notification = {
  computed: {
    notifications () {
      return this.$store.getters['notification/notifications']
    }
  }
}
