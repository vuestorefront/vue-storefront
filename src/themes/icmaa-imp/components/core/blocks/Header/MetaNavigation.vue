<template>
  <nav role="meta-navigation" class="t-flex t-pr-10 t-hidden md:t-flex t-items-center">
    <template v-for="(link, index) in navigation">
      <router-link :to="localizedRoute(link.route)" class="t-flex t-text-sm t-text-base-dark" :key="index" v-if="link.isRoute === true">
        {{ link.name }}
      </router-link>
      <a :href="link.route" class="t-flex t-text-sm t-text-base-dark" target="_blank" :key="index" v-else>
        {{ link.name }}
      </a>
      <span class="t-flex t-px-3 t-text-sm t-text-base-lighter" v-if="index !== navigation.length - 1" :key="'bullet-' + index">&bull;</span>
    </template>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('icmaaCmsBlock', ['getJsonBlockByIdentifier']),
    navigation () {
      return this.getJsonBlockByIdentifier('navigation-meta').map(link =>
        Object.assign(link, { isRoute: (typeof link.route === 'object' || link.route.startsWith('/')) })
      )
    }
  }
}
</script>
