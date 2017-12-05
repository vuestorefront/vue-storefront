<template>
  <div class="notifications">
    <transition-group name="fade-in-down">
      <div class="notification c-white" v-for="(notification, index) in notifications" :key="index"  :class="{ info : notification.type == 'info', success: notification.type == 'success', error: notification.type == 'error'} ">
        <div class="message">
          {{ notification.message }}
        </div>
        <div class="actions uppercase" @click="action(notification.action1.action, index)">
          {{ notification.action1.label}}
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

<style lang="scss">
.notifications {
  position: fixed;
  top: 100px;
  right: 5%;
  width: 320px;
  z-index: 10000;

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
  box-sizing: border-box;
  box-shadow: 0px 0px 35px -5px rgba(0,0,0,.7);

  & + &  {
    margin-top: 30px;
  }

}
.notification > .message {
  padding: 20px;
}
.notification > .actions {
  padding: 10px 20px;
  font-weight: bolder;
  background: rgba(0,0,0,.2);
  cursor: pointer;
}

.notification.success {
  background: #308C14;

}

.notification.error {
  background: #E63030;

}

.notification.warning {
  background: #775555;
}

.notification.info {
  background: #333333;
}
</style>

