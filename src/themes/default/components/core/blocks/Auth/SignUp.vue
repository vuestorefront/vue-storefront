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

import { coreComponent } from 'lib/themes'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      activeElem: state => state.ui.authElem
    })
  },
  components: {
    Modal,
    Login,
    Register,
    ForgotPass
  },
  mixins: [coreComponent('blocks/Auth/SignUp')]
}
</script>
