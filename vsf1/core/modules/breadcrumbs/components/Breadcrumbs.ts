import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import i18n from '@vue-storefront/i18n'
import { mapGetters } from 'vuex'

export const Breadcrumbs = {
  computed: {
    ...mapGetters({
      getBreadcrumbsRoutes: 'breadcrumbs/getBreadcrumbsRoutes',
      getBreadcrumbsCurrent: 'breadcrumbs/getBreadcrumbsCurrent'
    }),
    paths () {
      const routes = this.routes ? this.routes : this.getBreadcrumbsRoutes

      if (this.withHomepage) {
        return [
          { name: i18n.t('Homepage'), route_link: localizedRoute('/', currentStoreView().storeCode) },
          ...routes
        ]
      }

      return routes
    },
    current () {
      return this.activeRoute || this.getBreadcrumbsCurrent
    }
  },
  props: {
    routes: {
      type: Array,
      required: false,
      default: null
    },
    withHomepage: {
      type: Boolean,
      default: false
    },
    activeRoute: {
      type: String,
      default: ''
    }
  }
}
