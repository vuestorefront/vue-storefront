<template>
  <div class="notifications">
    <div class="notification">
      Lorem ipsum
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
  background: black;
  position: fixed;
  top: 5%;
  right: 5%;
  height: 20px;
  width: 20px;
}
</style>

