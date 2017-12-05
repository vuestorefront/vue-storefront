<template>  
  <div class="breadcrumbs h5 c-darkgray">
      <span v-for="link in routes" v-bind:key="link.route_link">
        <router-link :to="link.route_link">
          {{ link.name | htmlDecode }}
        </router-link> /
      </span>
      <strong>
        {{ activeRoute | htmlDecode }}
      </strong>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/Breadcrumbs')]
}
</script>

<style scoped>
  
</style>
