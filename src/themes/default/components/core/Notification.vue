<template>
  <div class="notifications fixed">
    <transition-group name="fade-in-down">
      <div
        class="notification mt30 border-box cl-white"
        v-for="(notification, index) in notifications"
        :key="index"
        :class="{
          info : notification.type == 'info',
          success: notification.type == 'success',
          error: notification.type == 'error',
          warning: notification.type == 'warning'
        }"
      >
        <div
          @click="action(notification.action1.action, index)"
          class="message p20"
          data-testid="notificationMessage"
        >
          {{ notification.message }}
        </div>
        <div class="actions">
          <div
            class="py10 px20 pointer weight-400 notification-action uppercase"
            id="notificationAction1"
            data-testid="notificationAction1"
            @click="action(notification.action1.action, index)"
          >
            {{ notification.action1.label }}
          </div>
          <div
            class="py10 px20 pointer weight-400 notification-action align-center uppercase"
            id="notificationAction2"
            data-testid="notificationAction2"
            @click="action(notification.action2.action, index)"
            v-if="notification.action2"
          >
            {{ notification.action2.label }}
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Notification from 'core/components/Notification'

export default {
  mixins: [Notification]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$z-index-notification: map-get($z-index, notification);
$color-error: color(error);
$color-success: color(success);
$color-warning: color(warning);
$color-info: color(accent);
$color-action: color(black);

.notifications {
  top: 100px;
  right: 5%;
  width: 320px;
  z-index: $z-index-notification;

  @media (max-width: 64em) {
    width: auto;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;

    .fade-in-down-enter,
    .fade-in-down-leave-to {
      transform: translateY(100%);
    }
  }
}
.notification {
  box-shadow: 0px 0px 35px -5px rgba($color-action, .7);

  &:first-child  {
    margin-top: 0;
  }
}

.actions {
  display: flex;
  justify-content: space-between;

  .notification-action {
    background: rgba($color-action, .2);
  }

  #notificationAction1 {
    border-right: 2px solid $color-success;
  }

  #notificationAction2 {
    width: 100%;
  }
}
.success {
  background: $color-success;
}
.error {
  background: $color-error;
}
.warning {
  background: $color-warning;
}
.info {
  background: $color-info;
}
</style>
