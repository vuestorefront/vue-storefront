import { AccountButton } from '@vue-storefront/core/modules/user/components/AccountButton'

export default {
  name: 'AccountIcon',
  data () {
    // theme-specific, deprecated
    return {
      navigation: []
    }
  },
  computed: {
    currentUser () {
      // renamed to 'user'
      return this.user
    }
  },
  mixins: [AccountButton]
}
