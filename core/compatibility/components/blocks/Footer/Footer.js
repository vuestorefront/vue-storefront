import rootStore from '@vue-storefront/store'

// moven entirely to theme
export default {
  name: 'MainFooter',
  computed: {
    multistoreEnabled () {
      return rootStore.state.config.storeViews.multistore
    }
  }
}
