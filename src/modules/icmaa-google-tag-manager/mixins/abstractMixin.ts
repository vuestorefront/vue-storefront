import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      enabled: 'icmaaGoogleTagManager/enabled',
      getGTMProductDTO: 'icmaaGoogleTagManager/getGTMProductDTO'
    })
  }
}
