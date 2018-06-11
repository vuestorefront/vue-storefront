import config from 'config'

export default {
  name: 'MainFooter',
  computed: {
    multistoreEnabled () {
      return config.storeViews.multistore
    }
  }
}
