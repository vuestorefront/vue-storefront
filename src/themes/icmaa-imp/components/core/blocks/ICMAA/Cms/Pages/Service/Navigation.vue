<template>
  <nav role="service-navigation">
    <ul>
      <li v-for="(item, index) in navigation" :key="index" class="t-border-b t-border-base-lighter">
        <router-link :to="localizedRoute(item.path)" class="t-flex t-p-2 t-text-sm">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ServiceNavigation',
  computed: {
    ...mapGetters('icmaaCmsBlock', ['getJsonBlockByIdentifier']),
    block () {
      return this.getJsonBlockByIdentifier('service-navigation')
    },
    navigation () {
      return this.block.navigation || []
    }
  }
}
</script>
