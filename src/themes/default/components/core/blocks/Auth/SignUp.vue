<template>
  <modal name="modal-signup" :width="620">
    <login v-if="activeElem === 'login'" />
    <register v-if="activeElem === 'register'" />
    <forgot-pass v-if="activeElem === 'forgot-pass'" />
  </modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from 'theme/components/core/Modal'
import Login from 'theme/components/core/blocks/Auth/Login'
import Register from 'theme/components/core/blocks/Auth/Register'
import ForgotPass from 'theme/components/core/blocks/Auth/ForgotPass'

export default {
  name: 'SignUp',
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
  }
}
</script>

<style scoped>
  .modal {
    font-size: 18px;
  }
</style>
