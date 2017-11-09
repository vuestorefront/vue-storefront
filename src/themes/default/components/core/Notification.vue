<template>
  <div class="notifications">
    <div class="notification c-white" :class="{ info : notification.type = 'info'} " v-for="(notification, index) in notifications" :key="index">
      <div class="message">
        {{ notification.message }}
      </div>
      <div class="actions uppercase" @click="action(notification.action1.action, index)">
        {{ notification.action1.label}}
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/Notification')]
}
</script>

<style>
.notifications {
  position: fixed;
  top: 100px;
  right: 5%;
  z-index: 10000;
}
.notification {
  width: 320px;
  box-sizing: border-box;
  box-shadow: 0px 0px 35px -5px rgba(0,0,0,.7);
  margin-bottom: 30px;
}
.notification > .message {
  padding: 20px;
}
.notification > .actions {
  padding: 10px 20px;
  font-weight: bolder;
  background: rgba(0,0,0,.4);
  cursor: pointer;
}

.notification.success {
  background: #333333;

}

.notification.error {
  background: #333333;

}

.notification.info {
  background: #333333;

}
</style>

