import { mapGetters } from 'vuex'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { IcmaaTwitterModule } from 'icmaa-twitter'
import { twitterify } from 'icmaa-twitter/helpers'

export default {
  props: {
    screenName: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      loading: true
    }
  },
  beforeCreate () {
    registerModule(IcmaaTwitterModule)
  },
  async mounted () {
    await this.$store.dispatch('icmaaTwitter/loadStatusFeed', this.screenName)
    this.loading = false
  },
  computed: {
    ...mapGetters({
      getStatus: 'icmaaTwitter/getStatusByScreenName'
    }),
    status () {
      const status = this.getStatus(this.screenName)
      return status ? status.slice(0, this.limit) : []
    }
  },
  methods: {
    twitterify (text) {
      return twitterify(text)
    }
  }
}
