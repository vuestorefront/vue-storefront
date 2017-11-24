<template>
  <div class="sign-up mb20" v-if="isOpen">
    <i class="material-icons p15 close c-gray" @click="closeSignUp">close</i>
    <login v-if="activeElem === 'login'" @switched="activeElem = $event" />
    <register v-if="activeElem === 'register'" @switched="activeElem = $event" />
  </div>
</template>
<script>
import Login from './Login.vue'
import Register from './Register.vue'

import { coreComponent } from 'lib/themes'

export default {
  data () {
    return {
      activeElem: 'login'
    }
  },
  components: {
    Login,
    Register
  },
  mixins: [coreComponent('core/blocks/SignUp/SignUp')]
}
</script>
<style lang="scss" scoped>
  .sign-up {
    position: absolute;
    width: 555px;
    background-color: white;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    font-size: 18px;

    @media (max-width: 600px) {
      top: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>
