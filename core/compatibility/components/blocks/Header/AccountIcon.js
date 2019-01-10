import { AccountButton } from '@vue-storefront/core/modules/user/components/AccountButton'

export default {
  name: 'AccountIcon',
  data () {
    // theme-specific, depreciated
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
