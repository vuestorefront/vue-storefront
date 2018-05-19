import Vue from 'vue'
import { mapState } from 'vuex'
import Login from './login'
import Register from './register'
import ForgotPass from './forgotPass'

export default Vue.component('SignUp', {
  components: {
    Login,
    Register,
    ForgotPass
  },
  computed: {
    ...mapState({
      activeElem: state => state.ui.authElem
    })
  }
})
