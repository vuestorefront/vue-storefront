<template>
  <div class="breadcrumbs h5 cl-gray">
    <span v-for="link in paths" :key="link.route_link">
      <router-link :to="link.route_link">
        {{ link.name | htmlDecode }}
      </router-link> /
    </span>
    <span class="cl-mine-shaft">
      {{ current | htmlDecode }}
    </span>
  </div>
</template>

<script>
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import i18n from '@vue-storefront/i18n'

export default {
  computed: {
    paths () {
      const routes = this.routes ? this.routes : this.$store.state.breadcrumbs.routes

      if (this.withHomepage) {
        return [
          { name: i18n.t('Homepage'), route_link: localizedRoute('/', currentStoreView().storeCode) },
          ...routes
        ]
      }

      return routes
    },
    current () {
      return this.activeRoute || this.$store.state.breadcrumbs.current
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
</script>
