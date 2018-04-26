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
        <div class="message p20">
          {{ notification.message }}
        </div>
        <div class="actions">
          <div
            class="py10 px20 pointer weight-400 uppercase"
            @click="action(notification.action1.action, index)"
          >
            {{ notification.action1.label }}
          </div>
          <div
            class="py10 px20 pointer weight-400 uppercase"
            @click="action(notification.action2.action, index)"
          >
            {{ notification.action2.label }}
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('Notification')]
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
  background: rgba($color-action, .2);
  display: flex;
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
