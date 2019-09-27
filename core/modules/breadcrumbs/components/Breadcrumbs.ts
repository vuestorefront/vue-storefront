import { localizedRoute } from '@vue-storefront/core/lib/multistore'
import i18n from '@vue-storefront/i18n'

export const Breadcrumbs = {
  computed: {
    routes () {
      return this.includeHompage ? [{name: i18n.t('Homepage'), route_link: localizedRoute('/')}, ...this.$store.state.breadcrumbs.routes] : this.$store.state.breadcrumbs.routes
    },
    current () {
      return this.$store.state.breadcrumbs.current
    }
  },
  props: {
    includeHompage: {
      type: Boolean,
      default: false
    }
  }
}
