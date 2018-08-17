<template>
  <modal name="modal-signup" :width="620">
    <login v-if="activeElem === 'login'" />
    <register v-if="activeElem === 'register'" />
    <forgot-pass v-if="activeElem === 'forgot-pass'" />
  </modal>
</template>

<script>
import SignUp from '@vue-storefront/core/components/blocks/Auth/SignUp'
import Modal from 'theme/components/core/Modal'
import Login from 'theme/components/core/blocks/Auth/Login'
import Register from 'theme/components/core/blocks/Auth/Register'
import ForgotPass from 'theme/components/core/blocks/Auth/ForgotPass'

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
