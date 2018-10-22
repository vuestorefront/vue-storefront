import rootStore from '@vue-storefront/store'

export default {
  name: 'MainFooter',
  computed: {
    multistoreEnabled () {
      return rootStore.state.config.storeViews.multistore
    }
  }
}
