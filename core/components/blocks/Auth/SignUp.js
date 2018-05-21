import { mapState } from 'vuex'
import Login from 'core/components/blocks/Auth/Login'
import Register from 'core/components/blocks/Auth/Register'
import ForgotPass from 'core/components/blocks/Auth/ForgotPass'

export default {
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
}
