<template>
  <div class="notifications fixed">
    <transition-group name="fade-in-down">
      <div
        class="notification mt30 border-box cl-white"
        v-for="(notification, index) in notifications"
        :key="`${notification.type}_${index}`"
        :class="notification.type"
      >
        <div
          @click="execAction(notification.action1, index)"
          class="message p20"
          data-testid="notificationMessage"
        >
          {{ notification.message }}
        </div>
        <div class="actions">
          <div
            class="py10 px20 pointer weight-400 action-border notification-action uppercase"
            :class="`border-${notification.type}`"
            id="notificationAction1"
            data-testid="notificationAction1"
            @click="execAction(notification.action1, index)"
          >
            {{ notification.action1.label }}
          </div>
          <div
            class="py10 px20 pointer weight-400 notification-action uppercase"
            id="notificationAction2"
            data-testid="notificationAction2"
            @click="execAction(notification.action2, index)"
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
import { Notification } from '@vue-storefront/core/modules/notification/components/Notification'

export default {
  mixins: [Notification],
  methods: {
    execAction (action, index) {
      if (action.action) {
        // for backward compatibility
        if (action.action === 'close') {
          this.$store.dispatch('notification/removeNotification', index)
        } else {
          action.action()
        }
      }
      this.$store.dispatch('notification/removeNotification', index)
    }
  }
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
.action-border {
  border-right: 2px solid transparent;
  &.border-success {
    border-right-color: $color-success;
  }
  &.border-error {
    border-color: $color-error;
  }
  &.border-warning {
    border-color: $color-warning;
  }
  &.border-info {
    border-color: $color-info;
  }
}
</style>
