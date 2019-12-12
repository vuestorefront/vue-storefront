<template>
  <div class="t-flex t-items-center t-text-sm t-text-base-tone">
    <template v-for="(link, index) in paths">
      <router-link :to="link.route_link" :key="index" class="t-text-base-tone hover:t-text-base-dark">
        <template v-if="index === 0">
          <material-icon icon="home" size="xs" class="t-align-middle" />
          <span class="t-sr-only">{{ link.name | htmlDecode }}</span>
        </template>
        <template v-else>
          {{ link.name | htmlDecode }}
        </template>
      </router-link>
      <span class="t-mx-3 lg:t-mx-4 t-text-xs t-font-thin" :key="'bullet-' + index" v-text="spacerCharacter" />
    </template>
    <span class="t-text-base-tone" v-text="current || htmlDecode" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import i18n from '@vue-storefront/i18n'
import last from 'lodash-es/last'

import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'Breadcrumbs',
  components: {
    MaterialIcon
  },
  props: {
    spacerCharacter: {
      type: String,
      default: '/'
    },
    routes: {
      type: Array,
      required: false,
      default: null
    },
    withHomepage: {
      type: Boolean,
      default: true
    },
    activeRoute: {
      type: String,
      default: undefined
    }
  },
  computed: {
    ...mapGetters({
      getBreadcrumbsRoutes: 'breadcrumbs/getBreadcrumbsRoutes',
      getBreadcrumbsCurrent: 'breadcrumbs/getBreadcrumbsCurrent'
    }),
    paths () {
      let routes = this.routes ? this.routes : this.getBreadcrumbsRoutes

      // Remove last element
      // – got it already in `current`
      if (routes.length && last(routes).name === this.current) {
        routes = routes.slice(0, -1)
      }

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
  }
}
</script>
