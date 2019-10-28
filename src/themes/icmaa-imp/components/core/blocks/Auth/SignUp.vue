<template>
  <modal name="modal-signup" :title="$t(title)" :width="width" @close="onClose">
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
    }),
    title () {
      if (this.activeElem === 'register') {
        return 'Register'
      } else if (this.activeElem === 'forgot-pass') {
        return 'Reset password'
      }

      return 'Log in'
    },
    width () {
      if (this.activeElem === 'register') {
        return 600
      }

      return 400
    }
  },
  components: {
    Modal,
    Login,
    Register,
    ForgotPass
  },
  methods: {
    onClose () {
      this.$store.commit('ui/setAuthElem', 'login')
      localStorage.removeItem('redirect')
    }
  }
}
</script>
