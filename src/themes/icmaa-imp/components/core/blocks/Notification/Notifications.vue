<template>
  <div class="notifications t-fixed t-z-1000 t-w-full t-bottom-0 t-left-0 sm:t-w-3/12 sm:t-ml-4">
    <transition-group name="fade-in-up">
      <notification
        class="lg:t-mb-4"
        v-for="(notification, index) in notifications"
        :key="`${notification.type}_${index}`"
        :index="index"
        v-bind="notification"
      />
    </transition-group>
  </div>
</template>

<script>
import { Notification as NotificationMixin } from '@vue-storefront/core/modules/notification/components/Notification'
import Notification from 'theme/components/core/blocks/Notification/Notification'

export default {
  mixins: [NotificationMixin],
  components: {
    Notification
  }
}
</script>

<style lang="scss" scoped>
.notifications {

  .fade-in-down-enter {
    transform: translateY(100%);
  }

  .fade-in-down-leave-to {
    transform: translateY(-100%);
  }
}
</style>
