<template>
  <div class="breadcrumbs">
      <span v-for="link in routes">
          {{ link.name }} /
      </span>
      <strong>
        {{ activeRoute }}
      </strong>
  </div>
</template>

<script>
import EventBus from 'src/event-bus/event-bus'
import Vue from 'vue'

export default {
  name: 'breadcrumbs',
  props: ['routes', 'activeRoute'],
  created () {
    const self = this
    EventBus.$on('current-category-changed', () => {
      const tmpRts = []
      for (let sc of self.$store.state.category.current_path) {
        tmpRts.push({
          name: sc.name,
          route_link: '/c/' + sc.slug
        })
      }
      Vue.set(self, 'routes', tmpRts)
    })
  }
}
</script>
