<template>
  <div class="t-text-sm t-text-base-tone">
    <template v-for="(link, index) in paths">
      <router-link :to="link.route_link" :key="index">
        {{ link.name | htmlDecode }}
      </router-link>
      <span class="t-mx-2" :key="'bullet-' + index" v-text="spacerCharacter" />
    </template>
    <span v-text="current || htmlDecode" />
  </div>
</template>

<script>
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import i18n from '@vue-storefront/i18n'

export default {
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
  },
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
  }
}
</script>
