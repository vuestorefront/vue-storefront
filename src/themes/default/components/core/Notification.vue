<template>
  <div class="notifications fixed">
    <transition-group name="fade-in-down">
      <div
        class="notification mt30 border-box c-white"
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
        <div
          class="actions py10 px20 pointer weight-400 uppercase"
          @click="action(notification.action1.action, index)"
        >
          {{ notification.action1.label }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/Notification')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/global_vars';
$z-index-notification: map-get($z-index, notification);
$red: map-get($colors, red);
$la-palma: map-get($colors, la-palma);
$russet: map-get($colors, russet);
$darkgray: map-get($colors, darkgray);
$black: map-get($colors, black);

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
  box-shadow: 0px 0px 35px -5px rgba($black, .7);

  &:first-child  {
    margin-top: 0;
  }
}
.actions {
  background: rgba($black, .2);
}
.success {
  background: $la-palma;
}
.error {
  background: $red;
}
.warning {
  background: $russet;
}
.info {
  background: $darkgray;
}
</style>
