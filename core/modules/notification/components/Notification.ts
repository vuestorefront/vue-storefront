import NotificationItem from '../types/NotificationItem'

export const Notification = {
  computed: {
    notifications () {
      return this.$store.getters['notification/notifications']
    }
  },
  methods: {
    showNotification (notification: NotificationItem) {
      this.$store.dispatch('notification/addNotification', notification)
    },
    hideNotification (index: number) {
      this.$store.dispatch('notification/removeNotification', index)
    }
  }
}
