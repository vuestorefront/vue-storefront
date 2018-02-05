<template>
  <div class="sign-up mb20 fixed bg-white h4">
    <i class="material-icons p15 absolute close c-gray" @click="closeSignUp">close</i>
    <login v-if="activeElem === 'login'" />
    <register v-if="activeElem === 'register'" />
    <forgot-pass v-if="activeElem === 'forgot-pass'" />
  </div>
</template>
<script>
import Login from './Login.vue'
import Register from './Register.vue'
import ForgotPass from './ForgotPass.vue'

import { coreComponent } from 'lib/themes'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      activeElem: state => state.ui.authElem
    })
  },
  components: {
    Login,
    Register,
    ForgotPass
  },
  mixins: [coreComponent('core/blocks/Auth/SignUp')]
}
</script>
<style lang="scss" scoped>
  .sign-up {
    top: 100px;
    left: 50%;
    width: 555px;
    min-height: 555px;
    transform: translateX(-50%);
    z-index: 3;
    overflow: auto;

    @media (max-width: 600px), (orientation: landscape) and (max-width: 820px) {
      top: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      min-height: unset;
    }
  }
  .close {
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>
