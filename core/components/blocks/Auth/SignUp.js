import { mapState } from 'vuex'

export default {
  name: 'SignUp',
  computed: {
    ...mapState({
      activeElem: state => state.ui.authElem
    })
  }
}
