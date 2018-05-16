<template>
  <modal name="modal-signup" :width="555">
    <login v-if="activeElem === 'login'" />
    <register v-if="activeElem === 'register'" />
    <forgot-pass v-if="activeElem === 'forgot-pass'" />
  </modal>
</template>
<script>
import Modal from 'theme/components/core/Modal'
import Login from './Login.vue'
import Register from './Register.vue'
import ForgotPass from './ForgotPass.vue'

import SignUp from 'core/components/blocks/Auth/SignUp'

export default {
  components: {
    Modal,
    Login,
    Register,
    ForgotPass
  },
  mixins: [SignUp]
}
</script>
<style scoped>
  .modal {
    font-size: 18px;
  }
</style>
