<template>
  <nav role="meta-navigation" class="t-flex t-pr-10 t-hidden md:t-flex t-items-center">
    <template v-for="(link, index) in navigation">
      <router-link :to="localizedRoute(link.route)" class="t-flex t-text-sm t-text-base-dark" :key="index">
        {{ link.name }}
      </router-link>
      <span class="t-flex t-px-3 t-text-sm t-text-base-lighter" v-if="index !== navigation.length - 1" :key="index">&bull;</span>
    </template>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(
      { jsonBlockByIdentifier: 'icmaaCmsBlock/jsonBlockByIdentifier' }
    ),
    navigation () {
      return this.jsonBlockByIdentifier('navigation-meta')
    }
  }
}
</script>
